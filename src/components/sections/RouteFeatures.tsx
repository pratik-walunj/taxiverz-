import {
  CalendarClock,
  Car,
  MapPin,
  MessageCircle,
  Route as RouteIcon,
  UserRound,
} from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'

/**
 * "Service features" on route pages (the legacy pages had one). Only what is
 * true of every booking: how the booking works, not promises about the car.
 */
const FEATURES = [
  {
    icon: UserRound,
    title: 'A car with a driver',
    text: 'Every trip comes with a driver who knows the road.',
  },
  {
    icon: MapPin,
    title: 'Door to door',
    text: 'Pickup from your home, hotel, station or airport, drop at your address.',
  },
  {
    icon: RouteIcon,
    title: 'One way or round trip',
    text: 'Pay for one way, or keep the car with you and come back with it.',
  },
  {
    icon: Car,
    title: 'Choose the car',
    text: 'From a hatchback to a tempo traveller — pick the class that fits your group.',
  },
  {
    icon: CalendarClock,
    title: 'Leave when you like',
    text: 'Set the pickup time yourself; tell us about any stops when you book.',
  },
  {
    icon: MessageCircle,
    title: 'One number',
    text: 'Book online, on WhatsApp or by phone, and get a booking reference.',
  },
] as const

export function RouteFeatures({ from, to }: { from: string; to: string }) {
  return (
    <Section register="mist" labelledBy="features-title">
      <SectionHeading
        id="features-title"
        eyebrow="Service features"
        title={`Your ${from} to ${to} cab`}
      />
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map(({ icon: Icon, title, text }) => (
          <li key={title} className="bg-paper rounded-panel flex gap-4 p-5 shadow-sm">
            <span className="bg-brand/15 text-brand-deep rounded-control flex size-11 shrink-0 items-center justify-center">
              <Icon aria-hidden="true" className="size-5" />
            </span>
            <span>
              <span className="font-heading block font-bold">{title}</span>
              <span className="text-muted mt-1 block">{text}</span>
            </span>
          </li>
        ))}
      </ul>
    </Section>
  )
}
