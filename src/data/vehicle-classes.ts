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
  Partial<Pick<VehicleClass, 'seats' | 'luggage'>>

const input: ClassInput[] = [
  {
    slug: 'hatchback',
    name: 'Hatchback',
    representativeModels: ['WagonR'],
    tollClass: 'car',
    seats: 4,
  },
  {
    slug: 'sedan',
    name: 'Sedan',
    representativeModels: ['Dzire', 'Etios'],
    tollClass: 'car',
    seats: 4,
    luggage: 3,
  },
  {
    slug: 'premium-sedan',
    name: 'Premium sedan',
    representativeModels: ['Honda City', 'Hyundai Verna'],
    tollClass: 'car',
    seats: 4,
  },
  {
    slug: 'muv',
    name: 'MUV',
    representativeModels: ['Ertiga'],
    tollClass: 'car',
    seats: 6,
    luggage: 4,
  },
  // Scorpio and Innova are listed as "7+1 & 6+1": seat count depends on the vehicle sent.
  { slug: 'suv', name: 'SUV', representativeModels: ['Scorpio'], tollClass: 'car' },
  {
    slug: 'mpv',
    name: 'MPV',
    representativeModels: ['Innova Crysta'],
    tollClass: 'car',
    luggage: 4,
  },
  {
    slug: 'premium-suv',
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
    name: 'Tempo traveller 13-seater',
    representativeModels: ['Force Traveller'],
    tollClass: 'lcv',
  },
  {
    slug: 'tempo-traveller-17',
    name: 'Tempo traveller 17-seater',
    representativeModels: ['Force Traveller'],
    tollClass: 'lcv',
  },
  {
    slug: 'tempo-traveller-20',
    name: 'Tempo traveller 20-seater',
    representativeModels: ['Force Traveller'],
    tollClass: 'lcv',
  },
  {
    slug: 'tempo-traveller-26',
    name: 'Tempo traveller 26-seater',
    representativeModels: ['Force Traveller'],
    tollClass: 'lcv',
    seats: 25,
  },
  {
    slug: 'urbania-13',
    name: 'Urbania 13-seater',
    representativeModels: ['Force Urbania'],
    tollClass: 'lcv',
    seats: 13,
  },
  {
    slug: 'urbania-17',
    name: 'Urbania 17-seater',
    representativeModels: ['Force Urbania'],
    tollClass: 'lcv',
    seats: 17,
  },
  { slug: 'winger', name: 'Winger', representativeModels: ['Tata Winger'], tollClass: 'lcv' },
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
