import Image from 'next/image'
import Link from 'next/link'
import { vehiclePath } from '@/lib/content'
import { cx } from '@/lib/cx'
import type { Vehicle } from '@/lib/schemas/content'

/** A live vehicle: its own photo (F1), name, seats. Only live vehicles are ever passed in. */
export function VehicleCard({ vehicle: v, dark = false }: { vehicle: Vehicle; dark?: boolean }) {
  const photo = v.images.find((i) => i.source === 'own' && !i.bakedInText && !i.modelMismatch)
  return (
    <Link
      href={vehiclePath(v.slug)}
      className={cx(
        'rounded-panel group block overflow-hidden border',
        dark ? 'border-ivory/15 hover:border-champagne' : 'border-line hover:border-brand',
      )}
    >
      {photo && (
        <Image
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="aspect-[4/3] h-auto w-full object-cover"
        />
      )}
      <div className="p-4">
        <h3 className="font-heading text-lg font-bold">{v.name}</h3>
        {v.seats !== null && <p className="text-sm opacity-75">{v.seats} seats</p>}
      </div>
    </Link>
  )
}
