import type { Metadata } from 'next'
import Link from 'next/link'
import { BookingFlow } from '@/components/booking/BookingFlow'
import { CallbackForm } from '@/components/booking/CallbackForm'
import { ClassQuoteCard } from '@/components/booking/ClassQuoteCard'
import { FareWidget } from '@/components/booking/FareWidget'
import { TrackOnMount } from '@/components/tracking/TrackOnMount'
import { Section } from '@/components/ui/Section'
import { buildFareIndex } from '@/lib/pricing/build-index'
import {
  quoteTrip,
  resolveTrip,
  tripFromParams,
  tripToParams,
  type ResolvedTrip,
} from '@/lib/pricing/quote'

export const metadata: Metadata = {
  title: { absolute: 'Check fare and book | Taxiverz' },
  description:
    'See the fare for your trip by car class, then book online, on WhatsApp or by phone.',
  robots: { index: false, follow: true },
}

type SearchParams = Promise<Record<string, string | string[] | undefined>>

function heading(trip: ResolvedTrip): string {
  const t = trip.request.type
  if (t === 'local') {
    const pkg = trip.localPackage
      ? `, ${trip.localPackage.hours} hours / ${trip.localPackage.km} km`
      : ''
    return `Car with driver in ${trip.fromLabel}${pkg}`
  }
  if (t === 'airport') return `Airport transfer: ${trip.fromLabel} to ${trip.toLabel ?? ''}`
  return `${trip.fromLabel} to ${trip.toLabel ?? ''} ${t === 'round-trip' ? 'round trip' : 'one way'}`
}

/** /book/ — the booking funnel (REBUILD_PLAN §3.4). State lives in the URL so Back and sharing work. */
export default async function BookPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams
  const request = tripFromParams(params)
  const index = buildFareIndex()

  if (!request || (!request.from && !request.fromText)) {
    return (
      <Section className="pt-8 md:pt-12">
        <h1 className="text-h1 font-bold">Check your fare</h1>
        <p className="text-muted mt-2 max-w-xl">
          Pick the trip type and places. You&rsquo;ll see the fare before we ask for any details.
        </p>
        <div className="mt-6">
          <FareWidget />
        </div>
      </Section>
    )
  }

  const trip = resolveTrip(index, request)
  const quotes = quoteTrip(index, trip)
  const classSlug = typeof params.class === 'string' ? params.class : null
  const chosen = classSlug ? index.classes.find((c) => c.slug === classSlug) : undefined
  const base = `/book/?${tripToParams(request)}`
  const tripInput = {
    type: request.type,
    from: request.from,
    to: request.to,
    fromText: request.fromText,
    toText: request.toText,
    pkg: request.pkg ?? null,
  }

  if (chosen) {
    return (
      <Section className="pt-8 md:pt-12">
        <nav aria-label="Booking steps" className="text-sm">
          <Link href={base} className="text-brand-deep underline">
            Back to all cars
          </Link>
        </nav>
        <h1 className="text-h1 mt-2 font-bold">{heading(trip)}</h1>
        <div className="mt-6">
          <BookingFlow
            trip={request}
            fromLabel={trip.fromLabel}
            toLabel={trip.toLabel}
            vehicleClass={chosen}
            route={trip.route}
            config={index.config}
            localPackage={trip.localPackage}
          />
        </div>
      </Section>
    )
  }

  const priced = quotes.filter((q) => q.quote.status === 'priced').length
  return (
    <>
      <Section className="pt-8 md:pt-12">
        <p className="text-muted text-sm">Step 1 of 3 — choose a car</p>
        <h1 className="text-h1 mt-1 font-bold">{heading(trip)}</h1>
        {trip.route.distanceKm !== null && (
          <p className="text-muted mt-1">{trip.route.distanceKm} km by road</p>
        )}
        {priced === 0 && (
          <p className="bg-mist rounded-panel mt-4 max-w-2xl p-4">
            We&rsquo;ll confirm the exact fare for this trip on WhatsApp or by phone. Choose a car
            to send us your trip details — it takes a minute and there&rsquo;s no payment.
          </p>
        )}
        <ul className="mt-4" aria-label="Cars for this trip">
          {quotes.map((item) => (
            <ClassQuoteCard
              key={item.vehicleClass.slug}
              item={item}
              href={`${base}&class=${item.vehicleClass.slug}`}
            />
          ))}
        </ul>
        <p className="text-muted mt-3 text-sm">The exact model depends on availability.</p>
        <TrackOnMount
          event="fare_results"
          params={{ trip_type: request.type, priced, classes: quotes.length }}
        />
      </Section>
      <Section register="mist">
        <CallbackForm trip={tripInput} />
      </Section>
      <Section>
        <details>
          <summary className="min-h-12 cursor-pointer font-semibold">Change your trip</summary>
          <div className="mt-4">
            <FareWidget
              initial={{
                ...request,
                fromLabel: trip.fromLabel,
                toLabel: trip.toLabel ?? undefined,
              }}
            />
          </div>
        </details>
      </Section>
    </>
  )
}
