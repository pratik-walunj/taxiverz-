import Link from 'next/link'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { cx } from '@/lib/cx'

type Variant = 'primary' | 'secondary' | 'whatsapp' | 'ghost' | 'luxury'
type Size = 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 rounded-control font-semibold transition-colors duration-200 disabled:opacity-60 min-h-12'

const variants: Record<Variant, string> = {
  primary: 'bg-brand text-ink hover:bg-[color-mix(in_srgb,var(--color-brand)_88%,black)]',
  secondary: 'border border-ink/20 bg-paper text-ink hover:border-ink/40 hover:bg-mist',
  whatsapp: 'bg-whatsapp text-ink hover:bg-[color-mix(in_srgb,var(--color-whatsapp)_88%,black)]',
  ghost: 'text-brand-deep underline-offset-4 hover:underline',
  luxury: 'border border-ivory/70 text-ivory hover:bg-ivory hover:text-night',
}

const sizes: Record<Size, string> = {
  md: 'px-4 text-base',
  lg: 'px-6 text-lg',
}

interface CommonProps {
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
}

type LinkButtonProps = CommonProps & { href: string } & Omit<
    ComponentPropsWithoutRef<'a'>,
    'href' | 'className'
  >
type NativeButtonProps = CommonProps & { href?: undefined } & Omit<
    ComponentPropsWithoutRef<'button'>,
    'className'
  >

export function Button(props: LinkButtonProps | NativeButtonProps) {
  const { variant = 'primary', size = 'md', className, children } = props
  const classes = cx(base, variants[variant], sizes[size], className)

  if (props.href !== undefined) {
    const { href, variant: _v, size: _s, className: _c, children: _ch, ...rest } = props
    if (href.startsWith('/')) {
      return (
        <Link href={href} className={classes} {...rest}>
          {children}
        </Link>
      )
    }
    const external = href.startsWith('http')
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener' } : {})}
        {...rest}
      >
        {children}
      </a>
    )
  }

  const { variant: _v, size: _s, className: _c, children: _ch, type = 'button', ...rest } = props
  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  )
}
