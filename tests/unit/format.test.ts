import { describe, expect, it } from 'vitest'
import { parseEnv } from '@/config/env'
import { formatINR } from '@/lib/format'
import { formatIndianPhone, telHref } from '@/lib/phone'
import { whatsappHref } from '@/lib/whatsapp'

describe('formatINR', () => {
  it('uses Indian digit grouping and no decimals', () => {
    expect(formatINR(125000)).toBe('₹1,25,000')
    expect(formatINR(8990.6)).toBe('₹8,991')
  })
})

describe('phone and WhatsApp links', () => {
  it('formats and links the business number', () => {
    expect(formatIndianPhone('+918576000083')).toBe('+91 85760 00083')
    expect(telHref('+918576000083')).toBe('tel:+918576000083')
    expect(whatsappHref('+918576000083')).toBe('https://wa.me/918576000083')
    expect(whatsappHref('+918576000083', 'Hi & bye')).toBe(
      'https://wa.me/918576000083?text=Hi%20%26%20bye',
    )
  })
})

describe('parseEnv', () => {
  it('treats empty strings as unset', () => {
    expect(parseEnv({ NODE_ENV: 'test', DATABASE_URL: '' }).DATABASE_URL).toBeUndefined()
  })

  it('rejects a malformed DATABASE_URL', () => {
    expect(() => parseEnv({ DATABASE_URL: 'mysql://x' })).toThrow(/DATABASE_URL/)
  })
})
