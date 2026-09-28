import { route } from './build'

/**
 * Routes from Kathmandu. Generated once from the legacy pages (docs/AUDIT.md §5);
 * edit by hand from now on. `legacy` is reference-only (never rendered or priced):
 * distances come from the owner-reviewed docs/route-distances.csv.
 */
export const kathmanduRoutes = [
  route({
    origin: 'kathmandu',
    destination: 'chitwan',
    slug: 'kathmandu-to-chitwan',
    legacyUrls: ['/kathmandu-to-chitwan.html'],
    isInternational: true,
    legacy: {
      distanceKm: 150,
      durationText: '4-5 Hours',
      via: ['Mugling', 'Narayanghat'],
      placesToVisit: [
        'Chitwan National Park',
        'Jungle Safari',
        'Rapti River',
        'Tharu Village',
        'Bird Watching',
        'Elephant Safari',
      ],
      flags: [],
    },
  }),
  route({
    origin: 'kathmandu',
    destination: 'janakpur',
    slug: 'kathmandu-to-janakpur',
    legacyUrls: ['/kathmandu-to-janakpur.html'],
    isInternational: true,
    legacy: {
      distanceKm: 390,
      durationText: '8-9 Hours',
      via: ['Bardibas', 'Lahan'],
      placesToVisit: [
        'Janaki Temple',
        'Ram Sita Vivah Mandap',
        'Dhanush Sagar',
        'Janakpur Museum',
        'Mithila Art',
        'Local Markets',
      ],
      flags: ["Legacy 'via Lahan' passes Janakpur; the BP highway via Sindhuli is roughly 225 km."],
    },
  }),
  route({
    origin: 'kathmandu',
    destination: 'manokamana',
    slug: 'kathmandu-to-manokamana',
    legacyUrls: ['/kathmandu-to-manokamana.html'],
    isInternational: true,
    legacy: {
      distanceKm: 104,
      durationText: '3-4 Hours',
      via: ['Mugling', 'Kurintar'],
      placesToVisit: [
        'Manokamana Temple',
        'Cable Car Ride',
        'Mountain Views',
        'Trishuli River',
        'Nature Walks',
        'Local Shops',
      ],
      flags: [],
    },
  }),
  route({
    origin: 'kathmandu',
    destination: 'nagarkot',
    slug: 'kathmandu-to-nagarkot',
    legacyUrls: ['/kathmandu-to-nagarkot.html'],
    isInternational: true,
    legacy: {
      distanceKm: 32,
      durationText: null,
      via: ['Bhaktapur'],
      placesToVisit: [
        'Sunrise Viewpoint',
        'Everest View',
        'Nagarkot Tower',
        'Nature Trails',
        'Changu Narayan',
        'Bhaktapur',
      ],
      flags: [],
    },
  }),
  route({
    origin: 'kathmandu',
    destination: 'pokhara',
    slug: 'kathmandu-to-pokhara',
    legacyUrls: ['/kathmandu-to-pokhara.html'],
    isInternational: true,
    legacy: {
      distanceKm: 200,
      durationText: '6-7 Hours',
      via: ['Mugling', 'Dumre'],
      placesToVisit: [
        'Phewa Lake',
        'Sarangkot',
        'Tal Barahi Temple',
        'World Peace Pagoda',
        "Devi's Fall",
        'Gupteshwor Cave',
      ],
      flags: [],
    },
  }),
]
