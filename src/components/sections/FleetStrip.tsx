import { ClassCard } from '@/components/cards/ClassCard'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { getVehicleClasses } from '@/lib/content'
import { isPublished } from '@/lib/content/published'
import type { VehicleClass } from '@/lib/schemas/content'

/** Vehicle classes: a scroll-snap row on phones, a grid from tablet up (DESIGN.md: fleet by tier). */
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
    <Section register="mist" labelledBy="fleet-title" className="cv-auto">
      <SectionHeading
        id="fleet-title"
        eyebrow="The fleet"
        title={title}
        intro={intro}
        action={isPublished('/fleet/') ? { href: '/fleet/', label: 'See the whole fleet' } : null}
      />

      {/* Phones: a swipeable row (reachable by keyboard — axe: scrollable-region-focusable).
          Wider screens: a grid, so every card and its details are in view. */}
      <div
        role="region"
        aria-label={title}
        tabIndex={0}
        className="-mx-4 mt-8 overflow-x-auto px-4 pb-4 sm:mx-0 sm:overflow-visible sm:px-0 sm:pb-0"
      >
        <ul className="flex snap-x snap-mandatory gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {classes.map((c) => (
            <li
              key={c.slug}
              className="w-[82%] max-w-80 shrink-0 snap-start sm:w-auto sm:max-w-none"
            >
              <ClassCard vehicleClass={c} />
            </li>
          ))}
        </ul>
      </div>
      <p className="text-muted mt-3 text-sm">The exact model depends on availability.</p>
    </Section>
  )
}
