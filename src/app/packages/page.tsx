import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { Price } from '@/components/ui/Price'
import { Section } from '@/components/ui/Section'
import { getPackages, packagePath } from '@/lib/content'
import { isPublished } from '@/lib/content/published'
import { buildMetadata, buildTitle } from '@/lib/seo/metadata'

/** `/packages/` — published only once a package passes its gate (verified price). */
export const metadata = buildMetadata({
  title: buildTitle(['Tour Packages', 'India & Nepal']),
  description:
    'Tour packages from Taxiverz across India and Nepal, with the itinerary, what is included and the price. Enquire online, on WhatsApp or by phone.',
  path: '/packages/',
})

export default function PackagesHub() {
  if (!isPublished('/packages/')) notFound()
  return (
    <Section className="pt-6 md:pt-10" labelledBy="page-title">
      <Breadcrumbs trail={[{ name: 'Packages', path: '/packages/' }]} />
      <h1 id="page-title" className="text-h1 mt-6 font-extrabold tracking-tight">
        Tour packages
      </h1>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {getPackages().map((p) => (
          <li key={p.slug}>
            <Link
              href={packagePath(p.slug)}
              className="border-line hover:border-brand rounded-panel block h-full border p-4"
            >
              <h2 className="font-heading text-lg font-bold">{p.name}</h2>
              {p.summary && <p className="text-muted mt-1">{p.summary}</p>}
              <p className="mt-3">
                <Price amount={p.price.verified ? p.price.amount : null} />
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  )
}
