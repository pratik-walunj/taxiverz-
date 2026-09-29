import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { getServices, servicePath, serviceCityPath } from '@/lib/content'
import { isPublished } from '@/lib/content/published'

/**
 * Published services as cards. On a city hub, each card links to the
 * service × city page when it exists, else to the service hub.
 */
export function ServicesGrid({
  title = 'What we do',
  city,
  exclude,
}: {
  title?: string
  city?: string
  exclude?: string
}) {
  const services = getServices().filter((s) => s.slug !== exclude)
  if (services.length === 0) return null
  return (
    <Section labelledBy="services-title">
      <h2 id="services-title" className="text-h2 font-bold">
        {title}
      </h2>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => {
          const local = city ? serviceCityPath({ service: s.slug, city }) : null
          const href = local && isPublished(local) ? local : servicePath(s.slug)
          return (
            <li key={s.slug}>
              <Link
                href={href}
                className="border-line hover:border-brand rounded-panel group flex h-full flex-col border p-4 transition-colors"
              >
                <h3 className="font-heading flex items-center justify-between gap-2 text-lg font-bold">
                  {s.name}
                  <ArrowRight
                    aria-hidden="true"
                    className="text-brand-deep size-5 transition-transform group-hover:translate-x-0.5"
                  />
                </h3>
                {s.summary && <p className="text-muted mt-1">{s.summary}</p>}
              </Link>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
