/**
 * Global pricing rules. Rates come from docs/RATE_CARD.md once the owner
 * confirms them (Phase 2). While status is 'draft', fares are labelled
 * "Estimated fare" and no price schema is emitted.
 */
export type PricingStatus = 'draft' | 'verified'

export interface PricingConfig {
  status: PricingStatus
  currency: 'INR'
  gstRatePercent: number | null
  gstIncluded: boolean | null
  tollsIncluded: boolean | null
  nightWindow: { start: string; end: string } | null
  garageToGarage: boolean | null
  maxDrivingKmPerDay: number | null
  oneWayMinKm: number | null
  roundTo: number
}

export const pricing: PricingConfig = {
  status: 'draft',
  currency: 'INR',
  gstRatePercent: null,
  gstIncluded: null,
  tollsIncluded: null,
  nightWindow: null,
  garageToGarage: null,
  maxDrivingKmPerDay: null,
  oneWayMinKm: null,
  roundTo: 10, // plan default; RATE_CARD §1
}
