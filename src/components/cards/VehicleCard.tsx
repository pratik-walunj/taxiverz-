import Link from 'next/link'
import { ArrowRight, Briefcase, Users } from 'lucide-react'
import { Picture } from '@/components/ui/Picture'
import { vehiclePath } from '@/lib/content'
import { isUsableImage } from '@/lib/content/gates'
import { cx } from '@/lib/cx'
import type { Vehicle } from '@/lib/schemas/content'

/** A live vehicle: its picture (labelled when representative), name, a short description, seats. */
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
  const chip = cx(
    'rounded-control flex items-center gap-1.5 px-2.5 py-1',
    dark ? 'bg-ivory/10' : 'bg-mist',
  )
  return (
    <Link
      href={vehiclePath(v.slug)}
      className={cx(
        'rounded-panel group flex h-full flex-col overflow-hidden border shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl',
        dark
          ? 'border-ivory/15 bg-night hover:border-champagne'
          : 'border-line bg-paper hover:border-brand',
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
          imgClassName="aspect-[4/3] transition-transform duration-500 group-hover:scale-105"
        />
      )}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-heading text-lg font-bold">{v.name}</h3>
        {describe && v.summary && (
          <p className={cx('mt-1 line-clamp-3 text-sm', dark ? 'text-night-muted' : 'text-muted')}>
            {v.summary}
          </p>
        )}
        {(v.seats !== null || v.luggage !== null) && (
          <ul className="mt-3 flex flex-wrap gap-2 text-sm">
            {v.seats !== null && (
              <li className={chip}>
                <Users aria-hidden="true" className="size-4" /> {v.seats} seats
              </li>
            )}
            {v.luggage !== null && (
              <li className={chip}>
                <Briefcase aria-hidden="true" className="size-4" /> {v.luggage} bags
              </li>
            )}
          </ul>
        )}
        <span
          className={cx(
            'mt-auto inline-flex items-center gap-1 pt-3 font-semibold',
            dark ? 'text-champagne' : 'text-brand-deep',
          )}
        >
          View details
          <ArrowRight
            aria-hidden="true"
            className="size-4 transition-transform group-hover:translate-x-1"
          />
        </span>
      </div>
    </Link>
  )
}
