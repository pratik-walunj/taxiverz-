import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { business } from '@/config/business'
import { buildLegacyTable, GONE, legacyKey } from '@/lib/redirects/legacy'
import { formatIndianPhone } from '@/lib/phone'

// Built once per server start from docs/legacy-url-map.json.
const legacyTable = buildLegacyTable()

/**
 * Legacy taxiverz.com URLs (/gorakhpur-to-kathmandu.html …) → one 301 to the
 * page's effective destination. Case-insensitive, with or without %20.
 */
export function proxy(request: NextRequest) {
  const destination = legacyTable.get(legacyKey(request.nextUrl.pathname))
  if (!destination) return NextResponse.next()
  if (destination === GONE)
    return new NextResponse(goneHtml, {
      status: 410,
      headers: { 'Content-Type': 'text/html; charset=utf-8', 'X-Robots-Tag': 'noindex' },
    })
  // A plain URL, not nextUrl.clone(): NextURL drops the trailing slash on pathname,
  // which would add a second (308) hop. Query string kept, so UTM tags survive.
  const url = new URL(`${destination}${request.nextUrl.search}`, request.url)
  return NextResponse.redirect(url, 301)
}

export const config = {
  // Legacy URLs only: a single root-level segment ending in .html (any case), e.g.
  // /Gypsy.html or /tempo%20traveller13.html. No other request runs the proxy.
  // `[.]` instead of `\.`: the matcher pipeline drops backslash escapes.
  matcher: ['/([^/]+[.][hH][tT][mM][lL])'],
}

/** A plain page for offers the owner has discontinued: 410 tells search engines it is gone for good. */
const phone = formatIndianPhone(business.phone)
const goneHtml = `<!doctype html><html lang="en-IN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>No longer offered | Taxiverz</title><style>body{font-family:system-ui,sans-serif;max-width:40rem;margin:3rem auto;padding:0 1rem;line-height:1.6;color:#1c1b1d}a{color:#c2410c;font-weight:600}</style></head><body><h1>We no longer offer this</h1><p>The page you followed was for something Taxiverz doesn't offer any more.</p><p><a href="/">See what we offer</a> · call or WhatsApp <a href="tel:${business.phone}">${phone}</a></p></body></html>`
