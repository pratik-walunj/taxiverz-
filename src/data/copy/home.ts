import type { Faq } from '@/lib/schemas/content'

/** Home page FAQs: about booking with Taxiverz. Same truth rules as the other copy. */
export const homeFaqs: Faq[] = [
  {
    q: 'How do I book a cab with Taxiverz?',
    a: 'Enter your trip in the fare box and choose a car, then confirm online, send the trip on WhatsApp, or call +91 85760 00083. Every booking gets a reference number.',
  },
  {
    q: 'Do I need to give my phone number to see the fare?',
    a: 'No. You see the cars for your trip before you enter any contact details. We ask for your name and number only when you book.',
  },
  {
    q: 'Why do some trips say “Get a quote”?',
    a: 'When a trip can’t be priced automatically — a new destination, say — we confirm the fare with you on WhatsApp or by phone before you travel.',
  },
  {
    q: 'Can I choose the exact car?',
    a: 'You book a class, such as sedan or SUV, and we send a car from that class; the exact model depends on availability. If a particular model matters, tell us when you book.',
  },
  {
    q: 'Where are your offices?',
    a: 'Our head office is at Railway Station Gate No-1, Gorakhpur, and we have a branch in Warje, Pune.',
  },
]
