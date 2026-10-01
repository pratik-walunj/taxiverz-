import { Bike, Briefcase, Car, ClipboardList, KeyRound, UserRound, Users } from 'lucide-react'
import { Picture } from '@/components/ui/Picture'
import { getVehicleClass, vehiclePath } from '@/lib/content'
import { isUsableImage } from '@/lib/content/gates'
import type { Vehicle } from '@/lib/schemas/content'
import {
  CardActions,
  CardBadge,
  CardFareLine,
  CardFrame,
  CardSpecs,
  type CardSpec,
} from './CardParts'

const BADGE: Record<Vehicle['tier'], string> = {
  economy: 'Car with driver',
  comfort: 'Car with driver',
  premium: 'Premium',
  luxury: 'Luxury',
  group: 'Group travel',
  bike: 'Bike rental',
}

/**
 * A live vehicle in the same shape as the fleet cards: picture (labelled when
 * representative), badge, name and class, a short description, spec tiles,
 * how it's priced, and the booking actions.
 */
export function VehicleCard({
  vehicle: v,
  dark = false,
  describe = true,
}: {
  vehicle: Vehicle
  dark?: boolean
  /** Show the short description. Off where many pages list the same cards (near-duplicate check). */
  describe?: boolean
}) {
  const photo = v.images.find(isUsableImage)
  const cls = v.classSlug ? getVehicleClass(v.classSlug) : undefined
  const instant = v.bookingMode === 'instant'
  const bike = v.category === 'bike'
  const path = vehiclePath(v.slug)
  const specs: CardSpec[] = [
    ...(v.seats !== null
      ? [{ icon: Users, label: 'Seats', value: bike ? String(v.seats) : `${v.seats} + driver` }]
      : []),
    ...(v.luggage !== null
      ? [{ icon: Briefcase, label: 'Luggage', value: `${v.luggage} bags` }]
      : []),
    { icon: ClipboardList, label: 'Booking', value: instant ? 'Fare online' : 'By enquiry' },
    bike
      ? { icon: Bike, label: 'Ride', value: 'You ride it' }
      : v.selfDrive
        ? { icon: KeyRound, label: 'Driver', value: 'Self-drive too' }
        : { icon: UserRound, label: 'Driver', value: 'Included' },
  ]

  return (
    <CardFrame dark={dark}>
      <div className="relative">
        {photo ? (
          <Picture
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            representative={photo.source !== 'own'}
            imgClassName="aspect-[4/3] transition-transform duration-500 group-hover/card:scale-105"
          />
        ) : (
          <div
            className="bg-mist text-muted flex aspect-[4/3] items-center justify-center"
            aria-hidden="true"
          >
            <Car className="size-10" />
          </div>
        )}
        <CardBadge dark={dark}>{BADGE[v.tier]}</CardBadge>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-heading text-xl font-extrabold">{v.name}</h3>
        <p
          className={
            dark ? 'text-champagne text-sm font-semibold' : 'text-brand-deep text-sm font-semibold'
          }
        >
          {cls ? `${cls.name} class` : v.make !== 'Unknown' ? v.make : BADGE[v.tier]}
        </p>
        {describe && v.summary && (
          <p className={dark ? 'text-night-muted mt-3' : 'text-muted mt-3'}>{v.summary}</p>
        )}
        <CardSpecs specs={specs} dark={dark} />
        <CardFareLine
          dark={dark}
          value={instant ? 'Shown online for your trip' : 'Quoted for your date'}
        />
        <CardActions
          primary={
            instant
              ? { href: '/book/', label: 'Check fare' }
              : { href: `${path}#price-title`, label: 'Get the price' }
          }
          details={{ href: path }}
          subject={`the ${v.name}`}
          whatsappMessage={`Hi Taxiverz, I'd like to enquire about the ${v.name}.`}
          placement="vehicle-card"
          dark={dark}
        />
      </div>
    </CardFrame>
  )
}
