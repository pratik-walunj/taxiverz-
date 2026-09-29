import { Mail, MapPin, Phone } from 'lucide-react'
import { business } from '@/config/business'
import { EnquiryForm } from '@/components/booking/EnquiryForm'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { PaymentNotice } from '@/components/sections/PaymentNotice'
import { JsonLd } from '@/components/seo/JsonLd'
import { Button } from '@/components/ui/Button'
import { Section } from '@/components/ui/Section'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { formatIndianPhone, telHref } from '@/lib/phone'
import { localBusinessJsonLd } from '@/lib/seo/jsonld'
import { buildMetadata, buildTitle } from '@/lib/seo/metadata'
import { whatsappHref } from '@/lib/whatsapp'

export const metadata = buildMetadata({
  title: buildTitle(['Contact Us', 'Gorakhpur & Pune']),
  description:
    'Call or WhatsApp Taxiverz on +91 85760 00083, email us, or visit our Gorakhpur head office at Railway Station Gate No-1 or our Pune branch in Warje.',
  path: '/contact/',
})

/** Contact (REBUILD_PLAN §4): both branches, one number, email, form. Hours only once confirmed (C7). */
export default function ContactPage() {
  const phone = formatIndianPhone(business.phone)
  return (
    <>
      <Section className="pt-6 md:pt-10" labelledBy="page-title">
        <Breadcrumbs trail={[{ name: 'Contact', path: '/contact/' }]} />
        <h1 id="page-title" className="text-h1 mt-6 font-extrabold tracking-tight">
          Contact Taxiverz
        </h1>
        <p className="text-muted mt-4 max-w-2xl text-lg">
          One number for calls and WhatsApp, for both our offices. For a booking, the quickest way
          is to check the fare online or send us your trip on WhatsApp.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button href={telHref(business.phone)} size="lg" data-placement="contact">
            <Phone aria-hidden="true" className="size-5" />
            <span className="tabular">Call {phone}</span>
          </Button>
          <Button
            href={whatsappHref(business.whatsapp, 'Hi Taxiverz,')}
            variant="whatsapp"
            size="lg"
            data-placement="contact"
          >
            <WhatsAppIcon className="size-5" /> WhatsApp us
          </Button>
          {business.email && (
            <Button href={`mailto:${business.email}`} variant="secondary" size="lg">
              <Mail aria-hidden="true" className="size-5" /> {business.email}
            </Button>
          )}
        </div>
        <PaymentNotice />
      </Section>

      <Section register="mist" labelledBy="offices-title">
        <h2 id="offices-title" className="text-h2 font-bold">
          Our offices
        </h2>
        <ul className="mt-6 grid gap-4 md:grid-cols-2">
          {business.branches.map((b) => {
            const lines = [
              b.streetAddress,
              b.locality === b.city ? null : b.locality,
              `${b.city}, ${b.region} ${b.postalCode}`,
            ].filter((l): l is string => Boolean(l))
            const maps =
              b.mapsUrl ??
              `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Taxiverz, ${lines.join(', ')}`)}`
            return (
              <li key={b.id} className="bg-paper rounded-panel p-5">
                <h3 className="font-heading text-lg font-bold">{b.label}</h3>
                <address className="mt-2 not-italic">
                  {lines.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                </address>
                {b.hours && <p className="mt-2">Open: {b.hours}</p>}
                <div className="mt-2 flex flex-wrap gap-x-6">
                  <a
                    href={maps}
                    target="_blank"
                    rel="noopener"
                    className="text-brand-deep inline-flex min-h-12 items-center gap-2 font-semibold underline"
                  >
                    <MapPin aria-hidden="true" className="size-5" /> Directions to {b.city}
                  </a>
                  {b.googleBusinessUrl && (
                    <a
                      href={b.googleBusinessUrl}
                      target="_blank"
                      rel="noopener"
                      className="text-brand-deep inline-flex min-h-12 items-center font-semibold underline"
                    >
                      Reviews on Google
                    </a>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
      </Section>

      <Section>
        <div className="max-w-3xl">
          <EnquiryForm
            kind="contact"
            leadType="contact"
            subject="Contact form"
            title="Send us a message"
          />
        </div>
      </Section>
      <JsonLd data={business.branches.map((b) => localBusinessJsonLd(business, b))} />
    </>
  )
}
