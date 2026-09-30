import { ChevronDown } from 'lucide-react'
import { JsonLd } from '@/components/seo/JsonLd'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import type { Faq } from '@/lib/schemas/content'
import { faqJsonLd } from '@/lib/seo/jsonld'

/** FAQs as native <details> (no JS, keyboard and screen-reader friendly) plus FAQPage JSON-LD. */
export function FaqSection({
  faqs,
  title = 'Questions people ask',
  id = 'faq',
}: {
  faqs: readonly Faq[]
  title?: string
  id?: string
}) {
  if (faqs.length === 0) return null
  return (
    <Section labelledBy={`${id}-title`}>
      <SectionHeading id={`${id}-title`} eyebrow="FAQ" title={title} />
      <div className="mt-8 grid max-w-3xl gap-3">
        {faqs.map((f) => (
          <details
            key={f.q}
            className="group bg-mist rounded-panel open:bg-paper open:ring-brand/40 px-5 open:shadow-md open:ring-1"
          >
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
      <JsonLd data={faqJsonLd(faqs)} />
    </Section>
  )
}
