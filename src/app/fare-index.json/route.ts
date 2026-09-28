import { buildFareIndex } from '@/lib/pricing/build-index'

/** The slim fare index the widget lazy-loads on first interaction. Built once at build time. */
export const dynamic = 'force-static'

export function GET() {
  return Response.json(buildFareIndex(), {
    headers: { 'Cache-Control': 'public, max-age=300, stale-while-revalidate=86400' },
  })
}
