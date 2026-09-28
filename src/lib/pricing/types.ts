import type { PricingConfig } from '@/config/pricing'
import type { VehicleClass } from '@/lib/schemas/content'

export type TripType = 'one-way' | 'round-trip' | 'local' | 'airport'
export const TRIP_TYPES: readonly TripType[] = ['one-way', 'round-trip', 'local', 'airport']

export type ClassRates = VehicleClass['rates']
export type TollClass = VehicleClass['tollClass']

/** Road facts for a trip. `null` = unknown, which makes the fare "on request". */
export interface RouteCosts {
  /** One-way road distance in km, from verified data only. */
  distanceKm: number | null
  tolls: { car: number | null; lcv: number | null; bus: number | null } | null
  /** Nepal permits and border charges for the whole trip (0 when not international). */
  permitCharges: number | null
  borderCharges: number | null
  isInternational: boolean
}

export interface FareInput {
  tripType: TripType
  classSlug: string
  rates: ClassRates
  tollClass: TollClass
  route: RouteCosts
  config: PricingConfig
  /** Round trip: days chosen by the customer (else the shortest sensible trip). */
  days?: number
  /** Round trip: nights the driver stays out (default days − 1). */
  nights?: number
  /** One way / airport: pickup time "HH:MM" once known (drives the night charge). */
  pickupTime?: string
  /** Local: which package. */
  localPackage?: { hours: number; km: number }
}

export interface FareLine {
  label: string
  amount: number
}

export type FareQuote =
  | {
      status: 'priced'
      total: number
      lines: FareLine[]
      included: string[]
      excluded: string[]
      assumptions: string[]
      /** True while pricing is draft or any input is unverified. */
      isEstimate: boolean
    }
  | {
      status: 'on-request'
      reason: string
      included: string[]
      excluded: string[]
      assumptions: string[]
      isEstimate: true
    }
