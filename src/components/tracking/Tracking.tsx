'use client'

import { useEffect } from 'react'
import { captureAttribution } from '@/lib/tracking/attribution'
import { track } from '@/lib/tracking/track'

/**
 * Site-wide client behaviour with no UI: captures ad attribution on the first
 * page view, and tracks every call and WhatsApp link click through one
 * delegated listener (links carry data-placement="header|sticky-bar|…").
 */
export function Tracking() {
  useEffect(() => {
    try {
      captureAttribution(new URL(window.location.href), document.referrer, window.localStorage)
    } catch {
      // Private mode or blocked storage: skip.
    }
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.('a[href]')
      if (!link) return
      const href = link.getAttribute('href') ?? ''
      const placement = link.getAttribute('data-placement') ?? 'unknown'
      if (href.startsWith('tel:')) track('call_click', { placement })
      else if (href.startsWith('https://wa.me/')) track('whatsapp_click', { placement })
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])
  return null
}
