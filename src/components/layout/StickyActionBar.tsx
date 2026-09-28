import Link from 'next/link'
import { CalendarCheck, Phone } from 'lucide-react'
import { business } from '@/config/business'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { bookingPath } from '@/lib/nav'
import { telHref } from '@/lib/phone'
import { whatsappHref } from '@/lib/whatsapp'

/** Mobile-only bar: Call · WhatsApp · Book. Padded for the home indicator (viewport-fit=cover). */
export function StickyActionBar() {
  const book = bookingPath()
  const item =
    'flex min-h-14 flex-1 flex-col items-center justify-center gap-0.5 text-sm font-semibold'
  return (
    <nav
      aria-label="Quick contact"
      className="border-line bg-paper fixed inset-x-0 bottom-0 z-40 flex border-t pr-[env(safe-area-inset-right)] pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] md:hidden"
    >
      <a href={telHref(business.phone)} data-placement="sticky-bar" className={item}>
        <Phone aria-hidden="true" className="size-5" />
        Call
      </a>
      <a
        href={whatsappHref(business.whatsapp)}
        data-placement="sticky-bar"
        target="_blank"
        rel="noopener"
        className={`${item} bg-whatsapp text-ink`}
      >
        <WhatsAppIcon className="size-5" />
        WhatsApp
      </a>
      {book && (
        <Link href={book} className={`${item} bg-brand text-ink`}>
          <CalendarCheck aria-hidden="true" className="size-5" />
          Book
        </Link>
      )}
    </nav>
  )
}
