import type { VehicleClass } from '@/lib/schemas/content'

/**
 * The classes the fare engine prices ("Sedan — Dzire, Etios or similar").
 * Source: docs/RATE_CARD.md §2. Every rate stays null until the owner removes
 * the "?" from its cell; seats/luggage only where the legacy pages agree.
 */
const noRates: VehicleClass['rates'] = {
  oneWayPerKm: null,
  roundTripPerKm: null,
  minKmPerDay: null,
  oneWayMinKm: null,
  driverAllowancePerDay: null,
  nightCharge: null,
  local: [],
  extraKm: null,
  extraHour: null,
}

type ClassInput = Pick<VehicleClass, 'slug' | 'name' | 'representativeModels' | 'tollClass'> &
  Partial<Pick<VehicleClass, 'seats' | 'luggage' | 'useCase'>>

const input: ClassInput[] = [
  {
    slug: 'hatchback',
    useCase:
      'Small, easy to park and light on the road: city errands, station and airport pickups, short trips for up to four.',
    name: 'Hatchback',
    representativeModels: ['WagonR'],
    tollClass: 'car',
    seats: 4,
  },
  {
    slug: 'sedan',
    useCase:
      'The everyday car for families and business trips: room for four and a separate boot for the bags.',
    name: 'Sedan',
    representativeModels: ['Dzire', 'Etios'],
    tollClass: 'car',
    seats: 4,
    luggage: 3,
  },
  {
    slug: 'premium-sedan',
    useCase: 'A roomier, quieter sedan for long drives, business guests and family occasions.',
    name: 'Premium sedan',
    representativeModels: ['Honda City', 'Hyundai Verna'],
    tollClass: 'car',
    seats: 4,
  },
  {
    slug: 'muv',
    useCase:
      'Three rows for six: families travelling with elders, children and luggage in one car.',
    name: 'MUV',
    representativeModels: ['Ertiga'],
    tollClass: 'car',
    seats: 6,
    luggage: 4,
  },
  // Scorpio and Innova are listed as "7+1 & 6+1": seat count depends on the vehicle sent.
  {
    slug: 'suv',
    useCase: 'High seats and a tough build for rough roads, hill trips and bigger families.',
    name: 'SUV',
    representativeModels: ['Scorpio'],
    tollClass: 'car',
  },
  {
    slug: 'mpv',
    useCase:
      'Comfortable seats in three rows and space for bags: the long-trip choice for families and pilgrim groups.',
    name: 'MPV',
    representativeModels: ['Innova Crysta'],
    tollClass: 'car',
    luggage: 4,
  },
  {
    slug: 'premium-suv',
    useCase:
      'A large premium SUV for VIP guests, weddings and hill drives where comfort and presence matter.',
    name: 'Premium SUV',
    representativeModels: ['Fortuner', 'XUV700'],
    tollClass: 'car',
    seats: 7,
  },
  // Gypsy 4+1 vs Jeep 5+1: seats unknown for the class.
  { slug: 'open-4x4', name: 'Open 4×4', representativeModels: ['Gypsy', 'Jeep'], tollClass: 'car' },
  // Tempo-traveller pages and the hub disagree by one seat (13 vs 12, 17 vs 16, 20 vs 19).
  {
    slug: 'tempo-traveller-13',
    useCase:
      'For a group of about a dozen: family tours, pilgrimages and wedding guests, everyone in one vehicle.',
    name: 'Tempo traveller 13-seater',
    representativeModels: ['Force Traveller'],
    tollClass: 'lcv',
  },
  {
    slug: 'tempo-traveller-17',
    useCase:
      'For groups of around fifteen: temple circuits, college trips and baraat guests with their luggage.',
    name: 'Tempo traveller 17-seater',
    representativeModels: ['Force Traveller'],
    tollClass: 'lcv',
  },
  {
    slug: 'tempo-traveller-20',
    useCase:
      'For larger parties of around twenty who want to travel together instead of in three cars.',
    name: 'Tempo traveller 20-seater',
    representativeModels: ['Force Traveller'],
    tollClass: 'lcv',
  },
  {
    slug: 'tempo-traveller-26',
    useCase:
      'The biggest traveller: up to 25 passengers for weddings, yatra groups and company outings.',
    name: 'Tempo traveller 26-seater',
    representativeModels: ['Force Traveller'],
    tollClass: 'lcv',
    seats: 25,
  },
  {
    slug: 'urbania-13',
    useCase:
      'A modern van with individual seats for groups who want more comfort than a tempo traveller.',
    name: 'Urbania 13-seater',
    representativeModels: ['Force Urbania'],
    tollClass: 'lcv',
    seats: 13,
  },
  {
    slug: 'urbania-17',
    useCase:
      'The larger Urbania: individual seats for up to 17 on long tours and airport group transfers.',
    name: 'Urbania 17-seater',
    representativeModels: ['Force Urbania'],
    tollClass: 'lcv',
    seats: 17,
  },
  {
    slug: 'winger',
    useCase:
      'A compact van for medium groups that is easier than a bus in narrow lanes and old-city streets.',
    name: 'Winger',
    representativeModels: ['Tata Winger'],
    tollClass: 'lcv',
  },
]

/**
 * Published (owner decision, 2026-09-28): every class the fare widget offers,
 * so /book/ works end to end — fares read "on request" until RATE_CARD rates exist.
 * Open 4×4 stays draft: Gypsy/Jeep/Thar are enquiry-only (mostly shoots).
 */
const ENQUIRY_ONLY = new Set(['open-4x4'])

export const vehicleClasses: VehicleClass[] = input.map((c, i) => ({
  seats: null,
  luggage: null,
  ac: null,
  useCase: null,
  imageFrom: null,
  rates: noRates,
  sortOrder: i + 1,
  status: ENQUIRY_ONLY.has(c.slug) ? 'draft' : 'published',
  ...c,
}))
