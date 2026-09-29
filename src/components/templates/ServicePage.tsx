import Link from 'next/link'
import { Phone } from 'lucide-react'
import { business } from '@/config/business'
import { FareWidget } from '@/components/booking/FareWidget'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { CtaBand } from '@/components/sections/CtaBand'
import { FaqSection } from '@/components/sections/FaqSection'
import { FleetStrip } from '@/components/sections/FleetStrip'
import { HowBooking } from '@/components/sections/HowBooking'
import { JsonLd } from '@/components/seo/JsonLd'
import { Button } from '@/components/ui/Button'
import { Prose } from '@/components/ui/Prose'
import { Section } from '@/components/ui/Section'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { getCity, getServiceCitiesFor, serviceCityPath, servicePath } from '@/lib/content'
import type { City, Faq, Service, VehicleClass } from '@/lib/schemas/content'
import { serviceJsonLd } from '@/lib/seo/jsonld'
import { formatIndianPhone, telHref } from '@/lib/phone'
import { whatsappHref } from '@/lib/whatsapp'

/** Which vehicle classes a service shows. Group services show vans and buses; the rest show cars. */
function classFilter(service: Service): (c: VehicleClass) => boolean {
  if (service.slug === 'tempo-traveller' || service.slug === 'bus-rental')
    return (c) => c.tollClass !== 'car'
  return (c) => c.tollClass === 'car'
}

/**
 * Service hub (`/{service}/`) and service × city (`/{service}/{city}/`)
 * share this template (REBUILD_PLAN §4). The hero carries the right widget
 * tab; enquiry services get WhatsApp and call until Phase 5 adds their forms.
 */
export function ServicePage({
  service,
  city,
  heading,
  summary,
  intro,
  faqs,
}: {
  service: Service
  city: City | null
  heading: string
  summary: string
  intro: string
  faqs: readonly Faq[]
}) {
  const path = city
    ? serviceCityPath({ service: service.slug, city: city.slug })
    : servicePath(service.slug)
  const trail = city
    ? [
        { name: service.name, path: servicePath(service.slug) },
        { name: city.name, path },
      ]
    : [{ name: service.name, path }]
  const luxury = service.register === 'luxury'
  const where = city ? ` in ${city.name}` : ''
  const message = `Hi Taxiverz, I'd like to book: ${service.name}${where}.`
  // Airport trips start from an airport, so the city is not pre-filled there.
  const initialFrom =
    city && service.widgetTab !== 'airport' ? { from: city.slug, fromLabel: city.name } : undefined
  const localPages = city ? [] : getServiceCitiesFor(service.slug)

  return (
    <>
      <Section
        register={luxury ? 'luxury' : 'standard'}
        className="pt-6 md:pt-10"
        labelledBy="page-title"
      >
        <Breadcrumbs trail={trail} />
        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_minmax(0,34rem)] lg:items-start">
          <div>
            <h1 id="page-title" className="text-h1 font-extrabold tracking-tight">
              {heading}
            </h1>
            <p className={luxury ? 'text-night-muted mt-4 text-lg' : 'text-muted mt-4 text-lg'}>
              {summary}
            </p>
          </div>
          {service.sells === 'fare-widget' && service.widgetTab ? (
            <FareWidget initial={{ type: service.widgetTab, ...initialFrom }} />
          ) : (
            <div className="flex flex-col gap-3">
              <Button
                href={whatsappHref(business.whatsapp, message)}
                variant="whatsapp"
                size="lg"
                data-placement="service-hero"
              >
                <WhatsAppIcon className="size-5" /> Enquire on WhatsApp
              </Button>
              <Button
                href={telHref(business.phone)}
                variant={luxury ? 'luxury' : 'secondary'}
                size="lg"
                data-placement="service-hero"
              >
                <Phone aria-hidden="true" className="size-5" />
                <span className="tabular">Call {formatIndianPhone(business.phone)}</span>
              </Button>
            </div>
          )}
        </div>
      </Section>

      <Section labelledBy="about-title">
        <h2 id="about-title" className="text-h2 font-bold">
          {city
            ? `${service.name} in ${city.name}: what to know`
            : `About our ${service.name.toLowerCase()}`}
        </h2>
        <Prose text={intro} className="mt-4" />
      </Section>

      {!city && <FleetStrip filter={classFilter(service)} title="Choose by vehicle class" />}

      {localPages.length > 0 && (
        <Section labelledBy="where-title">
          <h2 id="where-title" className="text-h2 font-bold">
            Where we run {service.name.toLowerCase()}
          </h2>
          <ul className="mt-4 flex flex-wrap gap-3">
            {localPages.map((sc) => (
              <li key={sc.city}>
                <Link
                  href={serviceCityPath(sc)}
                  className="border-line hover:border-brand rounded-control inline-flex min-h-12 items-center border px-4 font-semibold"
                >
                  {service.name} in {getCity(sc.city)?.name ?? sc.city}
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {!city && <HowBooking />}
      <FaqSection faqs={faqs} />
      <CtaBand
        title={
          city
            ? `Book ${service.name.toLowerCase()} in ${city.name}`
            : `Book ${service.name.toLowerCase()}`
        }
        text="Check the fare online, send your trip on WhatsApp, or call us — whichever suits you."
        whatsappMessage={message}
        placement={city ? 'service-city-cta' : 'service-cta'}
        register={luxury ? 'luxury' : 'mist'}
      />
      <JsonLd
        data={serviceJsonLd({
          name: city ? `${service.name} in ${city.name}` : service.name,
          description: summary,
          path,
          serviceType: service.name,
          areaServed: city
            ? [city.name]
            : localPages.map((sc) => getCity(sc.city)?.name ?? sc.city),
        })}
      />
    </>
  )
}
