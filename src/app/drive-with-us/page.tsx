import { PartnerPage } from '@/components/templates/PartnerPage'
import { driverCopy } from '@/data/copy/support'
import { buildMetadata, buildTitle } from '@/lib/seo/metadata'

export const metadata = buildMetadata({
  title: buildTitle(['Drive With Us', 'Taxiverz Partners']),
  description: driverCopy.summary,
  path: '/drive-with-us/',
})

export default function DriveWithUsPage() {
  return (
    <PartnerPage
      path="/drive-with-us/"
      crumb="Drive with us"
      heading="Drive with Taxiverz"
      summary={driverCopy.summary}
      intro={driverCopy.intro}
      kind="driver"
      leadType="partner-driver"
      formTitle="Tell us about yourself"
    />
  )
}
