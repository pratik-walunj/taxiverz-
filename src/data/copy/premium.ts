import type { PageCopy } from './types'

/**
 * Luxury, wedding and shoot hubs (Phase 5). Written now, `publish: false`
 * until a fitting vehicle is live (fleet-confirmed B3 + own photo F1); the
 * gate in lib/content/gates.ts (VERTICAL_VEHICLES) blocks them regardless. Nothing here names a car
 * as ours: the page lists live vehicles itself. No decoration, package or
 * price promises until the owner confirms them.
 */
export const premiumCopy: Record<string, PageCopy> = {
  'luxury-car-rental': {
    // Draft until a fitting vehicle is live (B3/F1); the vehicle gate also blocks it.
    publish: false,
    summary:
      'Luxury cars with a driver for weddings, VIP guests, corporate events and special occasions. Tell us the date and the car you have in mind.',
    intro: `Some occasions call for more than a comfortable car: a groom's arrival, a guest you want to receive properly, a company event, an anniversary. A luxury car with a driver takes care of that part of the day, so you can concentrate on everything else.

The cars you can book are listed on this page, each with its own photos. Availability depends on the date, so the earlier you enquire the better — especially in the wedding season, when the same cars are in demand for several functions on one day.

Luxury cars are booked by enquiry rather than through the fare box. Tell us the date, the city, the pickup and drop points, and how long you need the car. For a wedding, add the timings of the baraat and the reception; for a corporate booking, the guest's arrival details. We come back to you with the car, the price and what it covers.

If you have a colour or model in mind, say so. If a particular car isn't free on your date, we will tell you what is, rather than send something you didn't agree to.`,
    faqs: [
      {
        q: 'How do I book a luxury car?',
        a: 'Send the enquiry form on this page, or WhatsApp or call us with the date, city and timings. We reply with the car, the price and what it covers.',
      },
      {
        q: 'Does the car come with a driver?',
        a: 'Yes. Luxury cars are booked with a driver.',
      },
      {
        q: 'Can I choose the colour?',
        a: 'Tell us your preference when you enquire. We will tell you which cars are free on your date and send photos.',
      },
      {
        q: 'How early should I book for a wedding?',
        a: 'As early as you can. In the wedding season the same cars are asked for on the same dates, and bookings go in order.',
      },
    ],
  },

  'wedding-cars': {
    // Draft until a fitting vehicle is live (B3/F1); the vehicle gate also blocks it.
    publish: false,
    summary:
      'Wedding cars with a driver — the groom’s car, the couple’s car for the vidaai and cars for the family. Enquire with your date and timings.',
    intro: `A wedding usually needs more than one car. There is the groom's car for the baraat, a car for the couple after the vidaai, cars to bring close family from the station or the hotel, and often a tempo traveller or two for guests. Booking them together means one plan, one set of timings and one number to call on the day.

The wedding cars you can book are shown on this page with their photos. For guests, any car class from the fleet — sedans, MPVs, tempo travellers and Urbania vans — can be added to the same booking.

Send us the wedding date, the city and venue, and the timings: when the baraat leaves, when the pheras are expected to end, and when the couple leaves. If you want the car decorated, tell us what you have in mind and we will confirm what is possible and what it costs.

Wedding dates cluster, so enquire as early as you can. We will reply with the cars that are free on your date, the price and what it includes.`,
    faqs: [
      {
        q: 'Can I book the groom’s car and guest cars together?',
        a: 'Yes. Tell us how many cars you need and for which part of the day; guest cars and tempo travellers can go on the same booking.',
      },
      {
        q: 'Is decoration included?',
        a: 'Tell us what decoration you want when you enquire. We will confirm what is possible and whether it is included or extra.',
      },
      {
        q: 'Can the car wait at the venue?',
        a: 'Yes. Tell us the timings when you enquire so the booking covers the waiting time.',
      },
      {
        q: 'How early should I book wedding cars?',
        a: 'As early as possible. Popular wedding dates fill first, and the same cars are asked for by several families.',
      },
    ],
  },

  'shoot-car-rental': {
    // Draft until a fitting vehicle is live (B3/F1); the vehicle gate also blocks it.
    publish: false,
    summary:
      'Cars for pre-wedding and post-wedding shoots, music videos, films, ads and vlogs. Tell us the shoot, the location and the hours.',
    intro: `The right car can carry a shoot — a classic convertible for a pre-wedding story, a sleek sedan for an ad, an open jeep for a road-trip sequence. We supply cars for photographers, videographers and production teams, with a driver who handles the car between set-ups.

The cars you can book for shoots are listed on this page with their photos. Pick by the look you want, or tell us the idea and we will suggest what fits.

When you enquire, send the date, the location or locations, the hours you need the car on set, and whether the car has to move on camera — driving shots need planning with the driver. If you are shooting at a monument, a hotel or a public road, the permissions for the location are arranged by the production.

Shoots often run over. Tell us how much margin you want, and we will confirm the price for the hours and anything beyond them before the day.`,
    faqs: [
      {
        q: 'Which shoots do you supply cars for?',
        a: 'Pre-wedding and post-wedding shoots, music videos, films and web series, ads and fashion shoots, and YouTube or vlog shoots.',
      },
      {
        q: 'Does a driver come with the car?',
        a: 'Yes. The driver handles the car between set-ups and for driving shots.',
      },
      {
        q: 'Can the car be driven on camera?',
        a: 'Tell us about driving shots when you enquire, so the driver can plan them with your team.',
      },
      {
        q: 'Who arranges location permissions?',
        a: 'Permissions for the location are arranged by the production. We supply the car and the driver.',
      },
    ],
  },
}
