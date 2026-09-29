import { createHmac } from 'node:crypto'
import nodemailer from 'nodemailer'
import type { Env } from '@/config/env'
import { tripSummaryLines } from '@/lib/trip-summary'
import type { LeadRecord, Sink } from './types'

/**
 * Lead sinks (REBUILD_PLAN §3.5). Each is enabled only when its env vars are
 * set, and throws on failure so the outbox can retry it.
 */

export function leadText(lead: LeadRecord): string {
  const priced = lead.fare?.status === 'priced' ? lead.fare : null
  const lines = tripSummaryLines({
    ref: lead.ref,
    tripType: lead.trip?.type,
    from: lead.fromLabel,
    to: lead.toLabel,
    pkg: lead.trip?.pkg ?? null,
    date: lead.trip?.date,
    time: lead.trip?.time,
    returnDate: lead.trip?.returnDate,
    vehicle: lead.vehicleLabel,
    total: lead.fare ? (priced ? priced.total : null) : undefined,
    isEstimate: priced?.isEstimate,
    name: lead.name,
    phone: lead.phone,
    email: lead.email ?? undefined,
    pickupAddress: lead.pickupAddress ?? undefined,
    message: lead.message ?? undefined,
  })
  const d = lead.details
  const detailLines = d
    ? [
        d.subject && `About: ${d.subject}`,
        d.occasion && `Occasion: ${d.occasion}`,
        d.date && `Date: ${d.date}`,
        d.city && `City: ${d.city}`,
        d.groupSize && `People: ${d.groupSize}`,
        d.company && `Company: ${d.company}`,
        d.gstin && `GSTIN: ${d.gstin}`,
        d.monthlyTrips && `Trips per month: ${d.monthlyTrips}`,
      ].filter(Boolean)
    : []
  const extra = [
    ...detailLines,
    `Lead type: ${lead.type}`,
    `WhatsApp offers: ${lead.whatsappOptIn ? 'yes' : 'no'}`,
    `Page: ${lead.page}`,
    lead.attribution?.gclid ? `Google Ads click: ${lead.attribution.gclid}` : null,
    lead.attribution?.utm_source
      ? `Source: ${lead.attribution.utm_source} / ${lead.attribution.utm_medium ?? ''}`
      : null,
  ].filter(Boolean)
  return [...lines, '', ...extra].join('\n')
}

export function leadSubject(lead: LeadRecord): string {
  const route = lead.fromLabel
    ? ` — ${lead.fromLabel}${lead.toLabel ? ` to ${lead.toLabel}` : ''}`
    : ''
  return `New ${lead.type} ${lead.ref}${route}`
}

/** The payload a CRM (TravelCRM, Google Sheets, n8n) receives. `ref` is the idempotency key. */
export function webhookPayload(lead: LeadRecord) {
  return {
    ref: lead.ref,
    source: 'taxiverz-website',
    leadType: lead.type,
    name: lead.name,
    phone: lead.phone,
    email: lead.email,
    tripType: lead.trip?.type ?? null,
    from: lead.fromLabel,
    to: lead.toLabel,
    date: lead.trip?.date ?? null,
    time: lead.trip?.time ?? null,
    returnDate: lead.trip?.returnDate ?? null,
    vehicle: lead.vehicleLabel,
    quotedFare: lead.fare?.status === 'priced' ? lead.fare.total : null,
    quotedFareIsEstimate: lead.fare?.isEstimate ?? null,
    pickupAddress: lead.pickupAddress,
    message: lead.message,
    details: lead.details,
    whatsappOptIn: lead.whatsappOptIn,
    attribution: lead.attribution,
    page: lead.page,
    createdAt: lead.createdAt.toISOString(),
  }
}

export function emailSink(env: Env): Sink | null {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, LEAD_EMAIL_TO, LEAD_EMAIL_FROM } = env
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !LEAD_EMAIL_TO) return null
  const port = SMTP_PORT ?? 465
  const transport = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  })
  return {
    name: 'email',
    async deliver(lead) {
      await transport.sendMail({
        from: LEAD_EMAIL_FROM ?? SMTP_USER,
        to: LEAD_EMAIL_TO,
        replyTo: lead.email ?? undefined,
        subject: leadSubject(lead),
        text: leadText(lead),
      })
    },
  }
}

export function telegramSink(env: Env, fetchImpl: typeof fetch = fetch): Sink | null {
  const { TELEGRAM_BOT_TOKEN: token, TELEGRAM_CHAT_ID: chatId } = env
  if (!token || !chatId) return null
  return {
    name: 'telegram',
    async deliver(lead) {
      const res = await fetchImpl(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: `${leadSubject(lead)}\n\n${leadText(lead)}`,
        }),
        signal: AbortSignal.timeout(10_000),
      })
      if (!res.ok) throw new Error(`Telegram answered ${res.status}`)
    },
  }
}

export function webhookSink(env: Env, fetchImpl: typeof fetch = fetch): Sink | null {
  const { LEAD_WEBHOOK_URL: url, LEAD_WEBHOOK_SECRET: secret } = env
  if (!url) return null
  return {
    name: 'webhook',
    async deliver(lead) {
      const body = JSON.stringify(webhookPayload(lead))
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'Idempotency-Key': lead.ref,
      }
      if (secret)
        headers['X-Taxiverz-Signature'] = createHmac('sha256', secret).update(body).digest('hex')
      const res = await fetchImpl(url, {
        method: 'POST',
        headers,
        body,
        signal: AbortSignal.timeout(10_000),
      })
      if (!res.ok) throw new Error(`Webhook answered ${res.status}`)
    },
  }
}

export function enabledSinks(env: Env): Sink[] {
  return [emailSink(env), telegramSink(env), webhookSink(env)].filter((s): s is Sink => s !== null)
}
