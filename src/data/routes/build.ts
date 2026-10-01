import type { Route } from '@/lib/schemas/content'
import { routeDistances } from '../route-distances.generated'
import { routeCopy } from './copy'

type RouteSeed = Pick<
  Route,
  'origin' | 'destination' | 'slug' | 'legacyUrls' | 'isInternational' | 'legacy'
> &
  Partial<Route>

/**
 * Fills a route's unknowns with null/empty values. Nothing here is a fact:
 * distance, time, tolls and border details stay null until verified; distance
 * and time come only from reviewed rows of docs/route-distances.csv.
 */
export function route(seed: RouteSeed): Route {
  return {
    status: 'draft',
    ownerConfirmed: false,
    distanceKm: null,
    durationMins: null,
    verified: { distance: false, duration: false, tolls: false, border: false },
    via: [],
    borderCrossing: null,
    tolls: { car: null, lcv: null, bus: null },
    permitCharges: null,
    borderCharges: null,
    bestDepartureTime: null,
    roadNotes: null,
    stops: [],
    content: { intro: null, routeGuide: null, tips: [] },
    faqs: [],
    featured: false,
    relatedPackages: [],
    ...seed,
    ...verifiedDistance(seed.slug),
    ...withCopy(seed.slug),
  }
}

/** Route copy lives in ./copy/*.ts; `publish` there sets the status (the route gate still applies). */
function withCopy(slug: string): Partial<Route> {
  const c = routeCopy[slug]
  if (!c) return {}
  return {
    status: c.publish ? 'published' : 'draft',
    content: { intro: c.intro, routeGuide: c.routeGuide, tips: c.tips },
    stops: c.stops,
    faqs: c.faqs,
    bestDepartureTime: c.bestDepartureTime ?? null,
    ...(c.ownerConfirmed !== undefined && { ownerConfirmed: c.ownerConfirmed }),
  }
}

/** Distance and time from the owner-reviewed CSV (npm run distances:apply), if reviewed. */
function verifiedDistance(slug: string): Partial<Route> {
  const d = routeDistances[slug]
  if (!d) return {}
  return {
    distanceKm: d.distanceKm,
    durationMins: d.durationMins,
    verified: { distance: true, duration: d.durationMins !== null, tolls: false, border: false },
  }
}
