import { ClassCard } from '@/components/cards/ClassCard'
import { VehicleCard } from '@/components/cards/VehicleCard'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { CtaBand } from '@/components/sections/CtaBand'
import { Section } from '@/components/ui/Section'
import { getVehicleClasses, getVehicles } from '@/lib/content'
import { buildMetadata, buildTitle } from '@/lib/seo/metadata'

/**
 * Fleet hub. Fares are by class, so the hub lists classes; individual vehicle
 * pages appear once a vehicle is confirmed with its own photos (B3, F1).
 */
export const metadata = buildMetadata({
  title: buildTitle(['Our Fleet', 'Cars, SUVs & Tempo Travellers']),
  description:
    'Hatchbacks, sedans, SUVs, Innova Crysta, tempo travellers and Urbania with driver. Book by class; the exact model depends on availability.',
  path: '/fleet/',
})

const GROUPS = [
  {
    id: 'cars',
    title: 'Cars and SUVs',
    text: 'For one to seven travellers, from a WagonR for short hops to an Innova Crysta or Fortuner for family trips and long drives.',
    test: (toll: string) => toll === 'car',
  },
  {
    id: 'group',
    title: 'Tempo travellers, Urbania and Winger',
    text: 'For groups — weddings, pilgrimages, office outings and family tours. Pick by the number of seats you need.',
    test: (toll: string) => toll !== 'car',
  },
] as const

export default function FleetPage() {
  const classes = getVehicleClasses().toSorted((a, b) => a.sortOrder - b.sortOrder)
  const vehicles = getVehicles()
  return (
    <>
      <Section className="pt-6 md:pt-10" labelledBy="page-title">
        <Breadcrumbs trail={[{ name: 'Fleet', path: '/fleet/' }]} />
        <h1 id="page-title" className="text-h1 mt-6 font-extrabold tracking-tight">
          Our fleet: cars, SUVs, tempo travellers and Urbania
        </h1>
        <p className="text-muted mt-4 max-w-2xl text-lg">
          Every trip is priced by vehicle class. You choose the class — say, a sedan — and we send a
          Dzire, an Etios or a similar car. The exact model depends on availability; if it matters
          to you, tell us when you book.
        </p>
      </Section>
      {GROUPS.map((g) => {
        const list = classes.filter((c) => g.test(c.tollClass))
        if (list.length === 0) return null
        return (
          <Section
            key={g.id}
            register={g.id === 'group' ? 'mist' : 'standard'}
            labelledBy={`${g.id}-title`}
          >
            <h2 id={`${g.id}-title`} className="text-h2 font-bold">
              {g.title}
            </h2>
            <p className="text-muted mt-2 max-w-2xl">{g.text}</p>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((c) => (
                <li key={c.slug}>
                  <ClassCard vehicleClass={c} />
                </li>
              ))}
            </ul>
          </Section>
        )
      })}
      {vehicles.length > 0 && (
        <Section labelledBy="vehicles-title" className="cv-auto">
          <h2 id="vehicles-title" className="text-h2 font-bold">
            Individual vehicles
          </h2>
          <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {vehicles.map((v) => (
              <li key={v.slug}>
                <VehicleCard vehicle={v} />
              </li>
            ))}
          </ul>
        </Section>
      )}
      <CtaBand
        title="Not sure which car to pick?"
        text="Tell us how many people and how much luggage — we'll suggest the right class. Or check the fare for every class online."
        whatsappMessage="Hi Taxiverz, which car should I book for my trip?"
        placement="fleet-cta"
      />
    </>
  )
}
