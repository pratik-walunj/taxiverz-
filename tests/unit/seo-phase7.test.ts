import { describe, expect, it } from 'vitest'
import { business } from '@/config/business'
import { FOOTER_LINK_LIMIT, publishedFooterGroups } from '@/lib/nav'
import {
  breadcrumbJsonLd,
  faqJsonLd,
  localBusinessJsonLd,
  organizationJsonLd,
  serviceJsonLd,
  websiteJsonLd,
} from '@/lib/seo/jsonld'
import { jsonLdProblems } from '@/lib/seo/jsonld-check'
import { buildMetadata } from '@/lib/seo/metadata'

describe('JSON-LD builders (Phase 7 structure check)', () => {
  it('produce structurally complete markup', () => {
    const all = [
      organizationJsonLd(business),
      websiteJsonLd(business),
      ...business.branches.map((b) => localBusinessJsonLd(business, b)),
      breadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'Cabs', path: '/cabs/' },
      ]),
      faqJsonLd([{ q: 'How do I book?', a: 'Online, on WhatsApp or by phone.' }]),
      serviceJsonLd({
        name: 'Outstation cabs',
        description: 'Round trips with a driver.',
        path: '/outstation-cabs/',
        serviceType: 'Outstation cabs',
        areaServed: ['Gorakhpur'],
      }),
    ]
    for (const obj of all) expect(jsonLdProblems(obj), String(obj['@type'])).toEqual([])
  })

  it('drop unknown facts instead of printing empty values', () => {
    const lb = localBusinessJsonLd(business, business.branches[0]!)
    expect(lb).not.toHaveProperty('geo')
    expect(lb).not.toHaveProperty('openingHours')
  })
})

describe('JSON-LD check', () => {
  it('catches missing properties, empty values, unknown and forbidden types', () => {
    expect(
      jsonLdProblems({ '@type': 'Service', name: 'X', url: 'https://taxiverz.com/' }),
    ).toContain('$: Service is missing "provider"')
    expect(jsonLdProblems({ '@type': 'FAQPage', mainEntity: [] })).toContain(
      '$.mainEntity: empty array',
    )
    expect(
      jsonLdProblems({ '@type': 'Organization', name: '', url: 'u', logo: 'l', telephone: 't' }),
    ).toContain('$.name: empty value')
    expect(jsonLdProblems({ '@type': 'Product', name: 'X' })).toContain(
      '$: unexpected @type "Product"',
    )
    expect(
      jsonLdProblems({
        '@type': 'LocalBusiness',
        name: 'X',
        address: 'a',
        telephone: 't',
        aggregateRating: { '@type': 'AggregateRating' },
      }).join(' '),
    ).toMatch(/AggregateRating markup is not allowed/)
  })
})

describe('footer', () => {
  it('stays within the link cap and links published pages only', () => {
    const links = publishedFooterGroups().flatMap((g) => g.links)
    expect(links.length).toBeLessThanOrEqual(FOOTER_LINK_LIMIT)
    expect(links.map((l) => l.href)).toContain('/outstation-cabs/')
    expect(links.map((l) => l.href)).not.toContain('/wedding-cars/')
  })
})

describe('share images', () => {
  it('point generated images at their trailing-slash URL, others at the default', () => {
    const gen = buildMetadata({
      title: 'T | Taxiverz',
      description: 'D',
      path: '/nepal-taxi/',
      image: null,
    })
    expect(JSON.stringify(gen.openGraph)).toContain(
      'https://taxiverz.com/nepal-taxi/opengraph-image/',
    )
    const def = buildMetadata({ title: 'T | Taxiverz', description: 'D', path: '/about/' })
    expect(JSON.stringify(def.openGraph)).toContain('/images/brand/og-default.jpg')
  })
})
