import { EnquiryForm, type EnquiryKind } from '@/components/booking/EnquiryForm'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { Prose } from '@/components/ui/Prose'
import { Section } from '@/components/ui/Section'
import type { LeadType } from '@/lib/schemas/lead'

/** Partner pages (attach your taxi, drive with us): short facts and a lead form. No earnings promises. */
export function PartnerPage({
  path,
  crumb,
  heading,
  summary,
  intro,
  kind,
  leadType,
  formTitle,
}: {
  path: string
  crumb: string
  heading: string
  summary: string
  intro: string
  kind: EnquiryKind
  leadType: LeadType
  formTitle: string
}) {
  return (
    <>
      <Section className="pt-6 md:pt-10" labelledBy="page-title">
        <Breadcrumbs trail={[{ name: crumb, path }]} />
        <h1 id="page-title" className="text-h1 mt-6 font-extrabold tracking-tight">
          {heading}
        </h1>
        <p className="text-muted mt-4 max-w-2xl text-lg">{summary}</p>
        <Prose text={intro} className="mt-6" />
      </Section>
      <Section register="mist">
        <div className="max-w-3xl">
          <EnquiryForm kind={kind} leadType={leadType} subject={crumb} title={formTitle} />
        </div>
      </Section>
    </>
  )
}
