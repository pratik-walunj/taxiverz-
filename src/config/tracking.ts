import { env } from '@/config/env'

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
  gtmId: env.NEXT_PUBLIC_GTM_ID ?? null,
  clarityId: env.NEXT_PUBLIC_CLARITY_ID ?? null,
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
