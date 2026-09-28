'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useId, useMemo, useRef, useState, type ReactNode } from 'react'
import { Phone } from 'lucide-react'
import { business } from '@/config/business'
import type { PricingConfig } from '@/config/pricing'
import { Badge } from '@/components/ui/Badge'
import { Price } from '@/components/ui/Price'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { computeFare } from '@/lib/pricing/engine'
import type { FareIndexClass } from '@/lib/pricing/fare-index'
import { classLabel, type TripRequest } from '@/lib/pricing/quote'
import type { RouteCosts } from '@/lib/pricing/types'
import { formatIndianPhone, telHref } from '@/lib/phone'
import type { TripInput } from '@/lib/schemas/lead'
import { track } from '@/lib/tracking/track'
import { whatsappTripMessage, type TripSummary } from '@/lib/trip-summary'
import { whatsappHref } from '@/lib/whatsapp'
import { postLead, prepareWhatsAppWindow } from './lead-client'
import { PhoneField, toE164, validMobile, type CountryCode } from './PhoneField'

/** Steps 3–4 of the funnel (REBUILD_PLAN §3.4): trip details with a live fare, then contact and the three closes. */

interface Props {
  trip: TripRequest
  fromLabel: string
  toLabel: string | null
  vehicleClass: FareIndexClass
  route: RouteCosts
  config: PricingConfig
  localPackage: { hours: number; km: number } | null
}

interface Draft {
  date: string
  time: string
  returnDate: string
  name: string
  cc: CountryCode
  mobile: string
  email: string
  address: string
  optIn: boolean
}

const DRAFT_KEY = 'tvz_booking_draft'
export const LAST_BOOKING_KEY = 'tvz_last_booking'

function todayIso(): string {
  const d = new Date()
  return new Date(d.getTime() - d.getTimezoneOffset() * 60_000).toISOString().slice(0, 10)
}

function dayCount(from: string, to: string): number {
  return Math.round((Date.parse(to) - Date.parse(from)) / 86_400_000) + 1
}

const inputClass = 'border-ink/25 bg-paper min-h-12 w-full rounded-control border px-3'

export function BookingFlow({
  trip,
  fromLabel,
  toLabel,
  vehicleClass,
  route,
  config,
  localPackage,
}: Props) {
  const router = useRouter()
  const id = useId()
  const startedAt = useRef(0)
  // Stamped after mount (render must stay pure); the server rejects fills under 3 s.
  useEffect(() => {
    startedAt.current = Date.now()
  }, [])
  const tripKey = JSON.stringify([trip, vehicleClass.slug])
  const [step, setStep] = useState<'details' | 'contact'>('details')
  const [draft, setDraft] = useState<Draft>({
    date: '',
    time: '',
    returnDate: '',
    name: '',
    cc: '+91',
    mobile: '',
    email: '',
    address: '',
    optIn: false,
  })
  const [website, setWebsite] = useState('')
  const [errors, setErrors] = useState<Partial<Record<keyof Draft, string>>>({})
  const [sending, setSending] = useState<null | 'confirm' | 'whatsapp'>(null)
  const [fallback, setFallback] = useState<{ ref: string | null } | null>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)

  // Restore a draft for the same trip after a refresh; save as the visitor types.
  useEffect(() => {
    try {
      const saved = JSON.parse(window.sessionStorage.getItem(DRAFT_KEY) ?? 'null') as {
        key: string
        draft: Draft
      } | null
      // sessionStorage is only readable after hydration, so the restore has to run here.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (saved?.key === tripKey) setDraft(saved.draft)
    } catch {
      // ignore
    }
    track('vehicle_select', { class: vehicleClass.slug, trip_type: trip.type })
  }, [tripKey, trip.type, vehicleClass.slug])
  useEffect(() => {
    try {
      window.sessionStorage.setItem(DRAFT_KEY, JSON.stringify({ key: tripKey, draft }))
    } catch {
      // ignore
    }
  }, [draft, tripKey])
  // Move focus to the new step's heading when the step changes (not on first load).
  const firstRender = useRef(true)
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    headingRef.current?.focus()
  }, [step])

  const set = <K extends keyof Draft>(key: K, value: Draft[K]) =>
    setDraft((d) => ({ ...d, [key]: value }))
  const isRound = trip.type === 'round-trip'
  const days =
    isRound && draft.date && draft.returnDate
      ? Math.max(1, dayCount(draft.date, draft.returnDate))
      : undefined

  const quote = useMemo(
    () =>
      computeFare({
        tripType: trip.type,
        classSlug: vehicleClass.slug,
        rates: vehicleClass.rates,
        tollClass: vehicleClass.tollClass,
        route,
        config,
        days,
        pickupTime: draft.time || undefined,
        localPackage: localPackage ?? undefined,
      }),
    [trip.type, vehicleClass, route, config, days, draft.time, localPackage],
  )
  const total = quote.status === 'priced' ? quote.total : null

  const tripInput: TripInput = {
    type: trip.type,
    from: trip.from,
    to: trip.to,
    fromText: trip.fromText,
    toText: trip.toText,
    pkg: trip.pkg ?? null,
    date: draft.date || undefined,
    time: draft.time || undefined,
    returnDate: isRound ? draft.returnDate || undefined : undefined,
    classSlug: vehicleClass.slug,
  }
  const summary: TripSummary = {
    tripType: trip.type,
    from: fromLabel,
    to: toLabel,
    pkg: trip.pkg ?? null,
    date: draft.date || undefined,
    time: draft.time || undefined,
    returnDate: isRound ? draft.returnDate || undefined : undefined,
    vehicle: classLabel(vehicleClass),
    total,
    isEstimate: quote.isEstimate,
    name: draft.name || undefined,
    phone: draft.mobile ? toE164(draft.cc, draft.mobile) : undefined,
    pickupAddress: draft.address || undefined,
  }

  function validateDetails(): boolean {
    const e: typeof errors = {}
    if (!draft.date) e.date = 'Choose the travel date.'
    else if (draft.date < todayIso()) e.date = 'The date is in the past.'
    if (!draft.time) e.time = 'Choose the pickup time.'
    if (isRound && !draft.returnDate) e.returnDate = 'Choose the return date.'
    else if (isRound && draft.returnDate < draft.date)
      e.returnDate = 'Return is before the travel date.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function validateContact(): boolean {
    const e: typeof errors = {}
    if (!draft.name.trim()) e.name = 'Enter your name.'
    if (!validMobile(draft.cc, draft.mobile)) e.mobile = 'Enter a valid mobile number.'
    if (draft.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.email))
      e.email = 'Check the email address.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function send(close: 'confirm' | 'whatsapp') {
    if (!validateContact()) return
    const openWhatsApp = close === 'whatsapp' ? prepareWhatsAppWindow() : null
    setSending(close)
    const res = await postLead({
      type: 'booking',
      trip: tripInput,
      contact: {
        name: draft.name.trim(),
        phone: toE164(draft.cc, draft.mobile),
        email: draft.email.trim(),
        pickupAddress: draft.address.trim() || undefined,
      },
      consent: { whatsappOptIn: draft.optIn },
      clientTotal: total,
      website,
      startedAt: startedAt.current,
    })
    setSending(null)
    const message = whatsappTripMessage({ ...summary, ref: res.ref })
    if (res.ok) {
      track('lead_submit', {
        value: total ?? 0,
        currency: 'INR',
        ref: res.ref,
        lead_type: 'booking',
        close,
      })
      try {
        window.sessionStorage.setItem(
          LAST_BOOKING_KEY,
          JSON.stringify({ ...summary, ref: res.ref }),
        )
        window.sessionStorage.removeItem(DRAFT_KEY)
      } catch {
        // ignore
      }
      if (openWhatsApp) openWhatsApp(message)
      router.push(`/book/confirmed/?ref=${encodeURIComponent(res.ref ?? '')}`)
      return
    }
    // Never lose a lead: the same summary goes to WhatsApp.
    if (openWhatsApp) openWhatsApp(message)
    setFallback({ ref: res.ref })
  }

  const fareBox = (
    <aside aria-labelledby={`${id}-fare`} className="bg-mist rounded-panel p-4">
      <h2 id={`${id}-fare`} className="text-sm font-semibold">
        {classLabel(vehicleClass)}
      </h2>
      <p className="text-muted text-sm">
        {fromLabel}
        {toLabel ? ` to ${toLabel}` : ''}
        {localPackage ? ` · ${localPackage.hours} h / ${localPackage.km} km` : ''}
      </p>
      <div aria-live="polite" className="mt-2">
        {total !== null ? (
          <>
            <Price amount={total} className="text-2xl" />
            {quote.isEstimate && (
              <div className="mt-1">
                <Badge>Estimated fare</Badge>
              </div>
            )}
          </>
        ) : (
          <>
            <Price amount={null} className="text-lg" />
            <p className="text-muted text-sm">
              We&rsquo;ll confirm the exact fare on WhatsApp or by phone.
            </p>
          </>
        )}
      </div>
      {quote.assumptions.length > 0 && (
        <ul className="text-muted mt-2 list-disc pl-5 text-sm">
          {quote.assumptions.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      )}
      <p className="text-muted mt-2 text-sm">The exact model depends on availability.</p>
    </aside>
  )

  if (fallback)
    return (
      <div role="alert" className="grid gap-4">
        <h2 className="text-h2 font-bold">Please send your booking on WhatsApp</h2>
        <p>
          We couldn&rsquo;t save your booking just now. Your trip details are ready in WhatsApp —
          press Send and we&rsquo;ll confirm it.
          {fallback.ref && ` Your reference is ${fallback.ref}.`}
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href={whatsappHref(
              business.whatsapp,
              whatsappTripMessage({ ...summary, ref: fallback.ref }),
            )}
            target="_blank"
            rel="noopener"
            data-placement="booking-fallback"
            className="bg-whatsapp text-ink rounded-control inline-flex min-h-12 items-center justify-center gap-2 px-5 font-bold"
          >
            <WhatsAppIcon className="size-5" /> Send on WhatsApp
          </a>
          <a
            href={telHref(business.phone)}
            data-placement="booking-fallback"
            className="border-ink/30 rounded-control inline-flex min-h-12 items-center justify-center gap-2 border px-5 font-semibold"
          >
            <Phone aria-hidden="true" className="size-5" /> Call {formatIndianPhone(business.phone)}
          </a>
        </div>
      </div>
    )

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_20rem] md:items-start">
      <div>
        <p className="text-muted text-sm">Step {step === 'details' ? 2 : 3} of 3</p>
        {step === 'details' ? (
          <form
            noValidate
            onSubmit={(e) => {
              e.preventDefault()
              if (validateDetails()) {
                track('trip_details_complete', { trip_type: trip.type, class: vehicleClass.slug })
                setStep('contact')
              }
            }}
            className="grid gap-4"
          >
            <h2 ref={headingRef} tabIndex={-1} className="text-h2 font-bold outline-none">
              Trip details
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Travel date" error={errors.date} id={`${id}-date`}>
                <input
                  id={`${id}-date`}
                  type="date"
                  min={todayIso()}
                  value={draft.date}
                  onChange={(e) => set('date', e.target.value)}
                  className={inputClass}
                />
              </Field>
              <Field label="Pickup time" error={errors.time} id={`${id}-time`}>
                <input
                  id={`${id}-time`}
                  type="time"
                  value={draft.time}
                  onChange={(e) => set('time', e.target.value)}
                  className={inputClass}
                />
              </Field>
              {isRound && (
                <Field label="Return date" error={errors.returnDate} id={`${id}-return`}>
                  <input
                    id={`${id}-return`}
                    type="date"
                    min={draft.date || todayIso()}
                    value={draft.returnDate}
                    onChange={(e) => set('returnDate', e.target.value)}
                    className={inputClass}
                  />
                </Field>
              )}
            </div>
            <button
              type="submit"
              className="bg-brand text-ink rounded-control min-h-12 px-6 text-lg font-bold sm:justify-self-start"
            >
              Continue
            </button>
          </form>
        ) : (
          <form
            noValidate
            onSubmit={(e) => {
              e.preventDefault()
              void send('confirm')
            }}
            className="grid gap-4"
          >
            <h2 ref={headingRef} tabIndex={-1} className="text-h2 font-bold outline-none">
              Your details
            </h2>
            <Field label="Name" error={errors.name} id={`${id}-name`}>
              <input
                id={`${id}-name`}
                type="text"
                autoComplete="name"
                value={draft.name}
                onChange={(e) => set('name', e.target.value)}
                className={inputClass}
              />
            </Field>
            <PhoneField
              cc={draft.cc}
              onCc={(v) => set('cc', v)}
              value={draft.mobile}
              onChange={(v) => set('mobile', v)}
              error={errors.mobile ?? null}
            />
            <Field label="Email (optional)" error={errors.email} id={`${id}-email`}>
              <input
                id={`${id}-email`}
                type="email"
                autoComplete="email"
                value={draft.email}
                onChange={(e) => set('email', e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="Pickup address (optional)" id={`${id}-address`}>
              <input
                id={`${id}-address`}
                type="text"
                autoComplete="street-address"
                value={draft.address}
                onChange={(e) => set('address', e.target.value)}
                className={inputClass}
              />
            </Field>
            <label className="flex min-h-12 items-center gap-3">
              <input
                type="checkbox"
                checked={draft.optIn}
                onChange={(e) => set('optIn', e.target.checked)}
                className="size-5"
              />
              Send me offers on WhatsApp
            </label>
            <input
              type="text"
              name="website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />
            <p className="text-muted text-sm">
              We use your details only to arrange this trip and contact you about it.
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              <button
                type="submit"
                disabled={sending !== null}
                className="bg-brand text-ink rounded-control min-h-12 px-4 font-bold"
              >
                {sending === 'confirm' ? 'Sending…' : 'Confirm booking'}
              </button>
              <button
                type="button"
                disabled={sending !== null}
                onClick={() => void send('whatsapp')}
                className="bg-whatsapp text-ink rounded-control inline-flex min-h-12 items-center justify-center gap-2 px-4 font-bold"
              >
                <WhatsAppIcon className="size-5" />
                {sending === 'whatsapp' ? 'Opening…' : 'Book on WhatsApp'}
              </button>
              <a
                href={telHref(business.phone)}
                data-placement="booking-close"
                className="border-ink/30 rounded-control inline-flex min-h-12 items-center justify-center gap-2 border px-4 font-semibold"
              >
                <Phone aria-hidden="true" className="size-5" /> Call to book
              </a>
            </div>
            <button
              type="button"
              onClick={() => setStep('details')}
              className="text-brand-deep min-h-12 justify-self-start underline"
            >
              Back to trip details
            </button>
          </form>
        )}
      </div>
      {fareBox}
    </div>
  )
}

function Field({
  label,
  error,
  id,
  children,
}: {
  label: string
  error?: string
  id: string
  children: ReactNode
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-semibold">
        {label}
      </label>
      {children}
      {error && (
        <p role="alert" className="text-brand-deep mt-1 text-sm font-semibold">
          {error}
        </p>
      )}
    </div>
  )
}
