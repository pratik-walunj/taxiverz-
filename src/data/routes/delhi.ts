import { route } from './build'

/**
 * Routes from Delhi. Generated once from the legacy pages (docs/AUDIT.md §5);
 * edit by hand from now on. `legacy` is reference-only (never rendered or priced):
 * distances come from the owner-reviewed docs/route-distances.csv.
 */
export const delhiRoutes = [
  route({
    origin: 'delhi',
    destination: 'gorakhpur',
    slug: 'delhi-to-gorakhpur',
    legacyUrls: ['/delhi-to-gorakhpur.html'],
    isInternational: false,
    legacy: {
      distanceKm: 750,
      durationText: '12-14 hours',
      via: [],
      placesToVisit: [],
      flags: [
        'Legacy pages conflict: 750 km here, 871 km on gorakhpur-to-delhi.html, 822 km on gorakhpur-cab-service.html.',
        'Long-distance route (over 600 km): stays draft until the owner confirms Taxiverz runs it (OWNER_TODO E3).',
      ],
    },
  }),
]
