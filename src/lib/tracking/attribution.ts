import { tracking } from '@/config/tracking'
import type { Attribution } from '@/lib/schemas/lead'

/**
 * Ad-click attribution (REBUILD_PLAN §3.6): captured on the first visit, kept
 * 90 days in first-party storage, attached to every lead so bookings closed by
 * phone or WhatsApp can be imported into Google Ads as offline conversions.
 * A later visit with a new ad click (gclid/gbraid/wbraid) replaces the stored one.
 */
const KEY = 'tvz_attribution'
const CLICK_IDS = ['gclid', 'gbraid', 'wbraid'] as const

interface Stored {
  data: Attribution
  expiresAt: number
}

function read(storage: Storage, now: number): Attribution | null {
  try {
    const raw = storage.getItem(KEY)
    if (!raw) return null
    const stored = JSON.parse(raw) as Stored
    return stored.expiresAt > now ? stored.data : null
  } catch {
    return null
  }
}

export function captureAttribution(
  url: URL,
  referrer: string,
  storage: Storage,
  now: number = Date.now(),
): Attribution | null {
  const existing = read(storage, now)
  const fromUrl: Attribution = {}
  for (const key of tracking.attributionParams) {
    const value = url.searchParams.get(key)
    if (value) fromUrl[key as keyof Attribution] = value.slice(0, 200)
  }
  const newClick = CLICK_IDS.some((k) => fromUrl[k])
  if (existing && !newClick) return existing
  const data: Attribution = {
    ...fromUrl,
    landingPage: `${url.pathname}${url.search}`.slice(0, 500),
    referrer: referrer.slice(0, 500) || undefined,
    firstVisitAt: new Date(now).toISOString(),
  }
  try {
    storage.setItem(
      KEY,
      JSON.stringify({ data, expiresAt: now + tracking.attributionTtlDays * 86_400_000 }),
    )
  } catch {
    // Storage full or blocked: attribution is best effort.
  }
  return data
}

export function getAttribution(
  storage: Storage | undefined,
  now: number = Date.now(),
): Attribution | undefined {
  if (!storage) return undefined
  return read(storage, now) ?? undefined
}
