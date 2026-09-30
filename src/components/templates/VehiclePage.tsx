import { Phone } from 'lucide-react'
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
import { vehiclePath } from '@/lib/content'
import { isUsableImage } from '@/lib/content/gates'
import type { Vehicle, VehicleClass } from '@/lib/schemas/content'
import { formatIndianPhone, telHref } from '@/lib/phone'
import { whatsappHref } from '@/lib/whatsapp'

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
    { label: 'Type', value: TIER_LABEL[v.tier] },
    v.seats !== null && { label: 'Seats', value: String(v.seats) },
    v.luggage !== null && { label: 'Luggage', value: `${v.luggage} bags` },
    v.ac !== null && { label: 'Air conditioning', value: v.ac ? 'Yes' : 'No' },
    v.selfDrive !== null && {
      label: 'Self-drive',
      value: v.selfDrive ? 'Available' : 'With driver only',
    },
  ].filter((s): s is { label: string; value: string } => Boolean(s))
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

  return (
    <>
      <Section
        register={luxury ? 'luxury' : 'standard'}
        className="pt-6 md:pt-10"
        labelledBy="page-title"
      >
        <Breadcrumbs
          trail={[
            { name: 'Fleet', path: '/fleet/' },
            { name: v.name, path: vehiclePath(v.slug) },
          ]}
        />
        <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:items-start">
          <div>
            <h1 id="page-title" className="text-h1 font-extrabold tracking-tight">
              {v.name} on rent
            </h1>
            {(v.summary || v.useCase) && (
              <p className={luxury ? 'text-night-muted mt-4 text-lg' : 'text-muted mt-4 text-lg'}>
                {v.summary ?? `Good for: ${v.useCase}`}
              </p>
            )}
            <dl className="mt-6 flex flex-wrap gap-3">
              {specs.map((s) => (
                <div
                  key={s.label}
                  className={
                    luxury
                      ? 'rounded-control border-champagne/30 border px-4 py-2'
                      : 'rounded-control bg-mist px-4 py-2'
                  }
                >
                  <dt className="text-sm opacity-75">{s.label}</dt>
                  <dd className="font-semibold">{s.value}</dd>
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
          </div>
          {photos[0] && (
            <Picture
              src={photos[0].src}
              alt={photos[0].alt}
              width={photos[0].width}
              height={photos[0].height}
              sizes="(min-width: 1024px) 50vw, 100vw"
              preload
              representative={photos[0].source !== 'own'}
              imgClassName="rounded-panel"
            />
          )}
        </div>
        {photos.length > 1 && (
          <ul
            className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4"
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
      </Section>

      {v.intro && (
        <Section labelledBy="about-vehicle">
          <h2 id="about-vehicle" className="text-h2 font-bold">
            About the {v.name}
          </h2>
          <Prose text={v.intro} className="mt-4" />
        </Section>
      )}

      <Section register="mist" labelledBy="price-title" className="scroll-mt-20">
        <h2 id="price-title" className="text-h2 scroll-mt-24 font-bold">
          {v.name} price
        </h2>
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
      </Section>

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
