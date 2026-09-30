import { business } from '@/config/business'
import { heroSlides, scenes } from '@/config/imagery'
import { FareWidget } from '@/components/booking/FareWidget'
import { FaqSection } from '@/components/sections/FaqSection'
import { FleetStrip } from '@/components/sections/FleetStrip'
import { HeroSlider, type HeroSlide } from '@/components/sections/HeroSlider'
import {
  CorporateBand,
  GuidesStrip,
  HomeCta,
  LuxuryBand,
  TrustStrip,
  WhyTaxiverz,
} from '@/components/sections/HomeSections'
import { HowBooking } from '@/components/sections/HowBooking'
import { NepalBand } from '@/components/sections/NepalBand'
import { RouteList } from '@/components/sections/RouteList'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { JsonLd } from '@/components/seo/JsonLd'
import { Container } from '@/components/ui/Container'
import { homeFaqs } from '@/data/copy/home'
import { getCity, getRoutes } from '@/lib/content'
import { isPublished } from '@/lib/content/published'
import { localBusinessJsonLd, organizationJsonLd, websiteJsonLd } from '@/lib/seo/jsonld'
import { buildMetadata, buildTitle } from '@/lib/seo/metadata'

export const metadata = buildMetadata({
  title: buildTitle(['Taxi Service in Gorakhpur', 'Cabs to Nepal & India']),
  description:
    'Taxiverz is a Gorakhpur cab and travel company with a branch in Pune, running cabs across India and into Nepal. Call or WhatsApp +91 85760 00083.',
  path: '/',
})

/** Popular routes on home: featured first, then Gorakhpur's, at most 10. */
function popularRoutes() {
  return getRoutes()
    .toSorted(
      (a, b) =>
        Number(b.featured) - Number(a.featured) ||
        Number(b.origin === 'gorakhpur') - Number(a.origin === 'gorakhpur') ||
        a.slug.localeCompare(b.slug),
    )
    .slice(0, 10)
}

/**
 * Home (REBUILD_PLAN §4): hero slider (owner decision 2026-09-30) with the fare
 * box overlapping its lower edge, then verified trust points, services, the
 * fleet, popular routes, Nepal, weddings, how booking works, guides, FAQ.
 */
export default function HomePage() {
  // Only slides whose call to action leads to a live page.
  const slides: HeroSlide[] = heroSlides
    .filter((s) => isPublished(s.cta.href))
    .map((s) => ({ ...s, image: scenes[s.scene] }))

  return (
    <>
      <HeroSlider slides={slides} />
      <Container className="relative z-10 -mt-20 md:-mt-24">
        <h2 className="sr-only">Check your fare</h2>
        <div className="rounded-panel shadow-2xl shadow-black/20">
          <FareWidget />
        </div>
      </Container>
      <TrustStrip />
      <ServicesGrid title="Cabs for every kind of trip" />
      <FleetStrip />
      <RouteList
        title="Popular routes"
        routes={popularRoutes()}
        groupBy={(r) => (getCity(r.destination)?.country === 'NP' ? 'Into Nepal' : 'Across India')}
        id="popular-routes"
      />
      <NepalBand />
      <LuxuryBand />
      <HowBooking />
      <WhyTaxiverz />
      <GuidesStrip />
      <CorporateBand />
      <FaqSection faqs={homeFaqs} />
      <HomeCta />

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
