import type { LeadType } from '@/lib/schemas/lead'

/** How each enquire-mode service collects leads: lead type, form title and occasion list. */
export interface EnquirySetup {
  leadType: LeadType
  title: string
  occasions?: readonly string[]
  corporate?: boolean
}

export const serviceEnquiry: Record<string, EnquirySetup> = {
  'luxury-car-rental': {
    leadType: 'enquiry-luxury',
    title: 'Enquire about a luxury car',
    occasions: [
      'Wedding',
      'Reception',
      'VIP guest',
      'Corporate event',
      'Birthday or anniversary',
      'Other',
    ],
  },
  'wedding-cars': {
    leadType: 'enquiry-wedding',
    title: 'Enquire about wedding cars',
    occasions: [
      'Groom’s car (baraat)',
      'Couple’s car (vidaai)',
      'Family and guests',
      'Reception',
      'Other',
    ],
  },
  'shoot-car-rental': {
    leadType: 'enquiry-shoot',
    title: 'Enquire about a car for your shoot',
    occasions: [
      'Pre-wedding shoot',
      'Post-wedding shoot',
      'Music video',
      'Film or web series',
      'Ad or fashion shoot',
      'YouTube or vlog',
    ],
  },
  'bus-rental': {
    leadType: 'enquiry-group',
    title: 'Enquire about a bus',
    occasions: ['Wedding', 'Pilgrimage', 'School or college trip', 'Office trip', 'Tour', 'Other'],
  },
  'self-drive-car-rental': {
    leadType: 'enquiry-self-drive',
    title: 'Enquire about a self-drive car',
  },
  'bike-rental': { leadType: 'enquiry-bike', title: 'Enquire about a bike or scooter' },
  'corporate-car-rental': {
    leadType: 'enquiry-corporate',
    title: 'Set up car travel for your company',
    corporate: true,
  },
}
