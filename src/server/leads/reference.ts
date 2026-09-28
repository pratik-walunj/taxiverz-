import { randomInt } from 'node:crypto'

// Crockford-style alphabet: no 0/O or 1/I/L, so refs survive being read out on the phone.
const ALPHABET = '23456789ABCDEFGHJKMNPQRSTUVWXYZ'

/** Booking reference TVZ-YYMMDD-XXXX, dated in India time. */
export function makeReference(
  now: Date = new Date(),
  random: (max: number) => number = randomInt,
): string {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Kolkata',
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(now)
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '00'
  const suffix = Array.from({ length: 4 }, () => ALPHABET[random(ALPHABET.length)]).join('')
  return `TVZ-${get('year')}${get('month')}${get('day')}-${suffix}`
}

export const REFERENCE_PATTERN = /^TVZ-\d{6}-[2-9A-HJKMNP-Z]{4}$/
