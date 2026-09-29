import { business } from '@/config/business'
import {
  cityPath,
  destinationPath,
  getCities,
  getCity,
  getDestinations,
  getServices,
  servicePath,
} from '@/lib/content'
import { isPublished } from '@/lib/content/published'
import { formatIndianPhone } from '@/lib/phone'
import { absoluteUrl } from '@/lib/seo/metadata'

/**
 * /llms.txt (llmstxt.org): a plain summary of the business and its published
 * pages for AI assistants (REBUILD_PLAN §3.7). Built from data at build time.
 */
export const dynamic = 'force-static'

export function GET() {
  const link = (label: string, path: string, note?: string | null) =>
    `- [${label}](${absoluteUrl(path)})${note ? `: ${note}` : ''}`
  const office = business.branches.find((b) => b.isHeadOffice)!
  const lines = [
    '# Taxiverz',
    '',
    `> Cab and travel company based in Gorakhpur, Uttar Pradesh, with a branch in ${business.branches
      .filter((b) => !b.isHeadOffice)
      .map((b) => `${b.locality}, ${b.city}`)
      .join(
        ' and ',
      )}. Cars with drivers for local, one-way, outstation, airport, group and India–Nepal trips, booked by car class.`,
    '',
    `Head office: ${office.streetAddress}, ${office.city}, ${office.region} ${office.postalCode}. Phone and WhatsApp: ${formatIndianPhone(business.phone)}.`,
    'Fares are shown by car class; trips that cannot be priced automatically are quoted on WhatsApp or by phone.',
    '',
    '## Services',
    ...getServices().map((s) => link(s.name, servicePath(s.slug), s.summary)),
    '',
    '## Cities',
    ...getCities().map((c) => link(`Taxi service in ${c.name}`, cityPath(c.slug), c.summary)),
    '',
    '## Travel guides',
    ...getDestinations().map((d) =>
      link(
        `${getCity(d.place)?.name ?? d.place} travel guide`,
        destinationPath(d.place),
        d.summary,
      ),
    ),
    '',
    '## More',
    ...[
      ['Fleet (car classes)', '/fleet/'],
      ['Check fare and book', '/book/'],
      ['FAQ', '/faq/'],
      ['About', '/about/'],
      ['Contact', '/contact/'],
      ['Privacy policy', '/privacy/'],
    ]
      .filter(([, p]) => isPublished(p!))
      .map(([l, p]) => link(l!, p!)),
    '',
  ]
  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
