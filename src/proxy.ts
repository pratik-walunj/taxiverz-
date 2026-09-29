import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { buildLegacyTable, legacyKey } from '@/lib/redirects/legacy'

// Built once per server start from docs/legacy-url-map.json.
const legacyTable = buildLegacyTable()

/**
 * Legacy taxiverz.com URLs (/gorakhpur-to-kathmandu.html …) → one 301 to the
 * page's effective destination. Case-insensitive, with or without %20.
 */
export function proxy(request: NextRequest) {
  const destination = legacyTable.get(legacyKey(request.nextUrl.pathname))
  if (!destination) return NextResponse.next()
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
