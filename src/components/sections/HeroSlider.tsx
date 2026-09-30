'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { cx } from '@/lib/cx'

export interface HeroSlide {
  key: string
  kicker: string
  heading: string
  text: string
  cta: { label: string; href: string }
  image: { src: string; alt: string; width: number; height: number; credit: string; url: string }
}

const INTERVAL_MS = 6500

/**
 * The home hero (owner decision 2026-09-30: an auto-advancing slider of
 * full-width photos). Built to stay fast and accessible (WCAG 2.2.2):
 *  - slide 1 is server-rendered with its photo preloaded (the LCP element);
 *    the other photos mount only once the page is idle;
 *  - it advances every 6.5 s and stops on hover, on keyboard focus, when the
 *    tab is hidden, as soon as the visitor starts using a form (the fare box),
 *    and never auto-plays for people who prefer reduced motion;
 *  - a visible pause/play button, previous/next and dots.
 * Only the first slide's heading is the page's <h1>.
 */
export function HeroSlider({ slides }: { slides: HeroSlide[] }) {
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [ready, setReady] = useState(false)
  const reducedMotion = useRef(false)

  useEffect(() => {
    reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion.current) setPlaying(false)
    const idle = (cb: () => void) => {
      if (typeof window.requestIdleCallback === 'function')
        window.requestIdleCallback(cb, { timeout: 3000 })
      else setTimeout(cb, 1500)
    }
    const start = () => idle(() => setReady(true))
    if (document.readyState === 'complete') start()
    else window.addEventListener('load', start, { once: true })
    // Someone filling in a form wants the page to hold still (and it keeps typing fast).
    const onFormFocus = (e: FocusEvent) => {
      if ((e.target as Element | null)?.closest?.('input, select, textarea')) setPlaying(false)
    }
    document.addEventListener('focusin', onFormFocus)
    return () => document.removeEventListener('focusin', onFormFocus)
  }, [])

  const go = useCallback(
    (i: number) => setActive((i + slides.length) % slides.length),
    [slides.length],
  )

  const running = playing && !hovered && !focused && ready
  useEffect(() => {
    if (!running) return
    const t = window.setInterval(() => {
      if (!document.hidden) setActive((a) => (a + 1) % slides.length)
    }, INTERVAL_MS)
    return () => window.clearInterval(t)
  }, [running, slides.length])

  const current = slides[active]!

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Taxiverz services"
      className="bg-night text-ivory relative isolate overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false)
      }}
    >
      {/* Photos: stacked, cross-fading. */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        {slides.map((s, i) =>
          i === 0 || ready ? (
            <div
              key={s.key}
              className={cx(
                'absolute inset-0 transition-opacity duration-1000',
                i === active ? 'opacity-100' : 'opacity-0',
              )}
            >
              <Image
                src={s.image.src}
                alt=""
                fill
                sizes="100vw"
                preload={i === 0}
                quality={60}
                className={cx(
                  'object-cover motion-safe:transition-transform motion-safe:duration-[7000ms] motion-safe:ease-out',
                  i === active ? 'scale-100' : 'motion-safe:scale-105',
                )}
              />
            </div>
          ) : null,
        )}
        <div className="from-night via-night/75 to-night/20 absolute inset-0 bg-gradient-to-r" />
        <div className="from-night/80 absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t to-transparent" />
      </div>

      <div className="max-w-site mx-auto px-4 pt-14 pb-28 md:px-6 md:pt-24 md:pb-36">
        <div className="grid">
          {slides.map((s, i) => {
            const isActive = i === active
            const Heading = i === 0 ? 'h1' : 'h2'
            return (
              <div
                key={s.key}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${slides.length}: ${s.image.alt}`}
                aria-hidden={!isActive}
                inert={!isActive}
                className={cx(
                  'col-start-1 row-start-1 max-w-2xl transition-all duration-700',
                  isActive
                    ? 'translate-y-0 opacity-100'
                    : 'pointer-events-none opacity-0 motion-safe:translate-y-3',
                )}
              >
                <p className="text-brand inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase">
                  <span aria-hidden="true" className="bg-brand h-0.5 w-8" />
                  {s.kicker}
                </p>
                <Heading className="text-display mt-4 font-extrabold tracking-tight text-balance drop-shadow-sm">
                  {s.heading}
                </Heading>
                <p className="text-ivory/85 mt-5 max-w-xl text-lg md:text-xl">{s.text}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href={s.cta.href}
                    className="bg-brand text-ink hover:bg-brand/90 rounded-control inline-flex min-h-12 items-center px-7 text-lg font-bold shadow-lg shadow-black/30 transition-colors"
                  >
                    {s.cta.label}
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? 'Pause the slides' : 'Play the slides'}
            className="border-ivory/40 hover:border-ivory hover:bg-ivory/10 inline-flex size-11 items-center justify-center rounded-full border backdrop-blur-sm"
          >
            {playing ? (
              <Pause aria-hidden="true" className="size-4" />
            ) : (
              <Play aria-hidden="true" className="size-4" />
            )}
          </button>
          <button
            type="button"
            onClick={() => go(active - 1)}
            aria-label="Previous slide"
            className="border-ivory/40 hover:border-ivory hover:bg-ivory/10 inline-flex size-11 items-center justify-center rounded-full border backdrop-blur-sm"
          >
            <ChevronLeft aria-hidden="true" className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => go(active + 1)}
            aria-label="Next slide"
            className="border-ivory/40 hover:border-ivory hover:bg-ivory/10 inline-flex size-11 items-center justify-center rounded-full border backdrop-blur-sm"
          >
            <ChevronRight aria-hidden="true" className="size-5" />
          </button>
          <div className="ml-1 flex items-center">
            {slides.map((s, i) => (
              <button
                key={s.key}
                type="button"
                onClick={() => go(i)}
                aria-label={`Show slide ${i + 1}: ${s.kicker}`}
                aria-current={i === active ? 'true' : undefined}
                className="inline-flex h-11 w-7 items-center justify-center sm:w-11"
              >
                <span
                  aria-hidden="true"
                  className={cx(
                    'block h-1.5 rounded-full transition-all duration-500',
                    i === active ? 'bg-brand w-8' : 'bg-ivory/50 w-3',
                  )}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="text-ivory/60 absolute right-3 bottom-20 text-[11px] md:bottom-24">
        Photo:{' '}
        <a href={current.image.url} target="_blank" rel="noopener" className="underline">
          {current.image.credit}
        </a>{' '}
        / Unsplash
      </p>
    </section>
  )
}
