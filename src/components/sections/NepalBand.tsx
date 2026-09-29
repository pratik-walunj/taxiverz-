import Link from 'next/link'
import { Section } from '@/components/ui/Section'
import { NEPAL_DOCUMENTS } from '@/data/copy/verticals'
import { getServiceCitiesFor, getCity, serviceCityPath, servicePath } from '@/lib/content'
import { isPublished } from '@/lib/content/published'

/**
 * The dark India–Nepal band (REBUILD_PLAN §4 home, DESIGN.md). Only verified
 * or owner-given facts: the two crossings as places, the origins with live
 * pages, and the owner's own document sentence. The border block (steps,
 * Bhansar, charges) is added once D1–D3 are answered.
 */
export function NepalBand({ showHubLink = true }: { showHubLink?: boolean }) {
  if (!isPublished(servicePath('nepal-taxi'))) return null
  const origins = getServiceCitiesFor('nepal-taxi')
  return (
    <Section register="luxury" labelledBy="nepal-band-title">
      <p className="text-champagne text-sm font-semibold tracking-wide uppercase">India to Nepal</p>
      <h2 id="nepal-band-title" className="text-h2 mt-2 font-bold">
        Into Nepal by road, from Gorakhpur and Raxaul
      </h2>
      <p className="text-night-muted mt-4 max-w-2xl">
        Two crossings serve this side of the border: Sonauli–Bhairahawa, north of Gorakhpur and
        close to Lumbini, and Raxaul–Birgunj in Bihar, on the way to Kathmandu. We confirm the
        crossing and how your journey is arranged when you book.
      </p>
      <p className="mt-4 max-w-2xl">{NEPAL_DOCUMENTS}</p>
      <ul className="mt-6 flex flex-wrap gap-3">
        {origins.map((sc) => (
          <li key={sc.city}>
            <Link
              href={serviceCityPath(sc)}
              className="border-ivory/40 hover:border-champagne rounded-control inline-flex min-h-12 items-center border px-4 font-semibold"
            >
              Nepal taxi from {getCity(sc.city)?.name ?? sc.city}
            </Link>
          </li>
        ))}
        {showHubLink && (
          <li>
            <Link
              href={servicePath('nepal-taxi')}
              className="text-champagne inline-flex min-h-12 items-center font-semibold underline"
            >
              All about travelling to Nepal
            </Link>
          </li>
        )}
      </ul>
    </Section>
  )
}
