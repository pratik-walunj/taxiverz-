import Link from 'next/link'
import { JsonLd } from '@/components/seo/JsonLd'
import { isPublished } from '@/lib/content/published'
import { breadcrumbJsonLd, type Crumb } from '@/lib/seo/jsonld'

/**
 * Breadcrumbs for every page except home. Unpublished intermediate levels
 * (e.g. a city hub that doesn't pass its gate yet) are skipped.
 */
export function Breadcrumbs({ trail }: { trail: readonly Crumb[] }) {
  const last = trail[trail.length - 1]
  const crumbs = [
    { name: 'Home', path: '/' },
    ...trail.slice(0, -1).filter((c) => isPublished(c.path)),
    ...(last ? [last] : []),
  ]
  return (
    <>
      <nav aria-label="Breadcrumb" className="text-sm">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {crumbs.map((c, i) => {
            const isLast = i === crumbs.length - 1
            return (
              <li key={c.path} className="flex items-center gap-2">
                {isLast ? (
                  <span aria-current="page" className="font-semibold">
                    {c.name}
                  </span>
                ) : (
                  <>
                    <Link href={c.path} className="opacity-75 hover:underline hover:opacity-100">
                      {c.name}
                    </Link>
                    <span aria-hidden="true">/</span>
                  </>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  )
}
