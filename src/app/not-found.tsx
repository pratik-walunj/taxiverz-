import type { Metadata } from 'next'
import { business } from '@/config/business'
import { Button } from '@/components/ui/Button'
import { Section } from '@/components/ui/Section'
import { formatIndianPhone, telHref } from '@/lib/phone'
import { whatsappHref } from '@/lib/whatsapp'

export const metadata: Metadata = {
  // Next.js adds <meta name="robots" content="noindex"> to 404 responses itself.
  title: { absolute: 'Page not found | Taxiverz' },
}

export default function NotFound() {
  return (
    <Section className="pt-10 md:pt-16">
      <h1 className="text-h1 font-bold">Page not found</h1>
      <p className="text-muted mt-4 max-w-xl text-lg">
        This page isn&rsquo;t here. It may have moved when we rebuilt our website. You can go to the
        home page, or call or WhatsApp us and we&rsquo;ll help with your trip.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button href="/" variant="secondary" size="lg">
          Go to the home page
        </Button>
        <Button href={telHref(business.phone)} size="lg">
          <span className="tabular">Call {formatIndianPhone(business.phone)}</span>
        </Button>
        <Button href={whatsappHref(business.whatsapp)} variant="whatsapp" size="lg">
          WhatsApp us
        </Button>
      </div>
    </Section>
  )
}
