import type { Service, ServiceCity } from '@/lib/schemas/content'
import { gorakhpurServices } from './copy/gorakhpur'
import { nepalCityCopy } from './copy/verticals'
import type { PageCopy } from './copy/types'
import { serviceCopy, subPageCopy } from './copy/services'

/**
 * The 13 service hubs (REBUILD_PLAN §2.2). Intros and FAQs are written in
 * Phases 4A/5; until then every service is draft.
 */
type ServiceInput = Pick<Service, 'slug' | 'name' | 'register' | 'sells' | 'widgetTab'> & {
  subPages?: { slug: string; name: string }[]
}

const input: ServiceInput[] = [
  {
    slug: 'outstation-cabs',
    name: 'Outstation cabs',
    register: 'standard',
    sells: 'fare-widget',
    widgetTab: 'round-trip',
  },
  {
    slug: 'one-way-cabs',
    name: 'One-way cabs',
    register: 'standard',
    sells: 'fare-widget',
    widgetTab: 'one-way',
  },
  {
    slug: 'airport-taxi',
    name: 'Airport taxi',
    register: 'standard',
    sells: 'fare-widget',
    widgetTab: 'airport',
  },
  {
    slug: 'local-car-rental',
    name: 'Car rental with driver',
    register: 'standard',
    sells: 'fare-widget',
    widgetTab: 'local',
  },
  {
    slug: 'nepal-taxi',
    name: 'India–Nepal taxi',
    register: 'standard',
    sells: 'fare-widget',
    widgetTab: 'one-way',
  },
  {
    slug: 'luxury-car-rental',
    name: 'Luxury car rental',
    register: 'luxury',
    sells: 'enquiry',
    widgetTab: null,
  },
  {
    slug: 'wedding-cars',
    name: 'Wedding cars',
    register: 'luxury',
    sells: 'enquiry',
    widgetTab: null,
  },
  {
    slug: 'shoot-car-rental',
    name: 'Cars for shoots',
    register: 'luxury',
    sells: 'enquiry',
    widgetTab: null,
    subPages: [
      { slug: 'pre-wedding', name: 'Pre-wedding shoots' },
      { slug: 'post-wedding', name: 'Post-wedding shoots' },
      { slug: 'music-video', name: 'Music video shoots' },
      { slug: 'film-and-web-series', name: 'Film and web series shoots' },
      { slug: 'ads-and-fashion', name: 'Advertising and fashion shoots' },
      { slug: 'youtube-and-vlogs', name: 'YouTube and vlog shoots' },
    ],
  },
  {
    slug: 'tempo-traveller',
    name: 'Tempo traveller & Urbania',
    register: 'standard',
    sells: 'fare-widget',
    widgetTab: 'round-trip',
  },
  {
    slug: 'bus-rental',
    name: 'Bus rental',
    register: 'standard',
    sells: 'enquiry',
    widgetTab: null,
  },
  {
    slug: 'corporate-car-rental',
    name: 'Corporate car rental',
    register: 'standard',
    sells: 'corporate-enquiry',
    widgetTab: null,
  },
  {
    slug: 'self-drive-car-rental',
    name: 'Self-drive cars',
    register: 'standard',
    sells: 'enquiry',
    widgetTab: null,
  },
  {
    slug: 'bike-rental',
    name: 'Bike & scooter rental',
    register: 'standard',
    sells: 'enquiry',
    widgetTab: null,
  },
]

/** Copy (summary, intro, FAQs) lives in data/copy/; `publish` there sets the status. */
function withCopy(copy: PageCopy | undefined) {
  return copy
    ? {
        summary: copy.summary,
        intro: copy.intro,
        faqs: copy.faqs,
        status: copy.publish ? ('published' as const) : ('draft' as const),
      }
    : { summary: null, intro: null, faqs: [], status: 'draft' as const }
}

export const services: Service[] = input.map((s) => ({
  ...s,
  subPages: (s.subPages ?? []).map((sp) => ({
    ...sp,
    ...withCopy(subPageCopy[`${s.slug}/${sp.slug}`]),
  })),
  ...withCopy(serviceCopy[s.slug]),
}))

/**
 * Service × city allow-list (§2.2 "v1 city pages"). A page exists only where
 * Taxiverz genuinely operates; Pune follows once the owner confirms (C7).
 */
const allowList: [service: string, city: string][] = [
  ['outstation-cabs', 'gorakhpur'],
  ['one-way-cabs', 'gorakhpur'],
  ['airport-taxi', 'gorakhpur'],
  ['local-car-rental', 'gorakhpur'],
  ['nepal-taxi', 'gorakhpur'],
  ['nepal-taxi', 'raxaul'],
  ['luxury-car-rental', 'gorakhpur'],
  ['wedding-cars', 'gorakhpur'],
  ['tempo-traveller', 'gorakhpur'],
  ['bus-rental', 'gorakhpur'],
  ['self-drive-car-rental', 'gorakhpur'],
  ['bike-rental', 'gorakhpur'],
]

const cityCopy: Record<string, Record<string, PageCopy>> = {
  gorakhpur: { ...gorakhpurServices, 'nepal-taxi': nepalCityCopy.gorakhpur! },
  raxaul: { 'nepal-taxi': nepalCityCopy.raxaul! },
}

export const serviceCities: ServiceCity[] = allowList.map(([service, city]) => ({
  service,
  city,
  ...withCopy(cityCopy[city]?.[service]),
}))
