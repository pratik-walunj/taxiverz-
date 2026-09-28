import { route } from './build'

/**
 * Routes from Raxaul. Generated once from the legacy pages (docs/AUDIT.md §5);
 * edit by hand from now on. `legacy` is reference-only (never rendered or priced):
 * distances come from the owner-reviewed docs/route-distances.csv.
 */
export const raxaulRoutes = [
  route({
    origin: 'raxaul',
    destination: 'chitwan',
    slug: 'raxaul-to-chitwan',
    legacyUrls: ['/raxaul-to-chitwan.html'],
    isInternational: true,
    legacy: {
      distanceKm: 180,
      durationText: '5-6 Hours',
      via: [],
      placesToVisit: [],
      flags: [],
    },
  }),
  route({
    origin: 'raxaul',
    destination: 'janakpur',
    slug: 'raxaul-to-janakpur',
    legacyUrls: ['/raxaul-to-janakpur.html'],
    isInternational: true,
    legacy: {
      distanceKm: 80,
      durationText: '2-3 Hours',
      via: ['Birgunj'],
      placesToVisit: [],
      flags: ['Legacy 80 km looks low (roughly 130–170 km).'],
    },
  }),
  route({
    origin: 'raxaul',
    destination: 'kathmandu',
    slug: 'raxaul-to-kathmandu',
    legacyUrls: ['/raxaul-to-kathmandu.html'],
    isInternational: true,
    legacy: {
      distanceKm: 150,
      durationText: '4-5 Hours',
      via: ['Birgunj'],
      placesToVisit: [],
      flags: [],
    },
  }),
  route({
    origin: 'raxaul',
    destination: 'lumbini',
    slug: 'raxaul-to-lumbini',
    legacyUrls: ['/raxaul-to-lumbini.html'],
    isInternational: true,
    legacy: {
      distanceKm: 120,
      durationText: '3-4 Hours',
      via: ['Birgunj'],
      placesToVisit: [],
      flags: ['Legacy 120 km is implausible (roughly 280 km or more).'],
    },
  }),
  route({
    origin: 'raxaul',
    destination: 'manokamana',
    slug: 'raxaul-to-manokamana',
    legacyUrls: ['/raxaul-to-manokamana.html'],
    isInternational: true,
    legacy: {
      distanceKm: 250,
      durationText: '7-8 Hours',
      via: ['Kathmandu'],
      placesToVisit: [],
      flags: ["Legacy 'via Kathmandu' is a detour."],
    },
  }),
  route({
    origin: 'raxaul',
    destination: 'muktinath',
    slug: 'raxaul-to-muktinath',
    legacyUrls: ['/raxaul-to-muktinath.html'],
    isInternational: true,
    legacy: {
      distanceKm: 450,
      durationText: '12-14 Hours',
      via: ['Kathmandu', 'Pokhara'],
      placesToVisit: [],
      flags: [
        'Legacy 12–14 h is unrealistic; vehicle change and permits are owner questions (D5).',
      ],
    },
  }),
  route({
    origin: 'raxaul',
    destination: 'pokhara',
    slug: 'raxaul-to-pokhara',
    legacyUrls: ['/raxaul-to-pokhara.html'],
    isInternational: true,
    legacy: {
      distanceKm: 350,
      durationText: '9-10 Hours',
      via: ['Kathmandu'],
      placesToVisit: [],
      flags: ["Legacy 'via Kathmandu' is a detour; the direct road via Narayanghat is shorter."],
    },
  }),
]
