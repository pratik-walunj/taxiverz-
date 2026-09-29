import { notFound } from 'next/navigation'
import { business } from '@/config/business'
import { FareWidget } from '@/components/booking/FareWidget'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { BranchBlock } from '@/components/sections/BranchBlock'
import { CtaBand } from '@/components/sections/CtaBand'
import { FaqSection } from '@/components/sections/FaqSection'
import { RouteList } from '@/components/sections/RouteList'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { JsonLd } from '@/components/seo/JsonLd'
import { Prose } from '@/components/ui/Prose'
import { Section } from '@/components/ui/Section'
import { cityPath, getCities, getCity, getPlacesIn, getRoutesFrom } from '@/lib/content'
import { localBusinessJsonLd } from '@/lib/seo/jsonld'
import { buildMetadata, buildTitle } from '@/lib/seo/metadata'
import type { Route } from '@/lib/schemas/content'

/** City hub `/cabs/{city}/` (REBUILD_PLAN §4). */
export const dynamicParams = false

export function generateStaticParams() {
  return getCities().map((c) => ({ city: c.slug }))
}

type Params = Promise<{ city: string }>

const live = async (params: Params) => {
  const slug = (await params).city
  return getCities().some((c) => c.slug === slug) ? getCity(slug) : undefined
}

export async function generateMetadata({ params }: { params: Params }) {
  const city = await live(params)
  if (!city?.summary) return {}
  return buildMetadata({
    title: buildTitle([`${city.name} Taxi Service`, 'Local & Outstation Cabs']),
    description: city.summary,
    path: cityPath(city.slug),
  })
}

function region() {
  return (r: Route) => {
    const to = getCity(r.destination)
    if (!to) return 'Other'
    if (to.country === 'NP') return 'Nepal'
    return to.state
  }
}

const PLACE_LABEL = {
  airport: 'Airport',
  station: 'Railway station',
  border: 'Border crossing',
} as const

export default async function CityHubPage({ params }: { params: Params }) {
  const city = await live(params)
  if (!city?.summary || !city.intro) notFound()
  const routes = getRoutesFrom(city.slug)
  const branch = business.branches.find((b) => b.id === city.slug)
  const places = getPlacesIn(city.slug).filter(
    (p): p is typeof p & { type: keyof typeof PLACE_LABEL } => p.type in PLACE_LABEL,
  )
  return (
    <>
      <Section className="pt-6 md:pt-10" labelledBy="page-title">
        <Breadcrumbs
          trail={[
            { name: 'Cabs', path: '/cabs/' },
            { name: city.name, path: cityPath(city.slug) },
          ]}
        />
        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_minmax(0,34rem)] lg:items-start">
          <div>
            <h1 id="page-title" className="text-h1 font-extrabold tracking-tight">
              Taxi service in {city.name}
            </h1>
            <p className="text-muted mt-4 text-lg">{city.summary}</p>
          </div>
          <FareWidget initial={{ from: city.slug, fromLabel: city.name }} />
        </div>
      </Section>

      <Section labelledBy="city-about">
        <h2 id="city-about" className="text-h2 font-bold">
          Getting around {city.name} with Taxiverz
        </h2>
        <Prose text={city.intro} className="mt-4" />
      </Section>

      <ServicesGrid title={`Services in ${city.name}`} city={city.slug} />
      <RouteList title={`Popular routes from ${city.name}`} routes={routes} groupBy={region()} />

      {places.length > 0 && (
        <Section labelledBy="places-title">
          <h2 id="places-title" className="text-h2 font-bold">
            Airports and stations in {city.name}
          </h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {places.map((p) => (
              <li key={p.id} className="border-line rounded-panel border p-4">
                <span className="font-semibold">
                  {p.name}
                  {p.code && <span className="text-muted font-normal"> ({p.code})</span>}
                </span>
                <span className="text-muted block text-sm">{PLACE_LABEL[p.type]}</span>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {branch && <BranchBlock branch={branch} />}
      <FaqSection faqs={city.faqs} />
      <CtaBand
        title={`Book a cab in ${city.name}`}
        text="Check the fare online, send your trip on WhatsApp, or call us."
        whatsappMessage={`Hi Taxiverz, I need a cab in ${city.name}.`}
        placement="city-cta"
      />
      {branch && <JsonLd data={localBusinessJsonLd(business, branch)} />}
    </>
  )
}
