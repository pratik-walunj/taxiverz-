import { notFound } from 'next/navigation'
import { ServicePage } from '@/components/templates/ServicePage'
import {
  getCity,
  getService,
  getServiceCities,
  getServiceCity,
  serviceCityPath,
} from '@/lib/content'
import { buildMetadata, buildTitle } from '@/lib/seo/metadata'

/** Service × city pages — only the allow-listed, live combinations (REBUILD_PLAN §2.2). */
export const dynamicParams = false

export function generateStaticParams() {
  return getServiceCities().map((sc) => ({ service: sc.service, city: sc.city }))
}

type Params = Promise<{ service: string; city: string }>

async function load(params: Params) {
  const { service: s, city: c } = await params
  const sc = getServiceCity(s, c)
  const service = getService(s)
  const city = getCity(c)
  return sc && service && city ? { sc, service, city } : null
}

export async function generateMetadata({ params }: { params: Params }) {
  const page = await load(params)
  if (!page?.sc.summary) return {}
  return buildMetadata({
    title: buildTitle([`${page.service.name} in ${page.city.name}`]),
    description: page.sc.summary,
    path: serviceCityPath(page.sc),
  })
}

export default async function ServiceCityPage({ params }: { params: Params }) {
  const page = await load(params)
  if (!page?.sc.summary || !page.sc.intro) notFound()
  return (
    <ServicePage
      service={page.service}
      city={page.city}
      heading={`${page.service.name} in ${page.city.name}`}
      summary={page.sc.summary}
      intro={page.sc.intro}
      faqs={page.sc.faqs}
    />
  )
}
