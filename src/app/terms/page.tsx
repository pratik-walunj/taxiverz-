import { notFound } from 'next/navigation'
import { business } from '@/config/business'
import { PaymentNotice } from '@/components/sections/PaymentNotice'
import { PolicyPage } from '@/components/templates/PolicyPage'
import { Container } from '@/components/ui/Container'
import { termsReady } from '@/lib/content/static-pages'
import { POLICIES_UPDATED, termsOfBooking } from '@/lib/policies'
import { buildMetadata, buildTitle } from '@/lib/seo/metadata'

export const metadata = buildMetadata({
  title: buildTitle(['Terms of Booking']),
  description:
    'Taxiverz terms of booking: how bookings are confirmed, how fares work, advance payment, payment methods and cancellation.',
  path: '/terms/',
})

/** Published only once the owner's booking policies are in config (OWNER_TODO H1). */
export default function TermsPage() {
  if (!termsReady()) notFound()
  return (
    <>
      <PolicyPage
        title="Terms of booking"
        path="/terms/"
        sections={termsOfBooking({ business, analytics: { gtm: false, clarity: false } })}
        reviewed={business.policyReviewed.terms}
        updated={POLICIES_UPDATED}
      />
      <Container className="pb-12">
        <PaymentNotice />
      </Container>
    </>
  )
}
