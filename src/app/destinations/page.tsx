import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { CtaBand } from '@/components/sections/CtaBand'
import { Section } from '@/components/ui/Section'
import { destinationPath, getCity, getDestinations } from '@/lib/content'
import { isPublished } from '@/lib/content/published'
import { buildMetadata, buildTitle } from '@/lib/seo/metadata'

export const metadata = buildMetadata({
  title: buildTitle(['Travel Guides', 'Gorakhpur, UP & Nepal']),
  description:
    'Travel guides for Gorakhpur, Kushinagar, Ayodhya, Varanasi and Lumbini: what to see and the best time to go, from a Gorakhpur cab company.',
  path: '/destinations/',
})

export default function DestinationsHub() {
  if (!isPublished('/destinations/')) notFound()
  return (
    <>
      <Section className="pt-6 md:pt-10" labelledBy="page-title">
        <Breadcrumbs trail={[{ name: 'Destinations', path: '/destinations/' }]} />
        <h1 id="page-title" className="text-h1 mt-6 font-extrabold tracking-tight">
          Travel guides
        </h1>
        <p className="text-muted mt-4 max-w-2xl text-lg">
          What to see and when to go, for places travellers often visit from Gorakhpur.
        </p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {getDestinations().map((d) => (
            <li key={d.place}>
              <Link
                href={destinationPath(d.place)}
                className="border-line hover:border-brand rounded-panel block h-full border p-4"
              >
                <h2 className="font-heading text-lg font-bold">
                  {getCity(d.place)?.name ?? d.place}
                </h2>
                {d.summary && <p className="text-muted mt-1">{d.summary}</p>}
              </Link>
            </li>
          ))}
        </ul>
      </Section>
      <CtaBand
        title="Plan the trip with us"
        text="Check the fare online, send your trip on WhatsApp, or call us."
        whatsappMessage="Hi Taxiverz, I'd like help planning a trip."
        placement="destinations-cta"
      />
    </>
  )
}
