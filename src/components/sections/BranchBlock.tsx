import { MapPin, Phone } from 'lucide-react'
import { business } from '@/config/business'
import { Button } from '@/components/ui/Button'
import { Section } from '@/components/ui/Section'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import type { Branch } from '@/lib/schemas/business'
import { formatIndianPhone, telHref } from '@/lib/phone'
import { whatsappHref } from '@/lib/whatsapp'

/**
 * A branch office: address and contact. Hours show only once confirmed (C7).
 * No embedded map — a plain link to Google Maps costs nothing to load.
 */
export function BranchBlock({ branch }: { branch: Branch }) {
  const lines = [
    branch.streetAddress,
    branch.locality === branch.city ? null : branch.locality,
    `${branch.city}, ${branch.region} ${branch.postalCode}`,
  ].filter(Boolean)
  const mapsHref =
    branch.mapsUrl ??
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Taxiverz, ${lines.join(', ')}`)}`
  return (
    <Section register="mist" labelledBy={`branch-${branch.id}`}>
      <h2 id={`branch-${branch.id}`} className="text-h2 font-bold">
        {branch.label}
      </h2>
      <address className="mt-4 text-lg not-italic">
        {lines.map((l) => (
          <span key={l} className="block">
            {l}
          </span>
        ))}
      </address>
      {branch.hours && <p className="mt-2">Open: {branch.hours}</p>}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button href={telHref(business.phone)} data-placement={`branch-${branch.id}`}>
          <Phone aria-hidden="true" className="size-5" />
          <span className="tabular">Call {formatIndianPhone(business.phone)}</span>
        </Button>
        <Button
          href={whatsappHref(business.whatsapp)}
          variant="whatsapp"
          data-placement={`branch-${branch.id}`}
        >
          <WhatsAppIcon className="size-5" /> WhatsApp
        </Button>
        <Button href={mapsHref} variant="secondary">
          <MapPin aria-hidden="true" className="size-5" /> Open in Google Maps
        </Button>
      </div>
    </Section>
  )
}
