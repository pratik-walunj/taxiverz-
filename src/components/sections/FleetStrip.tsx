import { ClassCard } from '@/components/cards/ClassCard'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { getVehicleClasses } from '@/lib/content'
import { isPublished } from '@/lib/content/published'
import type { VehicleClass } from '@/lib/schemas/content'

/** Vehicle classes in a horizontal scroll-snap row (DESIGN.md: fleet by tier). */
export function FleetStrip({
  title = 'Cars and vans you can book',
  filter,
  intro,
}: {
  title?: string
  filter?: (c: VehicleClass) => boolean
  intro?: string
}) {
  const classes = getVehicleClasses()
    .filter(filter ?? (() => true))
    .toSorted((a, b) => a.sortOrder - b.sortOrder)
  if (classes.length === 0) return null
  return (
    <Section register="mist" labelledBy="fleet-title">
      <SectionHeading
        id="fleet-title"
        eyebrow="The fleet"
        title={title}
        intro={intro}
        action={isPublished('/fleet/') ? { href: '/fleet/', label: 'See the whole fleet' } : null}
      />

      {/* Scrollable, so it must be reachable by keyboard (axe: scrollable-region-focusable). */}
      <div
        role="region"
        aria-label={title}
        tabIndex={0}
        className="-mx-4 mt-8 overflow-x-auto px-4 pb-2 md:mx-0 md:px-0"
      >
        <ul className="flex snap-x snap-mandatory gap-4">
          {classes.map((c) => (
            <li key={c.slug} className="w-64 shrink-0 snap-start transition hover:-translate-y-1">
              <ClassCard vehicleClass={c} />
            </li>
          ))}
        </ul>
      </div>
      <p className="text-muted mt-3 text-sm">The exact model depends on availability.</p>
    </Section>
  )
}
