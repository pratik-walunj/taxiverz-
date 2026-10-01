import Link from 'next/link'
import {
  ArrowRight,
  Briefcase,
  Car,
  Check,
  KeyRound,
  Phone,
  Snowflake,
  Tag,
  UserRound,
  Users,
  type LucideIcon,
} from 'lucide-react'
import { business } from '@/config/business'
import { FareWidget } from '@/components/booking/FareWidget'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { CtaBand } from '@/components/sections/CtaBand'
import { FaqSection } from '@/components/sections/FaqSection'
import { Prose } from '@/components/ui/Prose'
import { Button } from '@/components/ui/Button'
import { Price } from '@/components/ui/Price'
import { Section } from '@/components/ui/Section'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { Picture } from '@/components/ui/Picture'
import { getServicesForVehicle, getVehicles, servicePath, vehiclePath } from '@/lib/content'
import { VehicleCard } from '@/components/cards/VehicleCard'
import { cx } from '@/lib/cx'
import { inSentence } from '@/lib/sentence'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { isUsableImage } from '@/lib/content/gates'
import type { Vehicle, VehicleClass } from '@/lib/schemas/content'
import { formatIndianPhone, telHref } from '@/lib/phone'
import { whatsappHref } from '@/lib/whatsapp'

interface Spec {
  icon: LucideIcon
  label: string
  value: string
}

const TIER_LABEL: Record<Vehicle['tier'], string> = {
  economy: 'Economy',
  comfort: 'Comfort',
  premium: 'Premium',
  luxury: 'Luxury',
  group: 'Group',
  bike: 'Bikes and scooters',
}

/**
 * Vehicle page (REBUILD_PLAN §4): own photos only (F1), specs, the price
 * table (per-model rates for enquire vehicles, class fares for instant ones),
 * and the widget or the enquiry buttons. Luxury vehicles use the dark register.
 */
export function VehiclePage({
  vehicle: v,
  vehicleClass,
}: {
  vehicle: Vehicle
  vehicleClass: VehicleClass | null
}) {
  const luxury = v.tier === 'luxury'
  const photos = v.images.filter(isUsableImage)
  const specs = [
    { icon: Tag, label: 'Type', value: TIER_LABEL[v.tier] },
    vehicleClass && { icon: Car, label: 'Fare class', value: vehicleClass.name },
    v.seats !== null && { icon: Users, label: 'Seats', value: `${v.seats} + driver` },
    v.luggage !== null && { icon: Briefcase, label: 'Luggage', value: `${v.luggage} bags` },
    v.ac !== null && { icon: Snowflake, label: 'Air conditioning', value: v.ac ? 'Yes' : 'No' },
    {
      icon: v.selfDrive ? KeyRound : UserRound,
      label: 'Driver',
      value: v.selfDrive ? 'Self-drive available' : 'Included',
    },
  ].filter((s): s is Spec => Boolean(s))
  const related = getVehicles()
    .filter(
      (o) =>
        o.slug !== v.slug &&
        (v.classSlug
          ? o.classSlug === v.classSlug
          : o.tier === v.tier && o.category === v.category),
    )
    .slice(0, 3)
  const r = v.rates
  const priceRows = r
    ? [
        r.wedding.price !== null && {
          label: `Wedding${r.wedding.hours ? ` (${r.wedding.hours} hours)` : ''}`,
          amount: r.wedding.price,
        },
        r.corporate.price !== null && {
          label: `Corporate day${r.corporate.hours && r.corporate.km ? ` (${r.corporate.hours} h / ${r.corporate.km} km)` : ''}`,
          amount: r.corporate.price,
        },
        r.outstationPerKm !== null && { label: 'Outstation, per km', amount: r.outstationPerKm },
        ...r.local
          .filter((l) => l.price !== null)
          .map((l) => ({ label: `Local ${l.hours} h / ${l.km} km`, amount: l.price! })),
        r.extraKm !== null && { label: 'Extra km', amount: r.extraKm },
        r.extraHour !== null && { label: 'Extra hour', amount: r.extraHour },
        r.nightCharge !== null && { label: 'Night charge', amount: r.nightCharge },
        r.perDay !== null && { label: 'Per day', amount: r.perDay },
      ].filter((x): x is { label: string; amount: number } => Boolean(x))
    : []
  const message = `Hi Taxiverz, I'd like to enquire about the ${v.name}.`
  const ways = getServicesForVehicle(v)

  return (
    <>
      <section
        aria-labelledby="page-title"
        className={cx(
          'relative isolate overflow-hidden',
          luxury ? 'bg-night text-ivory' : 'from-mist via-paper to-paper bg-gradient-to-br',
        )}
      >
        {/* Soft colour behind the photo. */}
        <div
          aria-hidden="true"
          className={cx(
            'absolute -top-24 -right-24 -z-10 size-[28rem] rounded-full blur-3xl',
            luxury ? 'bg-champagne/15' : 'bg-brand/15',
          )}
        />
        <div className="max-w-site mx-auto px-4 pt-6 pb-12 md:px-6 md:pt-10 md:pb-16">
          <Breadcrumbs
            trail={[
              { name: 'Fleet', path: '/fleet/' },
              { name: v.name, path: vehiclePath(v.slug) },
            ]}
          />
          <div className="mt-6 grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-center">
            <div>
              <p className="flex flex-wrap gap-2">
                <span
                  className={cx(
                    'rounded-full px-3 py-1 text-xs font-bold tracking-wide uppercase',
                    luxury ? 'bg-champagne text-night' : 'bg-brand text-ink',
                  )}
                >
                  {TIER_LABEL[v.tier]}
                </span>
                <span
                  className={cx(
                    'rounded-full border px-3 py-1 text-xs font-bold tracking-wide uppercase',
                    luxury ? 'border-ivory/30' : 'border-ink/15',
                  )}
                >
                  {v.bookingMode === 'instant' ? 'Fare online' : 'Book by enquiry'}
                </span>
              </p>
              <h1
                id="page-title"
                className="text-display mt-4 font-extrabold tracking-tight text-balance"
              >
                {v.name}{' '}
                <span className={luxury ? 'text-champagne' : 'text-brand-deep'}>on rent</span>
              </h1>
              {(v.summary || v.useCase) && (
                <p className={cx('mt-4 text-lg', luxury ? 'text-night-muted' : 'text-muted')}>
                  {v.summary ?? `Good for: ${v.useCase}`}
                </p>
              )}
              <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {specs.map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className={cx(
                      'rounded-panel relative flex min-h-16 flex-col justify-center py-3 pr-3 pl-16',
                      luxury ? 'border-ivory/15 border bg-white/5' : 'bg-paper shadow-sm',
                    )}
                  >
                    <dt className={cx('text-xs', luxury ? 'text-night-muted' : 'text-muted')}>
                      <span
                        aria-hidden="true"
                        className={cx(
                          'rounded-control absolute top-1/2 left-3 flex size-10 -translate-y-1/2 items-center justify-center',
                          luxury ? 'bg-champagne/15 text-champagne' : 'bg-brand/15 text-brand-deep',
                        )}
                      >
                        <Icon className="size-5" />
                      </span>
                      {label}
                    </dt>
                    <dd className="font-semibold">{value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button href="#price-title" size="lg" variant={luxury ? 'luxury' : 'primary'}>
                  {v.bookingMode === 'instant' ? 'Check the fare' : 'See the price'}
                </Button>
                <Button
                  href={whatsappHref(business.whatsapp, message)}
                  variant="whatsapp"
                  size="lg"
                  data-placement="vehicle-hero"
                >
                  <WhatsAppIcon className="size-5" /> Enquire on WhatsApp
                </Button>
              </div>
              <p className={cx('mt-4 text-sm', luxury ? 'text-night-muted' : 'text-muted')}>
                No payment to book · booking reference straight away · or call{' '}
                <a href={telHref(business.phone)} className="tabular font-semibold underline">
                  {formatIndianPhone(business.phone)}
                </a>
              </p>
            </div>
            {photos[0] && (
              <div
                className={cx(
                  'rounded-panel overflow-hidden p-2 shadow-2xl',
                  luxury ? 'ring-champagne/30 bg-white/5 ring-1' : 'bg-paper shadow-black/10',
                )}
              >
                <Picture
                  src={photos[0].src}
                  alt={photos[0].alt}
                  width={photos[0].width}
                  height={photos[0].height}
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  preload
                  representative={photos[0].source !== 'own'}
                  imgClassName="rounded-control"
                />
              </div>
            )}
          </div>
          {photos.length > 1 && (
            <ul
              className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4"
              aria-label={`More photos of the ${v.name}`}
            >
              {photos.slice(1).map((p) => (
                <li key={p.src}>
                  <Picture
                    src={p.src}
                    alt={p.alt}
                    width={p.width}
                    height={p.height}
                    sizes="(min-width: 640px) 25vw, 50vw"
                    representative={p.source !== 'own'}
                    imgClassName="rounded-panel"
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {v.intro && (
        <Section labelledBy="about-vehicle">
          <div className="grid gap-10 lg:grid-cols-[1fr_22rem] lg:items-start">
            <div>
              <SectionHeading id="about-vehicle" eyebrow="The car" title={`About the ${v.name}`} />
              <Prose text={v.intro} className="mt-6 text-lg" />
            </div>
            <aside
              aria-label={`${v.name} at a glance`}
              className="border-line bg-paper rounded-panel border p-6 shadow-lg lg:sticky lg:top-24"
            >
              <p className="font-heading text-lg font-bold">{v.name} at a glance</p>
              <ul className="mt-4 space-y-3">
                {specs.map(({ icon: Icon, label, value }) => (
                  <li key={label} className="flex items-center gap-3">
                    <Icon aria-hidden="true" className="text-brand-deep size-5 shrink-0" />
                    <span className="text-muted">{label}</span>
                    <span className="ml-auto text-right font-semibold">{value}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 grid gap-2">
                <Button href="#price-title" variant="primary">
                  {v.bookingMode === 'instant' ? 'Check the fare' : 'See the price'}
                </Button>
                <Button
                  href={whatsappHref(business.whatsapp, message)}
                  variant="whatsapp"
                  data-placement="vehicle-glance"
                >
                  <WhatsAppIcon className="size-5" /> WhatsApp
                </Button>
                <Button
                  href={telHref(business.phone)}
                  variant="secondary"
                  data-placement="vehicle-glance"
                >
                  <Phone aria-hidden="true" className="size-5" />
                  <span className="tabular">Call {formatIndianPhone(business.phone)}</span>
                </Button>
              </div>
            </aside>
          </div>
        </Section>
      )}

      {v.highlights.length > 0 && (
        <Section register={luxury ? 'luxury' : 'mist'} labelledBy="why-vehicle">
          <SectionHeading
            id="why-vehicle"
            eyebrow="Why this one"
            title={`Why choose the ${v.name}`}
            dark={luxury}
          />
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {v.highlights.map((h) => (
              <li
                key={h.title}
                className={cx(
                  'rounded-panel border-t-4 p-6 transition duration-300 hover:-translate-y-1',
                  luxury
                    ? 'border-champagne bg-white/5'
                    : 'border-brand bg-paper shadow-sm hover:shadow-lg',
                )}
              >
                <Check
                  aria-hidden="true"
                  className={cx('size-6', luxury ? 'text-champagne' : 'text-brand-deep')}
                />
                <h3 className="font-heading mt-3 text-lg font-bold">{h.title}</h3>
                <p className={cx('mt-1', luxury ? 'text-night-muted' : 'text-muted')}>{h.text}</p>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {ways.length > 0 && (
        <Section labelledBy="hire-vehicle">
          <SectionHeading
            id="hire-vehicle"
            eyebrow="Rental options"
            title={`Ways to hire the ${v.name}`}
          />
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ways.map((s) => (
              <li key={s.slug}>
                <Link
                  href={servicePath(s.slug)}
                  className="group border-line hover:border-brand rounded-panel flex h-full flex-col border p-5 transition-colors"
                >
                  <span className="font-heading text-lg font-bold">{s.name}</span>
                  {s.summary && <span className="text-muted mt-1 line-clamp-3">{s.summary}</span>}
                  <span className="text-brand-deep mt-auto inline-flex items-center gap-1 pt-3 font-semibold">
                    See {inSentence(s.name)}
                    <ArrowRight
                      aria-hidden="true"
                      className="size-4 transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section register="mist" labelledBy="price-title" className="scroll-mt-20">
        <div className="bg-paper rounded-panel border-line border p-6 shadow-sm md:p-10">
          <SectionHeading id="price-title" eyebrow="Price and booking" title={`${v.name} price`} />
          {priceRows.length > 0 ? (
            <table className="mt-4 w-full max-w-xl text-left">
              <tbody>
                {priceRows.map((p) => (
                  <tr key={p.label} className="border-line border-b">
                    <th scope="row" className="py-3 pr-4 font-normal">
                      {p.label}
                    </th>
                    <td className="py-3 text-right">
                      <Price amount={p.amount} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="mt-4">
              <Price amount={null} className="text-lg" /> — tell us the date and the trip and
              we&rsquo;ll quote you.
            </p>
          )}
          {v.bookingMode === 'instant' && vehicleClass ? (
            <div className="mt-6 max-w-xl">
              <FareWidget headingLevel={3} />
              <p className="text-muted mt-2 text-sm">
                Fares are by class: the {v.name} is in the {vehicleClass.name} class.
              </p>
            </div>
          ) : (
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button
                href={whatsappHref(business.whatsapp, message)}
                variant="whatsapp"
                size="lg"
                data-placement="vehicle-enquire"
              >
                <WhatsAppIcon className="size-5" /> Enquire on WhatsApp
              </Button>
              <Button
                href={telHref(business.phone)}
                variant="secondary"
                size="lg"
                data-placement="vehicle-enquire"
              >
                <Phone aria-hidden="true" className="size-5" />
                <span className="tabular">Call {formatIndianPhone(business.phone)}</span>
              </Button>
            </div>
          )}
        </div>
      </Section>

      {related.length > 0 && (
        <Section labelledBy="related-vehicles">
          <SectionHeading
            id="related-vehicles"
            eyebrow="Compare"
            title={vehicleClass ? `More cars in the ${vehicleClass.name} class` : 'More like this'}
            action={{ label: 'Whole fleet', href: '/fleet/' }}
          />
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((o) => (
              <li key={o.slug}>
                <VehicleCard vehicle={o} />
              </li>
            ))}
          </ul>
        </Section>
      )}

      <FaqSection faqs={v.faqs} title={`${v.name}: questions`} />
      <CtaBand
        title={`Book the ${v.name}`}
        text="Send the date and the trip on WhatsApp, or call us."
        whatsappMessage={message}
        placement="vehicle-cta"
        register={luxury ? 'luxury' : 'mist'}
      />
    </>
  )
}
