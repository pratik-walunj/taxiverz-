import { notFound } from 'next/navigation'
import { ServicePage } from '@/components/templates/ServicePage'
import { getService, getServices, servicePath } from '@/lib/content'
import { buildMetadata, buildTitle } from '@/lib/seo/metadata'

/** Service hubs (REBUILD_PLAN §2.2). Only live services get a page; anything else is a 404. */
export const dynamicParams = false

export function generateStaticParams() {
  return getServices().map((s) => ({ service: s.slug }))
}

type Params = Promise<{ service: string }>

export async function generateMetadata({ params }: { params: Params }) {
  const service = getService((await params).service)
  if (!service?.summary) return {}
  return buildMetadata({
    title: buildTitle([service.name, 'Book by class']),
    description: service.summary,
    path: servicePath(service.slug),
  })
}

export default async function ServiceHubPage({ params }: { params: Params }) {
  const service = getService((await params).service)
  if (!service?.summary || !service.intro) notFound()
  return (
    <ServicePage
      service={service}
      city={null}
      heading={service.name}
      summary={service.summary}
      intro={service.intro}
      faqs={service.faqs}
    />
  )
}
