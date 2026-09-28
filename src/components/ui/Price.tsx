import { formatINR } from '@/lib/format'
import { cx } from '@/lib/cx'

/**
 * A price in rupees with Indian digit grouping and tabular figures.
 * `null` means the price isn't known: render the neutral fallback, never a blank or "₹--".
 */
export function Price({
  amount,
  fallback = 'Get a quote',
  className,
}: {
  amount: number | null
  fallback?: string
  className?: string
}) {
  if (amount === null) return <span className={cx('font-semibold', className)}>{fallback}</span>
  return <span className={cx('tabular font-bold', className)}>{formatINR(amount)}</span>
}
