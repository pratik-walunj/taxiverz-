/**
 * Global pricing rules — the only place they live. Values come from
 * docs/RATE_CARD.md §1 once the owner confirms them; until then they are null
 * and the engine returns "on request" for anything that depends on them.
 * While status is 'draft', fares are labelled "Estimated fare" and no price
 * schema is emitted.
 */
export type PricingStatus = 'draft' | 'verified'

export interface LocalPackageDef {
  hours: number
  km: number
}

export interface PricingConfig {
  status: PricingStatus
  currency: 'INR'
  /** GST as a percentage, e.g. 5. */
  gstRatePercent: number | null
  /** true: rate-card prices already include GST; false: GST is added on top. */
  gstIncluded: boolean | null
  /** true: tolls are part of the quoted total; false: paid on the way, listed as excluded. */
  tollsIncluded: boolean | null
  /** RATE_CARD: parking at venues — included, excluded (paid by the traveller) or unknown. */
  parkingIncluded: boolean | null
  /** Night-charge window, 24-hour "HH:MM". */
  nightWindow: { start: string; end: string } | null
  garageToGarage: boolean | null
  /** Sets how many days a round trip takes: ceil(2 × distance / this). */
  maxDrivingKmPerDay: number | null
  airport: {
    /** Fixed airport-transfer fares per vehicle class, if the owner sets them. */
    fixedFares: Record<string, number> | null
    /** Otherwise one-way pricing with this minimum distance. */
    minKm: number | null
  }
  /** The local (hourly) packages the widget offers. */
  localPackages: LocalPackageDef[]
  roundTo: number
}

export const pricing: PricingConfig = {
  status: 'draft',
  currency: 'INR',
  gstRatePercent: null,
  gstIncluded: null,
  tollsIncluded: null,
  parkingIncluded: null,
  nightWindow: null,
  garageToGarage: null,
  maxDrivingKmPerDay: null,
  airport: { fixedFares: null, minKm: null },
  // The three packages the legacy site used (RATE_CARD §2); prices per class are in vehicle-classes.ts.
  localPackages: [
    { hours: 6, km: 60 },
    { hours: 8, km: 80 },
    { hours: 12, km: 120 },
  ],
  roundTo: 10,
}
