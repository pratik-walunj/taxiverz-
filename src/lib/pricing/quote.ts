import { computeFare } from './engine'
import type { FareIndex, FareIndexClass, FareIndexPlace } from './fare-index'
import type { FareQuote, RouteCosts, TripType } from './types'
import { TRIP_TYPES } from './types'

/**
 * Turns a trip request (from the URL or the lead form) into quotes per vehicle
 * class, using only the fare index. Shared by the widget, /book/ and the
 * server-side recompute in /api/leads, so all three always agree.
 */

export interface TripRequest {
  type: TripType
  /** Place id, or null when the visitor typed a place we don't know. */
  from: string | null
  to: string | null
  /** Free text when the place isn't in the index. */
  fromText?: string
  toText?: string
  /** Local packages: "8-80" = 8 hours / 80 km. */
  pkg?: string | null
  days?: number
  pickupTime?: string
}

export interface ResolvedTrip {
  request: TripRequest
  from: FareIndexPlace | null
  to: FareIndexPlace | null
  fromLabel: string
  toLabel: string | null
  route: RouteCosts
  localPackage: { hours: number; km: number } | null
}

export interface ClassQuote {
  vehicleClass: FareIndexClass
  quote: FareQuote
}

export function parsePackage(pkg: string | null | undefined): { hours: number; km: number } | null {
  const m = pkg ? /^(\d{1,2})-(\d{1,4})$/.exec(pkg) : null
  return m ? { hours: Number(m[1]), km: Number(m[2]) } : null
}

/** Reads a trip from URL search params (/book/?type=one-way&from=gorakhpur&to=kathmandu). */
export function tripFromParams(
  params: Record<string, string | string[] | undefined>,
): TripRequest | null {
  const get = (k: string) => {
    const v = params[k]
    return (Array.isArray(v) ? v[0] : v)?.trim() || undefined
  }
  const type = get('type') as TripType | undefined
  if (!type || !TRIP_TYPES.includes(type)) return null
  const days = Number(get('days'))
  return {
    type,
    from: get('from') ?? null,
    to: get('to') ?? null,
    fromText: get('fromq')?.slice(0, 80),
    toText: get('toq')?.slice(0, 80),
    pkg: get('pkg') ?? null,
    days: Number.isInteger(days) && days > 0 && days <= 60 ? days : undefined,
    pickupTime: /^\d{2}:\d{2}$/.test(get('time') ?? '') ? get('time') : undefined,
  }
}

export function tripToParams(trip: TripRequest): string {
  const p = new URLSearchParams({ type: trip.type })
  if (trip.from) p.set('from', trip.from)
  else if (trip.fromText) p.set('fromq', trip.fromText)
  if (trip.to) p.set('to', trip.to)
  else if (trip.toText) p.set('toq', trip.toText)
  if (trip.pkg) p.set('pkg', trip.pkg)
  return p.toString()
}

function findRoute(index: FareIndex, a: string | null, b: string | null) {
  if (!a || !b) return null
  return (
    index.routes.find((r) => r.origin === a && r.destination === b) ??
    index.routes.find((r) => r.origin === b && r.destination === a) ?? // reverse routes reuse the distance
    null
  )
}

export function resolveTrip(index: FareIndex, request: TripRequest): ResolvedTrip {
  const place = (id: string | null) => (id ? (index.places.find((p) => p.id === id) ?? null) : null)
  const from = place(request.from)
  const to = request.type === 'local' ? null : place(request.to)
  const found = findRoute(index, from?.city ?? null, to?.city ?? null)
  const international = [from, to].some((p) => p?.country === 'NP')
  return {
    request,
    from,
    to,
    fromLabel: from?.name ?? request.fromText ?? '',
    toLabel: request.type === 'local' ? null : (to?.name ?? request.toText ?? null),
    route: found
      ? { ...found }
      : {
          distanceKm: null,
          tolls: null,
          permitCharges: null,
          borderCharges: null,
          isInternational: international,
        },
    localPackage: request.type === 'local' ? parsePackage(request.pkg) : null,
  }
}

/** Quotes for every live class, cheapest priced first, then "on request" in class order. */
export function quoteTrip(
  index: FareIndex,
  trip: ResolvedTrip,
  opts: { nights?: number } = {},
): ClassQuote[] {
  const quotes = index.classes.map((vehicleClass) => ({
    vehicleClass,
    quote: computeFare({
      tripType: trip.request.type,
      classSlug: vehicleClass.slug,
      rates: vehicleClass.rates,
      tollClass: vehicleClass.tollClass,
      route: trip.route,
      config: index.config,
      days: trip.request.days,
      nights: opts.nights,
      pickupTime: trip.request.pickupTime,
      localPackage: trip.localPackage ?? undefined,
    }),
  }))
  return quotes.sort((a, b) => {
    const pa = a.quote.status === 'priced' ? a.quote.total : Infinity
    const pb = b.quote.status === 'priced' ? b.quote.total : Infinity
    return pa - pb || a.vehicleClass.sortOrder - b.vehicleClass.sortOrder
  })
}

/** "Sedan — Dzire, Etios or similar" */
export function classLabel(c: Pick<FareIndexClass, 'name' | 'representativeModels'>): string {
  return `${c.name} — ${c.representativeModels.join(', ')} or similar`
}
