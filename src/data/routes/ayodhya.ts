import { route } from './build'

/**
 * Routes from Ayodhya. Generated once from the legacy pages (docs/AUDIT.md §5);
 * edit by hand from now on. `legacy` is reference-only (never rendered or priced):
 * distances come from the owner-reviewed docs/route-distances.csv.
 */
export const ayodhyaRoutes = [
  route({
    origin: 'ayodhya',
    destination: 'kushinagar',
    slug: 'ayodhya-to-kushinagar',
    legacyUrls: ['/ayodhya-to-kushinagar.html'],
    isInternational: false,
    legacy: {
      distanceKm: 190,
      durationText: '4-5 Hours',
      via: ['Basti', 'Gorakhpur'],
      placesToVisit: [
        'Mahaparinirvana Temple',
        'Ramabhar Stupa',
        'Mathakuar Shrine',
        'Kushinagar Museum',
        'Japanese Temple',
        'Chinese Temple',
      ],
      flags: [],
    },
  }),
  route({
    origin: 'ayodhya',
    destination: 'prayagraj',
    slug: 'ayodhya-to-prayagraj',
    legacyUrls: ['/ayodhya-to-prayagraj.html'],
    isInternational: false,
    legacy: {
      distanceKm: 288,
      durationText: '5-6 Hours',
      via: ['Sultanpur', 'Amethi'],
      placesToVisit: [
        'Triveni Sangam',
        'Allahabad Fort',
        'Hanuman Temple',
        'Akshayavat',
        'Allahabad University',
        'Anand Bhawan',
      ],
      flags: ['Legacy 288 km looks high (roughly 165–175 km).'],
    },
  }),
]
