import { notFound } from 'next/navigation'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { formatDate } from '@/components/templates/GuidePage'
import { Section } from '@/components/ui/Section'
import { reviews } from '@/lib/content/data'
import { isPublished } from '@/lib/content/published'
import { buildMetadata, buildTitle } from '@/lib/seo/metadata'

export const metadata = buildMetadata({
  title: buildTitle(['Customer Reviews']),
  description:
    'What Taxiverz passengers say about their trips — real reviews, shared with permission.',
  path: '/reviews/',
})

/**
 * Real reviews only, shared with permission (OWNER_TODO F3). No Review or
 * AggregateRating JSON-LD: reviews about the business itself are self-serving.
 */
export default function ReviewsPage() {
  if (!isPublished('/reviews/')) notFound()
  return (
    <Section className="pt-6 md:pt-10" labelledBy="page-title">
      <Breadcrumbs trail={[{ name: 'Reviews', path: '/reviews/' }]} />
      <h1 id="page-title" className="text-h1 mt-6 font-extrabold tracking-tight">
        What our passengers say
      </h1>
      <ul className="mt-8 grid max-w-3xl gap-6">
        {reviews.map((r) => (
          <li key={`${r.author}-${r.date}`} className="border-line rounded-panel border p-5">
            <blockquote>
              <p>{r.text}</p>
            </blockquote>
            <p className="text-muted mt-3 text-sm">
              {r.author}
              {r.trip && ` · ${r.trip}`} · <time dateTime={r.date}>{formatDate(r.date)}</time>
              {r.url && (
                <>
                  {' · '}
                  <a href={r.url} target="_blank" rel="noopener" className="underline">
                    on Google
                  </a>
                </>
              )}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  )
}
