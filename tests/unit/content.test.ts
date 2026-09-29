import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import legacyMap from '../../docs/legacy-url-map.json'
import { images } from '@/data/images.generated'
import { contentPaths, getPlaces, routePath } from '@/lib/content'
import { cities, routes, vehicles } from '@/lib/content/data'
import {
  isLongDistance,
  routeGate,
  vehicleGate,
  wordCount,
  type GateContext,
} from '@/lib/content/gates'
import { getPublishedPaths } from '@/lib/content/published'
import type { Route, Vehicle } from '@/lib/schemas/content'

const words = (n: number) => Array.from({ length: n }, (_, i) => `word${i}`).join(' ')
const ctx: GateContext = {
  liveVehicles: [],
  publishedClassCount: 1,
  publishedRoutesFrom: () => 0,
  isServicePublished: () => true,
}

describe('data', () => {
  it('has the 56 legacy routes, each once, with a legacy distance', () => {
    expect(routes).toHaveLength(56)
    expect(new Set(routes.map((r) => r.slug)).size).toBe(56)
    expect(routes.every((r) => r.legacy.distanceKm !== null)).toBe(true)
  })

  it('never carries a verified distance before the owner-reviewed CSV exists', () => {
    expect(routes.every((r) => r.distanceKm === null && !r.verified.distance)).toBe(true)
  })

  it('maps every legacy route URL in the URL map to the route that claims it', () => {
    const byUrl = new Map(routes.flatMap((r) => r.legacyUrls.map((u) => [u, r] as const)))
    for (const e of legacyMap.entries.filter((e) => e.type === 'route')) {
      const r = byUrl.get(e.legacyPath)
      expect(r, e.legacyPath).toBeDefined()
      expect(routePath(r!)).toBe(e.target)
    }
  })

  it('has a vehicle for every /fleet/ target in the URL map', () => {
    const slugs = new Set(vehicles.map((v) => v.slug))
    for (const e of legacyMap.entries.filter(
      (e) => e.target.startsWith('/fleet/') && e.target !== '/fleet/',
    ))
      expect(slugs.has(e.target.split('/')[2]!), e.target).toBe(true)
  })

  it('marks routes to or from Nepal as international', () => {
    const np = new Set(cities.filter((c) => c.country === 'NP').map((c) => c.slug))
    for (const r of routes)
      expect(r.isInternational).toBe(np.has(r.origin) || np.has(r.destination))
  })

  it('finds places by alias, airport and station code', () => {
    const places = getPlaces()
    const find = (q: string) =>
      places.find((p) => p.name === q || p.aliases.includes(q) || p.code === q)?.id
    expect(find('Banaras')).toBe('varanasi')
    expect(find('Allahabad')).toBe('prayagraj')
    expect(find('GOP')).toBe('gorakhpur-airport')
    expect(find('GKP')).toBe('gorakhpur')
  })

  it('has a file on disk for every migrated image', () => {
    for (const img of Object.values(images))
      expect(existsSync(join('public', img.src)), img.src).toBe(true)
  })
})

describe('gates', () => {
  const draft = routes.find((r) => r.slug === 'gorakhpur-to-kathmandu')!
  const complete: Route = {
    ...draft,
    distanceKm: 370,
    verified: { distance: true, duration: true, tolls: false, border: false },
    content: { intro: words(80), routeGuide: words(150), tips: [] },
    stops: [
      { name: 'A', note: null },
      { name: 'B', note: null },
      { name: 'C', note: null },
    ],
    faqs: Array.from({ length: 4 }, (_, i) => ({ q: `Q${i}`, a: `A${i}` })),
  }

  it('lists every reason a legacy route is still a draft', () => {
    expect(routeGate(draft, ctx)).toEqual([
      'distance not verified (needs a reviewed row in docs/route-distances.csv)',
      'intro under 80 words',
      'route guide under 150 words',
      'fewer than 3 stops or sights',
      'fewer than 4 route-specific FAQs',
    ])
  })

  it('passes a route that meets every §5 requirement', () => {
    expect(routeGate(complete, ctx)).toEqual([])
    expect(routeGate(complete, { ...ctx, publishedClassCount: 0 })).toContain(
      'no published vehicle class to price or quote',
    )
  })

  it('holds long-distance routes until the owner confirms them', () => {
    const goa = routes.find((r) => r.slug === 'gorakhpur-to-goa')!
    expect(isLongDistance(goa)).toBe(true)
    expect(routeGate({ ...complete, legacy: goa.legacy, distanceKm: 2000 }, ctx)).toContain(
      'long-distance route not confirmed by the owner (E3)',
    )
    expect(
      routeGate({ ...complete, legacy: goa.legacy, distanceKm: 2000, ownerConfirmed: true }, ctx),
    ).toEqual([])
  })

  it('needs an owner-confirmed photo without a baked-in caption for a vehicle page', () => {
    const base = vehicles.find((v) => v.slug === 'innova-crysta')!
    const own = { ...base.images[0]!, source: 'own' as const }
    const ok: Vehicle = { ...base, ownerConfirmed: true, seats: 7, images: [own] }
    expect(vehicleGate(ok)).toEqual([])
    expect(vehicleGate({ ...ok, images: [{ ...own, bakedInText: true }] })).toContain(
      'no owner-confirmed photo of the vehicle (F1)',
    )
    expect(vehicleGate(base)).toContain('not confirmed as part of the fleet (B3)')
  })

  it('counts words', () => {
    expect(wordCount(null)).toBe(0)
    expect(wordCount('  Gorakhpur to Kathmandu  ')).toBe(3)
  })
})

describe('publishing', () => {
  it('publishes the Phase 4A cab pages', () => {
    for (const p of [
      '/outstation-cabs/',
      '/one-way-cabs/',
      '/airport-taxi/',
      '/local-car-rental/',
      '/tempo-traveller/',
      '/outstation-cabs/gorakhpur/',
      '/one-way-cabs/gorakhpur/',
      '/airport-taxi/gorakhpur/',
      '/local-car-rental/gorakhpur/',
      '/tempo-traveller/gorakhpur/',
      '/cabs/gorakhpur/',
      '/fleet/',
    ])
      expect(contentPaths(), p).toContain(p)
    expect(getPublishedPaths().slice(0, 2)).toEqual(['/', '/book/'])
  })

  it('keeps the /cabs/ directory unpublished until it lists three pages', () => {
    expect(contentPaths()).not.toContain('/cabs/')
  })

  it('never publishes a vehicle or a route yet', () => {
    expect(contentPaths().some((p) => /^\/fleet\/.+/.test(p))).toBe(false)
    expect(routes.some((r) => contentPaths().includes(routePath(r)))).toBe(false)
  })
})
