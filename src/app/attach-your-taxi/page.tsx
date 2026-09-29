import { PartnerPage } from '@/components/templates/PartnerPage'
import { attachCopy } from '@/data/copy/support'
import { buildMetadata, buildTitle } from '@/lib/seo/metadata'

export const metadata = buildMetadata({
  title: buildTitle(['Attach Your Taxi', 'Taxiverz Partners']),
  description: attachCopy.summary,
  path: '/attach-your-taxi/',
})

export default function AttachYourTaxiPage() {
  return (
    <PartnerPage
      path="/attach-your-taxi/"
      crumb="Attach your taxi"
      heading="Attach your taxi to Taxiverz"
      summary={attachCopy.summary}
      intro={attachCopy.intro}
      kind="attach"
      leadType="partner-attach"
      formTitle="Tell us about your vehicle"
    />
  )
}
