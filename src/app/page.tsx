import { Phone } from 'lucide-react'
import { business } from '@/config/business'
import { FareWidget } from '@/components/booking/FareWidget'
import { CtaBand } from '@/components/sections/CtaBand'
import { FaqSection } from '@/components/sections/FaqSection'
import { FleetStrip } from '@/components/sections/FleetStrip'
import { HowBooking } from '@/components/sections/HowBooking'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { homeFaqs } from '@/data/copy/home'
import { Button } from '@/components/ui/Button'
import { Section } from '@/components/ui/Section'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { JsonLd } from '@/components/seo/JsonLd'
import { formatIndianPhone, telHref } from '@/lib/phone'
import { localBusinessJsonLd, organizationJsonLd, websiteJsonLd } from '@/lib/seo/jsonld'
import { buildMetadata, buildTitle } from '@/lib/seo/metadata'
import { whatsappHref } from '@/lib/whatsapp'

export const metadata = buildMetadata({
  title: buildTitle(['Taxi Service in Gorakhpur', 'Cabs to Nepal & India']),
  description:
    'Taxiverz is a Gorakhpur cab and travel company with a branch in Pune, running cabs across India and into Nepal. Call or WhatsApp +91 85760 00083.',
  path: '/',
})

export default function HomePage() {
  const phone = formatIndianPhone(business.phone)
  return (
    <>
      <Section className="pt-10 md:pt-16" labelledBy="home-title">
        <div className="max-w-3xl">
          <h1 id="home-title" className="animate-rise text-display font-extrabold tracking-tight">
            Taxi service in Gorakhpur, across India and into Nepal
          </h1>
          <p className="animate-rise text-muted mt-5 max-w-2xl text-lg [animation-delay:60ms]">
            Taxiverz is Gorakhpur&rsquo;s own cab and travel company. Our head office is at Railway
            Station Gate No-1, Gorakhpur, and we have a branch in Warje, Pune. Tell us where
            you&rsquo;re going and we&rsquo;ll quote your trip.
          </p>
          <div className="animate-rise mt-8 flex flex-col gap-3 [animation-delay:120ms] sm:flex-row">
            <Button
              href={telHref(business.phone)}
              size="lg"
              variant="primary"
              data-placement="home-hero"
            >
              <Phone aria-hidden="true" className="size-5" />
              <span className="tabular">Call to book {phone}</span>
            </Button>
            <Button
              href={whatsappHref(business.whatsapp, "Hi Taxiverz, I'd like to book a cab.")}
              size="lg"
              variant="whatsapp"
              data-placement="home-hero"
            >
              <WhatsAppIcon className="size-5" />
              <span>Book on WhatsApp</span>
            </Button>
          </div>
        </div>
        <div className="animate-rise mt-8 max-w-3xl [animation-delay:180ms]">
          <h2 className="sr-only">Check your fare</h2>
          <FareWidget />
        </div>
      </Section>

      <ServicesGrid title="Cabs for every kind of trip" />
      <FleetStrip />
      <HowBooking />
      <FaqSection faqs={homeFaqs} />
      <CtaBand
        title="Ready to book?"
        text="Check the fare online, send your trip on WhatsApp, or call us."
        whatsappMessage="Hi Taxiverz, I'd like to book a cab."
        placement="home-cta"
      />

      <JsonLd
        data={[
          organizationJsonLd(business),
          websiteJsonLd(business),
          ...business.branches.map((b) => localBusinessJsonLd(business, b)),
        ]}
      />
    </>
  )
}
