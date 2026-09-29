import { notFound } from 'next/navigation'
import { business } from '@/config/business'
import { PolicyPage } from '@/components/templates/PolicyPage'
import { refundReady } from '@/lib/content/static-pages'
import { POLICIES_UPDATED, refundPolicy } from '@/lib/policies'
import { buildMetadata, buildTitle } from '@/lib/seo/metadata'

export const metadata = buildMetadata({
  title: buildTitle(['Refund Policy']),
  description:
    'Taxiverz refund policy: free cancellation window, when refunds are made and how to ask about one.',
  path: '/refund-policy/',
})

/** Published only once the owner's cancellation and refund policy is in config (H1). */
export default function RefundPage() {
  if (!refundReady()) notFound()
  return (
    <PolicyPage
      title="Refund policy"
      path="/refund-policy/"
      sections={refundPolicy({ business, analytics: { gtm: false, clarity: false } })}
      reviewed={business.policyReviewed.refund}
      updated={POLICIES_UPDATED}
    />
  )
}
