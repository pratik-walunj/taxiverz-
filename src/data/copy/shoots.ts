import type { PageCopy } from './types'

/**
 * The six shoot types under /shoot-car-rental/{type}/ (Phase 5). They publish
 * with their hub, which waits for a live luxury car (B3 + F1). Same truth
 * rules: no named car is claimed, no prices, no location permissions.
 */
const shared = {
  driver: {
    q: 'Does the car come with a driver?',
    a: 'Yes. The driver handles the car between set-ups and for any driving shots.',
  },
}

export const subPageCopy: Record<string, PageCopy> = {
  'shoot-car-rental/pre-wedding': {
    publish: true,
    summary:
      'Cars for pre-wedding shoots: classic, convertible and luxury cars with a driver. Send your date, location and the look you want.',
    intro: `A pre-wedding shoot is a story told in a few hours of pictures and film, and the car is often one of its main props: the couple driving off, leaning on the bonnet at sunset, or stepping out at a heritage location.

Choose the car by the story. A convertible suits open-road and sunset frames; a vintage or classic car suits a period or heritage theme; a luxury sedan suits a city-lights or formal look. The cars available for shoots are listed on the shoot hub with their photos.

Tell us the shoot date, the locations in order, and the hours you need the car. Golden-hour shoots are popular, so if yours depends on the light, say so — the car needs to be in place before the light changes, not arriving with it. If the couple will be seen driving, plan those shots with the driver.

Send the enquiry with your photographer's plan if you have one, and we will confirm the car and the price for the hours.`,
    faqs: [
      {
        q: 'Which car suits a pre-wedding shoot?',
        a: 'It depends on the theme: a convertible for open-road frames, a vintage car for a heritage look, a luxury sedan for a formal city look. Tell us the idea and we will suggest a car.',
      },
      shared.driver,
      {
        q: 'Can the couple be shown driving?',
        a: 'Tell us about driving shots when you enquire, so they can be planned with the driver.',
      },
      {
        q: 'How do I book?',
        a: 'Send the enquiry form with your date, locations and hours, or WhatsApp us. We confirm the car and the price.',
      },
    ],
  },
  'shoot-car-rental/post-wedding': {
    publish: true,
    summary:
      'Cars for post-wedding and couple portrait shoots, with a driver. Tell us the date, the locations and the hours on set.',
    intro: `Post-wedding shoots are often more relaxed than the wedding day itself: the couple, a photographer, a few locations and time to get the pictures right. A good-looking car adds to the frames and gets everyone between locations without fuss.

Many couples use the same kind of car as for a pre-wedding shoot — a convertible, a classic or a luxury sedan — while others want a car that matches their honeymoon or travel theme. The cars available for shoots are listed on the shoot hub with their photos.

Send us the date, the list of locations, and how many hours you need the car. If you are travelling out of town for the shoot, add the route, and we will quote for the trip and the time on set together.

Post-wedding shoots often fall in the weeks after the wedding season, so availability is usually easier — but enquire early if you have a fixed date.`,
    faqs: [
      {
        q: 'Can the car take us to an out-of-town location?',
        a: 'Yes. Add the route to your enquiry and we will quote for the drive and the hours on set together.',
      },
      shared.driver,
      {
        q: 'Can we use the car for a couple portrait session only?',
        a: 'Yes. Tell us the hours you need it; a short session can be booked too.',
      },
      {
        q: 'How do I book?',
        a: 'Send the enquiry form with your date, locations and hours, or WhatsApp us.',
      },
    ],
  },
  'shoot-car-rental/music-video': {
    publish: true,
    summary:
      'Cars for music video shoots — luxury, classic and statement cars with a driver. Send the concept, the location and the schedule.',
    intro: `In a music video the car is often a character: the arrival, the cruise through the city at night, the car the singer leans against for the chorus. The choice of car sets the mood before a note is heard.

Tell us the concept and the look — glamorous, retro, rugged — and we will suggest cars that fit. The cars available for shoots are listed on the shoot hub with their photos.

Music video schedules tend to be long and to run late. Send us the call time, the locations and the expected wrap, and tell us about any driving shots, night shots, or scenes with several people in the car. If you need more than one car, or a support vehicle for the crew, add that too, and we will quote the whole day.

We confirm the car, the driver's hours and the price before the shoot, so there are no surprises on set.`,
    faqs: [
      {
        q: 'Can we shoot at night?',
        a: 'Yes. Tell us the call time and the expected wrap, and the booking will cover the hours.',
      },
      shared.driver,
      {
        q: 'Can we book a car for the crew as well?',
        a: 'Yes. Add a sedan, an MPV or a tempo traveller for the crew to the same enquiry.',
      },
      {
        q: 'How do I book?',
        a: 'Send the enquiry form with the concept, locations and schedule, or WhatsApp us.',
      },
    ],
  },
  'shoot-car-rental/film-and-web-series': {
    publish: true,
    summary:
      'Picture cars for films and web series, with a driver. Tell us the scenes, the shooting days and the locations.',
    intro: `Films and web series need picture cars that match the story and the period — a character's everyday car, an official's sedan, a vintage car for a flashback — and they need them on a production schedule that can change from day to day.

Send us the scenes the car appears in, the shooting days, the locations, and any continuity notes: the same car must look the same across days. The cars available for shoots are listed on the shoot hub with their photos, and we can suggest others.

Production days are long. Tell us the call times and the expected wrap for each day, and whether the car will be driven on camera, parked in frame, or used for interior shots. If you need crew transport as well, add it and we will quote together.

We confirm the car, the driver's hours and the price per day before the schedule is locked.`,
    faqs: [
      {
        q: 'Can we keep the same car for several shooting days?',
        a: 'Yes. Send the full schedule so the same car is held for every day it appears on screen.',
      },
      shared.driver,
      {
        q: 'Can you also provide transport for the crew?',
        a: 'Yes. Add sedans, MPVs or tempo travellers for the crew to the same enquiry.',
      },
      {
        q: 'How do I book?',
        a: 'Send the enquiry form with the scenes, days and locations, or WhatsApp us.',
      },
    ],
  },
  'shoot-car-rental/ads-and-fashion': {
    publish: true,
    summary:
      'Cars for advertising and fashion shoots, with a driver. Tell us the brief, the location and the hours on set.',
    intro: `In advertising and fashion, the car is part of the styling: it has to be clean, the right colour for the palette, and in place when the light and the model are ready.

Send us the brief — the look, the colour palette, the location — and we will suggest cars that fit. The cars available for shoots are listed on the shoot hub with their photos.

Tell us the call time, how long you need the car on set, and whether it will be static in frame or driven. For studio shoots, check the access and floor at the venue before the day. If the car's badge or number plate must not appear, tell us in advance so the shots can be planned around it. For product shots where the car sits beside the product, a plain, uncluttered car in a neutral colour usually works better than a flashy one — we can send photos of the options so your art director can choose.

We confirm the car and the price for the hours before the shoot.`,
    faqs: [
      {
        q: 'Can you match a colour palette?',
        a: 'Tell us the palette in your enquiry and we will tell you which cars fit and send photos.',
      },
      shared.driver,
      {
        q: 'Can the car be used indoors or in a studio?',
        a: 'Tell us about the venue, its access and floor when you enquire, and we will confirm whether it works.',
      },
      {
        q: 'How do I book?',
        a: 'Send the enquiry form with your brief, location and hours, or WhatsApp us.',
      },
    ],
  },
  'shoot-car-rental/youtube-and-vlogs': {
    publish: true,
    summary:
      'Cars for YouTube, vlog and reel shoots — road-trip, review-style and lifestyle content, with a driver. Send your plan and the hours.',
    intro: `For creators, a car can be the set, the subject or the transport between locations: a road-trip vlog, a lifestyle reel, an in-car conversation, or a travel series around Gorakhpur and beyond.

Tell us what the content is and where you will shoot, and we will suggest a car that looks right on camera and suits the trip. The cars available for shoots are listed on the shoot hub with their photos; for a road-trip series, any car class in the fleet can also be booked for the drive.

Send the date, the route or locations, and the hours. If you will film inside the car while it is moving, plan the seating and the camera positions with the driver. For multi-day travel content, add the whole itinerary and we will quote for the trip. Places around Gorakhpur that work well on camera include the Gorakhnath Temple, the lakefront at Ramgarh Tal, and, further out, Kushinagar and Ayodhya.

We confirm the car and the price before the shoot.`,
    faqs: [
      {
        q: 'Can we film inside the car while it moves?',
        a: 'Yes, with the driver at the wheel. Plan seating and camera positions with the driver before you start.',
      },
      shared.driver,
      {
        q: 'Can I book a car for a multi-day travel series?',
        a: 'Yes. Send the full itinerary and we will quote for the trip.',
      },
      {
        q: 'How do I book?',
        a: 'Send the enquiry form with your plan and hours, or WhatsApp us.',
      },
    ],
  },
}
