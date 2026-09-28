import { publicEnv } from '@/config/public-env'

/** Event names used by the typed track() helper (Phase 3). */
export const trackingEvents = [
  'fare_check',
  'fare_results',
  'vehicle_select',
  'trip_details_complete',
  'lead_submit',
  'callback_request',
  'enquiry_submit',
  'whatsapp_click',
  'call_click',
] as const

export type TrackingEvent = (typeof trackingEvents)[number]

export const tracking = {
  gtmId: publicEnv.gtmId,
  clarityId: publicEnv.clarityId,
  attributionParams: [
    'gclid',
    'gbraid',
    'wbraid',
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_term',
    'utm_content',
  ],
  attributionTtlDays: 90,
} as const
