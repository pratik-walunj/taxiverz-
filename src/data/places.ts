import type { Place } from '@/lib/schemas/content'

/**
 * Non-city places for the fare widget's autocomplete (REBUILD_PLAN §3.2).
 * Every city in cities.ts is also a place; lib/content merges the two.
 * Codes are included only where certain; geo stays null until the Maps API.
 */
type PlaceInput = Omit<Place, 'geo' | 'aliases'> & { aliases?: string[] }

const input: PlaceInput[] = [
  // Airports (IATA)
  {
    id: 'gorakhpur-airport',
    name: 'Gorakhpur Airport',
    nameHi: 'गोरखपुर हवाई अड्डा',
    aliases: ['Mahayogi Gorakhnath Airport'],
    type: 'airport',
    code: 'GOP',
    citySlug: 'gorakhpur',
    country: 'IN',
  },
  {
    id: 'kushinagar-airport',
    name: 'Kushinagar International Airport',
    nameHi: 'कुशीनगर अंतरराष्ट्रीय हवाई अड्डा',
    type: 'airport',
    code: 'KBK',
    citySlug: 'kushinagar',
    country: 'IN',
  },
  {
    id: 'varanasi-airport',
    name: 'Varanasi Airport',
    nameHi: 'वाराणसी हवाई अड्डा',
    aliases: ['Lal Bahadur Shastri International Airport', 'Babatpur'],
    type: 'airport',
    code: 'VNS',
    citySlug: 'varanasi',
    country: 'IN',
  },
  {
    id: 'lucknow-airport',
    name: 'Lucknow Airport',
    nameHi: 'लखनऊ हवाई अड्डा',
    aliases: ['Chaudhary Charan Singh International Airport', 'Amausi'],
    type: 'airport',
    code: 'LKO',
    citySlug: 'lucknow',
    country: 'IN',
  },
  {
    id: 'pune-airport',
    name: 'Pune Airport',
    nameHi: 'पुणे हवाई अड्डा',
    aliases: ['Lohegaon'],
    type: 'airport',
    code: 'PNQ',
    citySlug: 'pune',
    country: 'IN',
  },
  {
    id: 'kathmandu-airport',
    name: 'Tribhuvan International Airport',
    nameHi: 'त्रिभुवन अंतरराष्ट्रीय विमानस्थल',
    aliases: ['Kathmandu Airport'],
    type: 'airport',
    code: 'KTM',
    citySlug: 'kathmandu',
    country: 'NP',
  },
  {
    id: 'bhairahawa-airport',
    name: 'Gautam Buddha International Airport',
    nameHi: 'गौतम बुद्ध अंतरराष्ट्रीय विमानस्थल',
    aliases: ['Bhairahawa Airport'],
    type: 'airport',
    code: 'BWA',
    citySlug: null,
    country: 'NP',
  },
  // Code left null: the plan's "PKR" was the old domestic airport, replaced in 2023.
  {
    id: 'pokhara-airport',
    name: 'Pokhara International Airport',
    nameHi: 'पोखरा अंतरराष्ट्रीय विमानस्थल',
    type: 'airport',
    code: null,
    citySlug: 'pokhara',
    country: 'NP',
  },

  // Railway stations (Indian Railways codes)
  {
    id: 'gorakhpur-junction',
    name: 'Gorakhpur Junction',
    nameHi: 'गोरखपुर जंक्शन',
    aliases: ['Gorakhpur Jn', 'Gorakhpur railway station'],
    type: 'station',
    code: 'GKP',
    citySlug: 'gorakhpur',
    country: 'IN',
  },
  {
    id: 'varanasi-junction',
    name: 'Varanasi Junction',
    nameHi: 'वाराणसी जंक्शन',
    aliases: ['Varanasi Cantt', 'Banaras railway station'],
    type: 'station',
    code: 'BSB',
    citySlug: 'varanasi',
    country: 'IN',
  },
  {
    id: 'lucknow-charbagh',
    name: 'Lucknow Charbagh',
    nameHi: 'लखनऊ चारबाग',
    aliases: ['Charbagh', 'Lucknow railway station'],
    type: 'station',
    code: 'LKO',
    citySlug: 'lucknow',
    country: 'IN',
  },
  {
    id: 'ayodhya-dham-junction',
    name: 'Ayodhya Dham Junction',
    nameHi: 'अयोध्या धाम जंक्शन',
    aliases: ['Ayodhya railway station'],
    type: 'station',
    code: 'AYC',
    citySlug: 'ayodhya',
    country: 'IN',
  },
  {
    id: 'raxaul-junction',
    name: 'Raxaul Junction',
    nameHi: 'रक्सौल जंक्शन',
    type: 'station',
    code: 'RXL',
    citySlug: 'raxaul',
    country: 'IN',
  },
  {
    id: 'pune-junction',
    name: 'Pune Junction',
    nameHi: 'पुणे जंक्शन',
    aliases: ['Pune railway station'],
    type: 'station',
    code: 'PUNE',
    citySlug: 'pune',
    country: 'IN',
  },

  // India–Nepal border points
  {
    id: 'sonauli-border',
    name: 'Sonauli–Bhairahawa border',
    nameHi: 'सोनौली बॉर्डर',
    aliases: ['Sonauli', 'Belahiya', 'Bhairahawa border'],
    type: 'border',
    code: null,
    citySlug: null,
    country: 'IN',
  },
  {
    id: 'raxaul-birgunj-border',
    name: 'Raxaul–Birgunj border',
    nameHi: 'रक्सौल–बीरगंज बॉर्डर',
    aliases: ['Birgunj', 'Birganj'],
    type: 'border',
    code: null,
    citySlug: 'raxaul',
    country: 'IN',
  },
]

export const places: Place[] = input.map((p) => ({ aliases: [], geo: null, ...p }))
