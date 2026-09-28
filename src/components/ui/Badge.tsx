import type { ReactNode } from 'react'
import { cx } from '@/lib/cx'

export function Badge({
  children,
  tone = 'neutral',
}: {
  children: ReactNode
  tone?: 'neutral' | 'brand' | 'luxury'
}) {
  const tones = {
    neutral: 'bg-mist text-ink',
    brand: 'bg-brand/15 text-brand-deep',
    luxury: 'border border-champagne/60 text-champagne',
  }
  return (
    <span
      className={cx(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-sm font-medium',
        tones[tone],
      )}
    >
      {children}
    </span>
  )
}
