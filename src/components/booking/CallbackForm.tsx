'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { track } from '@/lib/tracking/track'
import type { TripInput } from '@/lib/schemas/lead'
import { postLead } from './lead-client'
import { PhoneField, toE164, validMobile, type CountryCode } from './PhoneField'

/** "Request a call back" — phone only (REBUILD_PLAN §3.4 step 2, secondary action). */
export function CallbackForm({ trip }: { trip?: TripInput }) {
  const id = useId()
  const startedAt = useRef(0)
  // Stamped after mount (render must stay pure); the server rejects fills under 3 s.
  useEffect(() => {
    startedAt.current = Date.now()
  }, [])
  const [cc, setCc] = useState<CountryCode>('+91')
  const [mobile, setMobile] = useState('')
  const [website, setWebsite] = useState('')
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle')
  const [error, setError] = useState<string | null>(null)

  async function submit() {
    if (!validMobile(cc, mobile)) return setError('Enter a valid mobile number.')
    setError(null)
    setState('sending')
    const res = await postLead({
      type: 'callback',
      trip,
      contact: { name: '', phone: toE164(cc, mobile) },
      consent: { whatsappOptIn: false },
      website,
      startedAt: startedAt.current,
    })
    if (res.ok) {
      track('callback_request', { ref: res.ref })
      setState('sent')
    } else setState('failed')
  }

  if (state === 'sent')
    return (
      <p role="status" className="font-semibold">
        Thanks — we&rsquo;ll call you back on this number.
      </p>
    )

  return (
    <form
      aria-labelledby={`${id}-title`}
      noValidate
      onSubmit={(e) => {
        e.preventDefault()
        void submit()
      }}
      className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end"
    >
      <h2 id={`${id}-title`} className="text-h3 font-bold sm:col-span-2">
        Prefer a call? We&rsquo;ll ring you back
      </h2>
      <PhoneField cc={cc} onCc={setCc} value={mobile} onChange={setMobile} error={error} />
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
      <button
        type="submit"
        disabled={state === 'sending'}
        className="border-ink/30 rounded-control min-h-12 border px-5 font-semibold"
      >
        {state === 'sending' ? 'Sending…' : 'Request a call back'}
      </button>
      {state === 'failed' && (
        <p role="alert" className="text-brand-deep text-sm font-semibold sm:col-span-2">
          That didn&rsquo;t go through. Please call or WhatsApp us instead.
        </p>
      )}
    </form>
  )
}
