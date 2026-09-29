import { describe, expect, it } from 'vitest'
import {
  CSV_COLUMNS,
  mergeRows,
  parseCsv,
  parseRoutesResponse,
  routesRequest,
  toCsv,
  verifiedDistances,
  type CsvRow,
} from '@/lib/distances'

const row = (over: Partial<CsvRow>): CsvRow => ({
  ...(Object.fromEntries(CSV_COLUMNS.map((c) => [c, ''])) as CsvRow),
  slug: 'gorakhpur-to-ayodhya',
  origin: 'gorakhpur',
  destination: 'ayodhya',
  ...over,
})

describe('Routes API', () => {
  it('routes Nepal trips through the border waypoint', () => {
    const req = routesRequest(
      { address: 'Gorakhpur' },
      { address: 'Kathmandu' },
      { address: 'Sonauli' },
    )
    expect(req.intermediates).toEqual([{ address: 'Sonauli' }])
    expect(routesRequest({ address: 'A' }, { address: 'B' }, null)).not.toHaveProperty(
      'intermediates',
    )
  })

  it('reads distance and time', () => {
    expect(
      parseRoutesResponse({ routes: [{ distanceMeters: 134_600, duration: '12000s' }] }),
    ).toEqual({ km: 135, mins: 200 })
    expect(parseRoutesResponse({ routes: [] })).toBeNull()
    expect(parseRoutesResponse({})).toBeNull()
  })
})

describe('CSV', () => {
  it('round-trips, including commas, quotes and line breaks', () => {
    const rows = [row({ notes: 'Via Basti, "NH 27"\nfog in winter', google_km: '135' })]
    expect(parseCsv(toCsv(rows))).toEqual(rows)
  })

  it('keeps the owner’s columns on a re-fetch', () => {
    const old = row({ google_km: '135', owner_km: '140', reviewed: 'yes', notes: 'checked' })
    const [merged] = mergeRows([row({ google_km: '136' })], [old])
    expect(merged).toMatchObject({
      google_km: '136',
      owner_km: '140',
      reviewed: 'yes',
      notes: 'checked',
    })
  })

  it('clears the review when Google’s distance changed and the owner gave no own number', () => {
    const old = row({ google_km: '135', reviewed: 'yes' })
    expect(mergeRows([row({ google_km: '150' })], [old])[0]!.reviewed).toBe('')
  })
})

describe('verified distances', () => {
  it('takes only reviewed rows, owner numbers first', () => {
    const out = verifiedDistances([
      row({ slug: 'a', google_km: '135', google_time: '3h 20m', reviewed: 'yes' }),
      row({ slug: 'b', google_km: '200', owner_km: '210', owner_time_mins: '300', reviewed: 'Y' }),
      row({ slug: 'c', google_km: '90' }),
      row({ slug: 'd', reviewed: 'yes' }),
    ])
    expect(out).toEqual({
      a: { distanceKm: 135, durationMins: 200 },
      b: { distanceKm: 210, durationMins: 300 },
    })
  })
})
