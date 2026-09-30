import type { Faq } from '@/lib/schemas/content'

/**
 * Route page copy (owner decision 2026-09-30: publish route pages with the old
 * site's content, fact-checked). Public facts only: no distances, drive times,
 * prices, toll amounts, ratings or border procedures (D1–D3) — those come from
 * verified data. Every route's text is its own (the near-duplicate check).
 */
export interface RouteCopy {
  publish: boolean
  intro: string
  routeGuide: string
  stops: { name: string; note: string | null }[]
  tips: string[]
  faqs: Faq[]
  bestDepartureTime?: string | null
}
