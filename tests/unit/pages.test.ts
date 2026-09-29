import { describe, expect, it } from 'vitest'
import { pricing } from '@/config/pricing'
import { formatDuration, fromPrice, relatedRoutes, routeFareTable } from '@/lib/pages/route'
import type { FareIndex } from '@/lib/pricing/fare-index'
import type { ClassRates } from '@/lib/pricing/types'
import { routes } from '@/lib/content/data'
import type { Route } from '@/lib/schemas/content'
import { breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from '@/lib/seo/jsonld'

const rates: ClassRates = {
  oneWayPerKm: 12,
  roundTripPerKm: 10,
  minKmPerDay: 250,
  oneWayMinKm: 100,
  driverAllowancePerDay: 300,
  nightCharge: 250,
  local: [],
  extraKm: 12,
  extraHour: 120,
}

const index = (verified: boolean): FareIndex => ({
  places: [
    {
      id: 'gorakhpur',
      name: 'Gorakhpur',
      nameHi: null,
      aliases: [],
      type: 'city',
      code: null,
      city: 'gorakhpur',
      country: 'IN',
    },
    {
      id: 'ayodhya',
      name: 'Ayodhya',
      nameHi: null,
      aliases: [],
      type: 'city',
      code: null,
      city: 'ayodhya',
      country: 'IN',
    },
  ],
  routes: [
    {
      origin: 'gorakhpur',
      destination: 'ayodhya',
      distanceKm: 140,
      tolls: { car: 0, lcv: 0, bus: 0 },
      permitCharges: null,
      borderCharges: null,
      isInternational: false,
    },
  ],
  classes: [
    {
      slug: 'sedan',
      name: 'Sedan',
      representativeModels: ['Dzire'],
      seats: 4,
      luggage: 3,
      tollClass: 'car',
      rates,
      sortOrder: 1,
    },
    {
      slug: 'suv',
      name: 'SUV',
      representativeModels: ['Scorpio'],
      seats: null,
      luggage: null,
      tollClass: 'car',
      rates: { ...rates, oneWayPerKm: null },
      sortOrder: 2,
    },
  ],
  config: {
    ...pricing,
    status: verified ? 'verified' : 'draft',
    gstRatePercent: 5,
    gstIncluded: true,
    tollsIncluded: true,
    parkingIncluded: false,
    nightWindow: { start: '22:00', end: '06:00' },
    garageToGarage: false,
    maxDrivingKmPerDay: 300,
  },
})

describe('route fare table', () => {
  it('prices every live class both ways with the shared engine', () => {
    const rows = routeFareTable(index(false), { origin: 'gorakhpur', destination: 'ayodhya' })
    expect(rows.map((r) => r.label)).toEqual([
      'Sedan — Dzire or similar',
      'SUV — Scorpio or similar',
    ])
    expect(rows[0]!.oneWay.status).toBe('priced')
    expect(rows[0]!.roundTrip.status).toBe('priced')
    expect(rows[1]!.oneWay.status).toBe('on-request')
  })

  it('shows a "from" price only when pricing is verified', () => {
    const route = { origin: 'gorakhpur', destination: 'ayodhya' }
    expect(fromPrice(routeFareTable(index(false), route))).toBeNull()
    const verified = routeFareTable(index(true), route)
    const sedan = verified[0]!.oneWay
    expect(fromPrice(verified)).toBe(sedan.status === 'priced' ? sedan.total : NaN)
  })

  it('is all on request for a route without a verified distance', () => {
    const rows = routeFareTable(index(true), {
      origin: 'ayodhya',
      destination: 'gorakhpur-nowhere',
    })
    expect(rows.every((r) => r.oneWay.status === 'on-request')).toBe(true)
  })
})

describe('related routes', () => {
  const live = routes.filter(
    (r) => r.origin === 'gorakhpur' || r.destination === 'gorakhpur',
  ) as Route[]
  const ktm = live.find((r) => r.slug === 'gorakhpur-to-kathmandu')!

  it('finds the reverse route and other routes from the same origin', () => {
    const reverse: Route = {
      ...ktm,
      origin: 'kathmandu',
      destination: 'gorakhpur',
      slug: 'kathmandu-to-gorakhpur',
    }
    const rel = relatedRoutes(ktm, [...live, reverse], 5)
    expect(rel.reverse).toBe(reverse)
    expect(rel.sameOrigin).toHaveLength(5)
    expect(rel.sameOrigin.every((r) => r.origin === 'gorakhpur' && r.slug !== ktm.slug)).toBe(true)
  })

  it('lists featured routes first', () => {
    const rel = relatedRoutes(ktm, live, 50)
    const firstPlain = rel.sameOrigin.findIndex((r) => !r.featured)
    expect(rel.sameOrigin.slice(firstPlain).some((r) => r.featured)).toBe(false)
  })

  it('returns nothing when no other route is live', () => {
    expect(relatedRoutes(ktm, [ktm])).toEqual({ reverse: null, sameOrigin: [] })
  })
})

describe('helpers', () => {
  it('formats durations', () => {
    expect(formatDuration(330)).toBe('5 h 30 min')
    expect(formatDuration(120)).toBe('2 h')
    expect(formatDuration(45)).toBe('45 min')
  })

  it('builds Service, FAQPage and BreadcrumbList JSON-LD without unknown facts', () => {
    const service = serviceJsonLd({
      name: 'Airport taxi',
      description: 'x',
      path: '/airport-taxi/',
      serviceType: 'Airport taxi',
      areaServed: [],
    })
    expect(service).not.toHaveProperty('areaServed')
    expect(service.url).toBe('https://taxiverz.com/airport-taxi/')
    expect(faqJsonLd([{ q: 'Q?', a: 'A.' }]).mainEntity).toEqual([
      { '@type': 'Question', name: 'Q?', acceptedAnswer: { '@type': 'Answer', text: 'A.' } },
    ])
    expect(breadcrumbJsonLd([{ name: 'Home', path: '/' }]).itemListElement).toHaveLength(1)
  })
})
