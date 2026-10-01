import { VehicleCard } from '@/components/cards/VehicleCard'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { getVehicles } from '@/lib/content'
import type { Vehicle } from '@/lib/schemas/content'

/**
 * The model-by-model fleet the legacy home page showed (everyday cars, the
 * luxury collections by make, tempo travellers and buses), as scrollable rows
 * of live vehicles. Server-rendered; no script.
 */
const GROUPS: { title: string; fits: (v: Vehicle) => boolean }[] = [
  { title: 'Everyday cars', fits: (v) => v.category === 'car' && v.tier !== 'luxury' },
  { title: 'Luxury and vintage cars', fits: (v) => v.category === 'car' && v.tier === 'luxury' },
  { title: 'Tempo travellers, vans and buses', fits: (v) => v.category === 'group' },
]

export function FleetShowcase() {
  const live = getVehicles()
  const groups = GROUPS.map((g) => ({
    ...g,
    vehicles: live
      .filter(g.fits)
      .toSorted((a, b) => a.make.localeCompare(b.make) || a.name.localeCompare(b.name)),
  })).filter((g) => g.vehicles.length > 0)
  if (groups.length === 0) return null
  return (
    <Section labelledBy="showcase-title">
      <SectionHeading
        id="showcase-title"
        eyebrow="Our fleet"
        title="Every car, van and bus you can book"
        intro="Swipe through the models. Open one for its details and how to book it."
        action={{ label: 'Whole fleet', href: '/fleet/' }}
      />
      {groups.map((g) => (
        <div key={g.title} className="mt-10">
          <h3 className="font-heading text-xl font-bold">
            {g.title}{' '}
            <span className="text-muted text-base font-normal">({g.vehicles.length})</span>
          </h3>
          <ul
            className="-mx-4 mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 md:mx-0 md:px-0"
            aria-label={g.title}
          >
            {g.vehicles.map((v) => (
              <li key={v.slug} className="w-60 shrink-0 snap-start sm:w-64">
                <VehicleCard vehicle={v} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </Section>
  )
}
