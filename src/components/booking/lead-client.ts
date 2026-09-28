'use client'

import { business } from '@/config/business'
import type { LeadInputDraft, LeadResponse } from '@/lib/schemas/lead'
import { getAttribution } from '@/lib/tracking/attribution'
import { whatsappHref } from '@/lib/whatsapp'

/** Posts a lead. Never throws: a network failure comes back as { ok: false, ref: null }. */
export async function postLead(
  lead: Omit<LeadInputDraft, 'attribution' | 'page'>,
): Promise<LeadResponse> {
  let attribution
  try {
    attribution = getAttribution(window.localStorage)
  } catch {
    attribution = undefined
  }
  try {
    const res = await fetch('/api/leads/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...lead,
        attribution,
        page: window.location.pathname + window.location.search,
      }),
    })
    const data = (await res.json()) as LeadResponse
    return { ok: Boolean(data.ok), ref: data.ref ?? null, message: data.message }
  } catch {
    return { ok: false, ref: null, message: 'Network error' }
  }
}

/**
 * Opens a blank tab synchronously (inside the click, so pop-up blockers allow
 * it) and returns a function that sends it to WhatsApp once the message is ready.
 */
export function prepareWhatsAppWindow(): (message: string) => void {
  const win = window.open('', '_blank')
  return (message: string) => {
    const url = whatsappHref(business.whatsapp, message)
    if (win && !win.closed) {
      win.opener = null
      win.location.href = url
    } else {
      window.location.href = url
    }
  }
}
