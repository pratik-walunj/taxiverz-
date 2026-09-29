import type { PageCopy } from './types'

/**
 * Service hub copy (Phase 4A). Rules (CLAUDE.md "Truth", REBUILD_PLAN §5):
 * Taxiverz facts only from config/business.ts and owner answers — no 24/7,
 * no response times, no prices, no fleet counts, no payment or cancellation
 * terms, no border rules. Every FAQ answer must be true today.
 * Owner review list: docs/OWNER_TODO.md (copy review).
 */
export const serviceCopy: Record<string, PageCopy> = {
  'outstation-cabs': {
    publish: true,
    summary:
      'Round-trip cabs with a driver from Gorakhpur to Ayodhya, Varanasi, Kushinagar, Lucknow and beyond. Pick a car class and check the fare online.',
    intro: `An outstation cab is a car and driver that stay with you for the whole trip — out to your destination, around it for as long as you need, and back home. It suits family visits, weddings in another town, pilgrimages and short holidays where you want to stop when you like rather than fit around bus and train times.

You book by vehicle class, not by a single named car. A sedan class means a Dzire, an Etios or something similar; an MUV means an Ertiga; an MPV means an Innova Crysta. Tell us how many people are travelling and how much luggage you have, and pick the class that fits. If a particular model matters to you, mention it when you book and we'll tell you whether we can send it.

A round-trip fare depends on how many days you keep the car and how far you drive. When the fare page can price your trip, it shows what the total includes; where it can't — a new destination, or a trip with several stops — we confirm the fare with you on WhatsApp or by phone before you travel.

To book, enter your pickup and destination in the fare box, choose a car and add your travel dates. You can confirm online, send the trip to us on WhatsApp with the details already filled in, or simply call. Every booking gets a reference number you can quote when you speak to us.`,
    faqs: [
      {
        q: 'What is the difference between an outstation cab and a one-way cab?',
        a: 'An outstation (round-trip) cab keeps the car and driver with you and brings you back. A one-way cab drops you at your destination and the trip ends there. They are priced differently, so choose the right tab in the fare box.',
      },
      {
        q: 'Can I keep the car for several days?',
        a: 'Yes. Add your travel date and your return date when you book, and the car and driver stay with you for those days.',
      },
      {
        q: 'Can I choose the exact car model?',
        a: 'You book a class, such as sedan or SUV, and we send a car from that class. If you want a particular model, tell us when you book and we will let you know whether it is available.',
      },
      {
        q: 'Can I stop on the way?',
        a: 'Yes — on a round trip the car is yours for the day. If you plan extra towns or long detours, tell us when you book so the fare covers them.',
      },
      {
        q: 'How do I book an outstation cab?',
        a: 'Enter your trip in the fare box and pick a car, or send us the trip on WhatsApp, or call. Every booking gets a reference number.',
      },
    ],
  },

  'one-way-cabs': {
    publish: true,
    summary:
      'One-way drops from Gorakhpur to another city, station or airport, priced on a one-way fare. Choose a car class and check the fare online.',
    intro: `A one-way cab takes you from one place to another and ends there. You don't keep the car for the return journey, so it is priced as a one-way trip rather than a round trip. It is the usual choice when you are moving to another city, catching a flight or train from somewhere else, or joining family who will bring you back.

Common one-way trips start in Gorakhpur and end at Lucknow, Varanasi or Ayodhya — often at the railway station or the airport there — or at towns across eastern Uttar Pradesh and Bihar. Pickup can be your home, a hotel, Gorakhpur Junction or the airport.

You book by vehicle class. A hatchback suits one or two people with light bags; a sedan takes a family of four with suitcases; an MUV or an MPV gives more room for six or seven and their luggage. For larger groups there are tempo travellers and Urbania vans. The exact model depends on what is free on the day.

Enter your pickup and drop in the fare box to see the cars that fit. Where the fare can be worked out, you see it before you share any contact details; otherwise we confirm it on WhatsApp or by phone. Then book online, on WhatsApp or by calling — you get a reference number either way.`,
    faqs: [
      {
        q: 'Do I pay for the car to come back?',
        a: 'A one-way trip is priced on a one-way fare, which is different from a round-trip fare. The fare page shows what your trip costs and what it includes; where it can’t price the trip, we confirm the fare with you before you travel.',
      },
      {
        q: 'Can you drop me at a railway station or an airport in another city?',
        a: 'Yes. Type the station or airport as your drop point — for example Lucknow Airport or Varanasi Junction — and the fare box will match it.',
      },
      {
        q: 'Which car should I pick for a one-way trip?',
        a: 'Go by people and luggage: a hatchback for one or two with light bags, a sedan for up to four with suitcases, an MUV or MPV for six or seven, and a tempo traveller for groups.',
      },
      {
        q: 'Can I book for someone else?',
        a: 'Yes. Book with your details and add the traveller’s pickup address; tell us their name and number on WhatsApp or by phone so the driver can reach them.',
      },
    ],
  },

  'airport-taxi': {
    publish: true,
    summary:
      'Airport taxis to and from Gorakhpur Airport, Kushinagar, Lucknow and Varanasi airports. Pick a car class and check the fare online.',
    intro: `An airport taxi picks you up from the terminal after you land, or takes you from your door to the airport in time for your flight. Book it before you travel so you aren't looking for a car with your bags at the kerb.

Gorakhpur Airport (GOP) is the airport inside the city. Many people from Gorakhpur and the surrounding districts also fly from Lucknow (LKO) or Varanasi (VNS), which have more flights, and Kushinagar International Airport (KBK) is the airport for the Buddhist circuit around Kushinagar. The airport tab in the fare box covers all of them: choose the airport, whether you are going to it or coming from it, and your pickup or drop area.

For an arrival, send us your flight number when you book so the driver knows when to be there. For a departure, allow for check-in and for traffic on the way — if you are unsure what time to leave, ask us when you book.

Choose a car class by the number of people and bags: a sedan for up to four with suitcases, an MUV or MPV for larger families, a tempo traveller for groups. Book online, send the trip on WhatsApp, or call; each booking gets a reference number.`,
    faqs: [
      {
        q: 'Which airports do you cover?',
        a: 'The airport tab in the fare box lists them, including Gorakhpur Airport (GOP), Kushinagar International Airport (KBK), Lucknow Airport (LKO) and Varanasi Airport (VNS).',
      },
      {
        q: 'Should I give you my flight number?',
        a: 'Yes, for pickups. Send it on WhatsApp or add it when we confirm your booking, so the driver knows your arrival time.',
      },
      {
        q: 'When should I leave for the airport?',
        a: 'That depends on your airline’s check-in time and the distance. Tell us your flight time when you book and we will suggest a pickup time.',
      },
      {
        q: 'Can I book an airport taxi for a group?',
        a: 'Yes. Choose an MPV for six or seven people, or a tempo traveller or Urbania for bigger groups with luggage.',
      },
    ],
  },

  'local-car-rental': {
    publish: true,
    summary:
      'Car and driver by the hour in Gorakhpur: 6-hour, 8-hour and 12-hour packages for shopping, meetings, weddings and sightseeing.',
    intro: `Car rental with driver means you hire a car and driver for a block of time within the city, and use it however you like — a round of errands, a string of meetings, a family function, hospital visits, or a day of sightseeing. The car waits while you are inside, so there is no hunting for autos between stops.

You pick a package by hours and kilometres: 6 hours with 60 km, 8 hours with 80 km, or 12 hours with 120 km. Most city days fit in the 8-hour package. If the day runs longer or you drive further than the package allows, the extra time and distance are charged on top, at the extra-hour and extra-km rates for the car you chose.

You book by vehicle class. A hatchback or sedan is easy to park in busy markets; an MUV or MPV is more comfortable for a family outing or for elderly passengers; a tempo traveller moves a whole wedding party between venues.

Open the Local tab in the fare box, choose your city and your package, and pick a car. Book online, send the booking on WhatsApp, or call — you'll get a reference number, and we confirm the car and the pickup time with you before the day.`,
    faqs: [
      {
        q: 'Which local packages can I book?',
        a: 'Three: 6 hours with 60 km, 8 hours with 80 km, and 12 hours with 120 km. Pick one in the Local tab of the fare box.',
      },
      {
        q: 'What if I use more time or kilometres than the package?',
        a: 'The extra hours and kilometres are charged at the extra-hour and extra-km rates for the car you chose, on top of the package.',
      },
      {
        q: 'Can I use a local package for a wedding?',
        a: 'Yes. Many families book a sedan or an MPV for the day of a function, or a tempo traveller to move guests between venues.',
      },
      {
        q: 'Can I go outside the city on a local package?',
        a: 'Local packages are for travel within and around the city. For a trip to another town, book an outstation (round-trip) cab instead.',
      },
    ],
  },

  'tempo-traveller': {
    publish: true,
    summary:
      'Tempo travellers, Force Urbania and Tata Winger with driver for groups of 13 to 26: weddings, pilgrimages, tours and office trips.',
    intro: `When a group is too big for two or three cars, one tempo traveller keeps everyone together, with room for bags and a single driver who knows the plan. It is the usual choice for wedding parties, pilgrim groups, school and college trips, office outings and families travelling together.

You choose by seats. Tempo travellers come in 13, 17, 20 and 26-seat versions (Force Traveller or similar). The Force Urbania, in 13 and 17 seats, is the newer model, with a ride closer to a car’s. The Tata Winger is a smaller van for mid-sized groups. The exact vehicle depends on availability — if you have a preference, tell us when you book.

Group trips can be one-way, a round trip over several days, or a local package for a wedding day in town. Popular group trips from Gorakhpur go to Ayodhya, Varanasi and Kushinagar, and to wedding venues across eastern Uttar Pradesh and Bihar.

Enter your trip in the fare box and the results include the group vehicles. Where the fare can be worked out you see it straight away; otherwise we confirm it on WhatsApp or by phone. Book online, on WhatsApp or by calling, and you'll get a reference number.`,
    faqs: [
      {
        q: 'Which tempo traveller sizes can I book?',
        a: 'Tempo travellers with 13, 17, 20 or 26 seats, Force Urbania with 13 or 17 seats, and the Tata Winger. Choose by the number of people in your group.',
      },
      {
        q: 'What is the difference between a tempo traveller and an Urbania?',
        a: 'Both are Force vans for groups. The Urbania is the newer model, with a ride closer to a car’s — worth considering for long drives.',
      },
      {
        q: 'Can I book a tempo traveller for a wedding?',
        a: 'Yes — as a local package to move guests between venues on the day, or as a round trip if the wedding is in another town.',
      },
      {
        q: 'Can I book a tempo traveller one way?',
        a: 'Yes. Choose the One way tab in the fare box; group vehicles appear in the results alongside cars.',
      },
    ],
  },
}
