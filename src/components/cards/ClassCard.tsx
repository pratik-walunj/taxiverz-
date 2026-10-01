import Link from 'next/link'
import { ArrowRight, Briefcase, Car, MapPinned, Phone, UserRound, Users } from 'lucide-react'
import { business } from '@/config/business'
import { classImages, imageFor, isRepresentativeImage } from '@/config/imagery'
import { Picture } from '@/components/ui/Picture'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { getVehicles, vehiclePath } from '@/lib/content'
import { cx } from '@/lib/cx'
import { formatIndianPhone, telHref } from '@/lib/phone'
import type { VehicleClass } from '@/lib/schemas/content'
import { whatsappHref } from '@/lib/whatsapp'

/** The model page a class card's "View details" opens: its first representative model that is live. */
function detailsFor(c: VehicleClass): string | null {
  const inClass = getVehicles().filter((v) => v.classSlug === c.slug)
  const byModel = c.representativeModels
    .map((m) => inClass.find((v) => v.name.toLowerCase().includes(m.toLowerCase())))
    .find(Boolean)
  const v = byModel ?? inClass[0]
  return v ? vehiclePath(v.slug) : null
}

/**
 * A vehicle class, carrying what the legacy fleet cards carried — type, seats,
 * luggage, what it's for, how to book, the phone number and "View details" —
 * minus the unconfirmed per-km prices (RATE_CARD): the fare is shown online
 * for the actual trip.
 */
export function ClassCard({
  vehicleClass: c,
  headingLevel = 3,
  className,
}: {
  vehicleClass: VehicleClass
  headingLevel?: 2 | 3
  className?: string
}) {
  const Heading = headingLevel === 2 ? 'h2' : 'h3'
  const key = classImages[c.slug]
  const img = key ? imageFor(key) : null
  const group = c.tollClass !== 'car'
  const details = detailsFor(c)
  const specs = [
    c.seats !== null && { icon: Users, label: 'Seats', value: `${c.seats} + driver` },
    c.luggage !== null && { icon: Briefcase, label: 'Luggage', value: `${c.luggage} bags` },
    {
      icon: MapPinned,
      label: 'Trips',
      value: group ? 'Tours & outstation' : 'Local & outstation',
    },
    { icon: UserRound, label: 'Driver', value: 'Included' },
  ].filter((s): s is { icon: typeof Users; label: string; value: string } => Boolean(s))

  return (
    <article
      id={c.slug}
      className={cx(
        'border-line bg-paper rounded-panel group/card relative flex h-full flex-col overflow-hidden border shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl',
        className,
      )}
    >
      <div className="relative">
        {img ? (
          <Picture
            src={img.src}
            alt={img.alt}
            width={img.width}
            height={img.height}
            sizes="(min-width: 1280px) 300px, (min-width: 640px) 45vw, 90vw"
            representative={isRepresentativeImage(img)}
            imgClassName="aspect-[3/2] transition-transform duration-500 group-hover/card:scale-105"
          />
        ) : (
          // No usable picture for this class yet: keep the card the same shape.
          <div
            className="bg-mist text-muted flex aspect-[3/2] items-center justify-center"
            aria-hidden="true"
          >
            <Car className="size-10" />
          </div>
        )}
        <span className="bg-ink/85 text-paper absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-bold tracking-wide uppercase">
          {group ? 'Group travel' : 'Car with driver'}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <Heading className="font-heading text-xl font-extrabold">{c.name}</Heading>
        <p className="text-brand-deep text-sm font-semibold">
          {c.representativeModels.join(', ')} or similar
        </p>
        {c.useCase && <p className="text-muted mt-3">{c.useCase}</p>}

        <dl className="mt-4 grid grid-cols-2 gap-2">
          {specs.map(({ icon: Icon, label, value }) => (
            <div key={label} className="bg-mist rounded-control relative py-2 pr-3 pl-9">
              <dt className="text-muted text-xs">
                <Icon
                  aria-hidden="true"
                  className="text-brand-deep absolute top-1/2 left-3 size-4 -translate-y-1/2"
                />
                {label}
              </dt>
              <dd className="text-sm font-semibold">{value}</dd>
            </div>
          ))}
        </dl>

        <p className="border-line mt-4 flex items-baseline justify-between gap-2 border-t pt-3 text-sm">
          <span className="text-muted">Fare</span>
          <span className="font-semibold">Shown online for your trip</span>
        </p>

        <div className="mt-auto pt-4">
          <Link
            href="/book/"
            className="bg-brand text-ink rounded-control flex min-h-12 items-center justify-center font-bold transition-colors hover:bg-[color-mix(in_srgb,var(--color-brand)_88%,black)]"
          >
            Check fare
            <span className="sr-only"> for the {c.name}</span>
          </Link>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <a
              href={whatsappHref(business.whatsapp, `Hi Taxiverz, I'd like to book a ${c.name}.`)}
              data-placement="class-card"
              aria-label={`Book a ${c.name} on WhatsApp`}
              className="bg-whatsapp text-ink rounded-control flex min-h-11 items-center justify-center gap-1.5 text-sm font-semibold"
            >
              <WhatsAppIcon className="size-4" /> WhatsApp
            </a>
            <a
              href={telHref(business.phone)}
              data-placement="class-card"
              aria-label={`Call ${formatIndianPhone(business.phone)} to book a ${c.name}`}
              className="border-line hover:border-ink/40 rounded-control flex min-h-11 items-center justify-center gap-1.5 border text-sm font-semibold"
            >
              <Phone aria-hidden="true" className="size-4" /> Call
            </a>
          </div>
          {details && (
            <Link
              href={details}
              className="text-brand-deep group/link mt-2 flex min-h-11 items-center justify-center gap-1 font-semibold"
            >
              View details
              <span className="sr-only"> of the {c.name}</span>
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform group-hover/link:translate-x-1"
              />
            </Link>
          )}
        </div>
      </div>
    </article>
  )
}
