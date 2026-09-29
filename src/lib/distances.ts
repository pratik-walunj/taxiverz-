/**
 * Route distances pipeline (REBUILD_PLAN §7 "Before 4B"). Pure helpers for
 * scripts/fetch-distances.ts: build the Google Routes API request, read its
 * answer, and round-trip docs/route-distances.csv without losing the owner's
 * review columns. Only rows the owner marks `reviewed = yes` ever reach the
 * site, through src/data/route-distances.generated.ts.
 */

export const CSV_COLUMNS = [
  'slug',
  'origin',
  'destination',
  'legacy_km',
  'google_km',
  'diff_km',
  'legacy_time',
  'google_time',
  'border_used',
  'owner_km',
  'owner_time_mins',
  'reviewed',
  'notes',
] as const
export type CsvRow = Record<(typeof CSV_COLUMNS)[number], string>

/** Columns the owner fills in; a re-fetch never overwrites them. */
const OWNER_COLUMNS = ['owner_km', 'owner_time_mins', 'reviewed', 'notes'] as const

export interface Waypoint {
  address: string
}

export function routesRequest(origin: Waypoint, destination: Waypoint, via: Waypoint | null) {
  return {
    origin: { address: origin.address },
    destination: { address: destination.address },
    ...(via ? { intermediates: [{ address: via.address }] } : {}),
    travelMode: 'DRIVE',
    routingPreference: 'TRAFFIC_UNAWARE',
    units: 'METRIC',
  }
}

/** Reads `{ routes: [{ distanceMeters, duration: "12345s" }] }`. */
export function parseRoutesResponse(json: unknown): { km: number; mins: number } | null {
  const first = (json as { routes?: { distanceMeters?: number; duration?: string }[] })?.routes?.[0]
  if (!first?.distanceMeters || !first.duration) return null
  const secs = Number(first.duration.replace(/s$/, ''))
  if (!Number.isFinite(secs)) return null
  return { km: Math.round(first.distanceMeters / 1000), mins: Math.round(secs / 60) }
}

export function formatMins(mins: number): string {
  return `${Math.floor(mins / 60)}h ${String(mins % 60).padStart(2, '0')}m`
}

// ---------------------------------------------------------------- CSV (RFC 4180 subset)

function escape(value: string): string {
  return /[",\n\r]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value
}

export function toCsv(rows: readonly CsvRow[]): string {
  const lines = [
    CSV_COLUMNS.join(','),
    ...rows.map((r) => CSV_COLUMNS.map((c) => escape(r[c])).join(',')),
  ]
  return `${lines.join('\n')}\n`
}

export function parseCsv(text: string): CsvRow[] {
  const records: string[][] = []
  let field = ''
  let record: string[] = []
  let quoted = false
  for (let i = 0; i < text.length; i++) {
    const ch = text[i]!
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') {
        field += '"'
        i++
      } else if (ch === '"') quoted = false
      else field += ch
    } else if (ch === '"') quoted = true
    else if (ch === ',') {
      record.push(field)
      field = ''
    } else if (ch === '\n' || ch === '\r') {
      if (ch === '\r' && text[i + 1] === '\n') i++
      record.push(field)
      records.push(record)
      record = []
      field = ''
    } else field += ch
  }
  if (field || record.length) {
    record.push(field)
    records.push(record)
  }
  const [header, ...body] = records.filter((r) => r.some((f) => f.trim() !== ''))
  if (!header) return []
  return body.map((values) => {
    const row = Object.fromEntries(CSV_COLUMNS.map((c) => [c, ''])) as CsvRow
    header.forEach((name, i) => {
      if ((CSV_COLUMNS as readonly string[]).includes(name))
        row[name as keyof CsvRow] = values[i] ?? ''
    })
    return row
  })
}

/** New fetched rows, keeping the owner's columns from the previous CSV (matched by slug). */
export function mergeRows(fetched: readonly CsvRow[], previous: readonly CsvRow[]): CsvRow[] {
  const bySlug = new Map(previous.map((r) => [r.slug, r]))
  return fetched.map((row) => {
    const old = bySlug.get(row.slug)
    if (!old) return row
    const kept = Object.fromEntries(OWNER_COLUMNS.map((c) => [c, old[c]]))
    // If Google's number changed since the owner reviewed it, the review no longer applies.
    const changed = old.google_km !== '' && old.google_km !== row.google_km && old.owner_km === ''
    return { ...row, ...kept, ...(changed ? { reviewed: '' } : {}) }
  })
}

export interface VerifiedDistance {
  distanceKm: number
  durationMins: number | null
}

/** Rows marked reviewed → verified distances. The owner's own km/time win over Google's. */
export function verifiedDistances(rows: readonly CsvRow[]): Record<string, VerifiedDistance> {
  const out: Record<string, VerifiedDistance> = {}
  for (const r of rows) {
    if (!/^(yes|y|true)$/i.test(r.reviewed.trim())) continue
    const km = Number(r.owner_km || r.google_km)
    if (!Number.isFinite(km) || km <= 0) continue
    const googleMins = /^(\d+)h (\d+)m$/.exec(r.google_time)
    const mins = r.owner_time_mins
      ? Number(r.owner_time_mins)
      : googleMins
        ? Number(googleMins[1]) * 60 + Number(googleMins[2])
        : null
    out[r.slug] = {
      distanceKm: Math.round(km),
      durationMins: mins !== null && Number.isFinite(mins) && mins > 0 ? mins : null,
    }
  }
  return out
}
