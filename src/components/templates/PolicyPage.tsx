import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { Section } from '@/components/ui/Section'
import { formatDate } from '@/components/templates/GuidePage'
import type { PolicySection } from '@/lib/policies'

/** A policy page (privacy, terms, refund) built from lib/policies.ts sections. */
export function PolicyPage({
  title,
  path,
  sections,
  reviewed,
  updated,
}: {
  title: string
  path: string
  sections: PolicySection[]
  /** Owner-reviewed date; until then the page shows when it was last updated. */
  reviewed: string | null
  updated: string
}) {
  return (
    <Section className="pt-6 md:pt-10" labelledBy="page-title">
      <Breadcrumbs trail={[{ name: title, path }]} />
      <h1 id="page-title" className="text-h1 mt-6 font-extrabold tracking-tight">
        {title}
      </h1>
      <p className="text-muted mt-2 text-sm">
        {reviewed ? 'Reviewed ' : 'Last updated '}
        <time dateTime={reviewed ?? updated}>{formatDate(reviewed ?? updated)}</time>
      </p>
      <div className="mt-6 max-w-3xl">
        {sections.map((s) => (
          <section key={s.heading} className="mt-8 first:mt-0">
            <h2 className="text-h3 font-bold">{s.heading}</h2>
            {s.paragraphs.map((p) => (
              <p key={p.slice(0, 40)} className="mt-3">
                {p}
              </p>
            ))}
            {s.list && (
              <ul className="mt-3 list-disc space-y-2 pl-5">
                {s.list.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
    </Section>
  )
}
