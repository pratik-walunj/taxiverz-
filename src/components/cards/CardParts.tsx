import Link from 'next/link'
import type { ReactNode } from 'react'
import { ArrowRight, Phone, type LucideIcon } from 'lucide-react'
import { business } from '@/config/business'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { cx } from '@/lib/cx'
import { formatIndianPhone, telHref } from '@/lib/phone'
import { whatsappHref } from '@/lib/whatsapp'

/**
 * The parts every card on the site is built from (owner request 2026-10-01:
 * "all cards like the fleet cards"): a lifting frame, a badge over the picture,
 * icon spec tiles, a fare line, and the booking actions — main button,
 * WhatsApp, Call and "View details". `relative` on the frame keeps the
 * screen-reader-only text inside it (it would otherwise widen scrolled rows).
 */
export function CardFrame({
  children,
  dark = false,
  className,
  id,
}: {
  children: ReactNode
  dark?: boolean
  className?: string
  id?: string
}) {
  return (
    <article
      id={id}
      className={cx(
        'rounded-panel group/card relative flex h-full flex-col overflow-hidden border shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl',
        dark ? 'border-ivory/15 bg-night text-ivory' : 'border-line bg-paper',
        className,
      )}
    >
      {children}
    </article>
  )
}

export function CardBadge({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <span
      className={cx(
        'absolute top-3 left-3 z-10 rounded-full px-3 py-1 text-xs font-bold tracking-wide uppercase',
        dark ? 'bg-champagne text-night' : 'bg-ink/85 text-paper',
      )}
    >
      {children}
    </span>
  )
}

export interface CardSpec {
  icon: LucideIcon
  label: string
  value: string
}

/** Icon tiles. dt/dd are direct children of each item (axe: definition-list, dlitem). */
export function CardSpecs({ specs, dark = false }: { specs: CardSpec[]; dark?: boolean }) {
  if (specs.length === 0) return null
  return (
    <dl className="mt-4 grid grid-cols-2 gap-2">
      {specs.map(({ icon: Icon, label, value }) => (
        <div
          key={label}
          className={cx(
            'rounded-control relative py-2 pr-3 pl-9',
            dark ? 'bg-ivory/10' : 'bg-mist',
          )}
        >
          <dt className={cx('text-xs', dark ? 'text-night-muted' : 'text-muted')}>
            <Icon
              aria-hidden="true"
              className={cx(
                'absolute top-1/2 left-3 size-4 -translate-y-1/2',
                dark ? 'text-champagne' : 'text-brand-deep',
              )}
            />
            {label}
          </dt>
          <dd className="text-sm font-semibold">{value}</dd>
        </div>
      ))}
    </dl>
  )
}

export function CardFareLine({
  label = 'Fare',
  value,
  dark = false,
}: {
  label?: string
  value: string
  dark?: boolean
}) {
  return (
    <p
      className={cx(
        'mt-4 flex items-baseline justify-between gap-2 border-t pt-3 text-sm',
        dark ? 'border-ivory/15' : 'border-line',
      )}
    >
      <span className={dark ? 'text-night-muted' : 'text-muted'}>{label}</span>
      <span className="text-right font-semibold">{value}</span>
    </p>
  )
}

/**
 * Main button, WhatsApp and Call side by side, then "View details".
 * `subject` finishes the screen-reader names ("Book a Sedan on WhatsApp").
 */
export function CardActions({
  primary,
  details,
  subject,
  whatsappMessage,
  placement,
  dark = false,
}: {
  primary: { href: string; label: string }
  details?: { href: string; label?: string } | null
  subject: string
  whatsappMessage: string
  placement: string
  dark?: boolean
}) {
  return (
    <div className="mt-auto pt-4">
      <Link
        href={primary.href}
        className={cx(
          'rounded-control flex min-h-12 items-center justify-center px-4 text-center font-bold transition-colors',
          dark
            ? 'bg-champagne text-night hover:bg-ivory'
            : 'bg-brand text-ink hover:bg-[color-mix(in_srgb,var(--color-brand)_88%,black)]',
        )}
      >
        {primary.label}
        <span className="sr-only"> — {subject}</span>
      </Link>
      <div className="mt-2 grid grid-cols-2 gap-2">
        <a
          href={whatsappHref(business.whatsapp, whatsappMessage)}
          data-placement={placement}
          aria-label={`WhatsApp us about ${subject}`}
          className="bg-whatsapp text-ink rounded-control flex min-h-11 items-center justify-center gap-1.5 text-sm font-semibold"
        >
          <WhatsAppIcon className="size-4" /> WhatsApp
        </a>
        <a
          href={telHref(business.phone)}
          data-placement={placement}
          aria-label={`Call ${formatIndianPhone(business.phone)} about ${subject}`}
          className={cx(
            'rounded-control flex min-h-11 items-center justify-center gap-1.5 border text-sm font-semibold',
            dark ? 'border-ivory/30 hover:border-ivory' : 'border-line hover:border-ink/40',
          )}
        >
          <Phone aria-hidden="true" className="size-4" /> Call
        </a>
      </div>
      {details && (
        <Link
          href={details.href}
          className={cx(
            'group/link mt-2 flex min-h-11 items-center justify-center gap-1 font-semibold',
            dark ? 'text-champagne' : 'text-brand-deep',
          )}
        >
          {details.label ?? 'View details'}
          <span className="sr-only"> — {subject}</span>
          <ArrowRight
            aria-hidden="true"
            className="size-4 transition-transform group-hover/link:translate-x-1"
          />
        </Link>
      )}
    </div>
  )
}
