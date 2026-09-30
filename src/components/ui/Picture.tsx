import Image from 'next/image'
import { cx } from '@/lib/cx'

/**
 * An image with the "Representative image" label when it isn't Taxiverz's own
 * photo (owner decision 2026-09-30, until F1). The label sits on the picture,
 * so it is never separated from it.
 */
export function Picture({
  src,
  alt,
  width,
  height,
  sizes,
  representative,
  preload = false,
  className,
  imgClassName,
}: {
  src: string
  alt: string
  width: number
  height: number
  sizes: string
  representative: boolean
  preload?: boolean
  className?: string
  imgClassName?: string
}) {
  return (
    <figure className={cx('relative', className)}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        preload={preload}
        className={cx('h-auto w-full object-cover', imgClassName)}
      />
      {representative && (
        <figcaption className="bg-ink/70 absolute right-1.5 bottom-1.5 rounded px-1.5 py-0.5 text-[11px] leading-tight text-white">
          Representative image
        </figcaption>
      )}
    </figure>
  )
}
