import { Briefcase, Car, MapPinned, UserRound, Users } from 'lucide-react'
import { classImages, imageFor, isRepresentativeImage } from '@/config/imagery'
import { Picture } from '@/components/ui/Picture'
import { getVehicles, vehiclePath } from '@/lib/content'
import type { VehicleClass } from '@/lib/schemas/content'
import {
  CardActions,
  CardBadge,
  CardFareLine,
  CardFrame,
  CardSpecs,
  type CardSpec,
} from './CardParts'

/** The model page a class card's "View details" opens: its first representative model that is live. */
function detailsFor(c: VehicleClass): string | null {
  const inClass = getVehicles().filter((v) => v.classSlug === c.slug)
  const byModel = c.representativeModels
    .map((m) => inClass.find((v) => v.name.toLowerCase().includes(m.toLowerCase())))
    .find(Boolean)
  const v = byModel ?? inClass[0]
  return v ? vehiclePath(v.slug) : null
}

/**
 * A vehicle class, carrying what the legacy fleet cards carried — type, seats,
 * luggage, what it's for, how to book, the phone number and "View details" —
 * minus the unconfirmed per-km prices (RATE_CARD): the fare is shown online
 * for the actual trip.
 */
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
  const group = c.tollClass !== 'car'
  const details = detailsFor(c)
  const specs: CardSpec[] = [
    ...(c.seats !== null ? [{ icon: Users, label: 'Seats', value: `${c.seats} + driver` }] : []),
    ...(c.luggage !== null
      ? [{ icon: Briefcase, label: 'Luggage', value: `${c.luggage} bags` }]
      : []),
    { icon: MapPinned, label: 'Trips', value: group ? 'Tours & outstation' : 'Local & outstation' },
    { icon: UserRound, label: 'Driver', value: 'Included' },
  ]

  return (
    <CardFrame id={c.slug} className={className}>
      <div className="relative">
        {img ? (
          <Picture
            src={img.src}
            alt={img.alt}
            width={img.width}
            height={img.height}
            sizes="(min-width: 1280px) 300px, (min-width: 640px) 45vw, 90vw"
            representative={isRepresentativeImage(img)}
            imgClassName="aspect-[3/2] transition-transform duration-500 group-hover/card:scale-105"
          />
        ) : (
          // No usable picture for this class yet: keep the card the same shape.
          <div
            className="bg-mist text-muted flex aspect-[3/2] items-center justify-center"
            aria-hidden="true"
          >
            <Car className="size-10" />
          </div>
        )}
        <CardBadge>{group ? 'Group travel' : 'Car with driver'}</CardBadge>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <Heading className="font-heading text-xl font-extrabold">{c.name}</Heading>
        <p className="text-brand-deep text-sm font-semibold">
          {c.representativeModels.join(', ')} or similar
        </p>
        {c.useCase && <p className="text-muted mt-3">{c.useCase}</p>}
        <CardSpecs specs={specs} />
        <CardFareLine value="Shown online for your trip" />
        <CardActions
          primary={{ href: '/book/', label: 'Check fare' }}
          details={details ? { href: details } : null}
          subject={`the ${c.name}`}
          whatsappMessage={`Hi Taxiverz, I'd like to book a ${c.name}.`}
          placement="class-card"
        />
      </div>
    </CardFrame>
  )
}
