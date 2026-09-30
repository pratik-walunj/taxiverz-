import Image from 'next/image'
import type { ReactNode } from 'react'
import type { Scene } from '@/config/imagery'
import { Container } from '@/components/ui/Container'
import { cx } from '@/lib/cx'

/**
 * A full-width dark band over an Unsplash scene (lazy-loaded, below the fold),
 * with a readable gradient and the photographer's credit.
 */
export function PhotoBand({
  scene,
  labelledBy,
  children,
  align = 'left',
  className,
}: {
  scene: Scene
  labelledBy: string
  children: ReactNode
  align?: 'left' | 'center'
  className?: string
}) {
  return (
    <section
      aria-labelledby={labelledBy}
      className={cx('bg-night text-ivory relative isolate overflow-hidden', className)}
    >
      <Image
        src={scene.src}
        alt=""
        fill
        sizes="100vw"
        quality={60}
        className="-z-20 object-cover"
      />
      <div
        aria-hidden="true"
        className={cx(
          'absolute inset-0 -z-10',
          align === 'center'
            ? 'bg-night/70'
            : 'from-night via-night/80 to-night/30 bg-gradient-to-r',
        )}
      />
      <Container className={cx('py-16 md:py-24', align === 'center' && 'text-center')}>
        {children}
      </Container>
      <p className="text-ivory/60 absolute right-3 bottom-2 text-[11px]">
        Photo:{' '}
        <a href={scene.url} target="_blank" rel="noopener" className="underline">
          {scene.credit}
        </a>{' '}
        / Unsplash
      </p>
    </section>
  )
}
