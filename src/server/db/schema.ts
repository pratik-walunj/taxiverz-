import {
  boolean,
  index,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core'

/**
 * The lead outbox (REBUILD_PLAN §3.5). Postgres holds only leads and their
 * delivery attempts; all content stays in typed data files.
 */
export const leads = pgTable(
  'leads',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    /** TVZ-YYMMDD-XXXX; also the idempotency key for sinks and TravelCRM. */
    ref: text('ref').notNull().unique(),
    type: text('type').notNull(),
    name: text('name').notNull(),
    phone: text('phone').notNull(),
    email: text('email'),
    pickupAddress: text('pickup_address'),
    message: text('message'),
    /** Trip as submitted (type, from, to, dates, class). */
    trip: jsonb('trip'),
    /** Server-recomputed quote: status, total, lines, included/excluded, isEstimate. */
    fare: jsonb('fare'),
    clientTotal: integer('client_total'),
    whatsappOptIn: boolean('whatsapp_opt_in').notNull().default(false),
    /** gclid/gbraid/wbraid/utm_*, landing page, referrer — for Google Ads offline conversions. */
    attribution: jsonb('attribution'),
    page: text('page').notNull(),
    userAgent: text('user_agent'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    /** Refreshed whenever the same phone number contacts us again; drives the 24-month retention. */
    lastContactAt: timestamp('last_contact_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index('leads_phone_idx').on(t.phone),
    index('leads_last_contact_idx').on(t.lastContactAt),
  ],
)

export const leadDeliveries = pgTable(
  'lead_deliveries',
  {
    id: serial('id').primaryKey(),
    leadId: uuid('lead_id')
      .notNull()
      .references(() => leads.id, { onDelete: 'cascade' }),
    sink: text('sink').notNull(),
    /** pending | sent | failed (failed = gave up after the last retry) */
    status: text('status').notNull().default('pending'),
    attempts: integer('attempts').notNull().default(0),
    nextAttemptAt: timestamp('next_attempt_at', { withTimezone: true }),
    /** Error text only — never personal data. */
    lastError: text('last_error'),
    deliveredAt: timestamp('delivered_at', { withTimezone: true }),
  },
  (t) => [index('lead_deliveries_due_idx').on(t.status, t.nextAttemptAt)],
)

export type LeadRow = typeof leads.$inferSelect
export type NewLeadRow = typeof leads.$inferInsert
