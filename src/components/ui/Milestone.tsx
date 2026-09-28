import { cx } from '@/lib/cx'

/**
 * The Indian roadside milestone (DESIGN.md §6). Used only for routes and
 * distances. `km: null` shows the destination alone — never a placeholder.
 *
 * Geometry (viewBox 100 × 124): the cap is the dome down to y=54; text rows are
 * placed at fixed heights so long names never cross the cap edge.
 */
export function Milestone({
  nameEn,
  nameHi,
  km,
  size = 'sm',
  cap = 'nh',
  className,
}: {
  nameEn: string
  nameHi: string | null
  km: number | null
  size?: 'sm' | 'lg'
  /** 'nh' = national-highway yellow (the decided default); 'brand' exists only for the style-guide comparison. */
  cap?: 'nh' | 'brand'
  className?: string
}) {
  const label = km === null ? nameEn : `${nameEn}, ${km} km`
  const row = 'absolute inset-x-1.5 -translate-y-1/2 truncate text-center leading-none'
  return (
    <div
      className={cx(
        'text-ink relative inline-block shrink-0',
        size === 'sm' ? 'w-24' : 'w-36',
        className,
      )}
      role="img"
      aria-label={label}
    >
      <svg viewBox="0 0 100 124" className="block h-auto w-full" aria-hidden="true">
        <path
          d="M2 52 A48 48 0 0 1 98 52 V122 H2 Z"
          className="fill-paper stroke-line"
          strokeWidth="2"
        />
        <path
          d="M2 52 A48 48 0 0 1 98 52 V54 H2 Z"
          className={cap === 'nh' ? 'fill-nh-yellow' : 'fill-brand'}
        />
        <line x1="2" y1="122" x2="98" y2="122" className="stroke-ink/20" strokeWidth="3" />
      </svg>
      <div aria-hidden="true">
        {nameHi && (
          <span
            lang="hi"
            className={cx(
              row,
              'top-[31%] font-semibold',
              size === 'sm' ? 'text-[0.78rem]' : 'text-[1.05rem]',
            )}
          >
            {nameHi}
          </span>
        )}
        <span
          className={cx(
            row,
            km === null ? 'top-[70%]' : 'top-[57%]',
            'font-heading font-bold',
            size === 'sm' ? 'text-[0.8rem]' : 'text-[1.05rem]',
          )}
        >
          {nameEn}
        </span>
        {km !== null && (
          <span
            className={cx(
              row,
              'tabular font-heading top-[80%] font-extrabold',
              size === 'sm' ? 'text-xl' : 'text-3xl',
            )}
          >
            {km}
            <span
              className={cx(
                'ml-0.5 font-sans font-semibold',
                size === 'sm' ? 'text-xs' : 'text-sm',
              )}
            >
              km
            </span>
          </span>
        )}
      </div>
    </div>
  )
}
