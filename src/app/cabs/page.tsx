import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { RouteList } from '@/components/sections/RouteList'
import { Section } from '@/components/ui/Section'
import { cityPath, getCities, getCity, getRoutes } from '@/lib/content'
import { isPublished } from '@/lib/content/published'
import { buildMetadata, buildTitle } from '@/lib/seo/metadata'

/** `/cabs/` — every live city hub and route. Published only with ≥ 3 entries (lib/content). */
export const metadata = buildMetadata({
  title: buildTitle(['Cabs by City and Route', 'India & Nepal']),
  description:
    'Every city and route Taxiverz serves, from Gorakhpur across Uttar Pradesh, Bihar and into Nepal. Pick a route to see the fare by car class.',
  path: '/cabs/',
})

export default function CabsDirectoryPage() {
  if (!isPublished('/cabs/')) notFound()
  const cities = getCities()
  const routes = getRoutes()
  return (
    <>
      <Section className="pt-6 md:pt-10" labelledBy="page-title">
        <Breadcrumbs trail={[{ name: 'Cabs', path: '/cabs/' }]} />
        <h1 id="page-title" className="text-h1 mt-6 font-extrabold tracking-tight">
          Cabs by city and route
        </h1>
        {cities.length > 0 && (
          <ul className="mt-6 flex flex-wrap gap-3">
            {cities.map((c) => (
              <li key={c.slug}>
                <Link
                  href={cityPath(c.slug)}
                  className="border-line hover:border-brand rounded-control inline-flex min-h-12 items-center border px-4 font-semibold"
                >
                  Taxi service in {c.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Section>
      <RouteList
        title="All routes"
        routes={routes}
        groupBy={(r) => `From ${getCity(r.origin)?.name ?? r.origin}`}
      />
    </>
  )
}
