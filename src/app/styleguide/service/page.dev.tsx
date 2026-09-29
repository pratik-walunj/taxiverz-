import type { Metadata } from 'next'
import { ServicePage } from '@/components/templates/ServicePage'
import { allServices } from '@/lib/content'

/**
 * Dev-only preview of draft service pages (luxury, wedding, shoot, bus,
 * self-drive, bike) with their real copy: ?s=wedding-cars, ?s=shoot-car-rental&t=pre-wedding.
 * They stay unpublished until a fitting vehicle is live (B3/F1).
 */
export const metadata: Metadata = {
  title: { absolute: 'Service preview | Taxiverz' },
  robots: { index: false, follow: false },
}

export default async function ServicePreview({
  searchParams,
}: {
  searchParams: Promise<{ s?: string; t?: string }>
}) {
  const { s = 'wedding-cars', t } = await searchParams
  const service = allServices.find((x) => x.slug === s) ?? allServices[0]!
  const sub = t ? service.subPages.find((x) => x.slug === t) : undefined
  const copy = sub ?? service
  return (
    <ServicePage
      service={service}
      city={null}
      subPage={sub}
      heading={sub ? `Cars for ${sub.name.toLowerCase()}` : service.name}
      summary={copy.summary ?? ''}
      intro={copy.intro ?? ''}
      faqs={copy.faqs}
    />
  )
}
