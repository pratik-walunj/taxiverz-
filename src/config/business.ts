import type { Business } from '@/lib/schemas/business'

/**
 * Business facts. Sources: docs/AUDIT.md §3 and owner answers in
 * docs/OWNER_TODO.md. `null` = not confirmed yet; the site hides it.
 */
export const business: Business = {
  brandName: 'Taxiverz',
  legalName: null, // OWNER_TODO C2
  tagline: null, // "Luxury on the Move" is in the logo only; OWNER_TODO C2
  phone: '+918576000083', // owner-confirmed: the only public number (C3)
  whatsapp: '+918576000083', // owner-confirmed (C3)
  email: 'cabtaxiverz@gmail.com', // used on 111 legacy pages; lead inbox still open (C4)
  branches: [
    {
      id: 'gorakhpur',
      label: 'Gorakhpur head office',
      isHeadOffice: true,
      streetAddress: 'Railway Station Gate No-1',
      locality: 'Gorakhpur',
      city: 'Gorakhpur',
      region: 'Uttar Pradesh',
      postalCode: '273001',
      country: 'IN',
      geo: null, // legacy 26.7606, 83.3732 is the station area, not verified (C7)
      hours: null, // C7
      mapsUrl: null,
      googleBusinessUrl: null,
    },
    {
      id: 'pune',
      label: 'Pune branch',
      isHeadOffice: false,
      streetAddress: 'Shop No-4, Chaudhari Heights, above Swarna Hotel',
      locality: 'Warje',
      city: 'Pune',
      region: 'Maharashtra',
      postalCode: '411058',
      country: 'IN',
      geo: null,
      hours: null,
      mapsUrl: null,
      googleBusinessUrl: null,
    },
  ],
  foundedYear: null, // F2
  gstin: null, // F2
  socials: { instagram: null, facebook: null, youtube: null }, // C5
  sisterSites: [], // C6
  googleSiteVerification: '23ajximOhjcSaplr5OFe6VXTGeWWE8bWWp-hZwpNMpI',
  claims: { available24x7: null, gpsTracked: null, callbackMinutes: null }, // H2
  registrations: [], // F2
  policies: { freeCancellationHours: null, advancePercent: null, refundDays: null }, // H1
  paymentMethods: [], // H1
  paymentAccounts: [], // H1 — the payment-safety notice appears once set
  grievanceOfficer: null, // H1
  policyReviewed: { privacy: null, terms: null, refund: null },
}
