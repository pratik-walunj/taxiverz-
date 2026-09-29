import type { PageCopy } from './types'

/**
 * Bus, self-drive, bike and corporate hubs (Phase 5). Bus, self-drive and bike
 * stay draft through the vehicle gate until the owner confirms the vehicles
 * (B3, E5, E6); corporate has no vehicle gate. No deposit, licence, billing,
 * invoice or client claims until confirmed (E5, H1, F4).
 */
export const verticalCopy: Record<string, PageCopy> = {
  'bus-rental': {
    // Draft until a fitting vehicle is live (B3/F1); the vehicle gate also blocks it.
    publish: false,
    summary:
      'Buses with a driver for weddings, pilgrimages, school trips and tours. Tell us the date, the route and how many people are travelling.',
    intro: `When a group is bigger than a tempo traveller can take, a bus keeps everyone together on one vehicle, with one driver and one plan. Buses are booked for wedding guests, pilgrim groups, school and college trips, staff outings and large family tours.

The buses you can book are listed on this page, with their seating layout and photos. For groups of up to 26, a tempo traveller or an Urbania is usually the better fit and can be booked straight from the fare box.

Bus trips are booked by enquiry. Tell us the date, the pickup point, the route with any stops, how many people are travelling, and whether it is a one-day trip or several days. For a wedding, add the timings at each venue; for a pilgrimage, the temples and the order you want to visit them.

We reply with the bus that fits your group, the price and what it covers. For dates in the wedding season, enquire early.`,
    faqs: [
      {
        q: 'How many people can travel in a bus?',
        a: 'It depends on the bus and its seating layout; each bus on this page shows its seats. Tell us your group size and we will suggest one.',
      },
      {
        q: 'Should I book a bus or a tempo traveller?',
        a: 'For up to 26 people a tempo traveller or Urbania is usually easier. For larger groups, a bus keeps everyone together.',
      },
      {
        q: 'Can I book a bus for several days?',
        a: 'Yes. Send the full itinerary with your enquiry and we will quote for the trip.',
      },
      {
        q: 'How do I book a bus?',
        a: 'Send the enquiry form on this page, or WhatsApp or call us with the date, route and group size.',
      },
    ],
  },

  'self-drive-car-rental': {
    // Draft until a fitting vehicle is live (B3/F1); the vehicle gate also blocks it.
    publish: false,
    summary:
      'Self-drive cars you drive yourself. Tell us the dates and the car you want; we confirm availability, documents and the deposit.',
    intro: `Some trips are better with no driver: a weekend away as a couple, a work week where you set your own hours, or simply the pleasure of driving. A self-drive car gives you the keys for the days you book.

The cars available for self-drive are listed on this page, each with its photos. Only the cars shown here are offered without a driver; every other car in the fleet comes with one.

Self-drive is booked by enquiry, because each booking needs a few checks. Tell us the dates, where you will pick up and return the car, roughly where you plan to drive, and which car you want. We reply with availability, the price, the documents you need to show, the security deposit and any kilometre limit — before you commit to anything.

If you would rather not drive on unfamiliar roads, any of these trips can be booked with a driver instead.`,
    faqs: [
      {
        q: 'Which cars can I drive myself?',
        a: 'Only the cars listed on this page are available for self-drive. Every other car comes with a driver.',
      },
      {
        q: 'What documents do I need?',
        a: 'We confirm the documents, the deposit and any kilometre limit when we reply to your enquiry, before you book.',
      },
      {
        q: 'Can I take a self-drive car out of the city?',
        a: 'Tell us where you plan to drive when you enquire, and we will confirm whether that is possible for the car you chose.',
      },
      {
        q: 'Can I book the same car with a driver instead?',
        a: 'Yes. Use the fare box for a car class with a driver, or ask in your enquiry.',
      },
    ],
  },

  'bike-rental': {
    // Draft until a fitting vehicle is live (B3/F1); the vehicle gate also blocks it.
    publish: false,
    summary:
      'Motorcycles and scooters on rent. Tell us the dates and the bike you want; we confirm availability, documents and the deposit.',
    intro: `A bike or scooter is the quickest way around a busy city, and the most fun way to see the countryside on a clear day. Rent one for a day of errands, a week of getting around, or a ride out of town.

The motorcycles and scooters you can rent are listed on this page with their photos — from scooters for city use to bigger motorcycles for longer rides.

Bike rental is booked by enquiry. Tell us the dates, where you will pick up and return the bike, and which bike you want. We reply with availability, the price, the documents you need to show, the security deposit and any kilometre limit before you book. Helmets are required by law for the rider and the pillion; ask us about helmets when you enquire.

Check the weather before a long ride, especially in the monsoon, when roads can flood and visibility drops quickly. In winter, fog on the highways around Gorakhpur makes early-morning and late-night riding risky; plan long rides for the middle of the day. If you are new to the bike you rent, take a few minutes to get used to its brakes and weight before heading into traffic.`,
    faqs: [
      {
        q: 'Which bikes can I rent?',
        a: 'The motorcycles and scooters listed on this page. Tell us which one you want when you enquire.',
      },
      {
        q: 'What documents do I need?',
        a: 'We confirm the documents, the deposit and any kilometre limit when we reply to your enquiry.',
      },
      {
        q: 'Do I need a helmet?',
        a: 'Yes — Indian law requires helmets for the rider and the pillion. Ask about helmets in your enquiry.',
      },
      {
        q: 'Can I rent a bike for a week?',
        a: 'Tell us your dates when you enquire and we will quote for the whole period.',
      },
    ],
  },

  'corporate-car-rental': {
    publish: true,
    summary:
      'Cars with drivers for companies: guest pickups, staff travel, site visits and events. Tell us your monthly volume and we’ll set it up.',
    intro: `Companies need cars for all sorts of reasons: a client arriving at Gorakhpur Airport, a manager visiting sites across eastern Uttar Pradesh, an auditor who needs a car for a week, or a conference that has to move guests between a hotel and a venue.

Taxiverz books cars with drivers for businesses, from a single airport pickup to regular monthly travel. You get the same car classes as everyone else — hatchbacks and sedans for day-to-day travel, MPVs for senior guests, tempo travellers for groups — booked through one contact.

Tell us about your company and what you need: the kind of trips, roughly how many a month, the cities involved, and who will be booking. If you want the company's GSTIN on your paperwork, include it. We will come back to you with how bookings, confirmations and billing can work for your volume.

For a one-off trip, you don't need to set anything up — just check the fare and book like anyone else.`,
    faqs: [
      {
        q: 'Do we need a contract to book?',
        a: 'No. One-off trips can be booked through the fare box. For regular travel, send the corporate form and we will propose how bookings and billing can work.',
      },
      {
        q: 'Can you pick up our guests from the airport or the station?',
        a: 'Yes. Send the guest’s name, flight or train and arrival time when you book.',
      },
      {
        q: 'Can we book cars for an event?',
        a: 'Yes — sedans and MPVs for guests, and tempo travellers to move groups between venues. Tell us the programme when you enquire.',
      },
      {
        q: 'Should I include our GSTIN?',
        a: 'If you want it on your paperwork, add it to the form. It is optional.',
      },
    ],
  },
}

/** The India–Nepal hub and its Gorakhpur and Raxaul pages. Border steps, charges and vehicle changes stay out until D1–D3. */
export const NEPAL_DOCUMENTS =
  "Indian citizens don't need a visa for Nepal. Carry a valid passport or Voter ID card. Call or WhatsApp us for the full document checklist before you travel."

export const nepalCopy: PageCopy = {
  publish: true,
  summary:
    'Taxis from Gorakhpur and Raxaul into Nepal — Kathmandu, Pokhara, Lumbini, Chitwan and more. Check the fare by car class or send us your trip.',
  intro: `Nepal is next door to eastern Uttar Pradesh and Bihar, and a lot of travel between the two countries goes by road: pilgrims to Lumbini and Pashupatinath, families visiting relatives, tourists heading for Kathmandu, Pokhara and Chitwan, and business travellers.

From this side there are two main land crossings. Sonauli, north of Gorakhpur, faces Belahiya and Bhairahawa in Nepal, close to Lumbini. Raxaul, in Bihar, faces Birgunj, on the way to Kathmandu. Which crossing suits you depends on where you are starting and where you are going.

When you book, we confirm the crossing, the travel time, and how the journey is arranged across the border for your trip, before you travel. Use the fare box with your pickup and your destination in Nepal to see the cars, or send us the trip on WhatsApp.

Documents: ${NEPAL_DOCUMENTS}`,
  faqs: [
    {
      q: 'Do Indian citizens need a visa for Nepal?',
      a: NEPAL_DOCUMENTS,
    },
    {
      q: 'Which border crossing will we use?',
      a: 'It depends on your trip. The main crossings from this side are Sonauli–Bhairahawa and Raxaul–Birgunj. We confirm the crossing when you book.',
    },
    {
      q: 'Which places in Nepal can I book a taxi to?',
      a: 'Enter your destination in the fare box — for example Kathmandu, Pokhara, Lumbini or Chitwan. If a place isn’t listed, type it and we will confirm the trip.',
    },
    {
      q: 'Can I book a round trip to Nepal?',
      a: 'Yes. Choose Round trip in the fare box and add your dates, or send us your itinerary on WhatsApp.',
    },
  ],
}

export const nepalCityCopy: Record<string, PageCopy> = {
  gorakhpur: {
    publish: true,
    summary:
      'Gorakhpur to Nepal by road via Sonauli: Lumbini, Kathmandu, Pokhara and Chitwan. Pickup from your home, hotel or Gorakhpur Junction.',
    intro: `Gorakhpur is the nearest big city to the Sonauli crossing, and for many travellers it is where a Nepal trip starts: they arrive at Gorakhpur Junction by train or at Gorakhpur Airport by air, and continue north by road. Our head office is at Railway Station Gate No-1, so a Nepal trip can start as you step off the train.

The road north runs through Maharajganj district to Sonauli, where the Indian side of the border faces Belahiya in Nepal, next to Bhairahawa (Siddharthanagar). Lumbini, the birthplace of the Buddha, lies a short way west of Bhairahawa, which makes Gorakhpur–Lumbini one of the most common cross-border trips, often combined with Kushinagar on the Indian side.

Beyond the border, the roads go on to Butwal and then either east towards Chitwan and Kathmandu or north towards Pokhara. These are long mountain drives: plan them in daylight, and allow for stops.

When you book, we confirm the crossing, the timings and how the journey is arranged across the border for your trip. Enter Gorakhpur and your destination in the fare box, or send us the trip on WhatsApp.

Documents: ${NEPAL_DOCUMENTS}`,
    faqs: [
      {
        q: 'Which border do you cross from Gorakhpur?',
        a: 'The usual crossing from Gorakhpur is Sonauli–Bhairahawa. We confirm the crossing and timings for your trip when you book.',
      },
      {
        q: 'Can I combine Kushinagar and Lumbini?',
        a: 'Many travellers do. Send us your plan with the order of places and the number of days, and we will confirm the trip.',
      },
      {
        q: 'Can you pick me up from Gorakhpur Junction for a Nepal trip?',
        a: 'Yes. Our office is at Railway Station Gate No-1. Send your train details when you book.',
      },
      {
        q: 'What documents do I need?',
        a: NEPAL_DOCUMENTS,
      },
    ],
  },
  raxaul: {
    publish: true,
    summary:
      'Raxaul to Nepal by road via Birgunj: Kathmandu, Pokhara, Chitwan and more. Book by car class or send us your trip on WhatsApp.',
    intro: `Raxaul, in the East Champaran district of Bihar, sits on the border opposite Birgunj, one of Nepal's main commercial towns. It is the natural crossing for travellers from Bihar and eastern Uttar Pradesh heading to Kathmandu, and Raxaul–Birgunj is one of the busiest crossings between the two countries.

Many travellers reach Raxaul by train at Raxaul Junction and continue by road from the station. From Birgunj, the roads north lead to Hetauda, and on to Kathmandu or west to Chitwan.

The drive from the border to Kathmandu crosses hill country and should be planned in daylight. Traffic at the crossing itself can be slow, with trucks queuing on both sides, so allow time for it rather than planning a tight connection. Raxaul is also the crossing many travellers use when they are coming from Patna, Muzaffarpur or Motihari by road. For Pokhara or Lumbini, the route and the crossing may differ; tell us your plan and we will suggest the best way.

When you book, we confirm the crossing, the timings and how the journey is arranged across the border for your trip. Enter Raxaul and your destination in the fare box, or send us the trip on WhatsApp.

Documents: ${NEPAL_DOCUMENTS}`,
    faqs: [
      {
        q: 'Can you pick me up from Raxaul Junction?',
        a: 'Yes. Send your train details when you book, and we will confirm where to meet.',
      },
      {
        q: 'Is Raxaul the best crossing for Kathmandu?',
        a: 'For travellers coming from Bihar it often is. From Gorakhpur, Sonauli can suit better. Tell us where you start and we will suggest the crossing.',
      },
      {
        q: 'Can I go from Raxaul to Pokhara?',
        a: 'Yes. Enter Pokhara in the fare box with Raxaul as pickup, or send us your plan on WhatsApp.',
      },
      {
        q: 'What documents do I need?',
        a: NEPAL_DOCUMENTS,
      },
    ],
  },
}
