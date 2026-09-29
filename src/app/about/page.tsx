import Link from 'next/link'
import { business } from '@/config/business'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { CtaBand } from '@/components/sections/CtaBand'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { Prose } from '@/components/ui/Prose'
import { Section } from '@/components/ui/Section'
import { aboutHow, aboutIntro, aboutStory } from '@/data/copy/support'
import { buildMetadata, buildTitle } from '@/lib/seo/metadata'

export const metadata = buildMetadata({
  title: buildTitle(['About Us', 'Gorakhpur Cab Company']),
  description:
    'Taxiverz is a Gorakhpur cab and travel company with a branch in Pune: cars with drivers for local, outstation, airport, group and Nepal trips.',
  path: '/about/',
})

/**
 * About (REBUILD_PLAN §7 Phase 6): confirmed facts only. The owner's story and
 * credentials appear when supplied (OWNER_TODO F2) — no invented history.
 */
export default function AboutPage() {
  return (
    <>
      <Section className="pt-6 md:pt-10" labelledBy="page-title">
        <Breadcrumbs trail={[{ name: 'About', path: '/about/' }]} />
        <h1 id="page-title" className="text-h1 mt-6 font-extrabold tracking-tight">
          About Taxiverz
        </h1>
        <Prose text={aboutIntro} className="mt-4 text-lg" />
      </Section>
      {aboutStory && (
        <Section register="mist" labelledBy="story-title">
          <h2 id="story-title" className="text-h2 font-bold">
            Our story
          </h2>
          <Prose text={aboutStory} className="mt-4" />
        </Section>
      )}
      <Section labelledBy="how-title">
        <h2 id="how-title" className="text-h2 font-bold">
          How we work
        </h2>
        <Prose text={aboutHow} className="mt-4" />
        <p className="mt-4">
          <Link href="/privacy/" className="text-brand-deep font-semibold underline">
            Read our privacy policy
          </Link>
        </p>
        {(business.registrations.length > 0 || business.gstin) && (
          <dl className="mt-8 grid max-w-xl gap-3">
            {business.gstin && (
              <div>
                <dt className="text-muted text-sm">GSTIN</dt>
                <dd className="tabular font-semibold">{business.gstin}</dd>
              </div>
            )}
            {business.registrations.map((r) => (
              <div key={r.label}>
                <dt className="text-muted text-sm">{r.label}</dt>
                <dd className="font-semibold">{r.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </Section>
      <ServicesGrid title="What we run" />
      <CtaBand
        title="Plan a trip with us"
        text="Check the fare online, send your trip on WhatsApp, or call us."
        whatsappMessage="Hi Taxiverz,"
        placement="about-cta"
      />
    </>
  )
}
