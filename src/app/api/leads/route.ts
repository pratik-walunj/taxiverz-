import { NextResponse, type NextRequest } from 'next/server'
import { leadInputSchema, type LeadResponse } from '@/lib/schemas/lead'
import { clientIp } from '@/server/leads/antispam'
import { leadDeps } from '@/server/leads/runtime'
import { submitLead } from '@/server/leads/service'

/** POST /api/leads — every lead from the site (REBUILD_PLAN §3.5). */
export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json<LeadResponse>(
      { ok: false, ref: null, message: 'Invalid request.' },
      { status: 400 },
    )
  }
  const parsed = leadInputSchema.safeParse(body)
  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? 'Please check the form.'
    return NextResponse.json<LeadResponse>({ ok: false, ref: null, message }, { status: 422 })
  }

  const result = await submitLead(
    parsed.data,
    { ip: clientIp(request.headers), userAgent: request.headers.get('user-agent') },
    leadDeps(),
  )
  switch (result.status) {
    case 'ok':
    case 'spam':
      return NextResponse.json<LeadResponse>({ ok: true, ref: result.ref })
    case 'undelivered':
      // The browser falls back to WhatsApp with the same summary and this ref.
      return NextResponse.json<LeadResponse>({ ok: false, ref: result.ref }, { status: 503 })
    case 'rate-limited':
      return NextResponse.json<LeadResponse>(
        { ok: false, ref: null, message: 'Too many requests. Please call or WhatsApp us.' },
        { status: 429 },
      )
  }
}
