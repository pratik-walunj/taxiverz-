import type { Business } from '@/lib/schemas/business'
import { formatIndianPhone } from '@/lib/phone'

/**
 * Policy pages generated from config (REBUILD_PLAN §7 Phase 6). Each section
 * states only what the config and the code actually do; sections that need an
 * owner decision appear only once it is in `business.ts`. Terms and refund
 * are not published until those decisions exist (lib/content/static-pages.ts).
 */
export interface PolicySection {
  heading: string
  paragraphs: string[]
  list?: string[]
}

export interface PolicyInput {
  business: Business
  analytics: { gtm: boolean; clarity: boolean }
}

function contactFor(b: Business): string {
  const office = b.branches.find((x) => x.isHeadOffice) ?? b.branches[0]!
  const address = `${office.streetAddress}, ${office.city}, ${office.region} ${office.postalCode}`
  if (b.grievanceOfficer)
    return `our Grievance Officer, ${b.grievanceOfficer.name}, at ${b.grievanceOfficer.email}${
      b.grievanceOfficer.phone ? ` or ${formatIndianPhone(b.grievanceOfficer.phone)}` : ''
    }, or by post to ${address}`
  return `${b.email ? `${b.email}, ` : ''}${formatIndianPhone(b.phone)} (call or WhatsApp), or by post to Taxiverz, ${address}`
}

export function privacyPolicy({ business: b, analytics }: PolicyInput): PolicySection[] {
  const contact = contactFor(b)
  return [
    {
      heading: 'Who we are',
      paragraphs: [
        `This policy explains how ${b.legalName ?? b.brandName} ("Taxiverz", "we") handles personal data collected through this website. We are responsible for that data under India's Digital Personal Data Protection Act, 2023.`,
      ],
    },
    {
      heading: 'What we collect',
      paragraphs: ['We collect only what you type into our forms, and a few technical details:'],
      list: [
        'Bookings: your name, mobile number, optional email and pickup address, and your trip (places, dates, times, car class).',
        'Call-back requests: your mobile number.',
        'Enquiries and the corporate form: your name, mobile number, optional email, and what you tell us about the enquiry — for example the date, city, number of people, occasion, company name and GSTIN.',
        'Partner forms: your name, mobile number, city, and vehicle or driving details.',
        'Contact form: your name, mobile number, optional email and your message.',
        'With every form: the page you sent it from, your browser type, and — if you arrived from an advertisement or a link with tracking tags — the ad click identifier and campaign tags.',
      ],
    },
    {
      heading: 'Why we use it',
      paragraphs: [
        'To arrange and confirm your trip or answer your enquiry, to contact you about it by phone, WhatsApp or email, to prevent spam and abuse of our forms, and to understand which of our advertising brings bookings. We send you offers on WhatsApp only if you tick the box that asks for them.',
      ],
    },
    {
      heading: 'Where it goes',
      paragraphs: [
        'When you send a form, your details are stored on our server and passed to our team by email and messaging services so we can respond. If you choose to send your trip on WhatsApp, it is sent through WhatsApp by you. Our website is hosted by our hosting provider and served through Cloudflare. We do not sell your personal data.',
      ],
    },
    {
      heading: 'Cookies and your browser',
      paragraphs: [
        'We store a small amount of information in your own browser: the trip you are booking (until you close the tab), and, for 90 days, how you first reached our site (for example an ad click), so that a booking can be linked to the advertisement that led to it.',
        analytics.gtm
          ? 'We use Google Tag Manager to load measurement tools from Google (Google Analytics and Google Ads), which set cookies to count visits and measure advertising.'
          : 'We do not currently use analytics or advertising cookies.',
        ...(analytics.clarity
          ? [
              'We use Microsoft Clarity to understand how visitors use our pages; it records clicks and scrolling, not what you type into forms.',
            ]
          : []),
      ],
    },
    {
      heading: 'How long we keep it',
      paragraphs: [
        'We keep your details for 24 months after your last contact with us, then delete them. If you book or get in touch again within that time, the 24 months start again from that date. You can ask us to delete your details sooner.',
      ],
    },
    {
      heading: 'Your rights',
      paragraphs: [
        'Under the Digital Personal Data Protection Act, 2023, you can ask us for a summary of the personal data we hold about you, ask us to correct or complete it, ask us to erase it, withdraw your consent, and nominate someone to exercise these rights on your behalf. You can also raise a grievance with us, and if we do not resolve it, complain to the Data Protection Board of India.',
        `To make a request or raise a grievance, contact ${contact}. Please tell us your booking reference if you have one.`,
      ],
    },
    {
      heading: 'Children',
      paragraphs: [
        'Our service is booked by adults. If you are under 18, please ask a parent or guardian to book or enquire for you.',
      ],
    },
    {
      heading: 'Changes to this policy',
      paragraphs: [
        'If we change how we handle personal data, we will update this page. The date at the top shows when it was last updated.',
      ],
    },
  ]
}

/** Terms of booking — only rendered once the owner's policies are in config (termsReady). */
export function termsOfBooking({ business: b }: PolicyInput): PolicySection[] {
  const p = b.policies
  return [
    {
      heading: 'Booking',
      paragraphs: [
        'A booking made on this website, on WhatsApp or by phone is a request until we confirm the car and the fare with you. Every booking has a reference number.',
      ],
    },
    {
      heading: 'Fares',
      paragraphs: [
        'Fares shown as "Estimated fare" are worked out by our system from the trip you entered and are confirmed with you before the trip. Trips shown as "Get a quote" are priced by us directly. Changes to the trip — extra stops, extra days, a different route — can change the fare.',
      ],
    },
    ...(p.advancePercent !== null
      ? [
          {
            heading: 'Advance payment',
            paragraphs: [
              p.advancePercent === 0
                ? 'No advance payment is needed to confirm a booking.'
                : `To confirm a booking we ask for an advance of ${p.advancePercent}% of the fare.`,
            ],
          },
        ]
      : []),
    ...(b.paymentMethods.length
      ? [{ heading: 'Payment', paragraphs: ['You can pay by:'], list: b.paymentMethods }]
      : []),
    ...(p.freeCancellationHours !== null
      ? [
          {
            heading: 'Cancellation',
            paragraphs: [
              `You can cancel free of charge up to ${p.freeCancellationHours} hours before the pickup time. The refund policy explains refunds of any advance.`,
            ],
          },
        ]
      : []),
  ]
}

/** Refund policy — only rendered once the owner's policies are in config (refundReady). */
export function refundPolicy({ business: b }: PolicyInput): PolicySection[] {
  const p = b.policies
  return [
    {
      heading: 'Cancelling a booking',
      paragraphs: [
        `If you cancel at least ${p.freeCancellationHours} hours before the pickup time, any advance you paid is refunded in full.`,
      ],
    },
    {
      heading: 'When you get your money back',
      paragraphs: [
        `Refunds are made within ${p.refundDays} days, to the account or method you paid from.`,
      ],
    },
    {
      heading: 'Questions',
      paragraphs: [`To ask about a refund, contact ${contactFor(b)} with your booking reference.`],
    },
  ]
}

/** When the policy text was last changed in code; shown until the owner reviews it. */
export const POLICIES_UPDATED = '2026-09-29'
