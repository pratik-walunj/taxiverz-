import { describe, expect, it } from 'vitest'
import type { PricingConfig } from '@/config/pricing'
import { computeFare, enquireFromPrice, isNightTime, roundUp } from '@/lib/pricing/engine'
import type { FareIndex } from '@/lib/pricing/fare-index'
import {
  classLabel,
  parsePackage,
  quoteTrip,
  resolveTrip,
  tripFromParams,
  tripToParams,
} from '@/lib/pricing/quote'
import type { ClassRates, FareInput, RouteCosts } from '@/lib/pricing/types'

// Fixture numbers only — never Taxiverz facts.
const config: PricingConfig = {
  status: 'draft',
  currency: 'INR',
  gstRatePercent: 5,
  gstIncluded: false,
  tollsIncluded: true,
  parkingIncluded: false,
  nightWindow: { start: '22:00', end: '06:00' },
  garageToGarage: true,
  maxDrivingKmPerDay: 400,
  airport: { fixedFares: null, minKm: 40 },
  localPackages: [{ hours: 8, km: 80 }],
  roundTo: 10,
}
const rates: ClassRates = {
  oneWayPerKm: 12,
  roundTripPerKm: 10,
  minKmPerDay: 250,
  oneWayMinKm: 100,
  driverAllowancePerDay: 300,
  nightCharge: 250,
  local: [{ hours: 8, km: 80, price: 2000 }],
  extraKm: 12,
  extraHour: 150,
}
const route: RouteCosts = {
  distanceKm: 300,
  tolls: { car: 400, lcv: 700, bus: 1200 },
  permitCharges: 0,
  borderCharges: 0,
  isInternational: false,
}
const base: FareInput = { tripType: 'one-way', classSlug: 'sedan', rates, tollClass: 'car', route, config }
const fare = (over: Partial<FareInput>) => computeFare({ ...base, ...over })
const priced = (over: Partial<FareInput>) => {
  const q = fare(over)
  if (q.status !== 'priced') throw new Error(`expected priced, got: ${q.reason}`)
  return q
}

describe('one way', () => {
  it('adds distance, driver allowance, tolls and GST, then rounds up', () => {
    const q = priced({})
    // 300 × 12 = 3600 + 300 + 400 = 4300; GST 5 % = 215 → 4515 → 4520
    expect(q.lines.map((l) => l.amount)).toEqual([3600, 300, 400, 215])
    expect(q.total).toBe(4520)
    expect(q.included).toEqual(['Driver', 'Tolls', 'GST'])
    expect(q.excluded).toEqual(['Parking'])
    expect(q.isEstimate).toBe(true)
  })

  it('charges the one-way minimum distance', () => {
    const q = priced({ route: { ...route, distanceKm: 55 } })
    expect(q.lines[0]).toEqual({ label: '100 km × ₹12/km', amount: 1200 })
    expect(q.assumptions).toContain('Charged for a minimum of 100 km.')
  })

  it('adds a night charge only for a night pickup', () => {
    expect(priced({ pickupTime: '23:30' }).lines.some((l) => l.label === 'Night charge')).toBe(true)
    expect(priced({ pickupTime: '05:59' }).lines.some((l) => l.label === 'Night charge')).toBe(true)
    expect(priced({ pickupTime: '06:00' }).lines.some((l) => l.label === 'Night charge')).toBe(false)
    expect(priced({}).assumptions).toContain('A night charge is added if pickup is between 22:00 and 06:00.')
  })

  it('lists tolls as excluded when they are paid on the way', () => {
    const q = priced({ config: { ...config, tollsIncluded: false } })
    expect(q.lines.some((l) => l.label === 'Tolls')).toBe(false)
    expect(q.excluded).toContain('Tolls (paid on the way)')
  })

  it('adds Nepal permits and border charges on international routes', () => {
    const q = priced({ route: { ...route, isInternational: true, permitCharges: 1000, borderCharges: 500 } })
    expect(q.lines.find((l) => l.label === 'Nepal permits')?.amount).toBe(1000)
    expect(q.lines.find((l) => l.label === 'Border charges')?.amount).toBe(500)
    expect(q.included).toContain('Nepal permits and border charges')
  })

  it('treats GST as included when the rate card already includes it', () => {
    const q = priced({ config: { ...config, gstIncluded: true } })
    expect(q.lines.some((l) => l.label.startsWith('GST'))).toBe(false)
    expect(q.total).toBe(4300)
  })

  it('is not an estimate once pricing is verified', () => {
    expect(priced({ config: { ...config, status: 'verified' } }).isEstimate).toBe(false)
  })
})

describe('round trip', () => {
  it('picks the shortest sensible trip and charges both-way tolls', () => {
    const q = priced({ tripType: 'round-trip' })
    // 600 km / 400 per day → 2 days; max(600, 2 × 250) = 600 km × 10 = 6000; DA 600; 1 night 250; tolls 800
    expect(q.lines.map((l) => [l.label, l.amount])).toEqual([
      ['600 km × ₹10/km', 6000],
      ['Driver allowance × 2 days', 600],
      ['Night charge × 1', 250],
      ['Tolls (both ways)', 800],
      ['GST 5%', 383],
    ])
    expect(q.total).toBe(8040)
    expect(q.assumptions).toContain('For a 2-day round trip; the fare updates when you pick dates.')
  })

  it('applies the minimum km per day for longer stays', () => {
    const q = priced({ tripType: 'round-trip', days: 4 })
    expect(q.lines[0]).toEqual({ label: '1000 km × ₹10/km', amount: 10000 })
    expect(q.lines[1]?.label).toBe('Driver allowance × 4 days')
    expect(q.lines[2]).toEqual({ label: 'Night charge × 3', amount: 750 })
  })

  it('has no night charge for a same-day trip', () => {
    const q = priced({ tripType: 'round-trip', route: { ...route, distanceKm: 100 } })
    expect(q.lines.some((l) => l.label.startsWith('Night'))).toBe(false)
    expect(q.lines[1]?.label).toBe('Driver allowance × 1 day')
  })
})

describe('local and airport', () => {
  it('prices a local package and shows extra rates', () => {
    const q = priced({ tripType: 'local', localPackage: { hours: 8, km: 80 } })
    expect(q.lines[0]).toEqual({ label: '8 hours / 80 km', amount: 2000 })
    expect(q.assumptions).toEqual(['Extra km: ₹12/km.', 'Extra hour: ₹150/hour.'])
  })

  it('is on request for a package the class has no price for', () => {
    const q = fare({ tripType: 'local', localPackage: { hours: 12, km: 120 } })
    expect(q).toMatchObject({ status: 'on-request', reason: 'missing price for the 12 h / 120 km package' })
  })

  it('uses a fixed airport fare when configured, else one way with the airport minimum', () => {
    const fixed = priced({
      tripType: 'airport',
      config: { ...config, airport: { fixedFares: { sedan: 900 }, minKm: 40 } },
    })
    expect(fixed.lines[0]).toEqual({ label: 'Airport transfer (fixed fare)', amount: 900 })
    const byKm = priced({ tripType: 'airport', route: { ...route, distanceKm: 20 } })
    expect(byKm.lines[0]?.label).toBe('100 km × ₹12/km') // class minimum (100) beats airport minimum (40)
  })
})

describe('missing data is never guessed', () => {
  it.each([
    [{ route: { ...route, distanceKm: null } }, 'missing verified distance for this route'],
    [{ rates: { ...rates, oneWayPerKm: null } }, 'missing one-way rate'],
    [{ rates: { ...rates, driverAllowancePerDay: null } }, 'missing driver allowance'],
    [{ config: { ...config, gstRatePercent: null } }, 'missing GST rate'],
    [{ config: { ...config, tollsIncluded: null } }, 'missing toll policy'],
    [{ route: { ...route, tolls: null } }, 'missing toll amount for this route'],
    [{ pickupTime: '23:00', rates: { ...rates, nightCharge: null } }, 'missing night charge'],
    [{ pickupTime: '23:00', config: { ...config, nightWindow: null } }, 'missing night-charge hours'],
    [{ route: { ...route, isInternational: true, permitCharges: null } }, 'missing Nepal permit charges'],
    [{ tripType: 'round-trip' as const, config: { ...config, maxDrivingKmPerDay: null } }, 'missing maximum driving km per day'],
    [{ tripType: 'local' as const }, 'missing local package'],
    [{ tripType: 'airport' as const, config: { ...config, airport: { fixedFares: null, minKm: null } } }, 'missing airport minimum distance'],
  ])('%#: %j → on request', (over, reason) => {
    const q = fare(over as Partial<FareInput>)
    expect(q.status).toBe('on-request')
    expect(q.status === 'on-request' && q.reason).toBe(reason)
    expect(q.isEstimate).toBe(true)
  })
})

describe('helpers', () => {
  it('rounds up to the configured step', () => {
    expect(roundUp(4515, 10)).toBe(4520)
    expect(roundUp(4520, 10)).toBe(4520)
    expect(roundUp(4515.4, 1)).toBe(4515)
  })

  it('handles night windows that do and do not cross midnight', () => {
    expect(isNightTime('01:00', { start: '22:00', end: '06:00' })).toBe(true)
    expect(isNightTime('12:00', { start: '22:00', end: '06:00' })).toBe(false)
    expect(isNightTime('13:00', { start: '12:00', end: '14:00' })).toBe(true)
    expect(() => isNightTime('9pm', { start: '22:00', end: '06:00' })).toThrow()
  })

  it('shows a "from" price for enquire-mode vehicles only when pricing is verified', () => {
    const vehicle = {
      rates: {
        wedding: { hours: 16, price: 12000, extraHour: 500 },
        corporate: { hours: 8, km: 80, price: 8000 },
        outstationPerKm: null,
        minKmPerDay: null,
        local: [],
        extraKm: null,
        extraHour: null,
        nightCharge: null,
        washing: null,
        perDay: null,
        perWeek: null,
        perMonth: null,
      },
    }
    expect(enquireFromPrice(vehicle, config)).toBeNull()
    expect(enquireFromPrice(vehicle, { ...config, status: 'verified' })).toBe(8000)
    expect(enquireFromPrice({ rates: null }, { ...config, status: 'verified' })).toBeNull()
  })
})

describe('quotes from the fare index', () => {
  const index: FareIndex = {
    places: [
      { id: 'gorakhpur', name: 'Gorakhpur', nameHi: null, aliases: [], type: 'city', code: null, city: 'gorakhpur', country: 'IN' },
      { id: 'kathmandu', name: 'Kathmandu', nameHi: null, aliases: [], type: 'city', code: null, city: 'kathmandu', country: 'NP' },
      { id: 'kathmandu-airport', name: 'Tribhuvan International Airport', nameHi: null, aliases: [], type: 'airport', code: 'KTM', city: 'kathmandu', country: 'NP' },
    ],
    routes: [{ origin: 'gorakhpur', destination: 'kathmandu', distanceKm: 300, tolls: route.tolls!, permitCharges: 0, borderCharges: 0, isInternational: true }],
    classes: [
      { slug: 'suv', name: 'SUV', representativeModels: ['Scorpio'], seats: null, luggage: null, tollClass: 'car', rates: { ...rates, oneWayPerKm: 16 }, sortOrder: 2 },
      { slug: 'sedan', name: 'Sedan', representativeModels: ['Dzire', 'Etios'], seats: 4, luggage: 3, tollClass: 'car', rates, sortOrder: 1 },
      { slug: 'muv', name: 'MUV', representativeModels: ['Ertiga'], seats: 6, luggage: 4, tollClass: 'car', rates: { ...rates, oneWayPerKm: null }, sortOrder: 0 },
    ],
    config,
  }

  it('resolves places to cities and reuses a route distance in reverse', () => {
    const trip = resolveTrip(index, { type: 'one-way', from: 'kathmandu-airport', to: 'gorakhpur' })
    expect(trip.route.distanceKm).toBe(300)
    expect(trip.route.isInternational).toBe(true)
    expect(trip.fromLabel).toBe('Tribhuvan International Airport')
  })

  it('lists priced classes cheapest first and "on request" last', () => {
    const quotes = quoteTrip(index, resolveTrip(index, { type: 'one-way', from: 'gorakhpur', to: 'kathmandu' }))
    expect(quotes.map((q) => [q.vehicleClass.slug, q.quote.status])).toEqual([
      ['sedan', 'priced'],
      ['suv', 'priced'],
      ['muv', 'on-request'],
    ])
  })

  it('keeps unknown places as free text and quotes them on request', () => {
    const trip = resolveTrip(index, { type: 'one-way', from: 'gorakhpur', to: null, toText: 'Bettiah' })
    expect(trip.toLabel).toBe('Bettiah')
    expect(quoteTrip(index, trip).every((q) => q.quote.status === 'on-request')).toBe(true)
  })

  it('round-trips trip requests through URL params', () => {
    const t = tripFromParams({ type: 'local', from: 'gorakhpur', pkg: '8-80', days: '99', time: '7pm' })
    expect(t).toEqual({ type: 'local', from: 'gorakhpur', to: null, fromText: undefined, toText: undefined, pkg: '8-80', days: undefined, pickupTime: undefined })
    expect(tripToParams(t!)).toBe('type=local&from=gorakhpur&pkg=8-80')
    expect(tripToParams({ type: 'one-way', from: null, fromText: 'GIDA', to: 'kathmandu' })).toBe('type=one-way&fromq=GIDA&to=kathmandu')
    expect(tripFromParams({ type: 'boat' })).toBeNull()
    expect(tripFromParams({ type: 'round-trip', from: ['gorakhpur', 'x'], days: '3', time: '23:15' })).toMatchObject({ from: 'gorakhpur', days: 3, pickupTime: '23:15' })
  })

  it('parses local packages and labels classes', () => {
    expect(parsePackage('12-120')).toEqual({ hours: 12, km: 120 })
    expect(parsePackage('abc')).toBeNull()
    expect(classLabel({ name: 'Sedan', representativeModels: ['Dzire', 'Etios'] })).toBe('Sedan — Dzire, Etios or similar')
  })
})

describe('policy lists', () => {
  it('promise nothing on an on-request quote', () => {
    const q = fare({ config: { ...config, tollsIncluded: null } })
    expect(q.status).toBe('on-request')
    expect(q.included).toEqual([])
    expect(q.excluded).toEqual([])
  })

  it('leave parking out when its policy is unknown', () => {
    const q = priced({ config: { ...config, parkingIncluded: null } })
    expect(q.included).not.toContain('Parking')
    expect(q.excluded).not.toContain('Parking')
  })
})
