import type { Faq } from '@/lib/schemas/content'

/**
 * Phase 6 copy: about, FAQ and partner pages. Confirmed facts only — no
 * founding year, trip counts, awards, clients, 24/7 or response-time claims
 * until the owner supplies them (OWNER_TODO F2, F4, H2). The owner's own
 * story is added to `aboutStory` when written; it renders only when set.
 */

export const aboutStory: string | null = null

export const aboutIntro = `Taxiverz is a cab and travel company based in Gorakhpur, Uttar Pradesh. Our head office is at Railway Station Gate No-1, right at Gorakhpur Junction, and we have a branch in Warje, Pune.

We run cars with drivers for every kind of road trip: local hire by the hour, one-way drops, round trips to other cities, airport transfers, tempo travellers and Urbania vans for groups, and trips across the border into Nepal. Companies book us for guest pickups, staff travel and events.`

export const aboutHow = `You choose a car by class — hatchback, sedan, SUV, MPV, tempo traveller and more — and see the cars that fit your trip before you give us any contact details. Where a fare can be worked out, you see it; where it can't, we confirm it with you on WhatsApp or by phone before you travel. Every booking and enquiry gets a reference number, and we confirm the car and the fare with you before the trip.

We keep your details only to arrange and follow up on your trip, and delete them 24 months after your last contact with us. Our privacy policy explains how.`

export const faqGroups: {
  title: string
  link: { href: string; label: string } | null
  faqs: Faq[]
}[] = [
  {
    title: 'Booking',
    link: { href: '/book/', label: 'Check your fare' },
    faqs: [
      {
        q: 'What are the ways to book?',
        a: 'Three: check the fare and confirm online, send your trip to us on WhatsApp with the details filled in, or call +91 85760 00083. Whichever you choose, you get a booking reference.',
      },
      {
        q: 'What happens after I book?',
        a: 'We call or WhatsApp you to confirm the car and the fare before the trip. Keep your reference handy when you speak to us.',
      },
      {
        q: 'Can I book for someone else?',
        a: 'Yes. Book with your details and tell us the traveller’s name and number, so the driver can reach them.',
      },
      {
        q: 'What if online booking doesn’t go through?',
        a: 'The page opens WhatsApp with your trip details already written, so you can send them to us in one tap. You can also call.',
      },
    ],
  },
  {
    title: 'Fares',
    link: null,
    faqs: [
      {
        q: 'Why does my trip say “Get a quote” instead of a price?',
        a: 'When a trip can’t be priced automatically — a new destination, a trip with several stops — we confirm the fare with you on WhatsApp or by phone before you travel.',
      },
      {
        q: 'What does “Estimated fare” mean?',
        a: 'It is the fare our system works out for your trip. We confirm the final fare with you before the trip.',
      },
      {
        q: 'Do I pay anything to book?',
        a: 'No payment is taken when you send a booking or an enquiry on this website.',
      },
    ],
  },
  {
    title: 'Cars',
    link: { href: '/fleet/', label: 'See the fleet' },
    faqs: [
      {
        q: 'Can I choose the exact model?',
        a: 'You book a class — for example a sedan, meaning a Dzire, an Etios or similar — and we send a car from that class. If a model matters to you, say so when you book and we will tell you whether it is available.',
      },
      {
        q: 'Which car should I pick?',
        a: 'Go by people and luggage: a hatchback for one or two with light bags, a sedan for up to four with suitcases, an MUV or MPV for six or seven, and a tempo traveller or Urbania for groups.',
      },
      {
        q: 'Do all cars come with a driver?',
        a: 'Yes, every car booked through the fare box comes with a driver.',
      },
    ],
  },
  {
    title: 'Nepal',
    link: { href: '/nepal-taxi/', label: 'Travelling to Nepal' },
    faqs: [
      {
        q: 'What documents do I need for Nepal?',
        a: "Indian citizens don't need a visa for Nepal. Carry a valid passport or Voter ID card. Call or WhatsApp us for the full document checklist before you travel.",
      },
      {
        q: 'Which border crossing will we use?',
        a: 'The main crossings from this side are Sonauli–Bhairahawa and Raxaul–Birgunj. We confirm the crossing for your trip when you book.',
      },
    ],
  },
  {
    title: 'Airports and local hire',
    link: { href: '/airport-taxi/', label: 'Airport taxi' },
    faqs: [
      {
        q: 'Which airports do you cover?',
        a: 'The Airport tab in the fare box lists them, including Gorakhpur (GOP), Kushinagar (KBK), Lucknow (LKO) and Varanasi (VNS).',
      },
      {
        q: 'How does hourly hire work?',
        a: 'Choose a package — 6 hours with 60 km, 8 hours with 80 km or 12 hours with 120 km. Extra hours and kilometres are charged at the rates for the car you chose.',
      },
    ],
  },
  {
    title: 'Companies and partners',
    link: { href: '/corporate-car-rental/', label: 'Corporate travel' },
    faqs: [
      {
        q: 'Can my company set up regular travel?',
        a: 'Yes. Send the corporate form with the kind of trips and roughly how many a month, and we will propose how bookings and billing can work.',
      },
      {
        q: 'I own a taxi or drive professionally. Can I work with Taxiverz?',
        a: 'Send us your details from the Attach your taxi or Drive with us page, and we will get in touch.',
      },
    ],
  },
]

export const attachCopy = {
  summary:
    'Own a taxi, SUV or tempo traveller? Send us your vehicle details to work with Taxiverz on trips from Gorakhpur and beyond.',
  intro: `If you own a commercial car, SUV, tempo traveller or Urbania and want more trips, send us your details. We look for vehicles that are clean, well maintained and properly registered and permitted for the trips they take.

Tell us the model and year, the permit it carries, and the city where it is based. We will get in touch to talk about the kind of trips we have for it, how bookings and payments work, and the documents we need to see — the registration certificate, permit, insurance and fitness certificate, and the driver's licence.`,
}

export const driverCopy = {
  summary:
    'Professional drivers: send us your licence type, experience and languages to drive with Taxiverz on local, outstation and Nepal trips.',
  intro: `We work with drivers who know the roads of eastern Uttar Pradesh, Bihar and beyond, and who look after their passengers — families, pilgrims, business travellers and tourists.

Tell us your licence type, how many years you have been driving, the languages you speak and the city you are based in. We will get in touch to talk about the work and the documents we need to see, including your driving licence and identity proof.`,
}
