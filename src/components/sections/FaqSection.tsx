import { ChevronDown } from 'lucide-react'
import { JsonLd } from '@/components/seo/JsonLd'
import { Section } from '@/components/ui/Section'
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
      <h2 id={`${id}-title`} className="text-h2 font-bold">
        {title}
      </h2>
      <div className="divide-line border-line mt-6 max-w-3xl divide-y border-y">
        {faqs.map((f) => (
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
      <JsonLd data={faqJsonLd(faqs)} />
    </Section>
  )
}
