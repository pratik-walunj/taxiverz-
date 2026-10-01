import { MapPinned, Milestone as MilestoneIcon, Route as RouteIcon, UserRound } from 'lucide-react'
import { Milestone } from '@/components/ui/Milestone'
import { getCity, routePath } from '@/lib/content'
import { tripToParams } from '@/lib/pricing/quote'
import type { Route } from '@/lib/schemas/content'
import {
  CardActions,
  CardBadge,
  CardFareLine,
  CardFrame,
  CardSpecs,
  type CardSpec,
} from './CardParts'

/** A route in the fleet-card shape: the milestone, name, trip facts and the booking actions. */
export function RouteCard({ route: r }: { route: Route }) {
  const from = getCity(r.origin)
  const to = getCity(r.destination)
  const fromName = from?.name ?? r.origin
  const toName = to?.name ?? r.destination
  const km = r.verified.distance ? r.distanceKm : null
  const specs: CardSpec[] = [
    ...(km !== null ? [{ icon: MilestoneIcon, label: 'Distance', value: `${km} km` }] : []),
    { icon: RouteIcon, label: 'Trip', value: 'One way or return' },
    { icon: UserRound, label: 'Driver', value: 'Included' },
    { icon: MapPinned, label: 'Stops', value: 'On request' },
  ]
  return (
    <CardFrame>
      <div className="from-mist to-paper relative flex aspect-[3/2] items-center justify-center bg-gradient-to-br pt-6">
        <div
          aria-hidden="true"
          className="bg-brand/15 absolute -right-10 -bottom-10 size-40 rounded-full blur-2xl"
        />
        <div className="transition-transform duration-500 group-hover/card:scale-105">
          <Milestone nameEn={toName} nameHi={to?.nameHi ?? null} km={km} />
        </div>
        <CardBadge>{to?.country === 'NP' ? 'Into Nepal' : 'Taxi route'}</CardBadge>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-heading text-xl font-extrabold">
          {fromName} to {toName}
        </h3>
        <p className="text-brand-deep text-sm font-semibold">
          {to ? `${to.state}${to.country === 'NP' ? ', Nepal' : ''}` : 'Cab with driver'}
        </p>
        <CardSpecs specs={specs} />
        <CardFareLine value="Shown online by car" />
        <CardActions
          primary={{
            href: `/book/?${tripToParams({ type: 'one-way', from: r.origin, to: r.destination })}`,
            label: 'Check fare',
          }}
          details={{ href: routePath(r), label: 'View route' }}
          subject={`${fromName} to ${toName}`}
          whatsappMessage={`Hi Taxiverz, I'd like a cab from ${fromName} to ${toName}.`}
          placement="route-card"
        />
      </div>
    </CardFrame>
  )
}
