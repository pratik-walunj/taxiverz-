import type { PageCopy } from './types'

/**
 * Gorakhpur copy (Phase 4A): the city hub and the service × Gorakhpur pages.
 * Same truth rules as copy/services.ts. Place facts are public and checkable
 * (stations, airports, landmarks); no distances or drive times until the
 * owner-reviewed distances CSV exists.
 */
export const gorakhpurCity: PageCopy = {
  publish: true,
  summary:
    'Cabs from our office at Railway Station Gate No-1, Gorakhpur: hourly hire with driver, outstation and one-way trips, airport taxis and tempo travellers.',
  intro: `Taxiverz is based in Gorakhpur: our head office is at Railway Station Gate No-1, at Gorakhpur Junction. We pick up from the station, the airport, or your home, hotel or office anywhere in the city.

Gorakhpur is one of the largest cities in eastern Uttar Pradesh, and a lot of travel starts here. Gorakhpur Junction is the headquarters of the North Eastern Railway and has one of the longest railway platforms in the world. Gorakhpur Airport (GOP) is inside the city. Kushinagar International Airport (KBK) serves the Buddhist sites around Kushinagar. National Highway 27 runs through the city, linking it west to Basti, Ayodhya and Lucknow and east towards Kushinagar and Bihar. The border crossing at Sonauli, the main road into Nepal from this side, lies to the north.

Within the city, people hire a car and driver for errands, hospital visits, weddings and sightseeing — the Gorakhnath Temple, Gita Press, the lakefront at Ramgarh Tal and the markets around Golghar. Common trips out of Gorakhpur go to Ayodhya, Varanasi, Kushinagar and Lucknow, and across the border into Nepal.

You book by car class — hatchback, sedan, SUV, MPV, tempo traveller and more — and see the cars that fit your trip in the fare box above. Book online, send your trip on WhatsApp, or call; every booking gets a reference number.`,
  faqs: [
    {
      q: 'Where is the Taxiverz office in Gorakhpur?',
      a: 'At Railway Station Gate No-1, Gorakhpur, Uttar Pradesh 273001 — at Gorakhpur Junction.',
    },
    {
      q: 'Can you pick me up from Gorakhpur Junction?',
      a: 'Yes. Our office is at Gate No-1 of the station. Tell us your train and coach when you book, and we will confirm where to meet.',
    },
    {
      q: 'Do you pick up from Gorakhpur Airport?',
      a: 'Yes. Use the Airport tab in the fare box, choose Gorakhpur Airport (GOP) and whether you are arriving or departing.',
    },
    {
      q: 'Which cars can I book in Gorakhpur?',
      a: 'Hatchbacks, sedans, premium sedans, MUVs, SUVs, the Innova Crysta, tempo travellers, Urbania and the Tata Winger. You book by class; the exact model depends on availability.',
    },
    {
      q: 'How do I book a cab in Gorakhpur?',
      a: 'Enter your trip in the fare box and choose a car, send us the trip on WhatsApp, or call +91 85760 00083.',
    },
  ],
}

export const gorakhpurServices: Record<string, PageCopy> = {
  'outstation-cabs': {
    publish: true,
    summary:
      'Round-trip cabs from Gorakhpur to Ayodhya, Varanasi, Kushinagar, Lucknow and Nepal, with the car and driver for your whole trip.',
    intro: `An outstation trip starts from your door anywhere in Gorakhpur, or from our office at Railway Station Gate No-1 if you arrive by train. The car and driver stay with you until you are home again.

A few trips from Gorakhpur are especially common. Ayodhya, to the west along National Highway 27, is a common day trip or overnight stay for darshan at the Ram Mandir and the ghats of the Saryu. Varanasi, to the south-west, is usually two or three days — the ghats, Kashi Vishwanath, and often Sarnath on the way back. Kushinagar, east of Gorakhpur, is where the Buddha passed away, and many visitors combine it with Lumbini across the Nepal border. Lucknow draws family visits, hospital appointments and weddings.

Weddings account for a lot of outstation travel in eastern Uttar Pradesh. Families book a sedan or an MPV for the family and a tempo traveller for the baraat, for a wedding in Deoria, Basti, Ballia or further away, and keep them for the whole function.

A round trip suits you when you want to stop on the way, stay a night or two, or travel with elderly parents who need to rest. If you are only going one way — say, to catch a flight from Lucknow or Varanasi — a one-way cab is the better fit.

Put Gorakhpur as your pickup in the fare box, add your destination, and choose a car.`,
    faqs: [
      {
        q: 'Can I do Ayodhya from Gorakhpur as a day trip?',
        a: 'Many people do, leaving early and returning at night. If you want time at the temple and the ghats without rushing, keep the car for a second day and stay overnight.',
      },
      {
        q: 'Can I combine Kushinagar and Lumbini in one trip?',
        a: 'Many visitors do. Tell us your plan when you book, including whether you will cross into Nepal, and we will confirm the car and the fare.',
      },
      {
        q: 'Can the driver wait while we attend a wedding?',
        a: 'Yes. On a round trip the car and driver stay with you, including while you are at the function.',
      },
      {
        q: 'Where do outstation trips from Gorakhpur start?',
        a: 'From your home, hotel or office in Gorakhpur, or from our office at Railway Station Gate No-1 if you arrive by train.',
      },
    ],
  },

  'one-way-cabs': {
    publish: true,
    summary:
      'One-way cabs from Gorakhpur to Lucknow, Varanasi, Ayodhya, Patna and more — drop at a home, hotel, station or airport.',
    intro: `One-way cabs from Gorakhpur are mostly about getting somewhere to catch something else, or moving without needing the car back.

The most common one-way trips go to Lucknow and Varanasi. Both have far more flights than Gorakhpur Airport, so many travellers take a cab to Lucknow Airport (LKO) or Varanasi Airport (VNS) for an international or early-morning flight. Others head to Lucknow Charbagh or Varanasi Junction for a train that doesn't stop at Gorakhpur, or to Ayodhya Dham Junction.

One-way cabs also suit students moving to college in Lucknow or Varanasi, patients going to a hospital in a bigger city, and families returning home after a wedding. Eastwards, one-way trips go to Kushinagar and across the Bihar border to towns such as Gopalganj.

Pickup can be anywhere in Gorakhpur — your home, a hotel, Gorakhpur Junction (our office is at Gate No-1) or the airport. For a flight or a train, tell us the departure time when you book so we can suggest when to leave. In December and January, fog on the highways around Gorakhpur can slow the drive badly, especially at night and early in the morning, so leave extra time in winter.

Put Gorakhpur as your pickup and your destination as the drop in the One way tab, and choose a car by the number of people and bags.`,
    faqs: [
      {
        q: 'Can I take a one-way cab from Gorakhpur to Lucknow Airport?',
        a: 'Yes. Choose One way, put Gorakhpur as pickup and Lucknow Airport as the drop, and pick a car.',
      },
      {
        q: 'Can you drop me at Varanasi Junction for a train?',
        a: 'Yes. Type Varanasi Junction as the drop point, and tell us your train time so we can suggest when to leave Gorakhpur.',
      },
      {
        q: 'Do you go one way into Bihar?',
        a: 'Yes, to towns across the border such as Gopalganj. Enter the town in the fare box; if it isn’t listed, type it and we will confirm the fare.',
      },
      {
        q: 'Can I be picked up from Gorakhpur Junction?',
        a: 'Yes — our office is at Railway Station Gate No-1. Tell us your train when you book.',
      },
    ],
  },

  'airport-taxi': {
    publish: true,
    summary:
      'Taxi to and from Gorakhpur Airport (GOP), and from Gorakhpur to Lucknow, Varanasi and Kushinagar airports. Check the fare by car class online.',
    intro: `Gorakhpur Airport (GOP), also known as Mahayogi Gorakhnath Airport, is the city's own airport. It has fewer flights than the big airports nearby, which is why a lot of airport trips from Gorakhpur go further.

For flights not available from Gorakhpur — including all international flights — people drive to Lucknow Airport (LKO) or Varanasi Airport (VNS). Kushinagar International Airport (KBK), east of the city, serves the Buddhist circuit and is used by pilgrims and tour groups visiting Kushinagar and Lumbini.

For arrivals at Gorakhpur Airport, book before you fly and send us your flight number so the driver knows when you land. For departures, tell us your flight time and we will suggest when to leave; for Lucknow or Varanasi, allow for the longer drive and for check-in. Winter fog on the highways in December and January can add a lot of time to an early-morning drive. Gorakhpur's civil terminal sits within the Air Force station, so keep your ticket and ID handy at the entrance.

Families and groups often need more than a sedan: an MPV such as the Innova Crysta takes six or seven with bags, and a tempo traveller or Urbania suits a tour group arriving together.

Use the Airport tab in the fare box: choose the airport, whether you are going to it or coming from it, and your area in Gorakhpur.`,
    faqs: [
      {
        q: 'Do you pick up from Gorakhpur Airport?',
        a: 'Yes. Book in the Airport tab, choose Gorakhpur Airport (GOP) and “from the airport”, and send us your flight number.',
      },
      {
        q: 'Can I take a cab from Gorakhpur to Lucknow Airport?',
        a: 'Yes. Choose Lucknow Airport (LKO) in the Airport tab, or book a one-way cab with Lucknow Airport as the drop.',
      },
      {
        q: 'Do you go to Kushinagar International Airport?',
        a: 'Yes. Choose Kushinagar International Airport (KBK) in the Airport tab.',
      },
      {
        q: 'What if my flight is delayed?',
        a: 'Message us on WhatsApp with the new arrival time as soon as you know it, so we can tell the driver.',
      },
    ],
  },

  'local-car-rental': {
    publish: true,
    summary:
      'Hire a car and driver in Gorakhpur by the hour — 6, 8 or 12-hour packages for errands, weddings, hospital visits and sightseeing.',
    intro: `A local package gives you a car and driver in Gorakhpur for a set number of hours and kilometres — 6 hours with 60 km, 8 hours with 80 km, or 12 hours with 120 km. The driver waits at each stop, so you move around the city at your own pace.

People book local packages in Gorakhpur for all sorts of days. Wedding families use them to shuttle between the venue, the parlour and the station. Visitors spend a day on the city's sights: the Gorakhnath Temple, the Gita Press, the lakefront and Nauka Vihar at Ramgarh Tal, and the zoo. Shoppers work through the markets around Golghar. Patients and their families use a car for the day for hospital appointments, when waiting for an auto between tests is the last thing anyone needs.

If you arrive at Gorakhpur Junction for a day of meetings, an 8-hour package usually covers it — our office is at Gate No-1, so the car can meet you off the train.

If the day runs over, extra hours and kilometres are added at the rates for the car you chose. For a trip out of the city — to Kushinagar, say — book an outstation cab instead.

Open the Local tab in the fare box, choose Gorakhpur and a package, and pick a car.`,
    faqs: [
      {
        q: 'Which package should I pick for a day in Gorakhpur?',
        a: 'Most city days fit in 8 hours and 80 km. Choose 6 hours for a shorter round of errands, or 12 hours for a wedding or a long day of meetings.',
      },
      {
        q: 'Can the car meet me at Gorakhpur Junction?',
        a: 'Yes. Our office is at Railway Station Gate No-1; tell us your train when you book.',
      },
      {
        q: 'Can I visit the Gorakhnath Temple and Ramgarh Tal on a local package?',
        a: 'Yes. Both are in the city. Plan your stops and the driver will take you round them within your package.',
      },
      {
        q: 'Can I go to Kushinagar on a local package?',
        a: 'Kushinagar is a separate town, so book an outstation or one-way cab for it rather than a local package.',
      },
    ],
  },

  'tempo-traveller': {
    publish: true,
    summary:
      'Tempo traveller and Urbania hire in Gorakhpur for baraats, pilgrim groups and tours — 13, 17, 20 and 26 seats with driver.',
    intro: `In Gorakhpur, most tempo traveller bookings are for weddings and pilgrimages.

A baraat travelling to a wedding in Deoria, Kushinagar, Basti or further needs to arrive together; one 20 or 26-seat tempo traveller does that with a single driver. For the wedding day itself, families book a tempo traveller on a local package to move guests between the venue, the hotel and the station.

Pilgrim groups from Gorakhpur often go to Ayodhya, to Varanasi, and to Kushinagar and Lumbini on the Buddhist circuit. A 13 or 17-seat Force Urbania is a comfortable choice for a family group on a long drive; a tempo traveller takes larger groups.

Schools, colleges and offices book group vehicles for day trips and outings, and families use them when relatives arrive together at Gorakhpur Junction — our office is at Gate No-1, so the van can meet the train.

Enter the trip in the fare box — Gorakhpur as pickup — and the group vehicles appear in the results with the cars. Tell us the number of people and the luggage when you book. If a wedding venue is in a village off the main road, mention that too: lanes can be narrow, and a 13 or 17-seat vehicle, or two smaller ones, may get closer to the door than a 26-seater.`,
    faqs: [
      {
        q: 'Can I hire a tempo traveller in Gorakhpur for a baraat?',
        a: 'Yes. Book a round trip if the wedding is in another town, so the vehicle and driver stay with the group, or a local package for a wedding in Gorakhpur.',
      },
      {
        q: 'Which size should I book for my group?',
        a: 'Count everyone travelling, including children, and book the next size up if you have a lot of luggage: 13, 17, 20 or 26 seats, or the 13 and 17-seat Urbania.',
      },
      {
        q: 'Can a tempo traveller pick up a group from Gorakhpur Junction?',
        a: 'Yes. Tell us the train and coach numbers when you book, and we will confirm where to meet.',
      },
      {
        q: 'Do you run tempo travellers to Ayodhya and Varanasi?',
        a: 'Yes. Enter the destination in the fare box with Gorakhpur as pickup, and choose a group vehicle from the results.',
      },
    ],
  },

  'luxury-car-rental': {
    publish: true,
    summary:
      'Chauffeur-driven luxury cars in Gorakhpur for weddings at city venues, VIP pickups at the Junction or airport, and hotel guests.',
    intro: `In Gorakhpur, a luxury car is usually booked for one of three reasons: a wedding at one of the city's marriage lawns or banquet halls, an important guest arriving by train or plane, or a family occasion where the car is part of the welcome.

Wedding bookings are the most common. The groom's car often sets out from a hotel or the family home and has to reach the venue at the right moment, then wait through the ceremonies and take the couple away after the vidaai. Give us the venue name and the muhurat when you write, and our driver plans the route through the city's evening traffic around it.

Many guests reach Gorakhpur at the Junction, where our head office sits at Railway Station Gate No-1, so a luxury car can be waiting for them near the station entrance. Others land at Gorakhpur Airport (GOP); the civil terminal is inside the Air Force station, so share the flight number and the guest's name and we confirm the meeting point. Companies, hospitals and institutions in the city book the same way for visiting officials, doctors or speakers, and families book a car to take elderly relatives to the Gorakhnath Temple in comfort.

Every luxury car comes with a driver and is booked by enquiry, not through the fare box. Send the date, the pickup point in Gorakhpur, the timings and the car you have in mind on WhatsApp or by phone at +91 85760 00083, or visit our office at the station. We reply with what is free that day, the price and what the booking includes.`,
    faqs: [
      {
        q: 'Can a luxury car pick up a guest from Gorakhpur Junction?',
        a: 'Yes. Our office is at Railway Station Gate No-1. Send the train number and coach, and the driver will meet the guest near the station entrance.',
      },
      {
        q: 'Can you receive a VIP guest at Gorakhpur Airport?',
        a: 'Yes. Share the flight number and the guest’s name when you enquire, and we will confirm where the driver will wait outside the terminal.',
      },
      {
        q: 'Can the car wait at a wedding venue in Gorakhpur?',
        a: 'Yes. Tell us the venue and the timings of the baraat and the vidaai, so the booking covers the hours the car stays with you.',
      },
      {
        q: 'Can I drive the luxury car myself?',
        a: 'No. Luxury cars in Gorakhpur are always booked with our driver.',
      },
      {
        q: 'How do I book a luxury car in Gorakhpur?',
        a: 'WhatsApp or call +91 85760 00083 with the date, pickup point and timings, or visit our office at Railway Station Gate No-1. We reply with the car, the price and what it includes.',
      },
    ],
  },
}
