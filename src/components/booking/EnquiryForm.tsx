'use client'

import Link from 'next/link'
import { useEffect, useId, useRef, useState, type ReactNode } from 'react'
import { Phone } from 'lucide-react'
import { business } from '@/config/business'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { cx } from '@/lib/cx'
import { formatIndianPhone, telHref } from '@/lib/phone'
import type { LeadDetails, LeadType } from '@/lib/schemas/lead'
import { GSTIN_PATTERN } from '@/lib/schemas/lead-constants'
import { track } from '@/lib/tracking/track'
import { whatsappHref } from '@/lib/whatsapp'
import { postLead, prepareWhatsAppWindow } from './lead-client'
import { PhoneField, toE164, validMobile, type CountryCode } from './PhoneField'

const MONTHLY = ['1–10', '11–50', '51–200', 'More than 200'] as const
const PERMITS = [
  'All-India tourist permit',
  'State tourist permit',
  'Local taxi permit',
  'Not sure',
] as const
const LICENCES = [
  'LMV (car)',
  'LMV transport / commercial',
  'Heavy vehicle (HMV / HTV)',
  'Not sure',
] as const

/** Which fields the form shows. */
export type EnquiryKind = 'enquiry' | 'corporate' | 'contact' | 'attach' | 'driver'

interface Values {
  name: string
  cc: CountryCode
  mobile: string
  email: string
  date: string
  city: string
  groupSize: string
  occasion: string
  company: string
  gstin: string
  monthlyTrips: string
  vehicle: string
  vehicleYear: string
  permit: string
  licence: string
  yearsDriving: string
  languages: string
  message: string
}

/**
 * One lead form, several field sets (`kind`): enquiries for enquire-mode
 * services (Phase 5), the corporate form, the contact form and the two
 * partner forms (Phase 6). Same pipeline as bookings: reference number on
 * success, WhatsApp with the same details if saving fails.
 */
export function EnquiryForm({
  leadType,
  subject,
  title,
  occasions,
  defaultCity = '',
  kind = 'enquiry',
  dark = false,
}: {
  leadType: LeadType
  /** What the enquiry is about, e.g. "Wedding cars" or "Pre-wedding shoots". */
  subject: string
  title: string
  occasions?: readonly string[]
  defaultCity?: string
  kind?: EnquiryKind
  dark?: boolean
}) {
  const isCorporate = kind === 'corporate'
  const id = useId()
  const startedAt = useRef(0)
  useEffect(() => {
    startedAt.current = Date.now()
  }, [])
  const [v, setV] = useState<Values>({
    name: '',
    cc: '+91',
    mobile: '',
    email: '',
    date: '',
    city: defaultCity,
    groupSize: '',
    occasion: '',
    company: '',
    gstin: '',
    monthlyTrips: '',
    vehicle: '',
    vehicleYear: '',
    permit: '',
    licence: '',
    yearsDriving: '',
    languages: '',
    message: '',
  })
  const [website, setWebsite] = useState('')
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({})
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle')
  const [ref, setRef] = useState<string | null>(null)
  const set = <K extends keyof Values>(k: K, value: Values[K]) =>
    setV((x) => ({ ...x, [k]: value }))

  function details(): LeadDetails {
    const size = Number(v.groupSize)
    const year = Number(v.vehicleYear)
    const driving = Number(v.yearsDriving)
    return {
      subject,
      ...(v.date && { date: v.date }),
      ...(v.city.trim() && { city: v.city.trim() }),
      ...(Number.isInteger(size) && size > 0 && { groupSize: size }),
      ...(v.occasion && { occasion: v.occasion }),
      ...(isCorporate && v.company.trim() && { company: v.company.trim() }),
      ...(isCorporate && v.gstin.trim() && { gstin: v.gstin.trim().toUpperCase() }),
      ...(isCorporate && v.monthlyTrips && { monthlyTrips: v.monthlyTrips }),
      ...(kind === 'attach' && v.vehicle.trim() && { vehicle: v.vehicle.trim() }),
      ...(kind === 'attach' && Number.isInteger(year) && year >= 1990 && { vehicleYear: year }),
      ...(kind === 'attach' && v.permit && { permit: v.permit }),
      ...(kind === 'driver' && v.licence && { licence: v.licence }),
      ...(kind === 'driver' &&
        v.yearsDriving !== '' &&
        Number.isInteger(driving) && { yearsDriving: driving }),
      ...(kind === 'driver' && v.languages.trim() && { languages: v.languages.trim() }),
    }
  }

  function summary(reference: string | null) {
    const d = details()
    return [
      kind === 'contact' ? 'Hi Taxiverz,' : `Hi Taxiverz, an enquiry about ${subject}:`,
      '',
      reference && `Reference: ${reference}`,
      d.company && `Company: ${d.company}`,
      d.gstin && `GSTIN: ${d.gstin}`,
      d.monthlyTrips && `Trips per month: ${d.monthlyTrips}`,
      d.vehicle && `Vehicle: ${d.vehicle}${d.vehicleYear ? ` (${d.vehicleYear})` : ''}`,
      d.permit && `Permit: ${d.permit}`,
      d.licence && `Licence: ${d.licence}`,
      d.yearsDriving !== undefined && `Years driving: ${d.yearsDriving}`,
      d.languages && `Languages: ${d.languages}`,
      d.occasion && `Occasion: ${d.occasion}`,
      d.date && `Date: ${d.date}`,
      d.city && `City: ${d.city}`,
      d.groupSize && `People: ${d.groupSize}`,
      v.message.trim() && `Details: ${v.message.trim()}`,
      `Name: ${v.name.trim()}`,
      `Mobile: ${toE164(v.cc, v.mobile)}`,
    ]
      .filter(Boolean)
      .join('\n')
  }

  function validate(): boolean {
    const e: typeof errors = {}
    if (!v.name.trim()) e.name = 'Enter your name.'
    if (!validMobile(v.cc, v.mobile)) e.mobile = 'Enter a valid mobile number.'
    if (v.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = 'Check the email address.'
    if (isCorporate && !v.company.trim()) e.company = 'Enter the company name.'
    if (kind === 'contact' && !v.message.trim()) e.message = 'Write your message.'
    if (kind === 'attach' && !v.vehicle.trim()) e.vehicle = 'Enter the vehicle model.'
    if ((kind === 'attach' || kind === 'driver') && !v.city.trim()) e.city = 'Enter your city.'
    if (kind === 'driver' && !v.licence) e.licence = 'Choose your licence type.'
    if (kind === 'attach' && v.vehicleYear && !/^(19[9]\d|20\d\d)$/.test(v.vehicleYear))
      e.vehicleYear = 'Enter the year, e.g. 2021.'
    if (
      kind === 'driver' &&
      v.yearsDriving &&
      !(Number(v.yearsDriving) >= 0 && Number(v.yearsDriving) <= 60)
    )
      e.yearsDriving = 'Enter a number of years.'
    if (isCorporate && v.gstin && !GSTIN_PATTERN.test(v.gstin.trim().toUpperCase()))
      e.gstin = 'Check the GSTIN — 15 characters, e.g. 09AAAAA0000A1Z5.'
    if (v.groupSize && !(Number(v.groupSize) >= 1 && Number(v.groupSize) <= 500))
      e.groupSize = 'Enter a number of people.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function submit(viaWhatsApp: boolean) {
    if (!validate()) return
    const open = viaWhatsApp ? prepareWhatsAppWindow() : null
    setState('sending')
    const res = await postLead({
      type: leadType,
      details: details(),
      contact: {
        name: v.name.trim(),
        phone: toE164(v.cc, v.mobile),
        email: v.email.trim(),
        message: v.message.trim() || undefined,
      },
      consent: { whatsappOptIn: false },
      website,
      startedAt: startedAt.current,
    })
    setRef(res.ref)
    if (open) open(summary(res.ref))
    if (res.ok) {
      track('lead_submit', {
        ref: res.ref,
        lead_type: leadType,
        close: viaWhatsApp ? 'whatsapp' : 'confirm',
      })
      setState('sent')
    } else setState('failed')
  }

  const muted = dark ? 'text-night-muted' : 'text-muted'
  const input = cx(
    'rounded-control min-h-12 w-full border px-3',
    dark ? 'border-ivory/30 bg-night text-ivory' : 'border-ink/25 bg-paper',
  )

  if (state === 'sent' || state === 'failed')
    return (
      <div role={state === 'failed' ? 'alert' : 'status'} className="grid gap-4">
        <h2 className="text-h3 font-bold">
          {state === 'sent'
            ? kind === 'contact'
              ? 'Thanks — we have your message'
              : 'Thanks — we have your enquiry'
            : kind === 'contact'
              ? 'Please send your message on WhatsApp'
              : 'Please send your enquiry on WhatsApp'}
        </h2>
        <p>
          {state === 'sent'
            ? 'We will call or WhatsApp you about it.'
            : 'We couldn’t save it just now. Your details are ready in WhatsApp — press Send.'}
          {ref && (
            <>
              {' '}
              Your reference: <strong className="tabular">{ref}</strong>
            </>
          )}
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href={whatsappHref(business.whatsapp, summary(ref))}
            target="_blank"
            rel="noopener"
            data-placement="enquiry-after"
            className="bg-whatsapp text-ink rounded-control inline-flex min-h-12 items-center justify-center gap-2 px-5 font-bold"
          >
            <WhatsAppIcon className="size-5" />{' '}
            {state === 'sent' ? 'Add details on WhatsApp' : 'Send on WhatsApp'}
          </a>
          <a
            href={telHref(business.phone)}
            data-placement="enquiry-after"
            className={cx(
              'rounded-control inline-flex min-h-12 items-center justify-center gap-2 border px-5 font-semibold',
              dark ? 'border-ivory/60' : 'border-ink/30',
            )}
          >
            <Phone aria-hidden="true" className="size-5" /> Call {formatIndianPhone(business.phone)}
          </a>
        </div>
      </div>
    )

  const field = (key: keyof Values, label: string, control: ReactNode, span = false) => (
    <div className={span ? 'sm:col-span-2' : undefined}>
      <label htmlFor={`${id}-${key}`} className="mb-1 block text-sm font-semibold">
        {label}
      </label>
      {control}
      {errors[key] && (
        <p
          id={`${id}-${key}-err`}
          className={cx('mt-1 text-sm font-semibold', dark ? 'text-champagne' : 'text-brand-deep')}
        >
          {errors[key]}
        </p>
      )}
    </div>
  )
  const text = (key: keyof Values, type = 'text', autoComplete = 'off') => (
    <input
      id={`${id}-${key}`}
      type={type}
      autoComplete={autoComplete}
      value={v[key]}
      onChange={(e) => set(key, e.target.value as never)}
      aria-invalid={errors[key] ? true : undefined}
      aria-describedby={errors[key] ? `${id}-${key}-err` : undefined}
      className={input}
    />
  )

  return (
    <form
      aria-labelledby={`${id}-title`}
      noValidate
      onSubmit={(e) => {
        e.preventDefault()
        void submit(false)
      }}
      className="grid gap-4 sm:grid-cols-2"
    >
      <h2 id={`${id}-title`} className="text-h3 font-bold sm:col-span-2">
        {title}
      </h2>
      {isCorporate && field('company', 'Company', text('company', 'text', 'organization'), true)}
      {field('name', 'Your name', text('name', 'text', 'name'))}
      <div
        className={
          dark
            ? '[&_input]:bg-night [&_select]:bg-night [&_input]:text-ivory [&_select]:text-ivory [&_input]:border-ivory/30 [&_select]:border-ivory/30'
            : undefined
        }
      >
        <PhoneField
          cc={v.cc}
          onCc={(x) => set('cc', x)}
          value={v.mobile}
          onChange={(x) => set('mobile', x)}
          error={errors.mobile ?? null}
        />
      </div>
      {kind === 'contact' ? (
        field('email', 'Email (optional)', text('email', 'email', 'email'), true)
      ) : kind === 'attach' ? (
        <>
          {field('vehicle', 'Vehicle model', text('vehicle'))}
          {field('vehicleYear', 'Year (optional)', text('vehicleYear', 'number'))}
          {field(
            'permit',
            'Permit (optional)',
            <select
              id={`${id}-permit`}
              value={v.permit}
              onChange={(e) => set('permit', e.target.value)}
              className={input}
            >
              <option value="">Choose…</option>
              {PERMITS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>,
          )}
          {field('city', 'City', text('city', 'text', 'address-level2'))}
        </>
      ) : kind === 'driver' ? (
        <>
          {field(
            'licence',
            'Driving licence',
            <select
              id={`${id}-licence`}
              value={v.licence}
              onChange={(e) => set('licence', e.target.value)}
              className={input}
            >
              <option value="">Choose…</option>
              {LICENCES.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>,
          )}
          {field('yearsDriving', 'Years driving (optional)', text('yearsDriving', 'number'))}
          {field('languages', 'Languages you speak (optional)', text('languages'))}
          {field('city', 'City', text('city', 'text', 'address-level2'))}
        </>
      ) : isCorporate ? (
        <>
          {field('email', 'Work email (optional)', text('email', 'email', 'email'))}
          {field('gstin', 'GSTIN (optional)', text('gstin'))}
          {field(
            'monthlyTrips',
            'Trips per month',
            <select
              id={`${id}-monthlyTrips`}
              value={v.monthlyTrips}
              onChange={(e) => set('monthlyTrips', e.target.value)}
              className={input}
            >
              <option value="">Not sure yet</option>
              {MONTHLY.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>,
          )}
          {field('city', 'City', text('city', 'text', 'address-level2'))}
        </>
      ) : (
        <>
          {field('date', 'Date (optional)', text('date', 'date'))}
          {field('city', 'City (optional)', text('city', 'text', 'address-level2'))}
          {field('groupSize', 'Number of people (optional)', text('groupSize', 'number'))}
          {occasions &&
            occasions.length > 0 &&
            field(
              'occasion',
              'Occasion (optional)',
              <select
                id={`${id}-occasion`}
                value={v.occasion}
                onChange={(e) => set('occasion', e.target.value)}
                className={input}
              >
                <option value="">Choose…</option>
                {occasions.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>,
            )}
        </>
      )}
      {field(
        'message',
        kind === 'contact'
          ? 'Your message'
          : isCorporate
            ? 'What do you need? (optional)'
            : 'Anything else? (optional)',
        <textarea
          id={`${id}-message`}
          rows={kind === 'contact' ? 5 : 3}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? `${id}-message-err` : undefined}
          value={v.message}
          onChange={(e) => set('message', e.target.value)}
          className={cx(input, 'py-2')}
        />,
        true,
      )}
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
      <p className={cx('text-sm sm:col-span-2', muted)}>
        We use your details only to answer this {kind === 'contact' ? 'message' : 'enquiry'}
        {kind === 'attach' || kind === 'driver' ? '' : '. No payment is taken'}. See our{' '}
        <Link href="/privacy/" className="underline">
          privacy policy
        </Link>
        .
      </p>
      <div className="grid gap-3 sm:col-span-2 sm:grid-cols-2">
        <button
          type="submit"
          disabled={state === 'sending'}
          className={cx(
            'rounded-control min-h-12 px-5 font-bold',
            dark ? 'bg-champagne text-night' : 'bg-brand text-ink',
          )}
        >
          {state === 'sending' ? 'Sending…' : kind === 'contact' ? 'Send message' : 'Send enquiry'}
        </button>
        <button
          type="button"
          disabled={state === 'sending'}
          onClick={() => void submit(true)}
          className="bg-whatsapp text-ink rounded-control inline-flex min-h-12 items-center justify-center gap-2 px-5 font-bold"
        >
          <WhatsAppIcon className="size-5" />{' '}
          {kind === 'contact' ? 'Send on WhatsApp' : 'Enquire on WhatsApp'}
        </button>
      </div>
    </form>
  )
}
