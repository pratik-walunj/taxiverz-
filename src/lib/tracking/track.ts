import type { TrackingEvent } from '@/config/tracking'

/**
 * The one typed tracking call (REBUILD_PLAN §3.6). Pushes to the GTM dataLayer;
 * does nothing when GTM isn't loaded. Never send personal data (name, phone).
 */
export type TrackParams = Record<string, string | number | boolean | null | undefined>

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
  }
}

export function track(event: TrackingEvent, params: TrackParams = {}): void {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer ?? []
  window.dataLayer.push({ event, ...params })
}
