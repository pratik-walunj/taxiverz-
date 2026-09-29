/**
 * Structural validation of our JSON-LD (Phase 7): every object has a type we
 * build on purpose, its required properties, and no empty values. Used by
 * `npm run qa` on every rendered page and by the builder unit tests. It is
 * not a full schema.org validator; it catches what our builders could get wrong.
 */
type Json = Record<string, unknown>

const REQUIRED: Record<string, string[]> = {
  Organization: ['name', 'url', 'logo', 'telephone'],
  WebSite: ['name', 'url'],
  LocalBusiness: ['name', 'address', 'telephone'],
  BreadcrumbList: ['itemListElement'],
  ListItem: ['position'],
  FAQPage: ['mainEntity'],
  Question: ['name', 'acceptedAnswer'],
  Answer: ['text'],
  Service: ['name', 'provider', 'url'],
  Article: ['headline', 'mainEntityOfPage'],
  BlogPosting: ['headline', 'datePublished', 'mainEntityOfPage'],
  TouristTrip: ['name', 'url'],
  PostalAddress: ['streetAddress', 'addressLocality', 'addressCountry'],
  GeoCoordinates: ['latitude', 'longitude'],
  Offer: ['price', 'priceCurrency'],
  ItemList: ['itemListElement'],
  City: ['name'],
  Place: ['name'],
}

/** Types that must never appear about Taxiverz (CLAUDE.md). */
const FORBIDDEN = new Set(['AggregateRating', 'Review'])

export function jsonLdProblems(value: unknown, path = '$'): string[] {
  const problems: string[] = []
  const visit = (v: unknown, at: string) => {
    if (Array.isArray(v)) {
      if (v.length === 0) problems.push(`${at}: empty array`)
      v.forEach((x, i) => visit(x, `${at}[${i}]`))
      return
    }
    if (v === null || v === undefined || v === '') {
      problems.push(`${at}: empty value`)
      return
    }
    if (typeof v !== 'object') return
    const obj = v as Json
    const type = obj['@type']
    if (typeof type === 'string') {
      if (FORBIDDEN.has(type)) problems.push(`${at}: ${type} markup is not allowed`)
      else if (!(type in REQUIRED)) problems.push(`${at}: unexpected @type "${type}"`)
      else
        for (const key of REQUIRED[type]!)
          if (!(key in obj)) problems.push(`${at}: ${type} is missing "${key}"`)
    }
    for (const [k, x] of Object.entries(obj)) if (k !== '@context') visit(x, `${at}.${k}`)
  }
  visit(value, path)
  return problems
}
