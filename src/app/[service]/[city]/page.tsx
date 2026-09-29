import { notFound } from 'next/navigation'
import { ServicePage } from '@/components/templates/ServicePage'
import {
  getCity,
  getService,
  getServiceCities,
  getServiceCity,
  getSubPage,
  getSubPages,
  serviceCityPath,
} from '@/lib/content'
import { buildMetadata, buildTitle } from '@/lib/seo/metadata'

/**
 * Second-level service pages: service × city (the allow-listed, live
 * combinations, REBUILD_PLAN §2.2) and, for shoot-car-rental, the shoot types
 * (`/shoot-car-rental/{type}/` — the one service whose sub-segment is a type).
 */
export const dynamicParams = false

export function generateStaticParams() {
  return [
    ...getServiceCities().map((sc) => ({ service: sc.service, city: sc.city })),
    ...getSubPages().map((sp) => ({ service: sp.service, city: sp.slug })),
  ]
}

type Params = Promise<{ service: string; city: string }>

async function load(params: Params) {
  const { service: s, city: c } = await params
  const service = getService(s)
  if (!service) return null
  const sub = getSubPage(s, c)
  if (sub?.summary && sub.intro)
    return {
      kind: 'type' as const,
      service,
      sub,
      path: `/${s}/${c}/`,
      summary: sub.summary,
      intro: sub.intro,
      faqs: sub.faqs,
    }
  const sc = getServiceCity(s, c)
  const city = getCity(c)
  if (sc?.summary && sc.intro && city)
    return {
      kind: 'city' as const,
      service,
      city,
      path: serviceCityPath(sc),
      summary: sc.summary,
      intro: sc.intro,
      faqs: sc.faqs,
    }
  return null
}

export async function generateMetadata({ params }: { params: Params }) {
  const page = await load(params)
  if (!page) return {}
  return buildMetadata({
    image: null,
    title: buildTitle([
      page.kind === 'type'
        ? `Cars for ${page.sub.name}`
        : `${page.service.name} in ${page.city.name}`,
    ]),
    description: page.summary,
    path: page.path,
  })
}

export default async function ServiceSecondLevelPage({ params }: { params: Params }) {
  const page = await load(params)
  if (!page) notFound()
  return (
    <ServicePage
      service={page.service}
      city={page.kind === 'city' ? page.city : null}
      subPage={page.kind === 'type' ? page.sub : undefined}
      heading={
        page.kind === 'type'
          ? `Cars for ${page.sub.name.toLowerCase()}`
          : `${page.service.name} in ${page.city.name}`
      }
      summary={page.summary}
      intro={page.intro}
      faqs={page.faqs}
    />
  )
}
