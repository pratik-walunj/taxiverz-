import type { ReactNode } from 'react'
import Link from 'next/link'
import { FareWidget } from '@/components/booking/FareWidget'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { CtaBand } from '@/components/sections/CtaBand'
import { JsonLd } from '@/components/seo/JsonLd'
import { Section } from '@/components/ui/Section'
import { cityPath, destinationPath, getCity, getGuides, guidePath } from '@/lib/content'
import { isPublished } from '@/lib/content/published'
import type { Guide } from '@/lib/schemas/content'
import { absoluteUrl } from '@/lib/seo/metadata'

const GUIDE_LABEL: Record<Guide['guide'], string> = {
  'places-to-visit': 'Places to visit',
  'best-time-to-visit': 'Best time to visit',
  'how-to-reach-from-gorakhpur': 'How to reach from Gorakhpur',
}

export { GUIDE_LABEL }

/**
 * Destination guide (REBUILD_PLAN §4): the MDX body, the place's other
 * guides, and a fare box to the place (from Gorakhpur; a local package for
 * Gorakhpur itself). Article JSON-LD.
 */
export function GuidePage({ guide, children }: { guide: Guide; children: ReactNode }) {
  const place = getCity(guide.place)
  const name = place?.name ?? guide.place
  const others = getGuides(guide.place).filter((g) => g.guide !== guide.guide)
  const home = guide.place === 'gorakhpur'
  const path = guidePath(guide)
  return (
    <>
      <Section className="pt-6 md:pt-10" labelledBy="page-title">
        <Breadcrumbs
          trail={[
            { name: 'Destinations', path: '/destinations/' },
            { name, path: destinationPath(guide.place) },
            { name: GUIDE_LABEL[guide.guide], path },
          ]}
        />
        <h1 id="page-title" className="text-h1 mt-6 max-w-3xl font-extrabold tracking-tight">
          {guide.title}
        </h1>
        <p className="text-muted mt-2 text-sm">
          Updated <time dateTime={guide.updated}>{formatDate(guide.updated)}</time>
        </p>
        <article className="mt-6 max-w-3xl text-lg">{children}</article>
      </Section>

      <Section register="mist" labelledBy="plan-title">
        <div className="grid gap-8 lg:grid-cols-[1fr_minmax(0,34rem)] lg:items-start">
          <div>
            <h2 id="plan-title" className="text-h2 font-bold">
              {home ? 'Get around Gorakhpur' : `Plan your trip to ${name}`}
            </h2>
            {others.length > 0 && (
              <ul className="mt-4 space-y-2">
                {others.map((g) => (
                  <li key={g.guide}>
                    <Link href={guidePath(g)} className="text-brand-deep font-semibold underline">
                      {g.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            {isPublished(cityPath(guide.place)) && (
              <p className="mt-4">
                <Link
                  href={cityPath(guide.place)}
                  className="text-brand-deep font-semibold underline"
                >
                  Taxi service in {name}
                </Link>
              </p>
            )}
          </div>
          <FareWidget
            initial={
              home
                ? { type: 'local', from: 'gorakhpur', fromLabel: 'Gorakhpur' }
                : {
                    type: 'round-trip',
                    from: 'gorakhpur',
                    fromLabel: 'Gorakhpur',
                    to: guide.place,
                    toLabel: name,
                  }
            }
          />
        </div>
      </Section>

      <CtaBand
        title={home ? 'Book a car in Gorakhpur' : `Book a cab to ${name}`}
        text="Check the fare online, send your trip on WhatsApp, or call us."
        whatsappMessage={
          home
            ? 'Hi Taxiverz, I need a car in Gorakhpur.'
            : `Hi Taxiverz, I'd like a cab to ${name}.`
        }
        placement="guide-cta"
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: guide.title,
          description: guide.summary,
          dateModified: guide.updated,
          mainEntityOfPage: absoluteUrl(path),
          about: { '@type': 'Place', name },
          publisher: { '@id': 'https://taxiverz.com/#organization' },
        }}
      />
    </>
  )
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}
