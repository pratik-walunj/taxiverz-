import Link from 'next/link'
import { placeScenes, sceneFor } from '@/config/imagery'
import { FareWidget } from '@/components/booking/FareWidget'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { CtaBand } from '@/components/sections/CtaBand'
import { FaqSection } from '@/components/sections/FaqSection'
import { JsonLd } from '@/components/seo/JsonLd'
import { Badge } from '@/components/ui/Badge'
import { Milestone } from '@/components/ui/Milestone'
import { Price } from '@/components/ui/Price'
import { Prose } from '@/components/ui/Prose'
import { HeroSection } from '@/components/ui/HeroSection'
import { Section } from '@/components/ui/Section'
import { cityPath, routePath } from '@/lib/content'
import { isPublished } from '@/lib/content/published'
import { formatDuration, type FareRow, type RelatedRoutes } from '@/lib/pages/route'
import { tripToParams } from '@/lib/pricing/quote'
import type { City, Route } from '@/lib/schemas/content'
import { serviceJsonLd } from '@/lib/seo/jsonld'

/**
 * Route page (REBUILD_PLAN §4). Every fact shown is verified or hidden:
 * distance and time only when `verified`, the border block only when the
 * crossing is confirmed (D1), fares from the engine (estimate badge while draft).
 */
export function RoutePage({
  route,
  origin,
  destination,
  fares,
  related,
  cityName,
}: {
  route: Route
  origin: City
  destination: City
  fares: readonly FareRow[]
  related: RelatedRoutes
  cityName: (slug: string) => string
}) {
  const title = `${origin.name} to ${destination.name} taxi`
  const path = routePath(route)
  const km = route.verified.distance ? route.distanceKm : null
  const mins = route.verified.duration ? route.durationMins : null
  const estimate = fares.some((f) => f.oneWay.status === 'priced' && f.oneWay.isEstimate)
  const facts = [
    km !== null && { label: 'Distance', value: `${km} km by road` },
    mins !== null && { label: 'Driving time', value: `about ${formatDuration(mins)}` },
    route.via.length > 0 && { label: 'Via', value: route.via.join(', ') },
    route.bestDepartureTime && { label: 'Best time to leave', value: route.bestDepartureTime },
    route.roadNotes && { label: 'Road', value: route.roadNotes },
  ].filter((f): f is { label: string; value: string } => Boolean(f))
  const hubPublished = isPublished(cityPath(destination.slug))
  const anyPriced = fares.some(
    (f) => f.oneWay.status === 'priced' || f.roundTrip.status === 'priced',
  )
  const bookBase = `/book/?${tripToParams({ type: 'one-way', from: origin.slug, to: destination.slug })}`

  return (
    <>
      <HeroSection scene={sceneFor(placeScenes[destination.slug])} labelledBy="page-title">
        {(dark) => (
          <>
            <Breadcrumbs
              trail={[
                { name: 'Cabs', path: '/cabs/' },
                { name: origin.name, path: cityPath(origin.slug) },
                { name: `To ${destination.name}`, path },
              ]}
            />
            {/* Phones: heading, fare box, then the intro. Wide screens: text left, fare box right. */}
            <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_minmax(0,34rem)] lg:gap-x-8 lg:gap-y-0">
              <div className="flex items-start gap-5 lg:col-start-1">
                {/* The wrapper owns visibility: the milestone's own display class would override `hidden`. */}
                <div className="hidden shrink-0 sm:block">
                  <Milestone
                    nameEn={destination.name}
                    nameHi={destination.nameHi}
                    km={km}
                    size="lg"
                  />
                </div>
                <div>
                  <h1
                    id="page-title"
                    className="text-h1 font-extrabold tracking-tight text-balance"
                  >
                    {origin.name} to {destination.name} Taxi
                  </h1>
                  {(km !== null || mins !== null) && (
                    <p className={dark ? 'text-ivory/80 mt-3 text-lg' : 'text-muted mt-3 text-lg'}>
                      {[km !== null && `${km} km`, mins !== null && `about ${formatDuration(mins)}`]
                        .filter(Boolean)
                        .join(' · ')}
                    </p>
                  )}
                </div>
              </div>
              <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
                <FareWidget
                  initial={{
                    type: 'one-way',
                    from: origin.slug,
                    fromLabel: origin.name,
                    to: destination.slug,
                    toLabel: destination.name,
                  }}
                />
              </div>
              {route.content.intro && (
                <Prose
                  text={route.content.intro}
                  className={
                    dark ? 'text-ivory/90 lg:col-start-1 lg:mt-4' : 'lg:col-start-1 lg:mt-4'
                  }
                />
              )}
            </div>
          </>
        )}
      </HeroSection>

      <Section register="mist" labelledBy="fares-title">
        <h2 id="fares-title" className="text-h2 font-bold">
          {title} fare by car
        </h2>
        {estimate && (
          <p className="mt-2">
            <Badge>Estimated fare</Badge>
          </p>
        )}
        {anyPriced ? (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[32rem] text-left">
              <thead>
                <tr className="border-line border-b text-sm">
                  <th scope="col" className="py-2 pr-4 font-semibold">
                    Car
                  </th>
                  <th scope="col" className="py-2 pr-4 font-semibold">
                    One way
                  </th>
                  <th scope="col" className="py-2 font-semibold">
                    Round trip
                  </th>
                </tr>
              </thead>
              <tbody>
                {fares.map((f) => (
                  <tr key={f.classSlug} className="border-line border-b">
                    <th scope="row" className="py-3 pr-4 font-normal">
                      {f.label}
                    </th>
                    <td className="py-3 pr-4">
                      <Price amount={f.oneWay.status === 'priced' ? f.oneWay.total : null} />
                    </td>
                    <td className="py-3">
                      <Price amount={f.roundTrip.status === 'priced' ? f.roundTrip.total : null} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <>
            <p className="mt-2 max-w-2xl">
              We confirm the exact fare for this route on WhatsApp or by phone. Choose a car to send
              us your trip — there&rsquo;s no payment to book.
            </p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {fares.map((f) => (
                <li
                  key={f.classSlug}
                  className="bg-paper rounded-panel flex items-center justify-between gap-3 p-3"
                >
                  <span>{f.label}</span>
                  <Link
                    href={`${bookBase}&class=${f.classSlug}`}
                    aria-label={`Choose ${f.label}`}
                    className="text-brand-deep shrink-0 font-semibold underline"
                  >
                    Choose
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
        <p className="text-muted mt-3 text-sm">The exact model depends on availability.</p>
      </Section>

      {facts.length > 0 && (
        <Section labelledBy="facts-title">
          <h2 id="facts-title" className="text-h2 font-bold">
            Route facts
          </h2>
          <dl className="mt-4 grid max-w-3xl gap-x-6 gap-y-3 sm:grid-cols-[auto_1fr]">
            {facts.map((f) => (
              <div key={f.label} className="contents">
                <dt className="font-semibold">{f.label}</dt>
                <dd className="text-muted">{f.value}</dd>
              </div>
            ))}
          </dl>
        </Section>
      )}

      {route.content.routeGuide && (
        <Section labelledBy="guide-title">
          <h2 id="guide-title" className="text-h2 font-bold">
            The drive from {origin.name} to {destination.name}
          </h2>
          <Prose text={route.content.routeGuide} className="mt-4" />
          {route.content.tips.length > 0 && (
            <ul className="mt-6 max-w-3xl list-disc space-y-2 pl-5">
              {route.content.tips.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          )}
        </Section>
      )}

      {route.stops.length > 0 && (
        <Section register="mist" labelledBy="stops-title">
          <h2 id="stops-title" className="text-h2 font-bold">
            Stops worth making
          </h2>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {route.stops.map((s) => (
              <li key={s.name} className="bg-paper rounded-panel p-4">
                <h3 className="font-semibold">{s.name}</h3>
                {s.note && <p className="text-muted mt-1">{s.note}</p>}
              </li>
            ))}
          </ul>
        </Section>
      )}

      <FaqSection faqs={route.faqs} title={`${origin.name} to ${destination.name}: questions`} />

      {(related.reverse || related.sameOrigin.length > 0 || hubPublished) && (
        <Section labelledBy="related-title">
          <h2 id="related-title" className="text-h2 font-bold">
            Related routes
          </h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {related.reverse && (
              <li>
                <Link
                  href={routePath(related.reverse)}
                  className="text-brand-deep font-semibold underline"
                >
                  {destination.name} to {origin.name} taxi
                </Link>
              </li>
            )}
            {related.sameOrigin.map((r) => (
              <li key={r.slug}>
                <Link href={routePath(r)} className="text-brand-deep font-semibold underline">
                  {origin.name} to {cityName(r.destination)} taxi
                </Link>
              </li>
            ))}
            {hubPublished && (
              <li>
                <Link
                  href={cityPath(destination.slug)}
                  className="text-brand-deep font-semibold underline"
                >
                  Taxi service in {destination.name}
                </Link>
              </li>
            )}
          </ul>
        </Section>
      )}

      <CtaBand
        title={`Book your ${origin.name} to ${destination.name} cab`}
        text="Check the fare online, send your trip on WhatsApp, or call us."
        whatsappMessage={`Hi Taxiverz, I'd like a cab from ${origin.name} to ${destination.name}.`}
        placement="route-cta"
      />
      <JsonLd
        data={serviceJsonLd({
          name: `${title}`,
          description: `Taxi from ${origin.name} to ${destination.name}, one way or round trip.`,
          path,
          serviceType: 'Taxi service',
          areaServed: [origin.name, destination.name],
        })}
      />
    </>
  )
}
