import { NextResponse, type NextRequest } from 'next/server'
import { authorisedCron, leadDeps } from '@/server/leads/runtime'
import { purgeExpiredLeads } from '@/server/leads/service'

/** POST /api/leads/maintenance — daily cron: deletes leads 24 months after the last contact. */
export async function POST(request: NextRequest) {
  if (!authorisedCron(request.headers.get('authorization')))
    return NextResponse.json({ ok: false }, { status: 401 })
  return NextResponse.json({ ok: true, ...(await purgeExpiredLeads(leadDeps())) })
}
