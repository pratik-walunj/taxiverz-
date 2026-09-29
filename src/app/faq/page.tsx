import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { CtaBand } from '@/components/sections/CtaBand'
import { JsonLd } from '@/components/seo/JsonLd'
import { Section } from '@/components/ui/Section'
import { faqGroups } from '@/data/copy/support'
import { isPublished } from '@/lib/content/published'
import { faqJsonLd } from '@/lib/seo/jsonld'
import { buildMetadata, buildTitle } from '@/lib/seo/metadata'

export const metadata = buildMetadata({
  title: buildTitle(['FAQ', 'Booking, Fares, Cars & Nepal']),
  description:
    'Answers to common questions about booking a Taxiverz cab: how to book, how fares work, choosing a car, Nepal trips, airports and hourly hire.',
  path: '/faq/',
})

const groupId = (title: string) => `faq-${title.toLowerCase().replace(/[^a-z]+/g, '-')}`

export default function FaqPage() {
  const all = faqGroups.flatMap((g) => g.faqs)
  return (
    <>
      <Section className="pt-6 md:pt-10" labelledBy="page-title">
        <Breadcrumbs trail={[{ name: 'FAQ', path: '/faq/' }]} />
        <h1 id="page-title" className="text-h1 mt-6 font-extrabold tracking-tight">
          Frequently asked questions
        </h1>
        {faqGroups.map((g) => (
          <section key={g.title} className="mt-10 max-w-3xl" aria-labelledby={groupId(g.title)}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 id={groupId(g.title)} className="text-h2 font-bold">
                {g.title}
              </h2>
              {g.link && isPublished(g.link.href) && (
                <Link href={g.link.href} className="text-brand-deep font-semibold underline">
                  {g.link.label}
                </Link>
              )}
            </div>
            <div className="divide-line border-line mt-4 divide-y border-y">
              {g.faqs.map((f) => (
                <details key={f.q} className="group">
                  <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 py-3 font-semibold [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <ChevronDown
                      aria-hidden="true"
                      className="size-5 shrink-0 transition-transform group-open:rotate-180"
                    />
                  </summary>
                  <p className="text-muted pb-4">{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        ))}
      </Section>
      <CtaBand
        title="Didn’t find your answer?"
        text="Call or WhatsApp us — or check the fare for your trip online."
        whatsappMessage="Hi Taxiverz, I have a question."
        placement="faq-cta"
      />
      <JsonLd data={faqJsonLd(all)} />
    </>
  )
}
