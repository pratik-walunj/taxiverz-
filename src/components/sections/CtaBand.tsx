import { CalendarCheck, Phone } from 'lucide-react'
import { business } from '@/config/business'
import { Button } from '@/components/ui/Button'
import { Section } from '@/components/ui/Section'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { bookingPath } from '@/lib/nav'
import { formatIndianPhone, telHref } from '@/lib/phone'
import { whatsappHref } from '@/lib/whatsapp'

/** The three closes, side by side (REBUILD_PLAN §3.4): check fare, WhatsApp, call. */
export function CtaBand({
  title,
  text,
  whatsappMessage,
  placement,
  register = 'mist',
  showBook = true,
}: {
  title: string
  text: string
  whatsappMessage: string
  placement: string
  register?: 'mist' | 'luxury'
  /** Enquire-mode pages hide "Check fare and book" (their close is the enquiry form). */
  showBook?: boolean
}) {
  const book = showBook ? bookingPath() : null
  return (
    <Section register={register} labelledBy={`cta-${placement}`}>
      <h2 id={`cta-${placement}`} className="text-h2 font-bold">
        {title}
      </h2>
      <p className="mt-2 max-w-2xl">{text}</p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        {book && (
          <Button href={book} size="lg">
            <CalendarCheck aria-hidden="true" className="size-5" /> Check fare and book
          </Button>
        )}
        <Button
          href={whatsappHref(business.whatsapp, whatsappMessage)}
          variant="whatsapp"
          size="lg"
          data-placement={placement}
        >
          <WhatsAppIcon className="size-5" /> WhatsApp us
        </Button>
        <Button
          href={telHref(business.phone)}
          variant={register === 'luxury' ? 'luxury' : 'secondary'}
          size="lg"
          data-placement={placement}
        >
          <Phone aria-hidden="true" className="size-5" />
          <span className="tabular">Call {formatIndianPhone(business.phone)}</span>
        </Button>
      </div>
    </Section>
  )
}
