import Link from 'next/link'
import { ClassCard } from '@/components/cards/ClassCard'
import { Section } from '@/components/ui/Section'
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
      <div className="flex flex-wrap items-end justify-between gap-2">
        <h2 id="fleet-title" className="text-h2 font-bold">
          {title}
        </h2>
        {isPublished('/fleet/') && (
          <Link href="/fleet/" className="text-brand-deep font-semibold underline">
            See the whole fleet
          </Link>
        )}
      </div>
      {intro && <p className="text-muted mt-2 max-w-2xl">{intro}</p>}
      {/* Scrollable, so it must be reachable by keyboard (axe: scrollable-region-focusable). */}
      <div
        role="region"
        aria-label={title}
        tabIndex={0}
        className="-mx-4 mt-6 overflow-x-auto px-4 pb-2 md:mx-0 md:px-0"
      >
        <ul className="flex snap-x snap-mandatory gap-4">
          {classes.map((c) => (
            <li key={c.slug} className="w-64 shrink-0 snap-start">
              <ClassCard vehicleClass={c} />
            </li>
          ))}
        </ul>
      </div>
      <p className="text-muted mt-3 text-sm">The exact model depends on availability.</p>
    </Section>
  )
}
