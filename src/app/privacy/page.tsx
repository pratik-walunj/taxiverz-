import { business } from '@/config/business'
import { publicEnv } from '@/config/public-env'
import { PolicyPage } from '@/components/templates/PolicyPage'
import { POLICIES_UPDATED, privacyPolicy } from '@/lib/policies'
import { buildMetadata, buildTitle } from '@/lib/seo/metadata'

export const metadata = buildMetadata({
  title: buildTitle(['Privacy Policy']),
  description:
    'How Taxiverz collects, uses and protects the details you give us when you book or enquire, how long we keep them, and your rights under the DPDP Act.',
  path: '/privacy/',
})

export default function PrivacyPage() {
  return (
    <PolicyPage
      title="Privacy policy"
      path="/privacy/"
      sections={privacyPolicy({
        business,
        analytics: { gtm: Boolean(publicEnv.gtmId), clarity: Boolean(publicEnv.clarityId) },
      })}
      reviewed={business.policyReviewed.privacy}
      updated={POLICIES_UPDATED}
    />
  )
}
