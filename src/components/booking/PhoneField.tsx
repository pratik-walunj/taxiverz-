'use client'

import { useId } from 'react'

export type CountryCode = '+91' | '+977'

const PATTERNS: Record<CountryCode, RegExp> = { '+91': /^[6-9]\d{9}$/, '+977': /^9\d{9}$/ }

export const digitsOnly = (s: string) => s.replace(/\D/g, '')
export const validMobile = (cc: CountryCode, mobile: string) =>
  PATTERNS[cc].test(digitsOnly(mobile))
export const toE164 = (cc: CountryCode, mobile: string) => `${cc}${digitsOnly(mobile)}`

/** Mobile number with a +91 (default) / +977 country code. */
export function PhoneField({
  cc,
  onCc,
  value,
  onChange,
  error,
}: {
  cc: CountryCode
  onCc: (cc: CountryCode) => void
  value: string
  onChange: (v: string) => void
  error: string | null
}) {
  const id = useId()
  return (
    <div>
      <label htmlFor={`${id}-mobile`} className="mb-1 block text-sm font-semibold">
        Mobile number
      </label>
      <div className="flex gap-2">
        <label htmlFor={`${id}-cc`} className="sr-only">
          Country code
        </label>
        <select
          id={`${id}-cc`}
          value={cc}
          onChange={(e) => onCc(e.target.value as CountryCode)}
          className="border-ink/25 bg-paper rounded-control min-h-12 border px-2"
        >
          <option value="+91">+91 India</option>
          <option value="+977">+977 Nepal</option>
        </select>
        <input
          id={`${id}-mobile`}
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-err` : undefined}
          className="border-ink/25 bg-paper rounded-control min-h-12 w-full min-w-0 border px-3"
        />
      </div>
      {error && (
        <p id={`${id}-err`} className="text-brand-deep mt-1 text-sm font-semibold">
          {error}
        </p>
      )}
    </div>
  )
}
