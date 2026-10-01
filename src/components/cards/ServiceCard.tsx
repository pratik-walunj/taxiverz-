import Image from 'next/image'
import { CircleDollarSign, ClipboardList, KeyRound, UserRound } from 'lucide-react'
import { REPRESENTATIVE_LABEL, serviceVisual } from '@/config/imagery'
import type { Service } from '@/lib/schemas/content'
import {
  CardActions,
  CardBadge,
  CardFareLine,
  CardFrame,
  CardSpecs,
  type CardSpec,
} from './CardParts'

const SUBTITLE: Record<Service['sells'], string> = {
  'fare-widget': 'Fare shown online',
  enquiry: 'Tell us the date, we quote',
  'corporate-enquiry': 'For companies',
}

/** A service in the fleet-card shape: picture, badge, summary, how it's booked and the actions. */
export function ServiceCard({ service: s, href }: { service: Service; href: string }) {
  const img = serviceVisual(s.slug)
  const online = s.sells === 'fare-widget'
  const selfRide = s.slug === 'bike-rental' || s.slug === 'self-drive-car-rental'
  const specs: CardSpec[] = [
    { icon: ClipboardList, label: 'Booking', value: online ? 'Fare online' : 'By enquiry' },
    { icon: CircleDollarSign, label: 'To book', value: 'No payment' },
    selfRide
      ? { icon: KeyRound, label: 'Driver', value: 'You drive' }
      : { icon: UserRound, label: 'Driver', value: 'Included' },
  ]
  return (
    <CardFrame>
      <div className="bg-mist relative aspect-[4/3] overflow-hidden">
        {img && (
          <Image
            src={img.src}
            alt=""
            fill
            sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
            quality={60}
            className="object-cover transition-transform duration-500 group-hover/card:scale-105"
          />
        )}
        <CardBadge>
          {online ? 'Fare online' : s.register === 'luxury' ? 'Luxury' : 'On enquiry'}
        </CardBadge>
        {img?.representative && (
          <span className="bg-ink/70 absolute right-1.5 bottom-1.5 rounded px-1.5 py-0.5 text-[11px] text-white">
            {REPRESENTATIVE_LABEL}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-heading text-xl font-extrabold">{s.name}</h3>
        <p className="text-brand-deep text-sm font-semibold">{SUBTITLE[s.sells]}</p>
        {s.summary && <p className="text-muted mt-3">{s.summary}</p>}
        <CardSpecs specs={specs} />
        <CardFareLine value={online ? 'Shown online for your trip' : 'Quoted on enquiry'} />
        <CardActions
          primary={
            online
              ? { href: '/book/', label: 'Check fare' }
              : { href: `${href}#enquire`, label: 'Send an enquiry' }
          }
          details={{ href }}
          subject={s.name.toLowerCase()}
          whatsappMessage={`Hi Taxiverz, I'd like to ask about ${s.name.toLowerCase()}.`}
          placement="service-card"
        />
      </div>
    </CardFrame>
  )
}
