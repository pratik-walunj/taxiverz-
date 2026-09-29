import { Check, X } from 'lucide-react'
import { EnquiryForm } from '@/components/booking/EnquiryForm'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { CtaBand } from '@/components/sections/CtaBand'
import { FaqSection } from '@/components/sections/FaqSection'
import { JsonLd } from '@/components/seo/JsonLd'
import { Price } from '@/components/ui/Price'
import { Prose } from '@/components/ui/Prose'
import { Section } from '@/components/ui/Section'
import { getCity, packagePath } from '@/lib/content'
import type { Package } from '@/lib/schemas/content'
import { absoluteUrl } from '@/lib/seo/metadata'

const PER = { person: 'per person', group: 'per group', vehicle: 'per vehicle' } as const

/**
 * Package page (REBUILD_PLAN §4): itinerary, inclusions and exclusions, the
 * verified price, and an enquiry form. A `from-{city}` variant shows its own
 * price and notes. TouristTrip JSON-LD; an Offer only with a verified price.
 */
export function PackagePage({
  pkg,
  variant,
}: {
  pkg: Package
  variant?: Package['variants'][number]
}) {
  const origin = variant ? getCity(variant.origin) : undefined
  const price = variant?.price ?? pkg.price
  const path = variant ? `${packagePath(pkg.slug)}from-${variant.origin}/` : packagePath(pkg.slug)
  const heading = origin ? `${pkg.name} from ${origin.name}` : pkg.name
  const shownPrice = price.verified ? price.amount : null
  return (
    <>
      <Section className="pt-6 md:pt-10" labelledBy="page-title">
        <Breadcrumbs
          trail={[
            { name: 'Packages', path: '/packages/' },
            { name: pkg.name, path: packagePath(pkg.slug) },
            ...(origin ? [{ name: `From ${origin.name}`, path }] : []),
          ]}
        />
        <h1 id="page-title" className="text-h1 mt-6 font-extrabold tracking-tight">
          {heading}
        </h1>
        {pkg.summary && <p className="text-muted mt-4 max-w-2xl text-lg">{pkg.summary}</p>}
        <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
          <div>
            <dt className="text-muted text-sm">Price</dt>
            <dd className="text-xl">
              <Price amount={shownPrice} />
              {shownPrice !== null && price.per && (
                <span className="text-muted text-base"> {PER[price.per]}</span>
              )}
            </dd>
          </div>
          {pkg.durationDays !== null && (
            <div>
              <dt className="text-muted text-sm">Duration</dt>
              <dd className="text-xl font-semibold">
                {pkg.durationDays} {pkg.durationDays === 1 ? 'day' : 'days'}
              </dd>
            </div>
          )}
          {pkg.operator && (
            <div>
              <dt className="text-muted text-sm">Operated by</dt>
              <dd className="text-xl font-semibold">{pkg.operator}</dd>
            </div>
          )}
        </dl>
        {variant?.notes && <p className="mt-4 max-w-2xl">{variant.notes}</p>}
      </Section>

      {pkg.intro && (
        <Section labelledBy="about-title">
          <h2 id="about-title" className="text-h2 font-bold">
            About this package
          </h2>
          <Prose text={pkg.intro} className="mt-4" />
        </Section>
      )}

      {pkg.itinerary.length > 0 && (
        <Section register="mist" labelledBy="itinerary-title">
          <h2 id="itinerary-title" className="text-h2 font-bold">
            Itinerary
          </h2>
          <ol className="mt-6 max-w-3xl space-y-6">
            {pkg.itinerary.map((d) => (
              <li key={d.day} className="flex gap-4">
                <span className="font-heading bg-brand text-ink flex size-10 shrink-0 items-center justify-center rounded-full font-bold">
                  {d.day}
                </span>
                <div>
                  <h3 className="font-semibold">{d.title}</h3>
                  <p className="text-muted mt-1">{d.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </Section>
      )}

      {(pkg.inclusions.length > 0 || pkg.exclusions.length > 0) && (
        <Section labelledBy="included-title">
          <h2 id="included-title" className="text-h2 font-bold">
            What&rsquo;s included
          </h2>
          <div className="mt-6 grid gap-8 md:grid-cols-2">
            <ul className="space-y-2" aria-label="Included">
              {pkg.inclusions.map((i) => (
                <li key={i} className="flex gap-2">
                  <Check aria-hidden="true" className="text-brand-deep mt-1 size-5 shrink-0" /> {i}
                </li>
              ))}
            </ul>
            <ul className="space-y-2" aria-label="Not included">
              {pkg.exclusions.map((i) => (
                <li key={i} className="text-muted flex gap-2">
                  <X aria-hidden="true" className="mt-1 size-5 shrink-0" /> {i}
                </li>
              ))}
            </ul>
          </div>
        </Section>
      )}

      <Section register="mist">
        <div id="enquire" className="max-w-3xl scroll-mt-20">
          <EnquiryForm
            leadType="enquiry-package"
            subject={heading}
            title={`Enquire about ${heading}`}
            defaultCity={origin?.name ?? ''}
          />
        </div>
      </Section>

      <FaqSection faqs={pkg.faqs} />
      <CtaBand
        title={`Ask about ${heading}`}
        text="Send the enquiry above, WhatsApp us, or call."
        whatsappMessage={`Hi Taxiverz, I'd like to ask about the ${heading} package.`}
        placement="package-cta"
        showBook={false}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'TouristTrip',
          name: heading,
          description: pkg.summary ?? heading,
          url: absoluteUrl(path),
          ...(pkg.itinerary.length > 0 && {
            itinerary: {
              '@type': 'ItemList',
              itemListElement: pkg.itinerary.map((d) => ({
                '@type': 'ListItem',
                position: d.day,
                name: d.title,
              })),
            },
          }),
          ...(shownPrice !== null && {
            offers: {
              '@type': 'Offer',
              price: shownPrice,
              priceCurrency: 'INR',
              url: absoluteUrl(path),
            },
          }),
        }}
      />
    </>
  )
}
