import { ServiceCard } from '@/components/cards/ServiceCard'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { getServices, servicePath, serviceCityPath } from '@/lib/content'
import { isPublished } from '@/lib/content/published'

/**
 * Published services as fleet-style cards (ServiceCard). On a city hub each
 * card links to the service × city page when it exists, else to the service hub.
 */
export function ServicesGrid({
  title = 'What we do',
  eyebrow = 'Our services',
  intro,
  city,
  exclude,
}: {
  title?: string
  eyebrow?: string
  intro?: string
  city?: string
  exclude?: string
}) {
  const services = getServices().filter((s) => s.slug !== exclude)
  if (services.length === 0) return null
  return (
    <Section labelledBy="services-title" className="cv-auto">
      <SectionHeading id="services-title" eyebrow={eyebrow} title={title} intro={intro} />
      <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {services.map((s) => {
          const local = city ? serviceCityPath({ service: s.slug, city }) : null
          const href = local && isPublished(local) ? local : servicePath(s.slug)
          return (
            <li key={s.slug}>
              <ServiceCard service={s} href={href} />
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
