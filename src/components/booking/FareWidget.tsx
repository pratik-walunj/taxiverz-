'use client'

import { useRouter } from 'next/navigation'
import { useId, useState, type KeyboardEvent } from 'react'
import { pricing } from '@/config/pricing'
import type { FareIndexPlace } from '@/lib/pricing/fare-index'
import { tripToParams, type TripRequest } from '@/lib/pricing/quote'
import type { TripType } from '@/lib/pricing/types'
import { track } from '@/lib/tracking/track'
import { cx } from '@/lib/cx'
import { PlaceCombobox, type PlaceValue } from './PlaceCombobox'
import { useFareIndex } from './useFareIndex'

const TABS: { type: TripType; label: string }[] = [
  { type: 'one-way', label: 'One way' },
  { type: 'round-trip', label: 'Round trip' },
  { type: 'local', label: 'Local (hourly)' },
  { type: 'airport', label: 'Airport' },
]

const empty: PlaceValue = { id: null, text: '' }
const isAirport = (p: FareIndexPlace) => p.type === 'airport'
const isCity = (p: FareIndexPlace) => p.type === 'city'

/**
 * Step 1 of the booking funnel (REBUILD_PLAN §3.4): trip type, two fields and
 * "Check fare". No date, phone or captcha before the price.
 */
export function FareWidget({
  initial,
  headingLevel = 2,
}: {
  initial?: Partial<TripRequest> & { fromLabel?: string; toLabel?: string }
  headingLevel?: 2 | 3
}) {
  const router = useRouter()
  const tabsId = useId()
  const { index, load } = useFareIndex()
  const [type, setType] = useState<TripType>(initial?.type ?? 'one-way')
  const [from, setFrom] = useState<PlaceValue>(
    initial?.from || initial?.fromText
      ? { id: initial.from ?? null, text: initial.fromLabel ?? initial.fromText ?? '' }
      : empty,
  )
  const [to, setTo] = useState<PlaceValue>(
    initial?.to || initial?.toText
      ? { id: initial.to ?? null, text: initial.toLabel ?? initial.toText ?? '' }
      : empty,
  )
  const [pkg, setPkg] = useState(
    initial?.pkg ?? `${pricing.localPackages[1]?.hours}-${pricing.localPackages[1]?.km}`,
  )
  const [toAirport, setToAirport] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const places = index?.places ?? null
  const Heading = headingLevel === 2 ? 'h2' : 'h3'

  function onTabKey(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    const next = e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowLeft' ? i - 1 : null
    if (next === null) return
    e.preventDefault()
    const tab = TABS[(next + TABS.length) % TABS.length]!
    setType(tab.type)
    document.getElementById(`${tabsId}-${tab.type}`)?.focus()
  }

  function submit() {
    setError(null)
    let trip: TripRequest
    if (type === 'local') {
      if (!from.text.trim()) return setError('Enter the city.')
      trip = {
        type,
        from: from.id,
        fromText: from.id ? undefined : from.text.trim(),
        to: null,
        pkg,
      }
    } else if (type === 'airport') {
      const airport = from
      const area = to
      if (!airport.text.trim() || !area.text.trim())
        return setError('Enter the airport and the area.')
      const [a, b] = toAirport ? [area, airport] : [airport, area]
      trip = {
        type,
        from: a.id,
        fromText: a.id ? undefined : a.text.trim(),
        to: b.id,
        toText: b.id ? undefined : b.text.trim(),
      }
    } else {
      if (!from.text.trim() || !to.text.trim()) return setError('Enter both pickup and drop.')
      trip = {
        type,
        from: from.id,
        fromText: from.id ? undefined : from.text.trim(),
        to: to.id,
        toText: to.id ? undefined : to.text.trim(),
      }
    }
    track('fare_check', {
      trip_type: type,
      from: trip.from ?? 'free-text',
      to: trip.to ?? 'free-text',
    })
    router.push(`/book/?${tripToParams(trip)}`)
  }

  return (
    <section
      aria-labelledby={`${tabsId}-title`}
      className="bg-paper text-ink shadow-lift rounded-panel border-line border p-4 md:p-6"
    >
      <Heading id={`${tabsId}-title`} className="text-h3 font-bold">
        Check your fare
      </Heading>
      <div role="tablist" aria-label="Trip type" className="mt-3 flex flex-wrap gap-1">
        {TABS.map((tab, i) => (
          <button
            key={tab.type}
            id={`${tabsId}-${tab.type}`}
            type="button"
            role="tab"
            aria-selected={type === tab.type}
            aria-controls={`${tabsId}-panel`}
            tabIndex={type === tab.type ? 0 : -1}
            onClick={() => {
              setType(tab.type)
              setError(null)
            }}
            onKeyDown={(e) => onTabKey(e, i)}
            className={cx(
              'rounded-control min-h-12 px-3 font-semibold',
              type === tab.type ? 'bg-ink text-paper' : 'text-ink hover:bg-mist',
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <form
        id={`${tabsId}-panel`}
        role="tabpanel"
        aria-labelledby={`${tabsId}-${type}`}
        noValidate
        onSubmit={(e) => {
          e.preventDefault()
          submit()
        }}
        className="mt-4 grid gap-3 md:grid-cols-[1fr_1fr_auto] md:items-end"
      >
        {type === 'local' ? (
          <>
            <PlaceCombobox
              name="from"
              label="City"
              value={from}
              onChange={setFrom}
              places={places}
              onNeedPlaces={load}
              filter={isCity}
              placeholder="e.g. Gorakhpur"
            />
            <fieldset>
              <legend className="mb-1 block text-sm font-semibold">Package</legend>
              <div className="flex flex-wrap gap-2">
                {pricing.localPackages.map((p) => {
                  const value = `${p.hours}-${p.km}`
                  return (
                    <label
                      key={value}
                      className={cx(
                        'rounded-control flex min-h-12 cursor-pointer items-center border px-3 text-sm font-semibold',
                        pkg === value ? 'border-ink bg-ink text-paper' : 'border-ink/25',
                      )}
                    >
                      <input
                        type="radio"
                        name="pkg"
                        value={value}
                        checked={pkg === value}
                        onChange={() => setPkg(value)}
                        className="sr-only"
                      />
                      {p.hours} h / {p.km} km
                    </label>
                  )
                })}
              </div>
            </fieldset>
          </>
        ) : type === 'airport' ? (
          <>
            <div>
              <PlaceCombobox
                name="from"
                label="Airport"
                value={from}
                onChange={setFrom}
                places={places}
                onNeedPlaces={load}
                filter={isAirport}
                placeholder="e.g. Gorakhpur Airport"
              />
              <fieldset className="mt-2 flex gap-4 text-sm">
                <legend className="sr-only">Direction</legend>
                <label className="flex min-h-12 items-center gap-2">
                  <input
                    type="radio"
                    name="direction"
                    checked={toAirport}
                    onChange={() => setToAirport(true)}
                    className="size-5"
                  />
                  To the airport
                </label>
                <label className="flex min-h-12 items-center gap-2">
                  <input
                    type="radio"
                    name="direction"
                    checked={!toAirport}
                    onChange={() => setToAirport(false)}
                    className="size-5"
                  />
                  From the airport
                </label>
              </fieldset>
            </div>
            <PlaceCombobox
              name="to"
              label={toAirport ? 'Pickup area' : 'Drop area'}
              value={to}
              onChange={setTo}
              places={places}
              onNeedPlaces={load}
              placeholder="Town or area"
            />
          </>
        ) : (
          <>
            <PlaceCombobox
              name="from"
              label="Pickup"
              value={from}
              onChange={setFrom}
              places={places}
              onNeedPlaces={load}
              placeholder="e.g. Gorakhpur"
            />
            <PlaceCombobox
              name="to"
              label="Drop"
              value={to}
              onChange={setTo}
              places={places}
              onNeedPlaces={load}
              placeholder="e.g. Kathmandu"
            />
          </>
        )}
        <button
          type="submit"
          className="bg-brand text-ink rounded-control min-h-12 px-6 text-lg font-bold md:self-end"
        >
          Check fare
        </button>
        <p
          role="alert"
          className={cx('text-brand-deep text-sm font-semibold md:col-span-3', !error && 'sr-only')}
        >
          {error ?? ''}
        </p>
      </form>
    </section>
  )
}
