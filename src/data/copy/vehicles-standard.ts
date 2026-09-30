import type { VehicleCopy } from './vehicles'

export const standardVehicleCopy: Record<string, VehicleCopy> = {
  wagonr: {
    publish: true,
    summary:
      'Hire a Maruti Suzuki WagonR with driver in Gorakhpur for city errands, station pickups and short trips. Booked in the Hatchback class.',
    intro: `The Maruti Suzuki WagonR is a tall, boxy hatchback that seats four passengers. Its upright shape gives more headroom than you might expect from a small car, and its compact size makes it easy to move through narrow lanes and crowded markets. It suits a solo traveller, a couple or a small family carrying a couple of bags, and works well for errands around Gorakhpur, pickups from the railway station or the airport, hospital visits and short trips to nearby towns.

The WagonR belongs to our Hatchback class, and fares are set by class rather than by model. To book, choose the Hatchback class in the fare box on our website; the exact model depends on availability, so you may get a WagonR or another car of the same size. Every car comes with a driver. You can also book on WhatsApp or by phone on +91 85760 00083, and each booking gets a reference number you can quote if you need to change anything.`,
    faqs: [
      {
        q: 'How many people can travel in the WagonR?',
        a: 'Four passengers plus the driver. For more people or a lot of luggage, look at the Sedan, MUV or MPV classes instead.',
      },
      {
        q: 'Can I ask for a WagonR specifically?',
        a: 'Book the Hatchback class and mention that you would like a WagonR. We will tell you on WhatsApp or by phone whether one is available for your date; otherwise another hatchback is sent.',
      },
      {
        q: 'Is the WagonR suitable for an outstation trip?',
        a: 'For short outstation runs with light luggage, yes. On a long journey with several bags, a sedan or MPV gives more boot space and room to stretch.',
      },
    ],
  },

  'toyota-etios': {
    publish: true,
    summary:
      'Toyota Etios with driver in Gorakhpur for airport runs, outstation trips and family travel. Booked in the Sedan class, fares by class.',
    intro: `The Toyota Etios is a four-door sedan with a roomy rear seat and a separate boot, which makes it a practical choice when you have suitcases as well as passengers. It seats four people besides the driver and suits a family of four, a couple with luggage or business travellers who need a quiet car for a day of meetings. The Etios is a common choice for highway travel in Uttar Pradesh, from Gorakhpur to Lucknow, Varanasi or Ayodhya, as well as for airport and railway station transfers.

The Etios comes under our Sedan class, and the fare is worked out by class, not by the model you get. Choose the Sedan class in the fare box when you book online; the exact model depends on availability, so the car sent may be an Etios or another sedan of similar size. A driver comes with the car. Bookings can also be made on WhatsApp or by calling +91 85760 00083, and you receive a booking reference number for every trip.`,
    faqs: [
      {
        q: 'Does the Etios come with a driver?',
        a: 'Yes. Every car Taxiverz sends comes with a driver.',
      },
      {
        q: 'Will my luggage fit in the Etios?',
        a: 'A sedan has a separate boot that takes a few suitcases for four travellers. If you are carrying more than that, tell us when you book and we will suggest a larger class.',
      },
      {
        q: 'Can I be sure of getting an Etios?',
        a: 'Fares are by class, so you book a sedan. If you want the Etios in particular, mention it and we will say whether it is available for your date.',
      },
    ],
  },

  'hyundai-verna': {
    publish: true,
    summary:
      'Hyundai Verna with driver in Gorakhpur for business travel, weddings and highway trips. Book the Premium sedan class online or on WhatsApp.',
    intro: `The Hyundai Verna is a mid-size sedan, a step up in size and comfort from an entry-level sedan. It seats four passengers in the back and front, has a proper boot for bags, and rides well on long stretches of highway. It suits corporate guests, couples, small families and anyone who wants a smarter car for a wedding, a family function or a meeting. Typical trips include airport transfers, full-day city use and outstation runs to Lucknow, Varanasi, Kushinagar or the Nepal border at Sonauli.

The Verna is part of our Premium sedan class, and we price trips by class rather than by model. When booking online, choose the Premium sedan class in the fare box; the exact model depends on availability, so you may be sent a Verna or a comparable premium sedan. The car comes with a driver. You can also book on WhatsApp or by phone on +91 85760 00083. Every booking is given a reference number.`,
    faqs: [
      {
        q: 'Can I book the Verna for a wedding?',
        a: 'Yes. Tell us the date, venue and how long you need the car. If the trip cannot be priced automatically, we confirm the fare on WhatsApp or by phone before the day.',
      },
      {
        q: 'Can I choose the Verna over other premium sedans?',
        a: 'Book the Premium sedan class and let us know you want a Verna. We will confirm whether one is free for your date.',
      },
      {
        q: 'Is the Verna comfortable for a long drive?',
        a: 'It is a mid-size sedan with good rear legroom and a large boot, so it suits long highway journeys for up to four passengers.',
      },
    ],
  },

  'innova-crysta': {
    publish: true,
    summary:
      'Toyota Innova Crysta with driver in Gorakhpur for family trips, group travel and Nepal tours. Book the MPV class; fares are by class.',
    intro: `The Toyota Innova Crysta is a large MPV built for people and luggage together. Depending on the layout it seats seven or eight passengers, with room at the back for bags when the third row is in use. It is a familiar sight on Indian highways because it handles long distances well, and it suits joint families, groups of friends, pilgrims and corporate teams travelling together. Common trips include outstation tours to Ayodhya, Varanasi and Prayagraj, airport transfers with lots of luggage, wedding guest movement and journeys across the border into Nepal, including hill roads towards Pokhara.

The Innova Crysta sits in our MPV class, and fares are charged by class. To book, choose the MPV class in the fare box; the exact model depends on availability. A driver comes with every car. You can also send us a WhatsApp message or call +91 85760 00083, and every booking gets a reference number. Where a trip cannot be priced automatically, we confirm the fare with you before travel.`,
    faqs: [
      {
        q: 'Does the Innova Crysta come with a driver?',
        a: 'Yes. All Taxiverz cars, including the Innova Crysta, are sent with a driver.',
      },
      {
        q: 'Can I choose the Innova Crysta specifically?',
        a: 'Book the MPV class and tell us you want an Innova Crysta. We will say whether one is available for your date.',
      },
      {
        q: 'Is the Innova Crysta good for a trip to Nepal or on hill roads?',
        a: 'It is a common choice for Nepal tours and hill roads because it is roomy, carries luggage and copes well with long drives. Tell us your route when you book.',
      },
    ],
  },

  'mahindra-scorpio': {
    publish: true,
    summary:
      'Mahindra Scorpio with driver in Gorakhpur for rural roads, outstation travel and groups. Booked in the SUV class; fares are by class.',
    intro: `The Mahindra Scorpio is a rugged, high-riding SUV that has long been popular across rural and small-town India. Its ground clearance and sturdy build make it comfortable on broken village roads, kutcha tracks and rough highway stretches where a sedan would struggle. Seating depends on the version and layout, usually seven, which suits a family, a group of friends or a small team heading out together. People hire it for village visits, election and field work, outstation trips around eastern Uttar Pradesh and Bihar, wedding processions and drives into Nepal.

The Scorpio belongs to our SUV class, and fares are fixed by class, not by model. To book online, choose the SUV class in the fare box; the exact model depends on availability. A driver is included with the car. You can also book on WhatsApp or by phone on +91 85760 00083, and every booking gets a reference number that you can use when you contact us about it.`,
    faqs: [
      {
        q: 'Is the Scorpio good for village and rural roads?',
        a: 'Yes. Its high ground clearance and tough build make it well suited to uneven village roads and rough stretches.',
      },
      {
        q: 'How many people can travel in the Scorpio?',
        a: 'It depends on the version and seat layout, usually seven. Tell us your group size when you book and we will confirm it fits.',
      },
      {
        q: 'Can I ask for a Scorpio rather than another SUV?',
        a: 'Book the SUV class and mention that you want a Scorpio. We will let you know whether one is available on your date.',
      },
    ],
  },

  'mahindra-xuv700': {
    publish: true,
    summary:
      'Mahindra XUV700 with driver in Gorakhpur for family trips, highway travel and events. Book the Premium SUV class online or on WhatsApp.',
    intro: `The Mahindra XUV700 is a modern three-row SUV that seats seven, combining the height and road presence of an SUV with a quieter, more car-like ride. It suits families who want space on a long drive, corporate guests who need a comfortable car for the day, and wedding parties looking for something more than a standard taxi. Good uses include expressway runs to Lucknow, trips to Varanasi or Ayodhya, airport pickups and receptions or functions where the car is part of the occasion.

The XUV700 is in our Premium SUV class, and we charge fares by class rather than by model. To book it, choose the Premium SUV class in the fare box; the exact model depends on availability, so you may be sent an XUV700 or another premium SUV. Every car comes with a driver. You can also book on WhatsApp or by calling +91 85760 00083, and you will get a booking reference number for your trip.`,
    faqs: [
      {
        q: 'How many passengers does the XUV700 take?',
        a: 'Seven, including the third row. With all seats in use the boot space is limited, so tell us about your luggage when you book.',
      },
      {
        q: 'Can I request an XUV700 specifically?',
        a: 'Book the Premium SUV class and say you want an XUV700. We will confirm whether one is free for your date.',
      },
      {
        q: 'Is the XUV700 suitable for a wedding?',
        a: 'Yes. It is often booked for weddings and functions. Share the date and timings and we will confirm the details before the day.',
      },
    ],
  },

  'toyota-fortuner': {
    publish: true,
    summary:
      'Toyota Fortuner with driver in Gorakhpur for weddings, VIP travel and hill trips. Booked in the Premium SUV class; fares are by class.',
    intro: `The Toyota Fortuner is a large seven-seat SUV with a body-on-frame build, known in India for its size, road presence and ability on poor roads. It is the car many people choose when they want to arrive in style, and it is equally at home on long highway drives and uneven hill roads. It suits wedding parties, political and business visitors, families travelling with luggage and groups heading into the hills of Nepal. Typical bookings include the groom's car or a guest car at a wedding, airport receptions, pilgrimages and multi-day outstation tours.

The Fortuner falls in our Premium SUV class, and fares are set by class. Choose the Premium SUV class in the fare box to book; the exact model depends on availability, so let us know if you need a Fortuner in particular. The car comes with a driver. You can also reach us on WhatsApp or by phone at +91 85760 00083, and every booking carries a reference number.`,
    faqs: [
      {
        q: 'Can I be sure of getting a Fortuner?',
        a: 'Book the Premium SUV class and tell us you need a Fortuner. We will confirm on WhatsApp or by phone whether one is available for your date.',
      },
      {
        q: 'Is the Fortuner suitable for hill roads?',
        a: 'Yes. It is a large, sturdy SUV that handles steep and uneven roads well, which makes it a common choice for trips into the hills.',
      },
      {
        q: 'Does the Fortuner come with a driver?',
        a: 'Yes. Every car booked with Taxiverz comes with a driver.',
      },
    ],
  },

  'maruti-gypsy': {
    publish: true,
    summary:
      'Hire a Maruti Gypsy with driver in Gorakhpur for photo and film shoots, safaris and rough tracks. Send an enquiry or WhatsApp us.',
    intro: `The Maruti Gypsy is a compact open-top 4x4, long used in India by the army, police and forest departments. It is small, light and simple, with four-wheel drive and high ground clearance that let it cope with sand, mud and forest tracks. Its classic shape also makes it a favourite for pre-wedding photo shoots, music videos and film work. It suits a small group on an outdoor trip, a photographer and crew, or a couple who want something different for a shoot.

Typical uses include shoots in and around Gorakhpur, drives on rural roads and forest trails, and events where the car is part of the picture. The Gypsy is not an everyday highway car and carries little luggage, so it is best for short outings. It is booked on enquiry: send an enquiry on the website or WhatsApp us on +91 85760 00083 with your date, place and plan. We confirm the fare on WhatsApp or by phone before travel, the car comes with a driver, and every booking gets a reference number.`,
    faqs: [
      {
        q: 'Can I hire the Gypsy for a photo or film shoot?',
        a: 'Yes, shoots are one of the main reasons people hire it. Tell us the location, date and hours needed, and we will confirm the fare before the day.',
      },
      {
        q: 'How do I book the Gypsy?',
        a: 'Send an enquiry on the website or WhatsApp us on +91 85760 00083. The Gypsy is not in the instant fare box, so the fare is confirmed with you directly.',
      },
      {
        q: 'Is the Gypsy good for a long outstation trip?',
        a: 'It is better suited to short trips, shoots and rough tracks. For long highway journeys with luggage, an SUV or MPV is more comfortable.',
      },
    ],
  },

  jeep: {
    publish: true,
    summary:
      'Hire an open Jeep with driver in Gorakhpur for shoots, weddings, rallies and rural tracks. Send an enquiry or WhatsApp us to book.',
    intro: `Our Jeep is an open-top 4x4 with seating for up to five passengers besides the driver. The open body gives a clear view all round, which is why it is often booked for pre-wedding shoots, baraat entries, rallies and events where people need to be seen. Its four-wheel drive and rugged build also make it useful on farm roads, riverbanks and unpaved tracks around Gorakhpur where an ordinary car cannot go easily.

It suits a small group out for the day, a film or photo crew, or an event organiser who wants a vehicle that stands out. Because the model can vary, tell us what you need it for and we will confirm the details when you enquire. The Jeep is booked on enquiry rather than through the instant fare box: send an enquiry on the website or WhatsApp us on +91 85760 00083 with the date, place and hours. We confirm the fare on WhatsApp or by phone before the booking, the Jeep comes with a driver, and you get a booking reference number.`,
    faqs: [
      {
        q: 'Which Jeep model will I get?',
        a: 'Ask us when you enquire. We will tell you which open Jeep is available for your date before you confirm.',
      },
      {
        q: 'Can I use the Jeep for a wedding entry or rally?',
        a: 'Yes. Share the route, date and timings, and we will confirm the fare and arrangements with you in advance.',
      },
      {
        q: 'Does the Jeep come with a driver?',
        a: 'Yes. Like every Taxiverz vehicle, the Jeep is sent with a driver.',
      },
    ],
  },

  'mahindra-thar': {
    publish: true,
    summary:
      'Mahindra Thar with driver in Gorakhpur for off-road trips, shoots and weddings. Booked on enquiry; send a request or WhatsApp us.',
    intro: `The Mahindra Thar is a compact 4x4 with a short body, high ground clearance and a removable or convertible roof on some versions. It is built for rough ground, from muddy fields and sandy riverbeds to hill tracks, and its bold look has made it a popular car for photo shoots, reels and wedding entries. It suits couples and small groups who want an outdoor day out, content creators, and anyone planning a shoot where the car appears on camera.

Typical bookings include off-road drives around Gorakhpur, pre-wedding shoots, short trips on rural roads and events. The Thar has limited space for luggage and is not meant for large families, so for long journeys with bags an SUV is usually a better fit. It is booked on enquiry: send an enquiry on the website or WhatsApp us on +91 85760 00083 with your date and plan. We confirm the fare on WhatsApp or by phone before travel. The Thar comes with a driver, and every booking gets a reference number.`,
    faqs: [
      {
        q: 'How do I book the Thar?',
        a: 'Send an enquiry on the website or WhatsApp us on +91 85760 00083. We confirm availability and the fare before the booking.',
      },
      {
        q: 'Is the Thar suitable for a pre-wedding shoot?',
        a: 'Yes, it is often booked for shoots. Tell us the location and hours, and whether you need the roof open if the car sent allows it.',
      },
      {
        q: 'Can I drive the Thar myself?',
        a: 'No. The Thar, like every Taxiverz car, comes with a driver.',
      },
    ],
  },

  'toyota-hilux': {
    publish: true,
    summary:
      'Toyota Hilux pickup with driver in Gorakhpur for shoots, events and rough terrain. Booked on enquiry; send a request or WhatsApp us.',
    intro: `The Toyota Hilux is a double-cab pickup truck with four-wheel drive: a five-seat cabin in front and an open load bed behind. It is a tough, full-size vehicle made for rough ground, and it draws attention wherever it goes. That makes it a good fit for film and advertising shoots, event entries and road shows, and for trips over rural roads and unpaved tracks where equipment has to travel along with the people.

It suits a production crew carrying gear, an event team or a small group heading off the main road. The Hilux is not part of a fare class, so it is booked on enquiry rather than through the instant fare box. Send an enquiry on the website or WhatsApp us on +91 85760 00083 with the date, place, hours and what you plan to carry. We confirm availability and the fare on WhatsApp or by phone before the trip. The Hilux comes with a driver, and each booking gets a reference number.`,
    faqs: [
      {
        q: 'Can the Hilux carry equipment for a shoot?',
        a: 'Its open load bed is useful for carrying gear. Tell us what you plan to load when you enquire so we can confirm it suits your needs.',
      },
      {
        q: 'Why is the Hilux not in the fare box?',
        a: 'It is booked on enquiry. We price each Hilux trip individually and confirm the fare on WhatsApp or by phone before travel.',
      },
      {
        q: 'Is the Hilux suited to rough roads?',
        a: 'Yes. It is a four-wheel-drive pickup built for uneven and unpaved ground.',
      },
    ],
  },
}
