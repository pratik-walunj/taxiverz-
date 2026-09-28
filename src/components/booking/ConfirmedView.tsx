'use client'

import { useEffect, useState } from 'react'
import { Phone } from 'lucide-react'
import { business } from '@/config/business'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { formatIndianPhone, telHref } from '@/lib/phone'
import { tripSummaryLines, whatsappTripMessage, type TripSummary } from '@/lib/trip-summary'
import { whatsappHref } from '@/lib/whatsapp'
import { LAST_BOOKING_KEY } from './BookingFlow'

/**
 * Confirmation (REBUILD_PLAN §3.4 step 5). Promises only what is true today:
 * we have the request and will confirm by phone or WhatsApp. Cancellation and
 * payment wording waits for the owner's policies (OWNER_TODO H1).
 */
export function ConfirmedView({ reference }: { reference: string | null }) {
  const [summary, setSummary] = useState<TripSummary | null>(null)
  useEffect(() => {
    try {
      const saved = JSON.parse(
        window.sessionStorage.getItem(LAST_BOOKING_KEY) ?? 'null',
      ) as TripSummary | null
      // sessionStorage is only readable after hydration, so the restore has to run here.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (saved && (!reference || saved.ref === reference)) setSummary(saved)
    } catch {
      // ignore
    }
  }, [reference])

  const message = summary
    ? whatsappTripMessage(summary)
    : `Hi Taxiverz, about my booking${reference ? ` ${reference}` : ''}.`
  return (
    <div className="max-w-2xl">
      <h1 className="text-h1 font-bold">We&rsquo;ve received your booking</h1>
      {reference && (
        <p className="mt-4 text-lg">
          Your reference: <strong className="tabular font-heading text-2xl">{reference}</strong>
        </p>
      )}
      <p className="mt-4">
        We&rsquo;ll call or WhatsApp you to confirm the car and the fare. Keep your reference handy
        when you speak to us.
      </p>
      {summary && (
        <section aria-labelledby="summary-title" className="bg-mist rounded-panel mt-6 p-4">
          <h2 id="summary-title" className="font-semibold">
            Your trip
          </h2>
          <ul className="mt-2 space-y-1">
            {tripSummaryLines({ ...summary, ref: null }).map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </section>
      )}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <a
          href={whatsappHref(business.whatsapp, message)}
          target="_blank"
          rel="noopener"
          data-placement="booking-confirmed"
          className="bg-whatsapp text-ink rounded-control inline-flex min-h-12 items-center justify-center gap-2 px-5 font-bold"
        >
          <WhatsAppIcon className="size-5" /> WhatsApp us about this booking
        </a>
        <a
          href={telHref(business.phone)}
          data-placement="booking-confirmed"
          className="border-ink/30 rounded-control inline-flex min-h-12 items-center justify-center gap-2 border px-5 font-semibold"
        >
          <Phone aria-hidden="true" className="size-5" /> Call {formatIndianPhone(business.phone)}
        </a>
      </div>
    </div>
  )
}
