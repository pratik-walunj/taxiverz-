import { route } from './build'

/**
 * Routes from Lucknow. Generated once from the legacy pages (docs/AUDIT.md §5);
 * edit by hand from now on. `legacy` is reference-only (never rendered or priced):
 * distances come from the owner-reviewed docs/route-distances.csv.
 */
export const lucknowRoutes = [
  route({
    origin: 'lucknow',
    destination: 'gorakhpur',
    slug: 'lucknow-to-gorakhpur',
    legacyUrls: ['/lucknow-to-gorakhpur.html'],
    isInternational: false,
    legacy: {
      distanceKm: 280,
      durationText: '5-6 Hours',
      via: [],
      placesToVisit: ['Gorakhnath Temple', 'Ramgarh Tal', 'Local Markets', 'Local Cuisine'],
      flags: [],
    },
  }),
]
