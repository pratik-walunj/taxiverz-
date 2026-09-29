import { Briefcase, Users } from 'lucide-react'
import type { VehicleClass } from '@/lib/schemas/content'
import { cx } from '@/lib/cx'

/** A vehicle class without a photo (none is owner-confirmed yet, F1): name, models, seats, luggage. */
export function ClassCard({
  vehicleClass: c,
  headingLevel = 3,
  className,
}: {
  vehicleClass: VehicleClass
  headingLevel?: 2 | 3
  className?: string
}) {
  const Heading = headingLevel === 2 ? 'h2' : 'h3'
  return (
    <article
      id={c.slug}
      className={cx(
        'border-line bg-paper rounded-panel flex h-full flex-col border p-4',
        className,
      )}
    >
      <Heading className="font-heading text-lg font-bold">{c.name}</Heading>
      <p className="text-muted mt-1">{c.representativeModels.join(', ')} or similar</p>
      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
        {c.seats !== null && (
          <li className="flex items-center gap-1.5">
            <Users aria-hidden="true" className="size-4" /> {c.seats} seats
          </li>
        )}
        {c.luggage !== null && (
          <li className="flex items-center gap-1.5">
            <Briefcase aria-hidden="true" className="size-4" /> {c.luggage} bags
          </li>
        )}
      </ul>
      {c.useCase && <p className="mt-3 text-sm">{c.useCase}</p>}
    </article>
  )
}
