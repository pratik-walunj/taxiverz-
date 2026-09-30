import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { serviceVisual } from '@/config/imagery'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { getServices, servicePath, serviceCityPath } from '@/lib/content'
import { isPublished } from '@/lib/content/published'

/**
 * Published services as picture cards: the photo zooms on hover, the name sits
 * on the photo, the summary below. On a city hub each card links to the
 * service × city page when it exists, else to the service hub.
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
    <Section labelledBy="services-title">
      <SectionHeading id="services-title" eyebrow={eyebrow} title={title} intro={intro} />
      <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => {
          const local = city ? serviceCityPath({ service: s.slug, city }) : null
          const href = local && isPublished(local) ? local : servicePath(s.slug)
          const img = serviceVisual(s.slug)
          return (
            <li key={s.slug}>
              <Link
                href={href}
                className="rounded-panel group bg-paper ring-line hover:ring-brand flex h-full flex-col overflow-hidden shadow-sm ring-1 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="bg-mist relative aspect-[4/3] overflow-hidden">
                  {img && (
                    <Image
                      src={img.src}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                      quality={60}
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  <div className="from-night/85 via-night/20 absolute inset-0 bg-gradient-to-t to-transparent" />
                  <h3 className="font-heading absolute inset-x-4 bottom-3 flex items-end justify-between gap-2 text-xl font-bold text-white">
                    {s.name}
                    <span className="bg-brand text-ink flex size-9 shrink-0 items-center justify-center rounded-full transition-transform group-hover:rotate-45">
                      <ArrowUpRight aria-hidden="true" className="size-5" />
                    </span>
                  </h3>
                  {img?.representative && (
                    <span className="bg-ink/60 absolute top-2 right-2 rounded px-1.5 py-0.5 text-[11px] text-white">
                      Representative image
                    </span>
                  )}
                </div>
                {s.summary && <p className="text-muted p-4 pt-3">{s.summary}</p>}
              </Link>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
