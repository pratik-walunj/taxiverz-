import type { Metadata } from 'next'
import { RoutePage } from '@/components/templates/RoutePage'
import { allCities, allRoutes } from '@/lib/content'
import { relatedRoutes, routeFareTable } from '@/lib/pages/route'
import { buildFareIndex } from '@/lib/pricing/build-index'
import type { Route } from '@/lib/schemas/content'

/**
 * Dev-only preview of the route template (Phase 4B) with a SAMPLE route:
 * every distance, time, stop and sentence below is a layout fixture, not a
 * Taxiverz fact. Real routes publish only after the reviewed distances CSV.
 */
export const metadata: Metadata = {
  title: { absolute: 'Route template preview | Taxiverz' },
  robots: { index: false, follow: false },
}

const base = allRoutes.find((r) => r.slug === 'gorakhpur-to-ayodhya') ?? allRoutes[0]!
const sample = 'Sample paragraph for layout review only. '
const fixture: Route = {
  ...base,
  distanceKm: 135,
  durationMins: 200,
  verified: { distance: true, duration: true, tolls: false, border: false },
  via: ['Sample town A', 'Sample town B'],
  bestDepartureTime: 'Sample: early morning',
  roadNotes: 'Sample road note.',
  stops: [
    { name: 'Sample stop 1', note: 'Sample note.' },
    { name: 'Sample stop 2', note: null },
    { name: 'Sample stop 3', note: 'Sample note.' },
  ],
  content: {
    intro: sample.repeat(6),
    routeGuide: `${sample.repeat(8)}\n\n${sample.repeat(6)}`,
    tips: ['Sample tip one.', 'Sample tip two.'],
  },
  faqs: [
    { q: 'Sample question one?', a: 'Sample answer.' },
    { q: 'Sample question two?', a: 'Sample answer.' },
  ],
}

export default function RouteTemplatePreview() {
  const city = (slug: string) => allCities.find((c) => c.slug === slug)!
  return (
    <RoutePage
      route={fixture}
      origin={city(fixture.origin)}
      destination={city(fixture.destination)}
      fares={routeFareTable(buildFareIndex(), fixture)}
      related={relatedRoutes(fixture, allRoutes.slice(0, 6))}
      cityName={(slug) => city(slug)?.name ?? slug}
    />
  )
}
