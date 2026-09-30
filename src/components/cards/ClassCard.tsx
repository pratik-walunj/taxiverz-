import { Briefcase, Car, Users } from 'lucide-react'
import { classImages, imageFor, isRepresentativeImage } from '@/config/imagery'
import { Picture } from '@/components/ui/Picture'
import type { VehicleClass } from '@/lib/schemas/content'
import { cx } from '@/lib/cx'

/** A vehicle class: a representative picture, name, models, seats, luggage. */
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
  const key = classImages[c.slug]
  const img = key ? imageFor(key) : null
  return (
    <article
      id={c.slug}
      className={cx(
        'border-line bg-paper rounded-panel flex h-full flex-col overflow-hidden border',
        className,
      )}
    >
      {!img && (
        // No usable picture for this class yet: keep the card the same shape.
        <div
          className="bg-mist text-muted flex aspect-[3/2] items-center justify-center"
          aria-hidden="true"
        >
          <Car className="size-10" />
        </div>
      )}
      {img && (
        <Picture
          src={img.src}
          alt={img.alt}
          width={img.width}
          height={img.height}
          sizes="(min-width: 1024px) 256px, 70vw"
          representative={isRepresentativeImage(img)}
          imgClassName="aspect-[3/2]"
        />
      )}
      <div className="flex flex-1 flex-col p-4">
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
      </div>
    </article>
  )
}
