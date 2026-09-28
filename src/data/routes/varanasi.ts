import { route } from './build'

/**
 * Routes from Varanasi. Generated once from the legacy pages (docs/AUDIT.md §5);
 * edit by hand from now on. `legacy` is reference-only (never rendered or priced):
 * distances come from the owner-reviewed docs/route-distances.csv.
 */
export const varanasiRoutes = [
  route({
    origin: 'varanasi',
    destination: 'gorakhpur',
    slug: 'varanasi-to-gorakhpur',
    legacyUrls: ['/banaras-to-gorakhpur.html'],
    isInternational: false,
    legacy: {
      distanceKm: 230,
      durationText: '4-5 hours',
      via: [],
      placesToVisit: [],
      flags: [],
    },
  }),
]
