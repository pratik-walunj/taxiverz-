import { business } from '@/config/business'
import { reviews } from './data'

/**
 * Phase 6 trust and support pages, and when each is live. Pages that need
 * owner decisions publish only once those decisions are in the config
 * (OWNER_TODO H1, F3) — never with invented terms.
 */
export function termsReady(): boolean {
  const p = business.policies
  return (
    p.freeCancellationHours !== null &&
    p.advancePercent !== null &&
    p.refundDays !== null &&
    business.paymentMethods.length > 0 &&
    business.policyReviewed.terms !== null
  )
}

export function refundReady(): boolean {
  const p = business.policies
  return p.freeCancellationHours !== null && p.refundDays !== null && business.policyReviewed.refund !== null
}

export function staticPagePaths(): string[] {
  return [
    '/about/',
    '/contact/',
    '/faq/',
    '/privacy/',
    '/attach-your-taxi/',
    '/drive-with-us/',
    ...(termsReady() ? ['/terms/'] : []),
    ...(refundReady() ? ['/refund-policy/'] : []),
    ...(reviews.length > 0 ? ['/reviews/'] : []),
  ]
}
