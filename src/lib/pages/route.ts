import type { FareIndex } from '@/lib/pricing/fare-index'
import { classLabel, quoteTrip, resolveTrip } from '@/lib/pricing/quote'
import type { FareQuote } from '@/lib/pricing/types'
import type { Route } from '@/lib/schemas/content'

/**
 * Build-time helpers for the route template (REBUILD_PLAN §4 "Route").
 * Pure: they take the fare index and route list, so tests use fixtures.
 */

export interface FareRow {
  classSlug: string
  label: string
  oneWay: FareQuote
  roundTrip: FareQuote
}

/** One row per live class, one-way and round trip, computed by the same engine as the widget. */
export function routeFareTable(
  index: FareIndex,
  route: Pick<Route, 'origin' | 'destination'>,
): FareRow[] {
  const trip = (type: 'one-way' | 'round-trip') =>
    quoteTrip(index, resolveTrip(index, { type, from: route.origin, to: route.destination }))
  const oneWay = trip('one-way')
  const roundTrip = trip('round-trip')
  return index.classes.map((c) => ({
    classSlug: c.slug,
    label: classLabel(c),
    oneWay: oneWay.find((q) => q.vehicleClass.slug === c.slug)!.quote,
    roundTrip: roundTrip.find((q) => q.vehicleClass.slug === c.slug)!.quote,
  }))
}

/** Lowest priced one-way total, for the title ("Fare from ₹X") — only when the pricing is verified. */
export function fromPrice(rows: readonly FareRow[]): number | null {
  const totals = rows
    .map((r) => r.oneWay)
    .filter(
      (q): q is Extract<FareQuote, { status: 'priced' }> => q.status === 'priced' && !q.isEstimate,
    )
    .map((q) => q.total)
  return totals.length ? Math.min(...totals) : null
}

export interface RelatedRoutes {
  reverse: Route | null
  sameOrigin: Route[]
}

/** Reverse route and 4–8 other routes from the same origin (featured first), live routes only. */
export function relatedRoutes(route: Route, live: readonly Route[], max = 8): RelatedRoutes {
  const reverse =
    live.find((r) => r.origin === route.destination && r.destination === route.origin) ?? null
  const sameOrigin = live
    .filter((r) => r.origin === route.origin && r.slug !== route.slug)
    .toSorted((a, b) => Number(b.featured) - Number(a.featured) || a.slug.localeCompare(b.slug))
    .slice(0, max)
  return { reverse, sameOrigin }
}

/** "5 h 30 min" from minutes. */
export function formatDuration(mins: number): string {
  const h = Math.floor(mins / 60)
  const m = mins % 60
  return [h ? `${h} h` : '', m ? `${m} min` : ''].filter(Boolean).join(' ')
}
