import { describe, expect, it, vi } from 'vitest'
import { business } from '@/config/business'
import { getPublishedPaths } from '@/lib/content/published'
import { privacyPolicy, refundPolicy, termsOfBooking } from '@/lib/policies'
import { leadInputSchema } from '@/lib/schemas/lead'
import type { Business } from '@/lib/schemas/business'

const text = (sections: { heading: string; paragraphs: string[]; list?: string[] }[]) =>
  sections.flatMap((s) => [s.heading, ...s.paragraphs, ...(s.list ?? [])]).join('\n')

describe('Phase 6 publish set', () => {
  it('publishes the support pages and holds the ones that need owner decisions', () => {
    const paths = getPublishedPaths()
    for (const p of [
      '/about/',
      '/contact/',
      '/faq/',
      '/privacy/',
      '/attach-your-taxi/',
      '/drive-with-us/',
    ])
      expect(paths, p).toContain(p)
    for (const p of ['/terms/', '/refund-policy/', '/reviews/']) expect(paths, p).not.toContain(p)
  })
})

describe('privacy policy', () => {
  const policy = (b: Business = business, gtm = false, clarity = false) =>
    text(privacyPolicy({ business: b, analytics: { gtm, clarity } }))

  it('states the owner’s retention rule and the DPDP rights', () => {
    const t = policy()
    expect(t).toContain('24 months after your last contact')
    expect(t).toContain('Digital Personal Data Protection Act, 2023')
    expect(t).toContain('Data Protection Board of India')
  })

  it('names the business contacts until a grievance officer is set', () => {
    expect(policy()).toContain('cabtaxiverz@gmail.com')
    expect(policy()).toContain('+91 85760 00083')
    const withOfficer = policy({
      ...business,
      grievanceOfficer: { name: 'A. Sharma', email: 'grievance@example.org', phone: null },
    })
    expect(withOfficer).toContain('Grievance Officer, A. Sharma, at grievance@example.org')
  })

  it('describes analytics only when it is switched on', () => {
    expect(policy()).toContain('We do not currently use analytics or advertising cookies.')
    expect(policy(business, true)).toContain('Google Tag Manager')
    expect(policy(business, true, true)).toContain('Microsoft Clarity')
  })

  it('never makes a payment, cancellation or refund promise', () => {
    expect(policy()).not.toMatch(/refund|cancel|advance/i)
  })
})

describe('terms and refund', () => {
  const decided: Business = {
    ...business,
    policies: { freeCancellationHours: 24, advancePercent: 20, refundDays: 7 },
    paymentMethods: ['UPI', 'Cash to the driver'],
    policyReviewed: { privacy: null, terms: '2026-10-01', refund: '2026-10-01' },
  }

  it('say only what the owner decided', () => {
    const terms = text(
      termsOfBooking({ business: decided, analytics: { gtm: false, clarity: false } }),
    )
    expect(terms).toContain('advance of 20%')
    expect(terms).toContain('up to 24 hours before')
    expect(terms).toContain('UPI')
    const refund = text(
      refundPolicy({ business: decided, analytics: { gtm: false, clarity: false } }),
    )
    expect(refund).toContain('within 7 days')
  })

  it('publish once the owner’s decisions are in config', async () => {
    vi.resetModules()
    vi.doMock('@/config/business', () => ({ business: decided }))
    const { termsReady, refundReady } = await import('@/lib/content/static-pages')
    expect(termsReady()).toBe(true)
    expect(refundReady()).toBe(true)
    vi.doUnmock('@/config/business')
  })
})

describe('partner leads', () => {
  const base = {
    contact: { name: 'Ravi', phone: '+919876543210' },
    consent: { whatsappOptIn: false },
    page: '/attach-your-taxi/',
    startedAt: 1,
  }

  it('accept vehicle and driving details', () => {
    const attach = leadInputSchema.parse({
      ...base,
      type: 'partner-attach',
      details: {
        vehicle: 'Innova Crysta',
        vehicleYear: 2021,
        permit: 'All-India tourist permit',
        city: 'Gorakhpur',
      },
    })
    expect(attach.details?.vehicleYear).toBe(2021)
    const driver = leadInputSchema.parse({
      ...base,
      type: 'partner-driver',
      details: { licence: 'LMV (car)', yearsDriving: 8, languages: 'Hindi, Bhojpuri' },
    })
    expect(driver.details?.yearsDriving).toBe(8)
    expect(() =>
      leadInputSchema.parse({ ...base, type: 'partner-attach', details: { vehicleYear: 1970 } }),
    ).toThrow()
  })
})
