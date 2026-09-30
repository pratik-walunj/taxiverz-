import Link from 'next/link'
import { Picture } from '@/components/ui/Picture'
import { vehiclePath } from '@/lib/content'
import { isUsableImage } from '@/lib/content/gates'
import { cx } from '@/lib/cx'
import type { Vehicle } from '@/lib/schemas/content'

/** A live vehicle: its picture (labelled when representative), name, seats. */
export function VehicleCard({ vehicle: v, dark = false }: { vehicle: Vehicle; dark?: boolean }) {
  const photo = v.images.find(isUsableImage)
  return (
    <Link
      href={vehiclePath(v.slug)}
      className={cx(
        'rounded-panel group block overflow-hidden border',
        dark ? 'border-ivory/15 hover:border-champagne' : 'border-line hover:border-brand',
      )}
    >
      {photo && (
        <Picture
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          representative={photo.source !== 'own'}
          imgClassName="aspect-[4/3]"
        />
      )}
      <div className="p-4">
        <h3 className="font-heading text-lg font-bold">{v.name}</h3>
        {v.seats !== null && <p className="text-sm opacity-75">{v.seats} seats</p>}
      </div>
    </Link>
  )
}
