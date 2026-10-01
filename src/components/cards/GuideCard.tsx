import Image from 'next/image'
import { BookOpen, Car, MapPinned } from 'lucide-react'
import { placeScenes, sceneFor } from '@/config/imagery'
import { Milestone } from '@/components/ui/Milestone'
import { destinationPath, getCity, getGuides } from '@/lib/content'
import { tripToParams } from '@/lib/pricing/quote'
import type { Destination } from '@/lib/schemas/content'
import {
  CardActions,
  CardBadge,
  CardFareLine,
  CardFrame,
  CardSpecs,
  type CardSpec,
} from './CardParts'

/** A destination guide in the fleet-card shape: a photo of the place (or its milestone), facts and actions. */
export function GuideCard({ destination: d }: { destination: Destination }) {
  const city = getCity(d.place)
  const name = city?.name ?? d.place
  const home = d.place === 'gorakhpur'
  const scene = sceneFor(placeScenes[d.place])
  const guides = getGuides(d.place).length
  const specs: CardSpec[] = [
    { icon: BookOpen, label: 'Guides', value: `${guides} ${guides === 1 ? 'guide' : 'guides'}` },
    {
      icon: MapPinned,
      label: 'Where',
      value: city ? `${city.state}${city.country === 'NP' ? ', Nepal' : ''}` : name,
    },
    { icon: Car, label: 'Cab', value: home ? 'Local hire' : 'From Gorakhpur' },
  ]
  const book = home
    ? '/book/'
    : `/book/?${tripToParams({ type: 'round-trip', from: 'gorakhpur', to: d.place })}`
  return (
    <CardFrame>
      <div className="from-mist to-paper relative flex aspect-[3/2] items-center justify-center overflow-hidden bg-gradient-to-br pt-6">
        {scene ? (
          <Image
            src={scene.src}
            alt=""
            fill
            sizes="(min-width: 1024px) 300px, (min-width: 640px) 45vw, 90vw"
            quality={60}
            className="object-cover transition-transform duration-500 group-hover/card:scale-105"
          />
        ) : (
          <div className="transition-transform duration-500 group-hover/card:scale-105">
            <Milestone nameEn={name} nameHi={city?.nameHi ?? null} km={null} />
          </div>
        )}
        <CardBadge>Travel guide</CardBadge>
        {scene && (
          <span className="bg-ink/70 absolute right-1.5 bottom-1.5 rounded px-1.5 py-0.5 text-[11px] text-white">
            Photo: {scene.credit} / Unsplash
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-heading text-xl font-extrabold">{name} guide</h3>
        <p className="text-brand-deep text-sm font-semibold">What to see and when to go</p>
        {d.summary && <p className="text-muted mt-3">{d.summary}</p>}
        <CardSpecs specs={specs} />
        <CardFareLine label="Cab fare" value="Shown online" />
        <CardActions
          primary={{ href: destinationPath(d.place), label: 'Read the guide' }}
          details={{ href: book, label: home ? 'Book a car in Gorakhpur' : `Cab to ${name}` }}
          subject={`${name}`}
          whatsappMessage={
            home
              ? 'Hi Taxiverz, I need a car in Gorakhpur.'
              : `Hi Taxiverz, I'd like a cab to ${name}.`
          }
          placement="guide-card"
        />
      </div>
    </CardFrame>
  )
}
