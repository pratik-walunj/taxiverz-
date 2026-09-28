import type { Metadata } from 'next'
import { ConfirmedView } from '@/components/booking/ConfirmedView'
import { Section } from '@/components/ui/Section'
import { REFERENCE_PATTERN } from '@/server/leads/reference'

export const metadata: Metadata = {
  title: { absolute: 'Booking received | Taxiverz' },
  robots: { index: false, follow: false },
}

/** /book/confirmed/?ref= — step 5 of the funnel. */
export default async function ConfirmedPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const raw = (await searchParams).ref
  const ref = typeof raw === 'string' && REFERENCE_PATTERN.test(raw) ? raw : null
  return (
    <Section className="pt-8 md:pt-12">
      <ConfirmedView reference={ref} />
    </Section>
  )
}
