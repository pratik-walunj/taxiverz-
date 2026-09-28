import { NextResponse, type NextRequest } from 'next/server'
import { authorisedCron, leadDeps } from '@/server/leads/runtime'
import { retryDueDeliveries } from '@/server/leads/service'

/** POST /api/leads/retry — the VPS cron calls this every 5 minutes (Authorization: Bearer LEADS_RETRY_TOKEN). */
export async function POST(request: NextRequest) {
  if (!authorisedCron(request.headers.get('authorization')))
    return NextResponse.json({ ok: false }, { status: 401 })
  return NextResponse.json({ ok: true, ...(await retryDueDeliveries(leadDeps())) })
}
