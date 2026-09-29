import { Section } from '@/components/ui/Section'

/**
 * How booking works — the real sequence of the /book/ funnel, so numbered
 * steps are honest here (DESIGN.md). Promises nothing the owner hasn't confirmed.
 */
const STEPS = [
  {
    title: 'Enter your trip',
    text: 'Pickup and drop, or a local package. No phone number needed to see the cars and fares.',
  },
  {
    title: 'Choose a car',
    text: 'Pick a class — hatchback, sedan, SUV, tempo traveller and more. The exact model depends on availability.',
  },
  {
    title: 'Send it to us',
    text: 'Confirm online, send the trip on WhatsApp, or call. You get a booking reference straight away.',
  },
  {
    title: 'We confirm',
    text: 'We call or WhatsApp you to confirm the car and the fare before the trip.',
  },
] as const

export function HowBooking() {
  return (
    <Section labelledBy="how-title">
      <h2 id="how-title" className="text-h2 font-bold">
        How booking works
      </h2>
      <ol className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((s, i) => (
          <li key={s.title} className="flex gap-4">
            <span
              aria-hidden="true"
              className="font-heading bg-brand text-ink flex size-10 shrink-0 items-center justify-center rounded-full text-lg font-bold"
            >
              {i + 1}
            </span>
            <div>
              <h3 className="font-semibold">{s.title}</h3>
              <p className="text-muted mt-1">{s.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  )
}
