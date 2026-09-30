import Image from 'next/image'
import type { ReactNode } from 'react'
import type { Scene } from '@/config/imagery'
import { Container } from '@/components/ui/Container'
import { cx } from '@/lib/cx'

/**
 * The top section of an inner page. With a scene it becomes a dark photo hero
 * (the photo is the page's LCP, so it is preloaded); without one it is the
 * plain light (or luxury-dark) hero. Children read `dark` to pick text colours.
 */
export function HeroSection({
  scene,
  luxury = false,
  labelledBy,
  children,
}: {
  scene?: Scene | null
  luxury?: boolean
  labelledBy: string
  children: (dark: boolean) => ReactNode
}) {
  const dark = Boolean(scene) || luxury
  return (
    <section
      aria-labelledby={labelledBy}
      className={cx(
        'relative isolate overflow-hidden',
        dark ? 'bg-night text-ivory' : 'bg-paper text-ink',
      )}
    >
      {scene && (
        <>
          <Image
            src={scene.src}
            alt=""
            fill
            sizes="100vw"
            preload
            quality={60}
            className="-z-20 object-cover"
          />
          <div
            aria-hidden="true"
            className="from-night via-night/85 to-night/40 absolute inset-0 -z-10 bg-gradient-to-r"
          />
        </>
      )}
      <Container className="pt-6 pb-12 md:pt-10 md:pb-20">{children(dark)}</Container>
      {scene && (
        <p className="text-ivory/60 absolute right-3 bottom-2 text-[11px]">
          Photo:{' '}
          <a href={scene.url} target="_blank" rel="noopener" className="underline">
            {scene.credit}
          </a>{' '}
          / Unsplash
        </p>
      )}
    </section>
  )
}
