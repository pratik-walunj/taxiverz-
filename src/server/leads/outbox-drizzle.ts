import { and, eq, inArray, lt, lte, sql } from 'drizzle-orm'
import type { Db } from '@/server/db/client'
import { leadDeliveries, leads, type LeadRow } from '@/server/db/schema'
import type { FareQuote } from '@/lib/pricing/types'
import type { Attribution, LeadDetails, LeadType, TripInput } from '@/lib/schemas/lead'
import type { DueDelivery, LeadRecord, OutboxStore } from './types'

interface LabelsAndVehicle {
  fromLabel: string | null
  toLabel: string | null
  vehicleLabel: string | null
}

function toRecord(row: LeadRow): LeadRecord {
  const trip = row.trip as (TripInput & { labels?: LabelsAndVehicle }) | null
  const { labels, ...tripOnly } = trip ?? {}
  return {
    ref: row.ref,
    type: row.type as LeadType,
    name: row.name,
    phone: row.phone,
    email: row.email,
    pickupAddress: row.pickupAddress,
    message: row.message,
    trip: trip ? (tripOnly as TripInput) : null,
    details: (row.details as LeadDetails | null) ?? null,
    fromLabel: labels?.fromLabel ?? null,
    toLabel: labels?.toLabel ?? null,
    vehicleLabel: labels?.vehicleLabel ?? null,
    fare: (row.fare as FareQuote | null) ?? null,
    clientTotal: row.clientTotal,
    whatsappOptIn: row.whatsappOptIn,
    attribution: (row.attribution as Attribution | null) ?? null,
    page: row.page,
    userAgent: row.userAgent,
    createdAt: row.createdAt,
  }
}

export function drizzleOutbox(db: Db): OutboxStore {
  return {
    async save(lead, sinkNames) {
      await db.transaction(async (tx) => {
        // Retention clock: any earlier lead from this phone counts as "last contact" now.
        await tx
          .update(leads)
          .set({ lastContactAt: lead.createdAt })
          .where(eq(leads.phone, lead.phone))
        const [row] = await tx
          .insert(leads)
          .values({
            ref: lead.ref,
            type: lead.type,
            name: lead.name,
            phone: lead.phone,
            email: lead.email,
            pickupAddress: lead.pickupAddress,
            message: lead.message,
            trip: lead.trip
              ? {
                  ...lead.trip,
                  labels: {
                    fromLabel: lead.fromLabel,
                    toLabel: lead.toLabel,
                    vehicleLabel: lead.vehicleLabel,
                  },
                }
              : null,
            details: lead.details,
            fare: lead.fare,
            clientTotal: lead.clientTotal === null ? null : Math.round(lead.clientTotal),
            whatsappOptIn: lead.whatsappOptIn,
            attribution: lead.attribution,
            page: lead.page,
            userAgent: lead.userAgent,
            createdAt: lead.createdAt,
            lastContactAt: lead.createdAt,
          })
          .returning({ id: leads.id })
        if (sinkNames.length)
          await tx.insert(leadDeliveries).values(
            sinkNames.map((sink) => ({
              leadId: row!.id,
              sink,
              status: 'pending',
              nextAttemptAt: lead.createdAt,
            })),
          )
      })
    },

    async markSent(ref, sink, at) {
      await db
        .update(leadDeliveries)
        .set({
          status: 'sent',
          deliveredAt: at,
          nextAttemptAt: null,
          attempts: sql`${leadDeliveries.attempts} + 1`,
        })
        .where(
          and(
            eq(leadDeliveries.sink, sink),
            eq(
              leadDeliveries.leadId,
              sql`(select ${leads.id} from ${leads} where ${leads.ref} = ${ref})`,
            ),
          ),
        )
    },

    async markFailed(ref, sink, error, attempts, nextAttemptAt) {
      await db
        .update(leadDeliveries)
        .set({
          status: nextAttemptAt ? 'pending' : 'failed',
          attempts,
          lastError: error.slice(0, 300),
          nextAttemptAt,
        })
        .where(
          and(
            eq(leadDeliveries.sink, sink),
            eq(
              leadDeliveries.leadId,
              sql`(select ${leads.id} from ${leads} where ${leads.ref} = ${ref})`,
            ),
          ),
        )
    },

    async due(now, limit): Promise<DueDelivery[]> {
      const rows = await db
        .select({ lead: leads, sink: leadDeliveries.sink, attempts: leadDeliveries.attempts })
        .from(leadDeliveries)
        .innerJoin(leads, eq(leads.id, leadDeliveries.leadId))
        .where(and(eq(leadDeliveries.status, 'pending'), lte(leadDeliveries.nextAttemptAt, now)))
        .limit(limit)
      return rows.map((r) => ({ lead: toRecord(r.lead), sink: r.sink, attempts: r.attempts }))
    },

    async purge(before) {
      const old = await db
        .select({ id: leads.id })
        .from(leads)
        .where(lt(leads.lastContactAt, before))
      if (!old.length) return 0
      await db.delete(leads).where(
        inArray(
          leads.id,
          old.map((o) => o.id),
        ),
      )
      return old.length
    },
  }
}
