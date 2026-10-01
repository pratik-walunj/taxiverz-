import Link from 'next/link'
import {
  ArrowRight,
  BadgeCheck,
  Car,
  CalendarCheck,
  MapPin,
  MessageCircle,
  Phone,
  Receipt,
} from 'lucide-react'
import { business } from '@/config/business'
import { scenes } from '@/config/imagery'
import { Button } from '@/components/ui/Button'
import { PhotoBand } from '@/components/ui/PhotoBand'
import { Section } from '@/components/ui/Section'
import { GuideCard } from '@/components/cards/GuideCard'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { getDestinations, servicePath } from '@/lib/content'
import { isPublished } from '@/lib/content/published'
import { bookingPath } from '@/lib/nav'
import { formatIndianPhone, telHref } from '@/lib/phone'
import { whatsappHref } from '@/lib/whatsapp'

/**
 * Home-page sections (REBUILD_PLAN §4 "Home"). Every statement is a confirmed
 * fact or a description of how booking works on this site — no ratings, trip
 * counts, years or 24/7 claims until the owner supplies them (F2, F3, H2).
 */

/** Four verified points under the hero, as cards. */
export function TrustStrip() {
  const items = [
    {
      icon: MapPin,
      title: 'At Gorakhpur Junction',
      text: 'Head office at Railway Station Gate No-1',
    },
    { icon: MessageCircle, title: 'One number', text: 'Calls and WhatsApp on +91 85760 00083' },
    { icon: Car, title: 'Cars before your number', text: 'See the cars for your trip first' },
    { icon: Receipt, title: 'A reference every time', text: 'For every booking and enquiry' },
  ]
  return (
    <Section className="py-10 md:py-14" labelledBy="trust-title">
      <h2 id="trust-title" className="sr-only">
        Why book with Taxiverz
      </h2>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ icon: Icon, title, text }) => (
          <li
            key={title}
            className="rounded-panel bg-mist flex items-start gap-3 p-4 transition-colors hover:bg-orange-50"
          >
            <span className="bg-brand text-ink flex size-11 shrink-0 items-center justify-center rounded-xl shadow-sm">
              <Icon aria-hidden="true" className="size-5" />
            </span>
            <span>
              <span className="block font-bold">{title}</span>
              <span className="text-muted block text-sm">{text}</span>
            </span>
          </li>
        ))}
      </ul>
    </Section>
  )
}

/** Weddings, luxury cars and shoots — over the mandap photo, once those pages are live. */
export function LuxuryBand() {
  const links = [
    { href: servicePath('wedding-cars'), label: 'Wedding cars' },
    { href: servicePath('luxury-car-rental'), label: 'Luxury car rental' },
    { href: servicePath('shoot-car-rental'), label: 'Cars for shoots' },
  ].filter((l) => isPublished(l.href))
  if (links.length === 0) return null
  return (
    <PhotoBand scene={scenes.weddingMandap} labelledBy="luxury-title">
      <div className="max-w-xl">
        <p className="text-champagne inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase">
          <span aria-hidden="true" className="bg-champagne h-0.5 w-6" />
          Weddings and occasions
        </p>
        <h2 id="luxury-title" className="text-h1 mt-3 font-extrabold tracking-tight">
          The groom’s car, the couple’s car and the family’s cars
        </h2>
        <p className="text-ivory/85 mt-4 text-lg">
          Luxury sedans and SUVs with drivers for weddings, receptions and guests who deserve a
          proper welcome — and cars for pre-wedding shoots, music videos and films. Tell us the date
          and the timings, and we’ll tell you what’s free.
        </p>
        <ul className="mt-8 flex flex-wrap gap-3">
          {links.map((l, i) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={
                  i === 0
                    ? 'bg-champagne text-night hover:bg-ivory rounded-control inline-flex min-h-12 items-center gap-2 px-5 font-bold transition-colors'
                    : 'border-ivory/50 hover:border-champagne hover:text-champagne rounded-control inline-flex min-h-12 items-center gap-2 border px-5 font-semibold transition-colors'
                }
              >
                {l.label} <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </PhotoBand>
  )
}

/** Why Taxiverz: four specific, true points (DESIGN.md: verified proofs only). */
export function WhyTaxiverz() {
  const points = [
    {
      title: 'Based at the station',
      text: 'Our head office is at Railway Station Gate No-1, Gorakhpur — easy to find when you step off a train, and the natural start for trips across eastern UP and into Nepal.',
    },
    {
      title: 'The fare before your number',
      text: 'Enter your trip and see the cars that fit before you give us any contact details. Where a trip needs a quote, we confirm the fare with you before you travel.',
    },
    {
      title: 'Every kind of trip',
      text: 'Local hire by the hour, one-way drops, round trips, airport transfers, tempo travellers for groups, wedding and luxury cars, and trips into Nepal.',
    },
    {
      title: 'Three ways to book',
      text: 'Confirm online, send the trip on WhatsApp with the details already written, or call. Whichever you choose, you get a booking reference.',
    },
  ]
  return (
    <Section register="mist" labelledBy="why-title">
      <SectionHeading id="why-title" eyebrow="Why Taxiverz" title="Why people book Taxiverz" />
      <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {points.map((p, i) => (
          <li
            key={p.title}
            className="bg-paper rounded-panel border-brand relative overflow-hidden border-t-4 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <span
              aria-hidden="true"
              className="font-heading text-brand/15 absolute -top-2 right-3 text-7xl font-extrabold"
            >
              {i + 1}
            </span>
            <BadgeCheck aria-hidden="true" className="text-brand-deep relative size-7" />
            <h3 className="font-heading relative mt-3 text-lg font-bold">{p.title}</h3>
            <p className="text-muted relative mt-2">{p.text}</p>
          </li>
        ))}
      </ul>
    </Section>
  )
}

/** Travel guides as milestone cards — the brand's roadside-milestone motif. */
export function GuidesStrip() {
  const destinations = getDestinations()
  if (destinations.length === 0) return null
  return (
    <Section labelledBy="guides-title" className="cv-auto">
      <SectionHeading
        id="guides-title"
        eyebrow="Travel guides"
        title="Where people go from Gorakhpur"
        intro="What to see and when to go — temples, ghats, the Buddhist sites and the hills of Nepal."
        action={
          isPublished('/destinations/') ? { href: '/destinations/', label: 'All guides' } : null
        }
      />
      <div
        role="region"
        aria-label="Travel guides"
        tabIndex={0}
        className="-mx-4 mt-8 overflow-x-auto px-4 pb-4 sm:mx-0 sm:overflow-visible sm:px-0 sm:pb-0"
      >
        <ul className="flex snap-x snap-mandatory gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {destinations.map((d) => (
            <li
              key={d.place}
              className="w-[82%] max-w-80 shrink-0 snap-start sm:w-auto sm:max-w-none"
            >
              <GuideCard destination={d} />
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}

/** A short band for companies, in the brand colour. */
export function CorporateBand() {
  if (!isPublished(servicePath('corporate-car-rental'))) return null
  return (
    <Section className="py-10 md:py-14" labelledBy="corporate-title">
      <div className="rounded-panel from-brand to-brand-deep text-ink flex flex-col gap-5 bg-gradient-to-br p-6 shadow-lg md:flex-row md:items-center md:justify-between md:p-10">
        <div>
          <h2 id="corporate-title" className="text-h2 font-extrabold">
            Travel for your company
          </h2>
          <p className="mt-2 max-w-2xl text-lg">
            Guest pickups, staff travel, site visits and events — one contact for all of it. Tell us
            your monthly volume and we’ll set it up.
          </p>
        </div>
        <Link
          href={servicePath('corporate-car-rental')}
          className="bg-ink text-paper hover:bg-night rounded-control inline-flex min-h-12 shrink-0 items-center justify-center gap-2 px-6 font-bold transition-colors"
        >
          Corporate travel <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      </div>
    </Section>
  )
}

/** The closing call to action over the open-road photo: the three closes. */
export function HomeCta() {
  const book = bookingPath()
  return (
    <PhotoBand scene={scenes.openRoad} labelledBy="home-cta-title" align="center">
      <h2 id="home-cta-title" className="text-h1 mx-auto max-w-2xl font-extrabold tracking-tight">
        Where are you going next?
      </h2>
      <p className="text-ivory/85 mx-auto mt-4 max-w-xl text-lg">
        Check the fare online, send your trip on WhatsApp, or call us — whichever suits you.
      </p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        {book && (
          <Button href={book} size="lg">
            <CalendarCheck aria-hidden="true" className="size-5" /> Check fare and book
          </Button>
        )}
        <Button
          href={whatsappHref(business.whatsapp, "Hi Taxiverz, I'd like to book a cab.")}
          variant="whatsapp"
          size="lg"
          data-placement="home-cta"
        >
          <WhatsAppIcon className="size-5" /> WhatsApp us
        </Button>
        <Button href={telHref(business.phone)} variant="luxury" size="lg" data-placement="home-cta">
          <Phone aria-hidden="true" className="size-5" />
          <span className="tabular">Call {formatIndianPhone(business.phone)}</span>
        </Button>
      </div>
    </PhotoBand>
  )
}
