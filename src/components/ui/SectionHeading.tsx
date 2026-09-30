import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cx } from '@/lib/cx'

/**
 * A section heading with a small eyebrow label, the title, an optional intro
 * and an optional "see all" link — one pattern for every home and hub section.
 */
export function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
  action,
  dark = false,
  className,
}: {
  id: string
  eyebrow?: string
  title: string
  intro?: string
  action?: { href: string; label: string } | null
  dark?: boolean
  className?: string
}) {
  return (
    <div className={cx('flex flex-wrap items-end justify-between gap-4', className)}>
      <div className="max-w-2xl">
        {eyebrow && (
          <p
            className={cx(
              'inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase',
              dark ? 'text-champagne' : 'text-brand-deep',
            )}
          >
            <span
              aria-hidden="true"
              className={cx('h-0.5 w-6', dark ? 'bg-champagne' : 'bg-brand')}
            />
            {eyebrow}
          </p>
        )}
        <h2 id={id} className="text-h2 mt-2 font-extrabold tracking-tight">
          {title}
        </h2>
        {intro && (
          <p className={cx('mt-3 text-lg', dark ? 'text-night-muted' : 'text-muted')}>{intro}</p>
        )}
      </div>
      {action && (
        <Link
          href={action.href}
          className={cx(
            'group inline-flex min-h-12 items-center gap-2 font-semibold',
            dark ? 'text-champagne' : 'text-brand-deep',
          )}
        >
          {action.label}
          <ArrowRight
            aria-hidden="true"
            className="size-4 transition-transform group-hover:translate-x-1"
          />
        </Link>
      )}
    </div>
  )
}
