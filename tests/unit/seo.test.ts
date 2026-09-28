import { describe, expect, it } from 'vitest'
import { business } from '@/config/business'
import { businessSchema } from '@/lib/schemas/business'
import { breadcrumbJsonLd, localBusinessJsonLd, organizationJsonLd } from '@/lib/seo/jsonld'
import { absoluteUrl, buildMetadata, buildTitle, TITLE_MAX } from '@/lib/seo/metadata'

describe('buildTitle', () => {
  it('keeps the brand last and fits in 60 characters', () => {
    expect(buildTitle(['Taxi Service in Gorakhpur', 'Cabs to Nepal & India'])).toBe(
      'Taxi Service in Gorakhpur | Cabs to Nepal & India | Taxiverz',
    )
  })

  it('drops trailing segments rather than overflowing', () => {
    const t = buildTitle([
      'Gorakhpur to Kathmandu Taxi',
      'One Way & Round Trip',
      'Nepal door to door',
    ])
    expect(t.length).toBeLessThanOrEqual(TITLE_MAX)
    expect(t.endsWith('| Taxiverz')).toBe(true)
  })
})

describe('buildMetadata', () => {
  it('produces an absolute, trailing-slash canonical', () => {
    const m = buildMetadata({ title: 'A | Taxiverz', description: 'D', path: '/cabs/gorakhpur' })
    expect(m.alternates?.canonical).toBe('https://taxiverz.com/cabs/gorakhpur/')
    expect(absoluteUrl('/')).toBe('https://taxiverz.com/')
  })

  it('rejects descriptions over 155 characters', () => {
    expect(() => buildMetadata({ title: 'A', description: 'x'.repeat(156), path: '/' })).toThrow()
  })
})

describe('JSON-LD builders', () => {
  it('business config is valid', () => {
    expect(businessSchema.safeParse(business).success).toBe(true)
  })

  it('omits unknown facts and never includes ratings', () => {
    const org = JSON.stringify(organizationJsonLd(business))
    expect(org).not.toContain('null')
    expect(org).not.toContain('AggregateRating')
    expect(org).not.toContain('sameAs') // no confirmed social profiles yet
    const lb = localBusinessJsonLd(business, business.branches[0]!)
    expect(lb['@type']).toBe('LocalBusiness')
    expect(JSON.stringify(lb)).not.toContain('"geo"') // coordinates unverified
  })

  it('numbers breadcrumb positions from 1 with absolute URLs', () => {
    const bc = breadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'Cabs', path: '/cabs/' },
    ]) as unknown as { itemListElement: { position: number; item: string }[] }
    expect(bc.itemListElement[1]).toMatchObject({ position: 2, item: 'https://taxiverz.com/cabs/' })
  })
})
