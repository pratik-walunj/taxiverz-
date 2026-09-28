import Image from 'next/image'
import Link from 'next/link'
import { Phone } from 'lucide-react'
import { business } from '@/config/business'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { MobileNav } from '@/components/layout/MobileNav'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { bookingPath, publishedNav } from '@/lib/nav'
import { formatIndianPhone, telHref } from '@/lib/phone'
import { whatsappHref } from '@/lib/whatsapp'

export function Header() {
  const nav = publishedNav()
  const book = bookingPath()
  const phone = formatIndianPhone(business.phone)

  return (
    <header className="border-line bg-paper/95 supports-[backdrop-filter]:bg-paper/85 sticky top-0 z-40 border-b backdrop-blur">
      <Container className="flex h-16 items-center gap-4">
        <Link href="/" className="flex shrink-0 items-center" aria-label="Taxiverz home">
          <Image
            src="/images/brand/logo.png"
            alt=""
            width={330}
            height={158}
            className="h-12 w-auto"
          />
        </Link>

        {nav.length > 0 && (
          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-6 font-medium">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-brand-deep py-2">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <div className="ml-auto flex items-center gap-2">
          <a
            href={telHref(business.phone)}
            data-placement="header"
            className="hover:text-brand-deep hidden min-h-12 items-center gap-2 px-2 font-semibold md:inline-flex"
          >
            <Phone aria-hidden="true" className="size-5" />
            <span className="tabular">{phone}</span>
          </a>
          {/* Mobile has the sticky bar for WhatsApp and Book; the header keeps them from 640px up. */}
          <div className="hidden sm:block">
            <Button
              href={whatsappHref(business.whatsapp)}
              data-placement="header"
              variant="whatsapp"
            >
              <WhatsAppIcon className="size-5" />
              <span>WhatsApp</span>
            </Button>
          </div>
          {book && (
            <div className="hidden sm:block">
              <Button href={book}>Check fare</Button>
            </div>
          )}
          {nav.length > 0 && (
            <MobileNav items={nav} phone={business.phone} whatsapp={business.whatsapp} />
          )}
        </div>
      </Container>
    </header>
  )
}
