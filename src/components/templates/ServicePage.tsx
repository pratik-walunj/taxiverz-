import Link from 'next/link'
import { Phone } from 'lucide-react'
import { business } from '@/config/business'
import { serviceEnquiry } from '@/config/enquiry'
import { EnquiryForm } from '@/components/booking/EnquiryForm'
import { FareWidget } from '@/components/booking/FareWidget'
import { VehicleCard } from '@/components/cards/VehicleCard'
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
import {
  getCity,
  getServiceCitiesFor,
  getSubPages,
  getVehiclesFor,
  serviceCityPath,
  servicePath,
} from '@/lib/content'
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
 * Service hub (`/{service}/`), service × city (`/{service}/{city}/`) and
 * shoot type (`/shoot-car-rental/{type}/`) share this template (REBUILD_PLAN §4).
 * Fare-widget services carry the right widget tab; enquire-mode services
 * (luxury, wedding, shoots, bus, self-drive, bikes, corporate) carry their
 * enquiry form and the live vehicles that fit them.
 */
export function ServicePage({
  service,
  city,
  subPage,
  heading,
  summary,
  intro,
  faqs,
}: {
  service: Service
  city: City | null
  /** A shoot type under the service (no city). */
  subPage?: { slug: string; name: string }
  heading: string
  summary: string
  intro: string
  faqs: readonly Faq[]
}) {
  const path = city
    ? serviceCityPath({ service: service.slug, city: city.slug })
    : subPage
      ? `/${service.slug}/${subPage.slug}/`
      : servicePath(service.slug)
  const trail =
    city || subPage
      ? [
          { name: service.name, path: servicePath(service.slug) },
          { name: city?.name ?? subPage!.name, path },
        ]
      : [{ name: service.name, path }]
  const luxury = service.register === 'luxury'
  const widget = service.sells === 'fare-widget' && service.widgetTab
  const enquiry = serviceEnquiry[service.slug]
  const topic = subPage?.name ?? `${service.name}${city ? ` in ${city.name}` : ''}`
  const message = `Hi Taxiverz, I'd like to ${widget ? 'book' : 'enquire about'}: ${topic}.`
  // Airport trips start from an airport, so the city is not pre-filled there.
  const initialFrom =
    city && service.widgetTab !== 'airport' ? { from: city.slug, fromLabel: city.name } : undefined
  const hub = !city && !subPage
  const localPages = hub ? getServiceCitiesFor(service.slug) : []
  const subPages = hub ? getSubPages(service.slug) : []
  const vehicles = getVehiclesFor(service.slug)

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
          {widget ? (
            <FareWidget initial={{ type: service.widgetTab!, ...initialFrom }} />
          ) : (
            <div className="flex flex-col gap-3">
              {enquiry && (
                <Button href="#enquire" size="lg" variant={luxury ? 'luxury' : 'primary'}>
                  {enquiry.corporate ? 'Tell us what you need' : 'Send an enquiry'}
                </Button>
              )}
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
            : subPage
              ? `Cars for ${subPage.name.toLowerCase()}`
              : `About our ${service.name.toLowerCase()}`}
        </h2>
        <Prose text={intro} className="mt-4" />
      </Section>

      {vehicles.length > 0 && (
        <Section register={luxury ? 'luxury' : 'mist'} labelledBy="vehicles-title">
          <h2 id="vehicles-title" className="text-h2 font-bold">
            Vehicles you can book
          </h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {vehicles.map((v) => (
              <li key={v.slug}>
                <VehicleCard vehicle={v} dark={luxury} />
              </li>
            ))}
          </ul>
        </Section>
      )}

      {subPages.length > 0 && (
        <Section labelledBy="types-title">
          <h2 id="types-title" className="text-h2 font-bold">
            By type of shoot
          </h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {subPages.map((sp) => (
              <li key={sp.slug}>
                <Link
                  href={`/${service.slug}/${sp.slug}/`}
                  className="border-line hover:border-brand rounded-control flex min-h-12 items-center border px-4 font-semibold"
                >
                  {sp.name}
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {hub && (widget || enquiry?.corporate) && (
        <FleetStrip filter={classFilter(service)} title="Choose by vehicle class" />
      )}

      {enquiry && (
        <Section register={luxury ? 'luxury' : 'mist'} className="scroll-mt-20">
          <div id="enquire" className="max-w-3xl">
            <EnquiryForm
              leadType={enquiry.leadType}
              subject={topic}
              title={enquiry.title}
              occasions={enquiry.occasions}
              kind={enquiry.corporate ? 'corporate' : 'enquiry'}
              defaultCity={city?.name ?? ''}
              dark={luxury}
            />
          </div>
        </Section>
      )}

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

      {hub && widget && <HowBooking />}
      <FaqSection faqs={faqs} />
      <CtaBand
        title={`${widget ? 'Book' : 'Ask about'} ${
          subPage ? `cars for ${subPage.name.toLowerCase()}` : service.name.toLowerCase()
        }${city ? ` in ${city.name}` : ''}`}
        text={
          widget
            ? 'Check the fare online, send your trip on WhatsApp, or call us — whichever suits you.'
            : 'Send the enquiry above, WhatsApp us, or call — whichever suits you.'
        }
        whatsappMessage={message}
        placement={city ? 'service-city-cta' : 'service-cta'}
        register={luxury ? 'luxury' : 'mist'}
        showBook={Boolean(widget)}
      />
      <JsonLd
        data={serviceJsonLd({
          name: topic,
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
