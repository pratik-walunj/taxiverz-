import type { Package } from '@/lib/schemas/content'

/**
 * Tour packages (REBUILD_PLAN §7 Phase 5). The two legacy packages are
 * migrated as drafts: the legacy pages left prices blank and made
 * operator claims nobody has confirmed (OWNER_TODO D7). `legacy.notes` is
 * reference only and is never rendered.
 */
const draft = (p: Pick<Package, 'slug' | 'name' | 'legacyUrls' | 'legacy'>): Package => ({
  summary: null,
  intro: null,
  durationDays: null,
  operator: null,
  itinerary: [],
  inclusions: [],
  exclusions: [],
  price: { amount: null, per: null, verified: false },
  variants: [],
  faqs: [],
  status: 'draft',
  ...p,
})

export const packages: Package[] = [
  draft({
    slug: 'nepal-helicopter-charter',
    name: 'Nepal helicopter charter',
    legacyUrls: ['/helicopter-nepal.html'],
    legacy: {
      notes: [
        'Claimed 4–6 passengers, cruise 220–260 km/h, VIP/wedding/Chardham use, "24/7 charter support", booking 3–5 days ahead for permissions.',
        'No operator named and no price. Operator, aircraft, routes and prices needed from the owner (D7).',
      ],
    },
  }),
  draft({
    slug: 'everest-mountain-flight',
    name: 'Everest mountain flight',
    legacyUrls: ['/Mountain-Flight-Nepal.html'],
    legacy: {
      notes: [
        'Claimed a 1-hour flight from Kathmandu, a "guaranteed window seat", free rescheduling or full refund for weather cancellations, and three tiers (Classic, Premier Explorer, Heli-Everest) with the prices left blank on the page.',
        'No airline named. Operator, terms and prices needed from the owner (D7); weather and refund promises must come from the operator.',
      ],
    },
  }),
]
