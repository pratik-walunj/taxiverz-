import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'

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
      <SectionHeading
        id="how-title"
        eyebrow="Booking"
        title="How booking works"
        intro="Four steps, and no payment to send a booking."
      />
      <div className="relative mt-10">
        {/* Joins the step circles: from the first circle's centre to the last one's. */}
        <span
          aria-hidden="true"
          className="from-brand/70 to-brand/20 absolute top-6 right-[calc(25%-3rem)] left-6 hidden h-0.5 bg-gradient-to-r lg:block"
        />
        <ol className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <li key={s.title} className="relative">
              <span
                aria-hidden="true"
                className="font-heading bg-brand text-ink ring-paper relative flex size-12 items-center justify-center rounded-full text-xl font-extrabold shadow-md ring-8"
              >
                {i + 1}
              </span>
              <h3 className="font-heading mt-4 text-lg font-bold">{s.title}</h3>
              <p className="text-muted mt-1">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  )
}
