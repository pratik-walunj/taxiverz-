import type { PricingConfig } from '@/config/pricing'
import type { Place } from '@/lib/schemas/content'
import type { ClassRates, TollClass } from './types'

/**
 * The slim, serialisable dataset the fare widget and /book/ price from:
 * places for autocomplete, verified route costs, live class rates, pricing
 * rules. No prose, no FAQs (CLAUDE.md performance rule). Built on the server
 * from lib/content and served as /fare-index.json.
 */
export interface FareIndexPlace {
  id: string
  name: string
  nameHi: string | null
  aliases: string[]
  type: Place['type']
  code: string | null
  /** The city whose routes this place uses for distances (a city's own slug for cities). */
  city: string | null
  country: 'IN' | 'NP'
}

export interface FareIndexRoute {
  origin: string
  destination: string
  distanceKm: number
  tolls: { car: number | null; lcv: number | null; bus: number | null }
  permitCharges: number | null
  borderCharges: number | null
  isInternational: boolean
}

export interface FareIndexClass {
  slug: string
  name: string
  representativeModels: string[]
  seats: number | null
  luggage: number | null
  tollClass: TollClass
  rates: ClassRates
  sortOrder: number
}

export interface FareIndex {
  places: FareIndexPlace[]
  routes: FareIndexRoute[]
  classes: FareIndexClass[]
  config: PricingConfig
}
