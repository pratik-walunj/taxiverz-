import { formatINR } from '@/lib/format'

/**
 * One trip summary, used everywhere a lead is written out as text: the
 * "Book on WhatsApp" message, the WhatsApp fallback, email and Telegram.
 */
export interface TripSummary {
  ref?: string | null
  leadType?: string
  tripType?: string
  from?: string | null
  to?: string | null
  pkg?: string | null
  date?: string
  time?: string
  returnDate?: string
  vehicle?: string | null
  /** Total in rupees, or null when the fare is on request. */
  total?: number | null
  isEstimate?: boolean
  name?: string
  phone?: string
  email?: string
  pickupAddress?: string
  message?: string
}

const TRIP_LABELS: Record<string, string> = {
  'one-way': 'One way',
  'round-trip': 'Round trip',
  local: 'Local (hourly)',
  airport: 'Airport transfer',
}

export function tripSummaryLines(s: TripSummary): string[] {
  const lines: string[] = []
  if (s.ref) lines.push(`Booking ref: ${s.ref}`)
  if (s.tripType) lines.push(`Trip: ${TRIP_LABELS[s.tripType] ?? s.tripType}`)
  if (s.from && s.to) lines.push(`Route: ${s.from} to ${s.to}`)
  else if (s.from) lines.push(`From: ${s.from}`)
  if (s.pkg) {
    const [h, km] = s.pkg.split('-')
    lines.push(`Package: ${h} hours / ${km} km`)
  }
  if (s.date) lines.push(`Date: ${s.date}${s.time ? `, ${s.time}` : ''}`)
  if (s.returnDate) lines.push(`Return: ${s.returnDate}`)
  if (s.vehicle) lines.push(`Car: ${s.vehicle}`)
  if (s.total !== undefined)
    lines.push(
      s.total === null
        ? 'Fare: please quote'
        : `Fare: ${formatINR(s.total)}${s.isEstimate ? ' (estimate shown on the website)' : ''}`,
    )
  if (s.name) lines.push(`Name: ${s.name}`)
  if (s.phone) lines.push(`Phone: ${s.phone}`)
  if (s.email) lines.push(`Email: ${s.email}`)
  if (s.pickupAddress) lines.push(`Pickup address: ${s.pickupAddress}`)
  if (s.message) lines.push(`Note: ${s.message}`)
  return lines
}

/** The WhatsApp message a customer sends us. */
export function whatsappTripMessage(s: TripSummary): string {
  return ['Hi Taxiverz, I would like to book this trip:', '', ...tripSummaryLines(s)].join('\n')
}
