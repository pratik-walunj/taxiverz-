import type { Branch, Business } from '@/lib/schemas/business'
import type { Faq } from '@/lib/schemas/content'
import { site } from '@/config/site'
import { absoluteUrl } from '@/lib/seo/metadata'

export type JsonLdObject = { '@context'?: 'https://schema.org'; '@type': string } & Record<
  string,
  unknown
>

const ORG_ID = `${site.url}/#organization`
const LOGO_PATH = '/images/brand/logo.png'

/** Drops null/undefined values and empty arrays so unknown facts never appear. */
function compact<T extends Record<string, unknown>>(obj: T): T {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([, v]) => v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0),
    ),
  ) as T
}

function sameAs(business: Business): string[] {
  return [business.socials.instagram, business.socials.facebook, business.socials.youtube].filter(
    (u): u is string => Boolean(u),
  )
}

export function organizationJsonLd(business: Business): JsonLdObject {
  return compact({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: business.brandName,
    legalName: business.legalName,
    url: `${site.url}/`,
    logo: new URL(LOGO_PATH, site.url).toString(),
    telephone: business.phone,
    email: business.email,
    foundingDate: business.foundedYear ? String(business.foundedYear) : null,
    sameAs: sameAs(business),
  })
}

export function websiteJsonLd(business: Business): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site.url}/#website`,
    name: business.brandName,
    url: `${site.url}/`,
    inLanguage: 'en-IN',
    publisher: { '@id': ORG_ID },
  }
}

/** One LocalBusiness per branch. Never carries AggregateRating or Review (CLAUDE.md). */
export function localBusinessJsonLd(business: Business, branch: Branch): JsonLdObject {
  return compact({
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${site.url}/#branch-${branch.id}`,
    name: `${business.brandName} — ${branch.city}`,
    parentOrganization: { '@id': ORG_ID },
    url: `${site.url}/`,
    image: new URL(LOGO_PATH, site.url).toString(),
    telephone: business.phone,
    email: business.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: branch.streetAddress,
      addressLocality:
        branch.locality === branch.city ? branch.city : `${branch.locality}, ${branch.city}`,
      addressRegion: branch.region,
      postalCode: branch.postalCode,
      addressCountry: branch.country,
    },
    geo: branch.geo
      ? { '@type': 'GeoCoordinates', latitude: branch.geo.lat, longitude: branch.geo.lng }
      : null,
    openingHours: branch.hours,
    hasMap: branch.mapsUrl,
  })
}

export interface Crumb {
  name: string
  path: string
}

export function breadcrumbJsonLd(crumbs: readonly Crumb[]): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  }
}

/** A service offered from a place (service hubs, service × city, city hubs). No offers or prices until verified. */
export function serviceJsonLd(input: {
  name: string
  description: string
  path: string
  serviceType: string
  areaServed: readonly string[]
}): JsonLdObject {
  return compact({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    serviceType: input.serviceType,
    provider: { '@id': ORG_ID },
    areaServed: input.areaServed.map((name) => ({ '@type': 'City', name })),
  })
}

/** FAQPage for meaning only; no rich result is promised (REBUILD_PLAN §3.7). */
export function faqJsonLd(faqs: readonly Faq[]): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}
