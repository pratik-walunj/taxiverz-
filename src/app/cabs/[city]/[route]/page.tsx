import { notFound } from 'next/navigation'
import { RoutePage } from '@/components/templates/RoutePage'
import { getCity, getRoute, getRoutes, routePath } from '@/lib/content'
import { fromPrice, relatedRoutes, routeFareTable } from '@/lib/pages/route'
import { buildFareIndex } from '@/lib/pricing/build-index'
import { formatINR } from '@/lib/format'
import { buildMetadata, buildTitle } from '@/lib/seo/metadata'

/** Route pages `/cabs/{origin}/{origin}-to-{destination}/` — live routes only (§5 gate). */
export const dynamicParams = false

export function generateStaticParams() {
  return getRoutes().map((r) => ({ city: r.origin, route: r.slug }))
}

type Params = Promise<{ city: string; route: string }>

async function load(params: Params) {
  const { city, route: slug } = await params
  const route = getRoute(city, slug)
  const origin = route && getCity(route.origin)
  const destination = route && getCity(route.destination)
  return route && origin && destination ? { route, origin, destination } : null
}

export async function generateMetadata({ params }: { params: Params }) {
  const page = await load(params)
  if (!page) return {}
  const { route, origin, destination } = page
  const from = fromPrice(routeFareTable(buildFareIndex(), route))
  return buildMetadata({
    image: null,
    title: buildTitle([
      `${origin.name} to ${destination.name} Taxi`,
      from !== null ? `Fare from ${formatINR(from)}` : 'One Way & Round Trip',
    ]),
    description:
      [
        `Taxi from ${origin.name} to ${destination.name}: fares by car class, the route, stops worth making and what to know before you go. Book online, on WhatsApp or by phone.`,
        `Taxi from ${origin.name} to ${destination.name}: fares by car class, the route and stops. Book online, on WhatsApp or by phone.`,
      ].find((d) => d.length <= 155) ?? `${origin.name} to ${destination.name} taxi by Taxiverz.`,
    path: routePath(route),
  })
}

export default async function RouteRoutePage({ params }: { params: Params }) {
  const page = await load(params)
  if (!page) notFound()
  return (
    <RoutePage
      {...page}
      fares={routeFareTable(buildFareIndex(), page.route)}
      related={relatedRoutes(page.route, getRoutes())}
      cityName={(slug) => getCity(slug)?.name ?? slug}
    />
  )
}
