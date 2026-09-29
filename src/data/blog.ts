import type { Post } from '@/lib/schemas/content'

/**
 * Blog posts (REBUILD_PLAN §7 Phase 5). Bodies in content/blog/{slug}.mdx.
 * Drafts from the report's §12.4 long-tail topics; a post goes live only when
 * the owner approves it (`ownerApproved`), and MDX comments in the drafts mark
 * the facts the owner must supply first.
 */
export const posts: Post[] = [
  {
    slug: 'buddhist-circuit-by-car',
    title: 'The Buddhist circuit by car: Kushinagar, Lumbini, Bodh Gaya, Sarnath',
    summary:
      'How to plan the Buddhist circuit by road from Gorakhpur: the four great sites, the order to visit them, and how many days to allow.',
    date: '2026-09-29',
    related: ['/destinations/kushinagar/', '/destinations/lumbini/', '/outstation-cabs/'],
    ownerApproved: false,
    status: 'draft',
  },
  {
    slug: 'gorakhpur-to-kathmandu-by-road',
    title: 'Gorakhpur to Kathmandu by road: what to expect',
    summary:
      'Planning the drive from Gorakhpur to Kathmandu: the crossing, the route through the hills, documents and how long to allow.',
    date: '2026-09-29',
    related: ['/nepal-taxi/gorakhpur/', '/nepal-taxi/'],
    ownerApproved: false,
    status: 'draft',
  },
  {
    slug: 'planning-wedding-cars-gorakhpur',
    title: 'Planning wedding cars in Gorakhpur',
    summary:
      'How many cars a wedding needs, when to book, and what to tell your car company — a practical guide for families in Gorakhpur.',
    date: '2026-09-29',
    related: ['/wedding-cars/', '/tempo-traveller/gorakhpur/'],
    ownerApproved: false,
    status: 'draft',
  },
]
