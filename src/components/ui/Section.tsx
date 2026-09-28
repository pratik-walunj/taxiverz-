import type { ReactNode } from 'react'
import { Container } from '@/components/ui/Container'
import { cx } from '@/lib/cx'

type Register = 'standard' | 'mist' | 'luxury'

const registers: Record<Register, string> = {
  standard: 'bg-paper text-ink',
  mist: 'bg-mist text-ink',
  luxury: 'bg-night text-ivory',
}

export function Section({
  children,
  register = 'standard',
  className,
  labelledBy,
}: {
  children: ReactNode
  register?: Register
  className?: string
  labelledBy?: string
}) {
  return (
    <section
      aria-labelledby={labelledBy}
      className={cx('py-12 md:py-20', registers[register], className)}
    >
      <Container>{children}</Container>
    </section>
  )
}
