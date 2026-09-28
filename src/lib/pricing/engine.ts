import type { PricingConfig } from '@/config/pricing'
import type { Vehicle } from '@/lib/schemas/content'
import type { FareInput, FareLine, FareQuote, RouteCosts } from './types'

/**
 * The fare engine (REBUILD_PLAN §3.3). Pure: the same code prices route fare
 * tables at build time, the widget in the browser, and the server recompute
 * when a lead arrives. Every rule comes from config and data — no numbers here.
 * A missing input never becomes a guess: the quote is "on request" with a reason.
 */

class MissingInput extends Error {}

function need<T>(value: T | null | undefined, what: string): T {
  if (value === null || value === undefined) throw new MissingInput(what)
  return value
}

const rupees = (n: number) => Math.round(n)

export function roundUp(amount: number, to: number): number {
  return to > 1 ? Math.ceil(amount / to) * to : Math.round(amount)
}

function toMinutes(hhmm: string): number {
  const m = /^(\d{1,2}):(\d{2})$/.exec(hhmm)
  if (!m) throw new Error(`Bad time "${hhmm}"`)
  return Number(m[1]) * 60 + Number(m[2])
}

/** Whether a pickup time falls inside the night window (which may cross midnight). */
export function isNightTime(time: string, window: { start: string; end: string }): boolean {
  const t = toMinutes(time)
  const start = toMinutes(window.start)
  const end = toMinutes(window.end)
  return start <= end ? t >= start && t < end : t >= start || t < end
}

/**
 * What a priced fare includes, built only from facts the rate card states.
 * On-request quotes carry no lists: an unknown policy is never shown as a promise.
 */
function policyLists(config: PricingConfig, route: RouteCosts) {
  const included = ['Driver']
  const excluded: string[] = []
  if (config.parkingIncluded === true) included.push('Parking')
  if (config.parkingIncluded === false) excluded.push('Parking')
  if (config.tollsIncluded === true) included.push('Tolls')
  if (config.tollsIncluded === false) excluded.push('Tolls (paid on the way)')
  if (route.isInternational) included.push('Nepal permits and border charges')
  if (config.gstIncluded !== null) included.push('GST')
  return { included, excluded }
}

function onRequest(input: FareInput, reason: string, assumptions: string[] = []): FareQuote {
  return { status: 'on-request', reason, included: [], excluded: [], assumptions, isEstimate: true }
}

function tollAmount(input: FareInput, trips: number): FareLine[] {
  const { config, route, tollClass } = input
  if (need(config.tollsIncluded, 'toll policy') === false) return []
  const toll = need(route.tolls?.[tollClass], 'toll amount for this route')
  return toll > 0
    ? [{ label: trips > 1 ? `Tolls (both ways)` : 'Tolls', amount: rupees(toll * trips) }]
    : []
}

function borderLines(route: RouteCosts): FareLine[] {
  if (!route.isInternational) return []
  const permits = need(route.permitCharges, 'Nepal permit charges')
  const border = need(route.borderCharges, 'border charges')
  return [
    ...(permits > 0 ? [{ label: 'Nepal permits', amount: rupees(permits) }] : []),
    ...(border > 0 ? [{ label: 'Border charges', amount: rupees(border) }] : []),
  ]
}

function nightLines(input: FareInput, assumptions: string[]): FareLine[] {
  const window = input.config.nightWindow
  if (input.pickupTime === undefined) {
    if (window)
      assumptions.push(
        `A night charge is added if pickup is between ${window.start} and ${window.end}.`,
      )
    return []
  }
  const w = need(window, 'night-charge hours')
  if (!isNightTime(input.pickupTime, w)) return []
  return [{ label: 'Night charge', amount: rupees(need(input.rates.nightCharge, 'night charge')) }]
}

function oneWayLines(input: FareInput, assumptions: string[], minKmOverride?: number): FareLine[] {
  const d = need(input.route.distanceKm, 'verified distance for this route')
  const perKm = need(input.rates.oneWayPerKm, 'one-way rate')
  const minKm = Math.max(input.rates.oneWayMinKm ?? 0, minKmOverride ?? 0)
  const km = Math.max(d, minKm)
  if (km > d) assumptions.push(`Charged for a minimum of ${km} km.`)
  return [
    { label: `${km} km × ₹${perKm}/km`, amount: rupees(km * perKm) },
    {
      label: 'Driver allowance',
      amount: rupees(need(input.rates.driverAllowancePerDay, 'driver allowance')),
    },
    ...nightLines(input, assumptions),
    ...tollAmount(input, 1),
    ...borderLines(input.route),
  ]
}

function roundTripLines(input: FareInput, assumptions: string[]): FareLine[] {
  const { rates, config, route } = input
  const d = need(route.distanceKm, 'verified distance for this route')
  const perKm = need(rates.roundTripPerKm, 'round-trip rate')
  const minPerDay = need(rates.minKmPerDay, 'minimum km per day')
  const allowance = need(rates.driverAllowancePerDay, 'driver allowance')
  const shortest = Math.max(
    1,
    Math.ceil((2 * d) / need(config.maxDrivingKmPerDay, 'maximum driving km per day')),
  )
  const days = Math.max(1, Math.round(input.days ?? shortest))
  if (input.days === undefined)
    assumptions.push(`For a ${days}-day round trip; the fare updates when you pick dates.`)
  const nights = Math.max(0, Math.round(input.nights ?? days - 1))
  const km = Math.max(2 * d, days * minPerDay)
  if (km > 2 * d) assumptions.push(`Charged for a minimum of ${minPerDay} km a day.`)
  const lines: FareLine[] = [
    { label: `${km} km × ₹${perKm}/km`, amount: rupees(km * perKm) },
    {
      label: `Driver allowance × ${days} ${days === 1 ? 'day' : 'days'}`,
      amount: rupees(allowance * days),
    },
  ]
  if (nights > 0) {
    const night = need(rates.nightCharge, 'night charge')
    lines.push({ label: `Night charge × ${nights}`, amount: rupees(night * nights) })
  }
  return [...lines, ...tollAmount(input, 2), ...borderLines(route)]
}

function localLines(input: FareInput, assumptions: string[]): FareLine[] {
  const pkg = need(input.localPackage, 'local package')
  const match = input.rates.local.find((p) => p.hours === pkg.hours && p.km === pkg.km)
  const price = need(match?.price, `price for the ${pkg.hours} h / ${pkg.km} km package`)
  if (input.rates.extraKm !== null) assumptions.push(`Extra km: ₹${input.rates.extraKm}/km.`)
  if (input.rates.extraHour !== null)
    assumptions.push(`Extra hour: ₹${input.rates.extraHour}/hour.`)
  return [{ label: `${pkg.hours} hours / ${pkg.km} km`, amount: rupees(price) }]
}

function airportLines(input: FareInput, assumptions: string[]): FareLine[] {
  const fixed = input.config.airport.fixedFares?.[input.classSlug]
  if (fixed !== undefined) {
    return [
      { label: 'Airport transfer (fixed fare)', amount: rupees(fixed) },
      ...nightLines(input, assumptions),
    ]
  }
  return oneWayLines(
    input,
    assumptions,
    need(input.config.airport.minKm, 'airport minimum distance'),
  )
}

export function computeFare(input: FareInput): FareQuote {
  const assumptions: string[] = []
  try {
    const lines =
      input.tripType === 'one-way'
        ? oneWayLines(input, assumptions)
        : input.tripType === 'round-trip'
          ? roundTripLines(input, assumptions)
          : input.tripType === 'local'
            ? localLines(input, assumptions)
            : airportLines(input, assumptions)

    const gstIncluded = need(input.config.gstIncluded, 'GST policy')
    const gstRate = need(input.config.gstRatePercent, 'GST rate')
    const subtotal = lines.reduce((sum, l) => sum + l.amount, 0)
    if (!gstIncluded && gstRate > 0)
      lines.push({ label: `GST ${gstRate}%`, amount: rupees((subtotal * gstRate) / 100) })

    const raw = lines.reduce((sum, l) => sum + l.amount, 0)
    const total = roundUp(raw, input.config.roundTo)
    const { included, excluded } = policyLists(input.config, input.route)
    return {
      status: 'priced',
      total,
      lines,
      included,
      excluded,
      assumptions,
      isEstimate: input.config.status !== 'verified',
    }
  } catch (err) {
    if (err instanceof MissingInput) return onRequest(input, `missing ${err.message}`, assumptions)
    throw err
  }
}

/** Enquire-mode vehicles show a "from" price only when a verified package price exists. */
export function enquireFromPrice(
  vehicle: Pick<Vehicle, 'rates'>,
  config: PricingConfig,
): number | null {
  if (config.status !== 'verified' || !vehicle.rates) return null
  const candidates = [
    vehicle.rates.wedding.price,
    vehicle.rates.corporate.price,
    vehicle.rates.perDay,
  ].filter((p): p is number => p !== null)
  return candidates.length ? Math.min(...candidates) : null
}
