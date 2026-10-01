import type { Faq } from '@/lib/schemas/content'

/**
 * Vehicle page copy (owner decision 2026-09-30: publish vehicle pages with the
 * old site's content, fact-checked). No prices, no ratings, no fleet counts,
 * no features the legacy page couldn't show; `publish: true` sets the status,
 * the vehicle gate still applies. Split by tier into ./vehicles-*.ts.
 */
export interface VehicleCopy {
  publish: boolean
  summary: string
  intro: string
  /** "Why choose" points from the legacy page (3–6), fact-checked: no prices, ratings or specs we can't confirm. */
  highlights?: { title: string; text: string }[]
  faqs: Faq[]
}

import { standardVehicleCopy } from './vehicles-standard'
import { luxuryVehicleCopy } from './vehicles-luxury'
import { groupVehicleCopy } from './vehicles-group'
import { bikeVehicleCopy } from './vehicles-bike'

export const vehicleCopy: Record<string, VehicleCopy> = {
  ...standardVehicleCopy,
  ...luxuryVehicleCopy,
  ...groupVehicleCopy,
  ...bikeVehicleCopy,
}
