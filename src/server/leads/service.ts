import type { FareIndex } from '@/lib/pricing/fare-index'
import { classLabel, quoteTrip, resolveTrip, type TripRequest } from '@/lib/pricing/quote'
import type { TripType } from '@/lib/pricing/types'
import type { LeadInput } from '@/lib/schemas/lead'
import { looksAutomated, type RateLimiter } from './antispam'
import { makeReference } from './reference'
import type { LeadRecord, OutboxStore, Sink } from './types'

/**
 * The lead pipeline (REBUILD_PLAN §3.5):
 * validate → anti-spam → server-side fare recompute → reference → outbox → sinks.
 * If the outbox is unreachable, deliver straight to the sinks. Logs never
 * contain personal data.
 */

export interface LeadDeps {
  store: OutboxStore | null
  sinks: Sink[]
  limiter: RateLimiter
  fareIndex: () => FareIndex
  now?: () => Date
  log?: (event: Record<string, unknown>) => void
}

export type SubmitResult =
  | { status: 'ok'; ref: string; stored: boolean; delivered: string[] }
  /** Nothing could store or deliver it: the browser falls back to WhatsApp. */
  | { status: 'undelivered'; ref: string }
  | { status: 'spam'; ref: string }
  | { status: 'rate-limited' }

/** Retry schedule after each failed attempt: 1 min, 5 min, 30 min, 2 h, 12 h — then give up. */
export const BACKOFF_MINUTES = [1, 5, 30, 120, 720]
export const RETENTION_MONTHS = 24

const defaultLog = (event: Record<string, unknown>) => console.error(JSON.stringify(event))

function daysBetween(a: string, b: string): number {
  return Math.round((Date.parse(b) - Date.parse(a)) / 86_400_000) + 1
}

/** Rebuilds the fare on the server from the trip the visitor chose; the browser's number is only kept for comparison. */
export function recomputeFare(index: FareIndex, input: LeadInput) {
  const trip = input.trip
  if (!trip) return { fare: null, fromLabel: null, toLabel: null, vehicleLabel: null }
  const request: TripRequest = {
    type: trip.type as TripType,
    from: trip.from,
    to: trip.to,
    fromText: trip.fromText,
    toText: trip.toText,
    pkg: trip.pkg ?? null,
    days:
      trip.type === 'round-trip' && trip.date && trip.returnDate
        ? Math.max(1, daysBetween(trip.date, trip.returnDate))
        : undefined,
    pickupTime: trip.time,
  }
  const resolved = resolveTrip(index, request)
  const chosen = trip.classSlug
    ? quoteTrip(index, resolved).find((q) => q.vehicleClass.slug === trip.classSlug)
    : undefined
  return {
    fare: chosen?.quote ?? null,
    fromLabel: resolved.fromLabel || null,
    toLabel: resolved.toLabel,
    vehicleLabel: chosen ? classLabel(chosen.vehicleClass) : null,
  }
}

async function deliverTo(
  sink: Sink,
  lead: LeadRecord,
  log: NonNullable<LeadDeps['log']>,
): Promise<boolean> {
  try {
    await sink.deliver(lead)
    return true
  } catch (err) {
    log({
      event: 'lead-sink-failed',
      ref: lead.ref,
      sink: sink.name,
      error: (err as Error).message.slice(0, 200),
    })
    return false
  }
}

export async function submitLead(
  input: LeadInput,
  meta: { ip: string; userAgent: string | null },
  deps: LeadDeps,
): Promise<SubmitResult> {
  const now = deps.now?.() ?? new Date()
  const log = deps.log ?? defaultLog
  if (!deps.limiter.allow(meta.ip, now.getTime())) return { status: 'rate-limited' }
  // Automated submissions get a normal-looking answer and are dropped.
  if (looksAutomated(input, now.getTime())) return { status: 'spam', ref: makeReference(now) }

  const recomputed = recomputeFare(deps.fareIndex(), input)
  const lead: LeadRecord = {
    ref: makeReference(now),
    type: input.type,
    name: input.contact.name,
    phone: input.contact.phone,
    email: input.contact.email || null,
    pickupAddress: input.contact.pickupAddress || null,
    message: input.contact.message || null,
    trip: input.trip ?? null,
    details: input.details ?? null,
    ...recomputed,
    clientTotal: input.clientTotal ?? null,
    whatsappOptIn: input.consent.whatsappOptIn,
    attribution: input.attribution ?? null,
    page: input.page,
    userAgent: meta.userAgent,
    createdAt: now,
  }
  if (
    recomputed.fare?.status === 'priced' &&
    input.clientTotal != null &&
    input.clientTotal !== recomputed.fare.total
  )
    log({
      event: 'lead-fare-mismatch',
      ref: lead.ref,
      client: input.clientTotal,
      server: recomputed.fare.total,
    })

  let stored = false
  if (deps.store) {
    try {
      await deps.store.save(
        lead,
        deps.sinks.map((s) => s.name),
      )
      stored = true
    } catch (err) {
      log({
        event: 'lead-outbox-unavailable',
        ref: lead.ref,
        error: (err as Error).message.slice(0, 200),
      })
    }
  }

  const delivered: string[] = []
  for (const sink of deps.sinks) {
    const ok = await deliverTo(sink, lead, log)
    if (ok) delivered.push(sink.name)
    if (!stored) continue
    try {
      if (ok) await deps.store!.markSent(lead.ref, sink.name, new Date())
      else
        await deps.store!.markFailed(
          lead.ref,
          sink.name,
          'first attempt failed',
          1,
          addMinutes(now, BACKOFF_MINUTES[0]!),
        )
    } catch (err) {
      log({
        event: 'lead-outbox-update-failed',
        ref: lead.ref,
        sink: sink.name,
        error: (err as Error).message.slice(0, 200),
      })
    }
  }

  if (stored || delivered.length) return { status: 'ok', ref: lead.ref, stored, delivered }
  log({ event: 'lead-undelivered', ref: lead.ref })
  return { status: 'undelivered', ref: lead.ref }
}

function addMinutes(d: Date, minutes: number): Date {
  return new Date(d.getTime() + minutes * 60_000)
}

/** Called every 5 minutes by the VPS cron: retries due deliveries with backoff. */
export async function retryDueDeliveries(
  deps: Pick<LeadDeps, 'store' | 'sinks' | 'now' | 'log'>,
  limit = 50,
) {
  const log = deps.log ?? defaultLog
  const now = deps.now?.() ?? new Date()
  if (!deps.store) return { retried: 0, sent: 0 }
  const due = await deps.store.due(now, limit)
  let sent = 0
  for (const d of due) {
    const sink = deps.sinks.find((s) => s.name === d.sink)
    const attempts = d.attempts + 1
    if (sink && (await deliverTo(sink, d.lead, log))) {
      await deps.store.markSent(d.lead.ref, d.sink, now)
      sent++
      continue
    }
    const wait = BACKOFF_MINUTES[attempts - 1]
    await deps.store.markFailed(
      d.lead.ref,
      d.sink,
      sink ? 'delivery failed' : 'sink no longer configured',
      attempts,
      sink && wait !== undefined ? addMinutes(now, wait) : null,
    )
  }
  return { retried: due.length, sent }
}

/** Called daily: deletes leads whose last contact is older than 24 months (privacy policy, DPDP Act). */
export async function purgeExpiredLeads(deps: Pick<LeadDeps, 'store' | 'now'>) {
  if (!deps.store) return { deleted: 0 }
  const now = deps.now?.() ?? new Date()
  const before = new Date(now)
  before.setMonth(before.getMonth() - RETENTION_MONTHS)
  return { deleted: await deps.store.purge(before) }
}
