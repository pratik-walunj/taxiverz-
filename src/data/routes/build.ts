import type { Route } from '@/lib/schemas/content'

type RouteSeed = Pick<
  Route,
  'origin' | 'destination' | 'slug' | 'legacyUrls' | 'isInternational' | 'legacy'
> &
  Partial<Route>

/**
 * Fills a route's unknowns with null/empty values. Nothing here is a fact:
 * distance, time, tolls and border details stay null until verified.
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
  }
}
