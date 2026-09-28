import type { ReactNode } from 'react'
import { cx } from '@/lib/cx'

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx('max-w-site mx-auto w-full px-4 md:px-6', className)}>{children}</div>
}
