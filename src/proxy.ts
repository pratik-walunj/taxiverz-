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
  const url = request.nextUrl.clone()
  url.pathname = destination // query string kept, so UTM tags on old links survive
  return NextResponse.redirect(url, 301)
}

export const config = {
  // Only .html paths (any case); everything else never touches the proxy.
  matcher: ['/((?!_next/|api/).*\.[hH][tT][mM][lL])'],
}
