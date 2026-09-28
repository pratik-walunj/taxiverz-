import type { Metadata } from 'next'
import { Overpass } from 'next/font/google'
import { Phone } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Milestone } from '@/components/ui/Milestone'
import { Price } from '@/components/ui/Price'
import { Section } from '@/components/ui/Section'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { MobileNav } from '@/components/layout/MobileNav'

/**
 * Dev-only style guide (REBUILD_PLAN §6). The `.dev.tsx` extension means it only
 * exists under `next dev` (see next.config.ts): never built, deployed or in the sitemap. Every value here is a SAMPLE for layout review —
 * none of it is a Taxiverz fact.
 */
const overpass = Overpass({ subsets: ['latin'], weight: ['700', '800'], display: 'swap' })

export const metadata: Metadata = {
  title: { absolute: 'Style guide | Taxiverz' },
  robots: { index: false, follow: false },
}

const colours = [
  ['ink', 'bg-ink'],
  ['muted', 'bg-muted'],
  ['line', 'bg-line'],
  ['mist', 'bg-mist'],
  ['paper', 'bg-paper'],
  ['brand', 'bg-brand'],
  ['brand-deep', 'bg-brand-deep'],
  ['whatsapp', 'bg-whatsapp'],
  ['nh-yellow', 'bg-nh-yellow'],
  ['night', 'bg-night'],
  ['ivory', 'bg-ivory'],
  ['champagne', 'bg-champagne'],
] as const

const sampleNav = [
  { label: 'Cabs', href: '/' },
  { label: 'Nepal', href: '/' },
  { label: 'Fleet', href: '/' },
]

export default function StyleGuidePage() {
  return (
    <>
      <Section>
        <p className="text-muted text-sm">Dev only · sample data · not a Taxiverz fact</p>
        <h1 className="text-h1 mt-2 font-bold">Style guide</h1>

        <h2 className="text-h2 mt-12 font-bold">Colour</h2>
        <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {colours.map(([name, cls]) => (
            <li key={name} className="text-sm">
              <span className={`rounded-control border-line block h-14 border ${cls}`} />
              <span className="mt-1 block font-medium">{name}</span>
            </li>
          ))}
        </ul>

        <h2 className="text-h2 mt-12 font-bold">Headings: Anek Latin vs Overpass</h2>
        <div className="mt-4 grid gap-8 md:grid-cols-2">
          <div>
            <p className="text-muted text-sm">Anek Latin (chosen)</p>
            <p className="font-heading text-display font-extrabold">Taxi service in Gorakhpur</p>
            <p className="font-heading text-h1 font-bold">Gorakhpur to Muktinath taxi</p>
            <p className="font-heading text-h2 font-bold">Fares for every car</p>
            <p className="font-heading text-h3 font-semibold">Stops worth making</p>
          </div>
          <div className={overpass.className}>
            <p className="text-muted text-sm">Overpass</p>
            <p className="text-display font-extrabold">Taxi service in Gorakhpur</p>
            <p className="text-h1 font-bold">Gorakhpur to Muktinath taxi</p>
            <p className="text-h2 font-bold">Fares for every car</p>
            <p className="text-h3 font-bold">Stops worth making</p>
          </div>
        </div>

        <h2 className="text-h2 mt-12 font-bold">Body</h2>
        <p className="mt-3 max-w-2xl">
          Mukta body text at 16px. हिंदी और English एक साथ: गोरखपुर से काठमांडू। Prices use tabular
          figures: <Price amount={125000} /> and <Price amount={8990} />; unknown prices read{' '}
          <Price amount={null} />.
        </p>

        <h2 className="text-h2 mt-12 font-bold">Buttons</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button href="/">Check fare</Button>
          <Button href="/" variant="secondary">
            Request a call back
          </Button>
          <Button href="/" variant="whatsapp">
            <WhatsAppIcon className="size-5" /> Book on WhatsApp
          </Button>
          <Button href="/" variant="secondary">
            <Phone aria-hidden="true" className="size-5" /> Call to book
          </Button>
          <Button href="/" variant="ghost">
            See all routes
          </Button>
          <Button href="/" size="lg">
            Confirm booking
          </Button>
        </div>

        <h2 className="text-h2 mt-12 font-bold">Badges</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge>Estimated fare</Badge>
          <Badge tone="brand">Cheapest</Badge>
        </div>

        <h2 className="text-h2 mt-12 font-bold">Milestone: NH yellow vs brand orange cap</h2>
        <div className="mt-4 flex flex-wrap items-end gap-6">
          <Milestone nameEn="Kushinagar" nameHi="कुशीनगर" km={55} />
          <Milestone nameEn="Kathmandu" nameHi="काठमांडू" km={370} size="lg" />
          <Milestone nameEn="Lumbini" nameHi="लुम्बिनी" km={null} />
          <Milestone nameEn="Kushinagar" nameHi="कुशीनगर" km={55} cap="brand" />
          <Milestone nameEn="Kathmandu" nameHi="काठमांडू" km={370} size="lg" cap="brand" />
        </div>
        <p className="text-muted mt-2 text-sm">
          Left three: NH yellow. Right two: brand orange. Distances are samples.
        </p>

        <h2 className="text-h2 mt-12 font-bold">Breadcrumbs</h2>
        <div className="mt-4">
          <Breadcrumbs trail={[{ name: 'Style guide', path: '/styleguide/' }]} />
        </div>

        <h2 className="text-h2 mt-12 font-bold">Mobile nav sheet</h2>
        <div className="mt-4">
          <MobileNav items={sampleNav} phone="+918576000083" whatsapp="+918576000083" />
        </div>
      </Section>

      <Section register="luxury">
        <h2 className="text-h2 font-bold">Luxury register</h2>
        <p className="text-night-muted mt-3 max-w-xl">
          Dark, quiet, large real photography, few words. No per-km rates on cards.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button href="/" variant="luxury" size="lg">
            Enquire
          </Button>
          <Badge tone="luxury">Wedding</Badge>
        </div>
        <hr className="border-champagne/40 mt-8" />
      </Section>
    </>
  )
}
