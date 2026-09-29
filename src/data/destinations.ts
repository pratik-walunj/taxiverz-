import type { Destination, Guide } from '@/lib/schemas/content'

/**
 * Destinations and their guides (REBUILD_PLAN §7 Phase 5). Guide bodies are
 * MDX in content/destinations/{place}/{guide}.mdx; validate:data checks each
 * published body has ≥ 400 words. Public facts only — no border, permit or
 * currency rules (those wait for the owner, D1–D3). "How to reach from
 * Gorakhpur" guides wait for verified distances.
 */
export const destinations: Destination[] = [
  {
    place: 'gorakhpur',
    summary:
      'Gorakhpur travel guide: the Gorakhnath Temple, Gita Press, Ramgarh Tal and more, with tips on getting around the city by car.',
    overview: `Gorakhpur is the gateway to eastern Uttar Pradesh and to Nepal: a railway city with one of the world's longest platforms, a temple town built around the Gorakhnath Math, and the home of the Gita Press. Most visitors pass through on their way to Kushinagar, Lumbini or Kathmandu, but the city rewards a day of its own — the temple in the morning, the lakefront at Ramgarh Tal in the evening, and the markets of Golghar in between. Our guides cover what to see in the city; our office at Railway Station Gate No-1 is a good place to start.`,
    status: 'published',
  },
  {
    place: 'kushinagar',
    summary:
      'Kushinagar travel guide: the Mahaparinirvana Temple, Ramabhar Stupa and the best time to visit the place where the Buddha passed away.',
    overview: `Kushinagar is one of the four most important places in the Buddha's life: here, under the sal trees, he passed into mahaparinirvana. Today it is a quiet town of temples, stupas and monasteries built by Buddhist countries from across Asia, set in green countryside east of Gorakhpur. Pilgrims come year-round, and many combine Kushinagar with Lumbini, the Buddha's birthplace across the Nepal border. Our guides cover the main sites and the best season to visit; Kushinagar International Airport serves the town directly.`,
    status: 'published',
  },
  {
    place: 'ayodhya',
    summary:
      'Ayodhya travel guide: the Ram Mandir, Hanuman Garhi, Kanak Bhawan and the Saryu ghats, and the best time of year to visit.',
    overview: `Ayodhya, on the banks of the Saryu, is revered as the birthplace of Lord Ram, and since the consecration of the Ram Mandir in January 2024 it has become one of the most visited pilgrimage towns in India. Beyond the new temple, the old town is full of shrines — Hanuman Garhi on its hill, Kanak Bhawan, and the ghats where evening aarti is held. It lies west of Gorakhpur along National Highway 27, which makes it a common day trip or overnight stay. Our guides cover what to see and when to go.`,
    status: 'published',
  },
  {
    place: 'varanasi',
    summary:
      'Varanasi travel guide: the ghats, Kashi Vishwanath, the Ganga Aarti and Sarnath, and the best months to visit the city.',
    overview: `Varanasi is one of the oldest living cities in the world, and for Hindus the holiest: a crescent of ghats along the Ganga where pilgrims bathe at dawn, priests perform the Ganga Aarti at dusk, and the cremation fires of Manikarnika never go out. Kashi Vishwanath, now reached through a wide corridor from the river, is one of the twelve jyotirlingas. Just outside the city, Sarnath is where the Buddha gave his first sermon. Our guides cover the main sights and the best season, from the winter mornings to Dev Deepawali.`,
    status: 'published',
  },
  {
    place: 'lumbini',
    summary:
      'Lumbini travel guide: the Maya Devi Temple, the Ashoka Pillar and the monastic zone at the birthplace of the Buddha in Nepal.',
    overview: `Lumbini, just across the border from India in southern Nepal, is the birthplace of Siddhartha Gautama, the Buddha, and a UNESCO World Heritage Site. At its heart is the Maya Devi Temple, built over the spot where he is believed to have been born, beside the pillar the emperor Ashoka raised in the third century BCE. Around it, a long monastic zone holds temples built by Buddhist communities from around the world. Many pilgrims visit Lumbini together with Kushinagar; our guides cover the sites and the best time to go.`,
    status: 'published',
  },
]

const guide = (g: Guide) => g

export const guides: Guide[] = [
  guide({
    place: 'gorakhpur',
    guide: 'places-to-visit',
    title: 'Places to visit in Gorakhpur',
    summary:
      'The Gorakhnath Temple, Gita Press, Ramgarh Tal, the zoo, Vishnu Temple and more: what to see in Gorakhpur, and how to plan a day by car.',
    updated: '2026-09-29',
    status: 'published',
  }),
  guide({
    place: 'kushinagar',
    guide: 'places-to-visit',
    title: 'Places to visit in Kushinagar',
    summary:
      'The Mahaparinirvana Temple, Ramabhar Stupa, Matha Kuar shrine and the international temples: what to see in Kushinagar.',
    updated: '2026-09-29',
    status: 'published',
  }),
  guide({
    place: 'kushinagar',
    guide: 'best-time-to-visit',
    title: 'Best time to visit Kushinagar',
    summary:
      'When to visit Kushinagar: the cool months from October to March, Buddha Purnima, and what summer and the monsoon are like.',
    updated: '2026-09-29',
    status: 'published',
  }),
  guide({
    place: 'ayodhya',
    guide: 'places-to-visit',
    title: 'Places to visit in Ayodhya',
    summary:
      'The Ram Mandir, Hanuman Garhi, Kanak Bhawan, Ram ki Paidi and Guptar Ghat: what to see in Ayodhya, and how to plan the day.',
    updated: '2026-09-29',
    status: 'published',
  }),
  guide({
    place: 'ayodhya',
    guide: 'best-time-to-visit',
    title: 'Best time to visit Ayodhya',
    summary:
      'When to visit Ayodhya: the winter months, Deepotsav at Diwali, Ram Navami crowds, and what to expect in summer and the monsoon.',
    updated: '2026-09-29',
    status: 'published',
  }),
  guide({
    place: 'varanasi',
    guide: 'places-to-visit',
    title: 'Places to visit in Varanasi',
    summary:
      'The ghats, Kashi Vishwanath, the Ganga Aarti, a dawn boat ride and Sarnath: what to see in Varanasi and how to pace your visit.',
    updated: '2026-09-29',
    status: 'published',
  }),
  guide({
    place: 'varanasi',
    guide: 'best-time-to-visit',
    title: 'Best time to visit Varanasi',
    summary:
      'When to visit Varanasi: October to March, Dev Deepawali, the monsoon when the ghats flood, and the heat of summer.',
    updated: '2026-09-29',
    status: 'published',
  }),
  guide({
    place: 'lumbini',
    guide: 'places-to-visit',
    title: 'Places to visit in Lumbini',
    summary:
      'The Maya Devi Temple, the Ashoka Pillar, the sacred pond and the monastic zone: what to see at the birthplace of the Buddha.',
    updated: '2026-09-29',
    status: 'published',
  }),
  guide({
    place: 'lumbini',
    guide: 'best-time-to-visit',
    title: 'Best time to visit Lumbini',
    summary:
      'When to visit Lumbini: the dry, clear months from October to March, Buddha Jayanti, and the hot, wet months to plan around.',
    updated: '2026-09-29',
    status: 'published',
  }),
]
