import type { FareQuote } from '@/lib/pricing/types'
import type { Attribution, LeadType, TripInput } from '@/lib/schemas/lead'

/** A lead as stored in the outbox and handed to every sink. */
export interface LeadRecord {
  ref: string
  type: LeadType
  name: string
  phone: string
  email: string | null
  pickupAddress: string | null
  message: string | null
  trip: TripInput | null
  /** Human labels resolved on the server ("Gorakhpur", "Kathmandu"). */
  fromLabel: string | null
  toLabel: string | null
  vehicleLabel: string | null
  /** Server-recomputed quote (never the browser's number). */
  fare: FareQuote | null
  clientTotal: number | null
  whatsappOptIn: boolean
  attribution: Attribution | null
  page: string
  userAgent: string | null
  createdAt: Date
}

/** Where a lead is delivered (email, Telegram, webhook). Throws on failure. */
export interface Sink {
  name: string
  deliver(lead: LeadRecord): Promise<void>
}

export interface DueDelivery {
  lead: LeadRecord
  sink: string
  attempts: number
}

/** The Postgres outbox, behind an interface so the lead service is testable without a database. */
export interface OutboxStore {
  /** Inserts the lead and one pending delivery per sink, in one transaction. Refreshes lastContactAt for the phone. */
  save(lead: LeadRecord, sinks: string[]): Promise<void>
  markSent(ref: string, sink: string, at: Date): Promise<void>
  /** nextAttemptAt null = give up (status failed). */
  markFailed(
    ref: string,
    sink: string,
    error: string,
    attempts: number,
    nextAttemptAt: Date | null,
  ): Promise<void>
  due(now: Date, limit: number): Promise<DueDelivery[]>
  /** Deletes leads (and their deliveries) whose last contact is before `before`. Returns how many. */
  purge(before: Date): Promise<number>
}
