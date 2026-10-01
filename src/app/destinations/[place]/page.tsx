import Link from 'next/link'
import { BookOpen } from 'lucide-react'
import { CardActions, CardBadge, CardFrame } from '@/components/cards/CardParts'
import { tripToParams } from '@/lib/pricing/quote'
import { notFound } from 'next/navigation'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { CtaBand } from '@/components/sections/CtaBand'
import { GUIDE_LABEL } from '@/components/templates/GuidePage'
import { Prose } from '@/components/ui/Prose'
import { Section } from '@/components/ui/Section'
import {
  cityPath,
  destinationPath,
  getCity,
  getDestination,
  getDestinations,
  getGuides,
  guidePath,
} from '@/lib/content'
import { isPublished } from '@/lib/content/published'
import { buildMetadata, buildTitle } from '@/lib/seo/metadata'

/** Destination overview — its own text plus links to its live guides. */
export const dynamicParams = false

export function generateStaticParams() {
  return getDestinations().map((d) => ({ place: d.place }))
}

type Params = Promise<{ place: string }>

export async function generateMetadata({ params }: { params: Params }) {
  const d = getDestination((await params).place)
  if (!d?.summary) return {}
  const name = getCity(d.place)?.name ?? d.place
  return buildMetadata({
    image: null,
    title: buildTitle([`${name} Travel Guide`]),
    description: d.summary,
    path: destinationPath(d.place),
  })
}

export default async function DestinationPage({ params }: { params: Params }) {
  const d = getDestination((await params).place)
  if (!d?.overview) notFound()
  const name = getCity(d.place)?.name ?? d.place
  const guides = getGuides(d.place)
  return (
    <>
      <Section className="pt-6 md:pt-10" labelledBy="page-title">
        <Breadcrumbs
          trail={[
            { name: 'Destinations', path: '/destinations/' },
            { name, path: destinationPath(d.place) },
          ]}
        />
        <h1 id="page-title" className="text-h1 mt-6 font-extrabold tracking-tight">
          {name} travel guide
        </h1>
        <Prose text={d.overview} className="mt-4 text-lg" />
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((g) => (
            <li key={g.guide}>
              <CardFrame>
                <div className="from-brand/20 via-mist to-paper relative flex aspect-[3/1] items-center justify-center bg-gradient-to-br">
                  <BookOpen
                    aria-hidden="true"
                    className="text-brand-deep size-12 transition-transform duration-500 group-hover/card:scale-110"
                  />
                  <CardBadge>Guide</CardBadge>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h2 className="font-heading text-xl font-extrabold">{GUIDE_LABEL[g.guide]}</h2>
                  <p className="text-brand-deep text-sm font-semibold">{g.title}</p>
                  {g.summary && <p className="text-muted mt-3">{g.summary}</p>}
                  <CardActions
                    primary={{ href: guidePath(g), label: 'Read the guide' }}
                    details={
                      d.place === 'gorakhpur'
                        ? { href: '/book/', label: 'Book a car in Gorakhpur' }
                        : {
                            href: `/book/?${tripToParams({ type: 'round-trip', from: 'gorakhpur', to: d.place })}`,
                            label: `Cab to ${name}`,
                          }
                    }
                    subject={g.title}
                    whatsappMessage={`Hi Taxiverz, I'd like help planning a trip to ${name}.`}
                    placement="guide-card"
                  />
                </div>
              </CardFrame>
            </li>
          ))}
        </ul>
        {isPublished(cityPath(d.place)) && (
          <p className="mt-8">
            <Link href={cityPath(d.place)} className="text-brand-deep font-semibold underline">
              Taxi service in {name}
            </Link>
          </p>
        )}
      </Section>
      <CtaBand
        title={d.place === 'gorakhpur' ? 'Book a car in Gorakhpur' : `Book a cab to ${name}`}
        text="Check the fare online, send your trip on WhatsApp, or call us."
        whatsappMessage={
          d.place === 'gorakhpur'
            ? 'Hi Taxiverz, I need a car in Gorakhpur.'
            : `Hi Taxiverz, I'd like a cab to ${name}.`
        }
        placement="destination-cta"
      />
    </>
  )
}
