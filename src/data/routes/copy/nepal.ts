import type { RouteCopy } from './types'

const DOCS =
  "Indian citizens don't need a visa for Nepal. Carry a valid passport or Voter ID card. Call or WhatsApp us for the full document checklist before you travel."

export const routeCopy: Record<string, RouteCopy> = {
  'gorakhpur-to-butwal': {
    publish: true,
    intro: `Butwal is the first big Nepali city on the road north from Gorakhpur, and people make this trip for many reasons: visiting relatives, weddings, business in the city’s busy markets, or as the first leg of a longer holiday in the hills. The city stands where the Tinau river leaves the Chure hills, so it marks the point where the flat Terai ends and the climb towards Palpa and Pokhara begins. Lumbini is close by, which makes it easy to add a visit to the Buddha’s birthplace. Taxiverz runs this trip from Railway Station Gate No-1, Gorakhpur, in a car with a driver, booked by car class online, on WhatsApp or by phone on +91 85760 00083. One-way and round-trip bookings are both available.`,
    routeGuide: `Leaving Gorakhpur, the road runs north through the farmland of Maharajganj district towards Nautanwa and the Nepal border. The main crossings from this side are Sonauli–Bhairahawa, north of Gorakhpur near Lumbini, and Raxaul–Birgunj further east. We confirm the crossing and how the journey is arranged across the border for your trip when you book. Once in Nepal, the drive continues across the Rupandehi plains, past Siddharthanagar (Bhairahawa), until the hills rise up behind Butwal.

This is a plains journey almost the whole way, without the hairpin bends of the hill roads, so it suits elderly passengers and small children. The things to plan around are seasonal. In December and January thick fog often sits over eastern Uttar Pradesh in the early morning, so a later start can be quicker than a dawn one. In the monsoon the rivers coming off the hills run high and some stretches of road get waterlogged. Around Dashain and Tihar, and in the wedding season, the border towns and Butwal’s bazaars fill up, so keep some slack in your plans.

On arrival, the bank of the Tinau and the old market area give you a feel for the city. If you have time, Lumbini lies to the south-west, and the hill town of Tansen in Palpa is up the Siddhartha Highway to the north, with old Newar houses and wide views. Tell us about side trips when you book so the car can be kept for them.`,
    stops: [
      {
        name: 'Sonauli–Bhairahawa',
        note: 'One of the main India–Nepal crossings, north of Gorakhpur in Maharajganj district.',
      },
      {
        name: 'Siddharthanagar (Bhairahawa)',
        note: 'The first Nepali town on this side of the border, useful for a tea break.',
      },
      {
        name: 'Lumbini',
        note: 'The birthplace of the Buddha, an easy detour from Butwal if you have half a day.',
      },
      {
        name: 'Tansen, Palpa',
        note: 'A hill town north of Butwal known for its old Newar houses and views of the hills.',
      },
    ],
    tips: [
      'Keep your ID document in hand luggage, not in the boot, so it is easy to reach on the way.',
      'In winter, allow for morning fog on the Indian side before fixing a meeting time in Butwal.',
      'If you plan to add Lumbini or Tansen, say so at booking so the day is planned around it.',
    ],
    faqs: [
      {
        q: 'Which border crossing is used for Gorakhpur to Butwal?',
        a: 'The main crossings from this side are Sonauli–Bhairahawa and Raxaul–Birgunj. We confirm the crossing and how the journey is arranged across the border for your trip when you book.',
      },
      {
        q: 'What documents do I need for Butwal?',
        a: DOCS,
      },
      {
        q: 'Can I visit Lumbini on the same trip?',
        a: 'Yes. Tell us when you book. Where a trip with extra stops can’t be priced automatically, we confirm the fare on WhatsApp or by phone before you travel.',
      },
      {
        q: 'Can I book a round trip from Gorakhpur to Butwal?',
        a: 'Yes, both one-way and round-trip bookings are available. Every booking gets a reference number you can quote when you call or message us.',
      },
      {
        q: 'Which car will come for my trip?',
        a: 'You book by car class, and the car comes with a driver. The exact model depends on availability on the day.',
      },
    ],
  },

  'gorakhpur-to-chitwan': {
    publish: true,
    intro: `Chitwan is where families from Gorakhpur go for a wildlife holiday without leaving the plains behind. Chitwan National Park, a UNESCO World Heritage Site in Nepal’s inner Terai, is home to the one-horned rhinoceros, deer, crocodiles, a wide range of birds and, for the lucky, the Bengal tiger. Visitors stay around Sauraha or Bharatpur and spend their days on jungle safaris, canoe rides on the Rapti river, and visits to Tharu villages. Nearby Devghat, where the Kali Gandaki meets the Trishuli, draws Hindu pilgrims as well. Taxiverz takes you there from our Gorakhpur office at Railway Station Gate No-1 in a car with a driver. Book by car class online, on WhatsApp or by phone on +91 85760 00083.`,
    routeGuide: `The first part of the drive is the familiar run north from Gorakhpur towards the border. The main crossings from this side are Sonauli–Bhairahawa, near Lumbini, and Raxaul–Birgunj to the east, and we confirm the crossing and how the journey is arranged across the border for your trip when you book. On the Nepal side, the usual way to Chitwan is east along the East-West Highway from Butwal, through the Nawalparasi area, towards Narayanghat on the Narayani river.

Between Butwal and Narayanghat the highway climbs over a forested ridge with bends and steep sections, with the Daunne Devi temple near the top, before dropping back to the plains. Drive this part in daylight, and in the monsoon expect slow going where the hillside has slipped. The broad Narayani bridge at Narayanghat is a natural place to stretch your legs before the last stretch to Sauraha or your lodge.

Plan the timing of your visit around the park. The cooler months after the monsoon and through winter suit safaris, though mornings in the Terai can be foggy and cold. During the heavy rains many park activities are scaled back, so check with your lodge before you fix dates. Dashain and Tihar bring domestic tourists and heavier traffic on the highway. If you want to see Devghat or the Bharatpur area as well, tell us when you book, or take a round trip so the same car brings you home.`,
    stops: [
      {
        name: 'Butwal',
        note: 'The city at the foot of the hills where the drive turns east along the highway.',
      },
      {
        name: 'Daunne Devi',
        note: 'A hilltop temple on the forested ridge between Butwal and Narayanghat.',
      },
      {
        name: 'Devghat',
        note: 'The sacred confluence of the Kali Gandaki and Trishuli rivers, close to Narayanghat.',
      },
      {
        name: 'Sauraha',
        note: 'The village on the edge of Chitwan National Park where most safaris start.',
      },
      {
        name: 'Chitwan National Park',
        note: 'Grassland and sal forest known for the one-horned rhino and rich birdlife.',
      },
    ],
    tips: [
      'Book your safari and lodge before you travel in the busy winter months.',
      'Carry light cotton clothes in neutral colours for the jungle and a warm layer for early mornings.',
      'Let us know your lodge’s location at booking so the drop can be planned.',
    ],
    faqs: [
      {
        q: 'How do you handle the border on the way to Chitwan?',
        a: 'The main crossings from this side are Sonauli–Bhairahawa and Raxaul–Birgunj. We confirm the crossing and how the journey is arranged across the border for your trip when you book.',
      },
      {
        q: 'What should I carry to cross into Nepal?',
        a: DOCS,
      },
      {
        q: 'Can the car stop at Devghat on the way?',
        a: 'Yes. Mention it when you book so the stop is part of the plan. If the trip can’t be priced automatically, we confirm the fare on WhatsApp or by phone before travel.',
      },
      {
        q: 'Does the car stay with us during the safari days?',
        a: 'That depends on whether you book one way or a round trip. Tell us your plan and we will confirm how the car is arranged before you travel.',
      },
      {
        q: 'How do I book Gorakhpur to Chitwan?',
        a: 'Book by car class online, on WhatsApp or by calling +91 85760 00083. You get a reference number for every booking.',
      },
    ],
  },

  'gorakhpur-to-janakpur': {
    publish: true,
    intro: `Janakpur, in Nepal’s Dhanusha district, is honoured as the birthplace of Sita and the city of King Janak, which makes it a pilgrimage close to the heart of many families in Gorakhpur and eastern Uttar Pradesh. Its centrepiece is the white, many-domed Janaki Mandir, with the Ram Janaki Vivah Mandap beside it marking the wedding of Ram and Sita. The city is also known for its sacred ponds and for Mithila painting. Vivah Panchami and Ram Navami bring big crowds. Because Janakpur lies far to the east of Gorakhpur, it is a long journey that needs some planning. Taxiverz arranges it from Railway Station Gate No-1, Gorakhpur, with a car and driver, booked online, on WhatsApp or on +91 85760 00083.`,
    routeGuide: `This is a long plains journey rather than a mountain one. The main crossings from this side of the border are Sonauli–Bhairahawa, north of Gorakhpur, and Raxaul–Birgunj, further east in Bihar, and the way the rest of the route runs depends on which one is used. We confirm the crossing and how the journey is arranged across the border for your trip when you book. Either way, the last part of the drive is across the flat, green Terai of Nepal’s Madhesh region, crossing several wide rivers that come down from the hills, before turning south to Janakpur.

Because of the length of the trip, many families break it overnight rather than doing it in one go, and elderly pilgrims especially appreciate the rest. In December and January fog on the plains, on both sides of the border, can slow the morning badly, so daylight travel is the safer plan. In the monsoon, rivers in the Terai rise quickly and roads can be waterlogged. During Vivah Panchami, when the wedding of Ram and Sita is celebrated, Janakpur is crowded with pilgrims and rooms are hard to find, so book your stay early.

In Janakpur, start at the Janaki Mandir and the Vivah Mandap next to it. Dhanush Sagar and Ganga Sagar are among the many sacred ponds in the old town, and Dhanusha Dham, linked to the breaking of Shiva’s bow, is a short trip outside the city.`,
    stops: [
      {
        name: 'Janaki Mandir',
        note: 'The main temple of Janakpur, dedicated to Sita, with its white walls and many domes.',
      },
      {
        name: 'Ram Janaki Vivah Mandap',
        note: 'The pavilion beside the temple that marks the place of the divine wedding.',
      },
      {
        name: 'Dhanush Sagar and Ganga Sagar',
        note: 'Two of the sacred ponds in the old city where pilgrims bathe and offer prayers.',
      },
      {
        name: 'Dhanusha Dham',
        note: 'A shrine outside Janakpur associated with the bow of Shiva from the Ramayana.',
      },
    ],
    tips: [
      'Book rooms in Janakpur well ahead if you are travelling for Vivah Panchami or Ram Navami.',
      'Plan an overnight break so the trip is not a single tiring day for older family members.',
    ],
    faqs: [
      {
        q: 'Which way does the car go from Gorakhpur to Janakpur?',
        a: 'That depends on the border crossing. The main crossings from this side are Sonauli–Bhairahawa and Raxaul–Birgunj, and we confirm the crossing and how the journey is arranged across the border for your trip when you book.',
      },
      {
        q: 'What ID should pilgrims carry for Janakpur?',
        a: DOCS,
      },
      {
        q: 'Can we travel for Vivah Panchami?',
        a: 'Yes, but book early because the festival draws large crowds and rooms fill up. Every booking gets a reference number.',
      },
      {
        q: 'Can we break the journey overnight?',
        a: 'Yes. Tell us where you want to stop when you book. Where a trip can’t be priced automatically, the fare is confirmed on WhatsApp or by phone before travel.',
      },
    ],
  },

  'gorakhpur-to-kathmandu': {
    publish: true,
    intro: `Kathmandu is the capital of Nepal and the trip most people from Gorakhpur mean when they say they are going to Nepal. Hindu families come for darshan at Pashupatinath on the banks of the Bagmati; Buddhist visitors come for the great stupas of Boudhanath and Swayambhunath; and holidaymakers come for the old royal squares of Kathmandu, Patan and Bhaktapur, the markets of Thamel and the cool air of the valley. It is a long drive into the hills, so it pays to plan the day well. Taxiverz runs this trip from Railway Station Gate No-1, Gorakhpur, in a car with a driver. Book by car class online, on WhatsApp or by phone on +91 85760 00083, one way or return.`,
    routeGuide: `From Gorakhpur the drive goes north across the plains to the border. The main crossings from this side are Sonauli–Bhairahawa, north of Gorakhpur near Lumbini, and Raxaul–Birgunj in Bihar. We confirm the crossing and how the journey is arranged across the border for your trip when you book. On the Nepal side, the usual route runs east through Butwal and over the forested ridge to Narayanghat, then up to Mugling, where the Prithvi Highway follows the Trishuli river for a long stretch before climbing into the Kathmandu valley.

The Trishuli section is scenic, with the river below you, rafting camps along the banks and the Manakamana cable car station at Kurintar, but it is also a busy road with a lot of trucks and buses. Hill driving is safest in daylight, so a start that gets you into the hills by morning is worth it. In the monsoon, landslides can hold up traffic for a while, so keep your plans flexible. In winter, fog on the Indian plains can slow the first part. Around Dashain and Tihar the roads in and out of Kathmandu are very crowded, and the entry into the valley can be slow at any time. Narayanghat or Mugling make sensible places for a meal break.

Once in Kathmandu, most visitors start with Pashupatinath, then Boudhanath and Swayambhunath. If you have more days, Patan and Bhaktapur Durbar Squares are worth a full morning each.`,
    stops: [
      {
        name: 'Narayanghat',
        note: 'The town on the Narayani river where the plains end and the climb towards Mugling begins.',
      },
      {
        name: 'Kurintar',
        note: 'The base of the Manakamana cable car on the Prithvi Highway, for those who want to add the temple.',
      },
      {
        name: 'Pashupatinath Temple',
        note: 'The great Shiva temple on the Bagmati, the first stop for most Hindu visitors.',
      },
      {
        name: 'Boudhanath Stupa',
        note: 'The great white stupa of the city, ringed by monasteries and shops.',
      },
      {
        name: 'Swayambhunath',
        note: 'The hilltop stupa with views across the city, also known as the monkey temple.',
      },
    ],
    tips: [
      'Aim to be on the hill roads in daylight and keep a buffer for delays in the monsoon.',
      'If you are travelling around Dashain or Tihar, book early and expect heavy traffic.',
      'Share your hotel address in Kathmandu at booking, as parts of the old city have narrow lanes.',
    ],
    faqs: [
      {
        q: 'Which border crossing is used from Gorakhpur to Kathmandu?',
        a: 'The main crossings from this side are Sonauli–Bhairahawa and Raxaul–Birgunj. We confirm the crossing and how the journey is arranged across the border for your trip when you book.',
      },
      {
        q: 'What documents do I need to travel to Kathmandu?',
        a: DOCS,
      },
      {
        q: 'Can we stop at Manakamana on the way?',
        a: 'Yes. The cable car to the Manakamana temple starts from Kurintar on the way to Kathmandu. Mention it at booking and we will confirm the plan and fare before you travel.',
      },
      {
        q: 'Can the car stay with us for sightseeing in Kathmandu?',
        a: 'Tell us your plan when you book a round trip. We confirm the arrangement and the fare on WhatsApp or by phone before travel.',
      },
      {
        q: 'Which car will I get?',
        a: 'You choose a car class when you book, and the car comes with a driver. The exact model depends on availability.',
      },
    ],
  },

  'gorakhpur-to-lumbini': {
    publish: true,
    intro: `Lumbini is the birthplace of Siddhartha Gautama, the Buddha, and a UNESCO World Heritage Site a short way across the border north of Gorakhpur. Pilgrims come to pray at the Maya Devi Temple, where the spot of the birth is marked, and to see the Ashoka Pillar and the sacred Puskarini pond. Around the Sacred Garden, the monastic zone has monasteries built by Buddhist countries from across Asia and beyond. For Gorakhpur families it makes a peaceful outing, and for visitors on the Buddhist circuit it pairs naturally with Kushinagar. Taxiverz takes you from Railway Station Gate No-1, Gorakhpur, in a car with a driver. Book by car class online, on WhatsApp or by calling +91 85760 00083, one way or as a round trip.`,
    routeGuide: `Of all the Nepal trips from Gorakhpur this is the simplest. The road runs north through Maharajganj district and flat farmland towards the border. The main crossings from this side are Sonauli–Bhairahawa, which lies close to Lumbini, and Raxaul–Birgunj further east. We confirm the crossing and how the journey is arranged across the border for your trip when you book. Beyond the border, the drive continues past Siddharthanagar (Bhairahawa) and through the Rupandehi countryside to the Lumbini site.

The whole route is on the plains, so there are no hill roads to worry about. In December and January dense fog can settle over the fields in the early morning, so a mid-morning start is often more comfortable. In summer it gets very hot on the open ground of the Sacred Garden, so carry water and a hat and plan the walking part for the morning or late afternoon. Buddha Purnima brings large numbers of pilgrims, and winter is the main season for international Buddhist groups.

The site is spread out, and it helps to have the car with you between the Sacred Garden, the monasteries and the World Peace Pagoda at the northern end. Many visitors book a round trip for this reason. If you would like to see Tilaurakot, the remains identified with ancient Kapilavastu where the young prince grew up, or combine the trip with Kushinagar on the Indian side, tell us when you book.`,
    stops: [
      {
        name: 'Maya Devi Temple',
        note: 'The temple built over the spot where the Buddha was born, with the marker stone inside.',
      },
      {
        name: 'Ashoka Pillar',
        note: 'The pillar raised by Emperor Ashoka, whose inscription records his visit to the birthplace.',
      },
      {
        name: 'Monastic Zone',
        note: 'Monasteries built by Buddhist countries, each in its own style, on either side of a long canal.',
      },
      {
        name: 'World Peace Pagoda',
        note: 'A white stupa at the northern edge of the Lumbini site.',
      },
      {
        name: 'Tilaurakot',
        note: 'The ruins identified with ancient Kapilavastu, a detour west of Lumbini.',
      },
    ],
    tips: [
      'Dress modestly and be ready to remove your shoes inside the Maya Devi Temple.',
      'Carry water and sun protection for walking between the monuments.',
      'Book a round trip if you want the car with you around the large site.',
    ],
    faqs: [
      {
        q: 'Which crossing does the Lumbini trip use?',
        a: 'The main crossings from this side are Sonauli–Bhairahawa, which is near Lumbini, and Raxaul–Birgunj. We confirm the crossing and how the journey is arranged across the border for your trip when you book.',
      },
      {
        q: 'Do I need a visa to visit Lumbini?',
        a: DOCS,
      },
      {
        q: 'Can we combine Lumbini with Kushinagar?',
        a: 'Yes. Both are important Buddhist sites and are often visited together. Tell us your plan and we will confirm the route and fare on WhatsApp or by phone before travel.',
      },
      {
        q: 'Is the drive to Lumbini hilly?',
        a: 'No. The whole route from Gorakhpur is on the plains, which makes it a comfortable trip for elderly pilgrims.',
      },
      {
        q: 'Can I book a round trip for Lumbini?',
        a: 'Yes. One-way and round-trip bookings are both available, and each booking gets a reference number.',
      },
    ],
  },

  'gorakhpur-to-manokamana': {
    publish: true,
    intro: `The Manakamana temple, on a ridge in Nepal’s Gorkha district, is dedicated to Bhagwati Manakamana, the goddess who is believed to fulfil wishes. Families from Gorakhpur go there after a wedding, a new job, the birth of a child, or simply to pray for something close to their hearts. Most pilgrims reach the temple by the Manakamana cable car, which rises from Kurintar on the banks of the Trishuli, with wide views of the river valley and, on clear days, the Himalaya. Taxiverz drives you from Railway Station Gate No-1, Gorakhpur, to the cable car base with a driver in a car booked by class. Book online, on WhatsApp or on +91 85760 00083, one way or as a round trip.`,
    routeGuide: `The route starts with the drive north across the plains of eastern Uttar Pradesh to the border. The main crossings from this side are Sonauli–Bhairahawa, near Lumbini, and Raxaul–Birgunj in Bihar. We confirm the crossing and how the journey is arranged across the border for your trip when you book. Inside Nepal the road goes east through Butwal and across the forested hills to Narayanghat, then climbs beside the river to Mugling, where the Trishuli and Marsyangdi meet. A little way along the Prithvi Highway towards Kathmandu is Kurintar, the base station of the cable car.

The hill part of the trip is on busy roads with heavy trucks, so daylight driving is the sensible plan, and in the monsoon landslides sometimes close a section for a while. Fog on the Indian plains in winter can slow the start. Plan around the crowds too: Saturdays and the Dashain festival days bring long queues at the cable car and the temple, and a weekday visit is calmer.

At the top, pilgrims offer flowers, coconuts and sweets at the pagoda-style temple and walk around the small bazaar on the ridge. Many families make Manakamana part of a longer trip, going on to Kathmandu or Pokhara afterwards, or add Gorkha Durbar, the hilltop palace of Prithvi Narayan Shah. Tell us your plan at booking so the day can be arranged around the temple visit.`,
    stops: [
      {
        name: 'Narayanghat',
        note: 'A good meal stop on the Narayani before the road enters the hills.',
      },
      {
        name: 'Mugling',
        note: 'The river junction where the Trishuli and Marsyangdi meet and the highways divide.',
      },
      {
        name: 'Manakamana cable car, Kurintar',
        note: 'The base station on the Trishuli from where the cable car climbs to the temple.',
      },
      {
        name: 'Manakamana Temple',
        note: 'The pagoda-roofed shrine of the wish-fulfilling goddess on the ridge above the river.',
      },
      {
        name: 'Gorkha Durbar',
        note: 'The hilltop palace and temple complex of the Shah kings, a side trip from the highway.',
      },
    ],
    tips: [
      'Visit on a weekday if you can, as Saturdays and festival days bring long queues.',
      'Carry a light jacket, as it is cooler on the ridge than down by the river.',
    ],
    faqs: [
      {
        q: 'How is the border handled on the way to Manakamana?',
        a: 'The main crossings from this side are Sonauli–Bhairahawa and Raxaul–Birgunj. We confirm the crossing and how the journey is arranged across the border for your trip when you book.',
      },
      {
        q: 'What documents should the family carry?',
        a: DOCS,
      },
      {
        q: 'Does the car go up to the temple?',
        a: 'Most pilgrims reach the temple by the cable car from Kurintar, so the car takes you to the cable car base.',
      },
      {
        q: 'Can we go on to Pokhara or Kathmandu after the darshan?',
        a: 'Yes. Tell us when you book. If the trip can’t be priced automatically, we confirm the fare on WhatsApp or by phone before travel.',
      },
    ],
  },

  'gorakhpur-to-muktinath': {
    publish: true,
    intro: `Muktinath is a deeply revered pilgrimage in the Himalaya, high in the Mustang region of Nepal. For Hindus it is a temple of Lord Vishnu, counted among the 108 Divya Desams, where pilgrims bathe under the 108 water spouts and in the kunds in front of the shrine. For Buddhists it is Chumig Gyatsa, a place of the natural flame that burns from the rock. Families from Gorakhpur often plan it for years, and many bring home shaligram stones from the Kali Gandaki. It is a demanding journey that needs careful planning. Taxiverz arranges it from Railway Station Gate No-1, Gorakhpur, with a car and driver; book online, on WhatsApp or by phone on +91 85760 00083.`,
    routeGuide: `The trip begins like any other Nepal journey from Gorakhpur, with the drive north across the plains to the border. The main crossings from this side are Sonauli–Bhairahawa, near Lumbini, and Raxaul–Birgunj in Bihar. We confirm the crossing and how the journey is arranged across the border for your trip when you book. After the border the road climbs into the hills through Butwal and Palpa towards Pokhara, the usual base for the trip into Mustang.

Muktinath is not a single-day drive. It needs planning for rest days, hill roads and mountain weather, and the last stretch into Mustang is arranged differently from the drive to Pokhara. We confirm the arrangements for every part of the journey when you book, so you know the plan before you set out. Hill roads should be driven in daylight. In the monsoon, landslides are common in the hills, and in winter the high country is very cold and can get snow, so spring and autumn are the usual seasons for pilgrims. Dashain and Tihar also bring busy roads.

The temple stands at high altitude, and some people feel short of breath or get headaches. Take the climb slowly, drink plenty of water, and if anyone in your group has heart or breathing problems, speak to a doctor before you go. At the temple, pilgrims bathe in the two kunds and under the spouts, then visit the Jwala Mai shrine with its flame. Pokhara on the way back is a good place to rest for a day.`,
    stops: [
      {
        name: 'Butwal',
        note: 'The last city on the plains before the road climbs into the hills.',
      },
      {
        name: 'Tansen, Palpa',
        note: 'A hill town on the way north, pleasant for a tea break with a view.',
      },
      {
        name: 'Pokhara',
        note: 'The lakeside city that serves as the base for the journey into Mustang.',
      },
      {
        name: 'Muktinath Temple',
        note: 'The Vishnu shrine with 108 water spouts, sacred to both Hindus and Buddhists.',
      },
    ],
    tips: [
      'Pack warm clothes even in summer, as it is cold at the temple.',
      'Build a rest day into the plan and do not rush the climb.',
      'Call or WhatsApp us well before your dates so the whole trip can be planned.',
    ],
    faqs: [
      {
        q: 'How is the trip to Muktinath arranged?',
        a: 'Muktinath needs planning because of the mountain roads and the high altitude. We confirm the arrangements for each part of the journey when you book.',
      },
      {
        q: 'Which border crossing do we use?',
        a: 'The main crossings from this side are Sonauli–Bhairahawa and Raxaul–Birgunj. We confirm the crossing and how the journey is arranged across the border for your trip when you book.',
      },
      {
        q: 'What documents are needed for Muktinath?',
        a: DOCS,
      },
      {
        q: 'When is a good time to go?',
        a: 'Spring and autumn are the usual pilgrimage seasons. The monsoon brings landslides on hill roads, and winter is very cold at the temple.',
      },
      {
        q: 'How is the fare worked out?',
        a: 'Where a trip like this can’t be priced automatically, we confirm the fare on WhatsApp or by phone before travel. Every booking gets a reference number.',
      },
    ],
  },

  'gorakhpur-to-pokhara': {
    publish: true,
    intro: `Pokhara is Nepal’s lake city, a popular holiday for families and couples from Gorakhpur who want mountain views without trekking. The city lies on the shore of Phewa Lake, with the Annapurna range and the fishtail peak of Machhapuchhre rising behind it on clear days. Visitors take boats to the Tal Barahi temple on its island, watch sunrise from Sarangkot, climb to the World Peace Pagoda, and see Davis Falls and the Gupteshwor Mahadev cave. Adventure lovers come for paragliding and boating. Taxiverz runs this trip from Railway Station Gate No-1, Gorakhpur, in a car with a driver, one way or return. Book by car class online, on WhatsApp or by phone on +91 85760 00083.`,
    routeGuide: `From Gorakhpur the road goes north across the flat country of Maharajganj district to the border. The main crossings from this side are Sonauli–Bhairahawa, north of Gorakhpur near Lumbini, and Raxaul–Birgunj in Bihar. We confirm the crossing and how the journey is arranged across the border for your trip when you book. From Butwal, the Siddhartha Highway climbs straight into the hills, winding through Palpa and Syangja before dropping into the Pokhara valley.

This is a true hill road, narrow and full of bends in places, so people prone to travel sickness should eat lightly and sit in front. Daylight driving is the rule on this stretch. The monsoon brings landslides and fallen rocks to the hills, and delays are common, so leave margin in your plans. In December and January, fog on the Indian plains can slow the early part. The Dashain and Tihar holidays fill Pokhara’s hotels and the roads with Nepali tourists, so book both the car and your stay early. Tansen in Palpa is the natural place to break the journey for a meal or a night.

In Pokhara, stay near Lakeside and give yourself at least one early morning for Sarangkot, when the mountains are clearest. Boats to the Tal Barahi temple leave from the lakeshore. Begnas Lake, east of the city, is quieter if you want to get away from the crowds. For the return, a round trip keeps the same car and driver with you.`,
    stops: [
      {
        name: 'Tansen, Palpa',
        note: 'An old hill town on the Siddhartha Highway, good for a break on the climb.',
      },
      {
        name: 'Phewa Lake',
        note: 'The lake at the heart of Pokhara, with boats to the Tal Barahi temple.',
      },
      {
        name: 'Sarangkot',
        note: 'The hilltop above the lake where visitors go for sunrise over the Annapurnas.',
      },
      {
        name: 'World Peace Pagoda',
        note: 'A white stupa on the hill across the lake with views over the city.',
      },
      {
        name: 'Davis Falls and Gupteshwor Mahadev Cave',
        note: 'A waterfall that disappears underground and the Shiva cave across the road from it.',
      },
    ],
    tips: [
      'Carry travel sickness tablets if anyone in the family finds hill roads hard.',
      'Keep one early morning free for Sarangkot, before clouds cover the mountains.',
      'Book early for Dashain, Tihar and the New Year holidays.',
    ],
    faqs: [
      {
        q: 'Which border crossing is used for Pokhara?',
        a: 'The main crossings from this side are Sonauli–Bhairahawa and Raxaul–Birgunj. We confirm the crossing and how the journey is arranged across the border for your trip when you book.',
      },
      {
        q: 'What documents do we need for Pokhara?',
        a: DOCS,
      },
      {
        q: 'Can we stop at Lumbini or Tansen on the way?',
        a: 'Yes. Tell us which stops you want when you book. If the trip can’t be priced automatically, the fare is confirmed on WhatsApp or by phone before travel.',
      },
      {
        q: 'Can the car stay with us for Pokhara sightseeing?',
        a: 'Share your plan when you book a round trip, and we will confirm the arrangement and fare before you travel.',
      },
      {
        q: 'Which car should I book for a large family?',
        a: 'Choose a larger car class when you book. The exact model depends on availability, and every car comes with a driver.',
      },
    ],
  },

  'raxaul-to-chitwan': {
    publish: true,
    intro: `From Raxaul, Chitwan is a natural first trip into Nepal. Not far beyond Birgunj lies the inner Terai and Chitwan National Park, a UNESCO World Heritage Site known for the one-horned rhinoceros, gharial crocodiles, hundreds of bird species and the elusive Bengal tiger. Families from north Bihar come for jeep and walking safaris, canoe trips on the Rapti river and evenings of Tharu dance in Sauraha. It suits a school holiday, a long weekend or a first taste of Nepal. Taxiverz arranges this trip with a car and driver, booked by car class online, on WhatsApp or by phone on +91 85760 00083. Our office is at Railway Station Gate No-1, Gorakhpur, and every booking gets a reference number.`,
    routeGuide: `Raxaul sits right on the border, facing Birgunj, and Raxaul–Birgunj is one of the main crossings on this side, along with Sonauli–Bhairahawa near Lumbini. We confirm the crossing and how the journey is arranged across the border for your trip when you book. From Birgunj the road runs north through the busy industrial belt to Pathlaiya, then on through the forested Chure hills to Hetauda in Makwanpur district.

Beyond Hetauda the road follows the Rapti valley west into Chitwan, passing through sal forest where you may see monkeys by the roadside. The turning for Sauraha comes off the highway before you reach Bharatpur and Narayanghat. The forest stretches have a few bends but no high mountain roads, which makes this one of the easier drives into Nepal. Still, plan to arrive in daylight, as parts of the highway pass through forest. In the monsoon the rivers crossing the road swell quickly and the park scales back many activities, so the months after the rains through spring are the main season. In winter, fog lies over the Terai in the mornings, both in Bihar and in Nepal.

Around Dashain, Tihar and Chhath the roads near Raxaul and Birgunj are packed with travellers going home, so leave early and allow extra time. In Chitwan, book your safari through your lodge and spend some time in the Tharu villages around Sauraha. If you would like to visit Devghat as well, mention it when you book.`,
    stops: [
      {
        name: 'Birgunj',
        note: 'The large Nepali trading town directly across the border from Raxaul.',
      },
      {
        name: 'Hetauda',
        note: 'A green town in Makwanpur where the road turns into the Rapti valley.',
      },
      {
        name: 'Sauraha',
        note: 'The riverside village beside the park, with lodges and the starting points for safaris.',
      },
      {
        name: 'Chitwan National Park',
        note: 'Forest and tall grassland along the Rapti, home to rhino, deer and many birds.',
      },
    ],
    tips: [
      'Avoid the days just before Chhath and Dashain, when border traffic is at its heaviest.',
      'Wear neutral colours and closed shoes for walking safaris.',
    ],
    faqs: [
      {
        q: 'Do we cross at Raxaul–Birgunj for Chitwan?',
        a: 'Raxaul–Birgunj is one of the main crossings on this side. We confirm the crossing and how the journey is arranged across the border for your trip when you book.',
      },
      {
        q: 'What should we carry to enter Nepal from Raxaul?',
        a: DOCS,
      },
      {
        q: 'Is the road to Chitwan hilly?',
        a: 'Only a little. The road passes through the forested Chure hills and the Rapti valley but has no high mountain stretches like the roads to Kathmandu or Pokhara.',
      },
      {
        q: 'Can we book a return trip to Raxaul?',
        a: 'Yes, one-way and round-trip bookings are both available. Tell us your dates and we will confirm the plan.',
      },
      {
        q: 'How do we book?',
        a: 'Book by car class online, on WhatsApp or by calling +91 85760 00083. The car comes with a driver, and the exact model depends on availability.',
      },
    ],
  },

  'raxaul-to-janakpur': {
    publish: true,
    intro: `Janakpur is the city of Sita, and for families in Raxaul and the Champaran region of Bihar it is a pilgrimage close to home in both faith and culture, since both sides of the border share the traditions of the plains. The Janaki Mandir, the Ram Janaki Vivah Mandap and the many sacred ponds of the city draw devotees through the year, with big crowds at Vivah Panchami, when the wedding of Ram and Sita is celebrated, and at Ram Navami. Janakpur is also a centre of Mithila painting, seen on walls and in shops across the town. Taxiverz runs this trip with a car and driver; book by car class online, on WhatsApp or on +91 85760 00083, one way or as a round trip.`,
    routeGuide: `Raxaul faces Birgunj across the border, and Raxaul–Birgunj is one of the two main crossings on this side, the other being Sonauli–Bhairahawa further west. We confirm the crossing and how the journey is arranged across the border for your trip when you book. Inside Nepal the route heads east across the Terai, the flat and fertile belt of southern Nepal, through the districts of Bara, Rautahat, Sarlahi and Mahottari towards Dhanusha. It is a plains drive the whole way, with no mountain roads.

Along the way you cross several broad rivers that come down from the hills, including the Bagmati. They are gentle in winter but fill fast in the monsoon, when stretches of low road can flood, so check conditions before you set out in July and August. In December and January morning fog is thick across the Terai, so it is better to travel after it lifts. The road passes through many market towns where traffic slows, and during Chhath, Dashain and Vivah Panchami it is crowded with pilgrims and travellers.

In Janakpur, begin with darshan at the Janaki Mandir, then walk to the Vivah Mandap next door. Dhanush Sagar and Ganga Sagar are two of the sacred ponds nearby, and the evening aarti is a fine time to be in the old town. Dhanusha Dham, linked with Shiva’s bow in the Ramayana, can be added on a round trip.`,
    stops: [
      {
        name: 'Birgunj',
        note: 'The Nepali border city opposite Raxaul where the journey into Nepal begins.',
      },
      {
        name: 'Janaki Mandir',
        note: 'The white temple of Sita that is the heart of Janakpur.',
      },
      {
        name: 'Ram Janaki Vivah Mandap',
        note: 'The wedding pavilion of Ram and Sita beside the main temple.',
      },
      {
        name: 'Dhanusha Dham',
        note: 'A pilgrimage site near Janakpur tied to the breaking of Shiva’s bow.',
      },
    ],
    tips: [
      'Book early for Vivah Panchami, when rooms in Janakpur are in short supply.',
      'In the monsoon, check with us about river and road conditions before you set out.',
      'Carry some cash, as small temple shops may not take cards.',
    ],
    faqs: [
      {
        q: 'Which crossing is used from Raxaul to Janakpur?',
        a: 'Raxaul–Birgunj is one of the main crossings from this side. We confirm the crossing and how the journey is arranged across the border for your trip when you book.',
      },
      {
        q: 'Which documents do pilgrims need?',
        a: DOCS,
      },
      {
        q: 'Is the Raxaul to Janakpur road hilly?',
        a: 'No. The route crosses the flat Terai of southern Nepal, though it crosses several rivers that can run high in the monsoon.',
      },
      {
        q: 'Can we stay a night in Janakpur and return next day?',
        a: 'Yes. Book a round trip and tell us your dates. Where a trip can’t be priced automatically, the fare is confirmed on WhatsApp or by phone before travel.',
      },
    ],
  },

  'raxaul-to-kathmandu': {
    publish: true,
    intro: `For travellers in north Bihar, Raxaul is the traditional gateway to Kathmandu, and a car from here is a practical way for a family to reach the Nepali capital together. People make the trip for darshan at Pashupatinath, for the Buddhist stupas of Boudhanath and Swayambhunath, for medical visits, for family and business, and for holidays in the valley’s old towns of Patan and Bhaktapur. Kathmandu is also the starting point for trips to Nagarkot, Chandragiri and further into the hills. Taxiverz arranges this journey with a car and driver, booked by car class online, on WhatsApp or by calling +91 85760 00083. You can book one way or return, and every booking gets a reference number.`,
    routeGuide: `The journey starts at the border itself, where Raxaul faces Birgunj. Raxaul–Birgunj is one of the main crossings on this side, with Sonauli–Bhairahawa the other, near Lumbini. We confirm the crossing and how the journey is arranged across the border for your trip when you book. From Birgunj the road runs north to Pathlaiya and Hetauda, at the foot of the Mahabharat hills. Some roads climb straight over the hills from here, but they are steep and narrow; the widely used route goes west through Chitwan to Narayanghat, then up the Trishuli river along the Prithvi Highway to the Kathmandu valley.

The Trishuli stretch is scenic but busy with trucks and buses, and it is prone to landslides in the monsoon, when a blocked section can hold traffic for some time. Drive the hills in daylight and keep a margin in your plans. Winter fog over the Terai can slow the morning, and the Dashain and Tihar holidays make the roads into and out of Kathmandu very crowded. Narayanghat and Mugling are the usual meal stops, and Kurintar, on the river, is where the Manakamana cable car starts.

In Kathmandu, Pashupatinath and the evening aarti on the Bagmati are the first stop for many Hindu families. Set aside time for Boudhanath, Swayambhunath and a morning in Bhaktapur, whose Durbar Square and pottery lanes feel like a different age.`,
    stops: [
      {
        name: 'Hetauda',
        note: 'The Makwanpur town at the foot of the Mahabharat hills, a place to stop for tea.',
      },
      {
        name: 'Mugling',
        note: 'The river junction on the Prithvi Highway where the road turns up the Trishuli.',
      },
      {
        name: 'Pashupatinath Temple',
        note: 'The sacred Shiva temple on the Bagmati, known for its evening aarti.',
      },
      {
        name: 'Boudhanath Stupa',
        note: 'The great white stupa of Kathmandu, circled by pilgrims turning prayer wheels.',
      },
      {
        name: 'Bhaktapur Durbar Square',
        note: 'The old royal square with temples, courtyards and potters at work nearby.',
      },
    ],
    tips: [
      'Plan to be in the hills in daylight, especially in the monsoon.',
      'Avoid travelling on the busiest days of Dashain, Tihar and Chhath if you can.',
      'Share your exact Kathmandu address at booking, as many lanes are narrow.',
    ],
    faqs: [
      {
        q: 'Is the Raxaul–Birgunj border used for Kathmandu?',
        a: 'Raxaul–Birgunj is one of the main crossings from this side. We confirm the crossing and how the journey is arranged across the border for your trip when you book.',
      },
      {
        q: 'What documents do I need from Raxaul to Kathmandu?',
        a: DOCS,
      },
      {
        q: 'Does the route go over the hills or round them?',
        a: 'The widely used route goes through Chitwan and up the Trishuli valley, which is longer but easier than the steep hill roads from Hetauda. The route is confirmed with you when you book.',
      },
      {
        q: 'Can we visit Manakamana on the way?',
        a: 'Yes. The cable car starts at Kurintar on the Prithvi Highway. Tell us when you book and we will confirm the plan and fare before you travel.',
      },
      {
        q: 'Which car will pick us up?',
        a: 'You book a car class, and the car comes with a driver. The exact model depends on availability.',
      },
    ],
  },

  'raxaul-to-lumbini': {
    publish: true,
    intro: `Lumbini, the birthplace of the Buddha, is a UNESCO World Heritage Site in Nepal’s Rupandehi district, and many pilgrims on the Buddhist circuit through Bihar reach it by way of Raxaul after visiting Bodh Gaya, Rajgir, Vaishali or Kesariya. At the heart of the site is the Maya Devi Temple, which protects the marker stone of the birthplace, with the Ashoka Pillar and the sacred Puskarini pond beside it. The monastic zone has monasteries built by Buddhist nations from across the world. Taxiverz arranges this trip from Raxaul with a car and driver. Book by car class online, on WhatsApp or by phone on +91 85760 00083, one way or as a round trip, and get a reference number for your booking.`,
    routeGuide: `From Raxaul you enter Nepal at Birgunj. Raxaul–Birgunj and Sonauli–Bhairahawa, the latter close to Lumbini, are the main crossings on this side of the border. We confirm the crossing and how the journey is arranged across the border for your trip when you book. The route through Nepal runs west along the Terai: north from Birgunj to Hetauda, then along the Rapti valley past Chitwan to Narayanghat, over a forested ridge to Butwal, and finally across the plains of Rupandehi to Lumbini.

This is a long day across the width of southern Nepal, so a halt in Chitwan or at Narayanghat makes it easier, and some pilgrims spend a night near the park. The ridge between Narayanghat and Butwal has bends and steep sections and should be driven in daylight, a rule that applies to all Nepali hill roads. In the monsoon, landslides can slow this stretch and rivers can flood low parts of the highway. Winter brings thick morning fog across the Terai. Around Dashain, Tihar and Chhath the border and highway are crowded.

At Lumbini, walk through the Sacred Garden to the Maya Devi Temple, then visit the monasteries of the east and west monastic zones, including the German, Thai and Chinese temples. Buddha Purnima draws large crowds. If your circuit continues to Kushinagar and Sarnath in India, tell us when you book so the whole route can be planned together.`,
    stops: [
      {
        name: 'Hetauda',
        note: 'The first large town inside Nepal on the way west, at the edge of the hills.',
      },
      {
        name: 'Narayanghat',
        note: 'A busy town on the Narayani river, a sensible place for lunch or a night halt.',
      },
      {
        name: 'Butwal',
        note: 'The city at the foot of the hills just before the last stretch to Lumbini.',
      },
      {
        name: 'Maya Devi Temple',
        note: 'The shrine over the birthplace of the Buddha, beside the Puskarini pond.',
      },
      {
        name: 'Ashoka Pillar',
        note: 'The stone pillar whose inscription records Emperor Ashoka’s pilgrimage to Lumbini.',
      },
    ],
    tips: [
      'Break the journey at Narayanghat or Chitwan rather than pushing on after dark.',
      'Plan your walk around the Lumbini site for the cooler part of the day.',
    ],
    faqs: [
      {
        q: 'Which border crossing is used from Raxaul to Lumbini?',
        a: 'Raxaul–Birgunj and Sonauli–Bhairahawa are the main crossings on this side. We confirm the crossing and how the journey is arranged across the border for your trip when you book.',
      },
      {
        q: 'Do Indian pilgrims need a visa for Lumbini?',
        a: DOCS,
      },
      {
        q: 'Can we stop overnight in Chitwan?',
        a: 'Yes. Many travellers break the journey there. Tell us when you book, and where the trip can’t be priced automatically we confirm the fare on WhatsApp or by phone.',
      },
      {
        q: 'Can you plan the rest of our Buddhist circuit?',
        a: 'Yes. Share your full plan, for example Lumbini, Kushinagar and Sarnath, and we will confirm the route and the fare before you travel.',
      },
    ],
  },

  'raxaul-to-manokamana': {
    publish: true,
    intro: `For devotees in Raxaul and north Bihar, Manakamana is a much-loved temple in Nepal. The shrine of Bhagwati Manakamana, the goddess who grants wishes, stands on a ridge in Gorkha district high above the Trishuli river. Newly married couples come to seek blessings, parents come after a child’s birth, and many families return to give thanks after a wish comes true. The Manakamana cable car climbs to the temple from Kurintar on the Prithvi Highway, with views over the river and the hills. Taxiverz arranges the drive with a car and driver, booked by car class online, on WhatsApp or on +91 85760 00083. Book one way, or a round trip so the same car brings you back.`,
    routeGuide: `Leaving Raxaul, you cross into Birgunj. Raxaul–Birgunj is one of the main crossings from this side of the border, along with Sonauli–Bhairahawa near Lumbini. We confirm the crossing and how the journey is arranged across the border for your trip when you book. The drive in Nepal heads north through Pathlaiya and the forest to Hetauda, along the Rapti valley through Chitwan to Narayanghat, and then climbs beside the river to Mugling. From Mugling the road turns east along the Trishuli for a short way to Kurintar and the cable car station.

The stretch from Narayanghat to Kurintar is a river gorge road with bends and heavy truck traffic, and like all Nepali hill roads it is safest in daylight. The monsoon brings landslides here, and a blocked road can mean waiting, so keep your temple plan flexible. Morning fog is common on the Terai in winter, including around Raxaul and Birgunj. Chhath, Dashain and Tihar bring a rush at the border.

Crowds at the temple are heaviest on Saturdays and during Dashain, when the queue for the cable car can be long. At the top, a short walk through a bazaar of offering stalls leads to the temple. Devghat, near Narayanghat, is a peaceful stop on the way back, and Gorkha Durbar or Bandipur can be added if you have an extra day.`,
    stops: [
      {
        name: 'Hetauda',
        note: 'A green town on the way in where the road meets the Rapti valley.',
      },
      {
        name: 'Devghat',
        note: 'The holy confluence near Narayanghat where the Kali Gandaki and Trishuli meet.',
      },
      {
        name: 'Manakamana cable car, Kurintar',
        note: 'The station beside the Trishuli from where cable cars rise to the temple ridge.',
      },
      {
        name: 'Manakamana Temple',
        note: 'The pagoda temple of the wish-fulfilling goddess, surrounded by offering stalls.',
      },
    ],
    tips: [
      'Choose a weekday for a shorter queue at the cable car.',
      'Buy puja items at the top, where stalls line the path to the temple.',
      'Tell us at booking if you want to add Devghat, Gorkha or Bandipur.',
    ],
    faqs: [
      {
        q: 'Which crossing do you use from Raxaul for Manakamana?',
        a: 'Raxaul–Birgunj is one of the main crossings from this side. We confirm the crossing and how the journey is arranged across the border for your trip when you book.',
      },
      {
        q: 'What documents do we need?',
        a: DOCS,
      },
      {
        q: 'Where does the car drop us for the temple?',
        a: 'At the cable car station at Kurintar on the Prithvi Highway, from where most pilgrims ride up to the temple.',
      },
      {
        q: 'Can we add Devghat or Gorkha?',
        a: 'Yes. Mention the stops when you book. Where a trip can’t be priced automatically, the fare is confirmed on WhatsApp or by phone before travel.',
      },
    ],
  },

  'raxaul-to-muktinath': {
    publish: true,
    intro: `Muktinath, in the high Mustang region of Nepal, is a pilgrimage that many families in Bihar hope to make at least once. The temple of Lord Vishnu, one of the 108 Divya Desams, is known for the 108 water spouts where pilgrims bathe and for the Jwala Mai shrine, where a natural flame burns beside water. Buddhists revere the same place as Chumig Gyatsa. Many pilgrims also bring back shaligram stones from the Kali Gandaki. The journey from Raxaul is long and goes deep into the mountains, so it needs planning. Taxiverz arranges it with a car and driver; book by car class online, on WhatsApp or by calling +91 85760 00083, and every booking gets a reference number.`,
    routeGuide: `From Raxaul the trip enters Nepal at Birgunj; Raxaul–Birgunj and Sonauli–Bhairahawa are the main crossings on this side. We confirm the crossing and how the journey is arranged across the border for your trip when you book. The road runs through Hetauda and the Chitwan valley to Narayanghat, climbs beside the river to Mugling, then heads west on the Prithvi Highway to Pokhara, which is the usual staging point before the journey into Mustang.

Muktinath is not a trip to do in one go. It involves long stretches of hill road, high altitude and mountain weather, and the final part into Mustang is arranged separately from the road to Pokhara. We confirm the arrangements for each part when you book, so the whole plan is clear before you leave Raxaul. Keep all hill driving to daylight. Monsoon rains bring landslides across the hills, and in winter the high country is bitterly cold and can see snow, so most pilgrims go in spring or autumn. The Dashain and Tihar holidays mean crowded roads, and Chhath brings a rush at the Raxaul border.

Muktinath lies at high altitude, and breathlessness and headaches are common. Rest when you can, drink water and avoid rushing. Anyone with heart or lung problems should consult a doctor before the trip. At the temple, pilgrims bathe under the spouts and in the sacred kunds before darshan. On the way home, a night in Pokhara or a halt near Chitwan gives the family time to rest.`,
    stops: [
      {
        name: 'Narayanghat',
        note: 'The river town where the plains end and the road climbs towards Mugling.',
      },
      {
        name: 'Bandipur',
        note: 'A preserved Newar hilltop town above the highway, a quiet halt on the way to Pokhara.',
      },
      {
        name: 'Pokhara',
        note: 'The lake city and staging point for the journey into Mustang.',
      },
      {
        name: 'Muktinath Temple',
        note: 'The high Himalayan shrine of Vishnu with its 108 water spouts and eternal flame.',
      },
    ],
    tips: [
      'Contact us several weeks before your dates so the whole trip can be arranged.',
      'Pack warm layers, a cap and gloves, whatever the season.',
    ],
    faqs: [
      {
        q: 'How is the Muktinath journey from Raxaul arranged?',
        a: 'Because of the mountain roads and high altitude, it needs planning. We confirm the arrangements for every part of the journey when you book.',
      },
      {
        q: 'Which crossing do we use?',
        a: 'Raxaul–Birgunj is one of the main crossings from this side. We confirm the crossing and how the journey is arranged across the border for your trip when you book.',
      },
      {
        q: 'What documents do we carry?',
        a: DOCS,
      },
      {
        q: 'Which season suits the Muktinath trip?',
        a: 'Most pilgrims go in spring or autumn. The monsoon brings landslides to hill roads, and winter at the temple is very cold.',
      },
      {
        q: 'How is the fare confirmed?',
        a: 'For a trip like this that can’t be priced automatically, we confirm the fare on WhatsApp or by phone before travel.',
      },
    ],
  },

  'raxaul-to-pokhara': {
    publish: true,
    intro: `Pokhara, beside Phewa Lake with the Annapurna range and Machhapuchhre on its skyline, is a popular holiday for families from Raxaul and across Bihar. Days here are spent rowing out to the Tal Barahi temple, catching sunrise over the peaks from Sarangkot, walking up to the World Peace Pagoda, and visiting the caves and waterfalls around the city. Paragliding, boating and the lakeside cafés draw younger travellers, while the Bindhyabasini temple is a stop for devotees. Taxiverz arranges this trip with a car and driver, booked by car class online, on WhatsApp or by phone on +91 85760 00083. You can book one way or return, and the exact model depends on availability.`,
    routeGuide: `From Raxaul you cross into Birgunj; Raxaul–Birgunj is one of the main crossings from this side, with Sonauli–Bhairahawa further west near Lumbini. We confirm the crossing and how the journey is arranged across the border for your trip when you book. The road then runs north to Hetauda and west through the Chitwan valley to Narayanghat, before climbing along the river to Mugling. At Mugling the Prithvi Highway turns west away from the Kathmandu road, following the Marsyangdi and then rolling through the hills of Tanahun past Dumre and Damauli into the Pokhara valley.

The hill part from Narayanghat onwards is winding, with truck traffic around Mugling, so drive it in daylight and take breaks. Those who get car sick should eat lightly. The monsoon is the season of landslides on this highway, and waiting for a road to clear is common, so leave spare time. Winter mornings bring fog across the Terai near the border. Book early for Dashain and Tihar, when Pokhara’s hotels fill up, and avoid the border around Chhath. For a break, Bandipur, a well-kept Newar hill town reached by a side road from Dumre, is worth a night.

Once in Pokhara, stay around Lakeside and keep an early morning for Sarangkot. Boats to the island temple leave from the lakeshore, and Davis Falls and Gupteshwor Mahadev cave are close together on the south side of the city.`,
    stops: [
      {
        name: 'Hetauda',
        note: 'A town at the edge of the hills and the first real break after the border.',
      },
      {
        name: 'Mugling',
        note: 'The junction where the road to Pokhara leaves the Trishuli valley.',
      },
      {
        name: 'Bandipur',
        note: 'A hilltop town of old Newar houses above Dumre, with views of the Himalaya.',
      },
      {
        name: 'Phewa Lake and Tal Barahi Temple',
        note: 'Pokhara’s lake, with a small island temple reached by boat.',
      },
      {
        name: 'Sarangkot',
        note: 'The viewpoint above the city for sunrise over the Annapurna range.',
      },
    ],
    tips: [
      'Keep hill driving to daylight and add a halt at Bandipur on longer trips.',
      'Book the car and your hotel early for the Dashain and Tihar holidays.',
      'Carry a warm layer for early mornings at Sarangkot, even in spring.',
    ],
    faqs: [
      {
        q: 'Do we cross at Birgunj for Pokhara?',
        a: 'Raxaul–Birgunj is one of the main crossings from this side. We confirm the crossing and how the journey is arranged across the border for your trip when you book.',
      },
      {
        q: 'What documents are needed for the Pokhara trip?',
        a: DOCS,
      },
      {
        q: 'Does the route pass through Kathmandu?',
        a: 'No. The road to Pokhara leaves the Kathmandu road at Mugling and heads west along the Prithvi Highway.',
      },
      {
        q: 'Can we stop a night at Bandipur or Chitwan?',
        a: 'Yes. Tell us your stops when you book. Where the trip can’t be priced automatically, the fare is confirmed on WhatsApp or by phone before travel.',
      },
      {
        q: 'Can the same car bring us back to Raxaul?',
        a: 'Book a round trip and tell us your dates. The car comes with a driver, and you get a reference number for the booking.',
      },
    ],
  },
}
