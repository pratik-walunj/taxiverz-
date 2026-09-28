'use client'

import * as Dialog from '@radix-ui/react-dialog'
import Link from 'next/link'
import { Menu, Phone, X } from 'lucide-react'
import type { NavItem } from '@/config/site'
import { Button } from '@/components/ui/Button'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { formatIndianPhone, telHref } from '@/lib/phone'
import { whatsappHref } from '@/lib/whatsapp'

/** Mobile navigation sheet (Radix Dialog: focus trap, Esc, scroll lock, labelled). */
export function MobileNav({
  items,
  phone,
  whatsapp,
}: {
  items: readonly NavItem[]
  phone: string
  whatsapp: string
}) {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="rounded-control inline-flex min-h-12 min-w-12 items-center justify-center gap-2 px-3 font-semibold lg:hidden">
        <Menu aria-hidden="true" className="size-6" />
        <span>Menu</span>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-ink/40 fixed inset-0 z-50 data-[state=open]:animate-[rise-in_200ms_ease-out]" />
        <Dialog.Content className="bg-paper shadow-lift fixed inset-y-0 right-0 z-50 flex w-[min(22rem,88vw)] flex-col p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
          <div className="flex items-center justify-between">
            <Dialog.Title className="font-heading text-h3 font-bold">Menu</Dialog.Title>
            <Dialog.Close
              className="rounded-control inline-flex min-h-12 min-w-12 items-center justify-center"
              aria-label="Close menu"
            >
              <X aria-hidden="true" className="size-6" />
            </Dialog.Close>
          </div>
          <Dialog.Description className="sr-only">
            Site sections and ways to contact Taxiverz
          </Dialog.Description>
          <nav aria-label="Main" className="mt-4">
            <ul className="divide-line divide-y">
              {items.map((item) => (
                <li key={item.href}>
                  <Dialog.Close asChild>
                    <Link
                      href={item.href}
                      className="flex min-h-12 items-center text-lg font-medium"
                    >
                      {item.label}
                    </Link>
                  </Dialog.Close>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-auto grid gap-3 pt-6">
            <Button href={telHref(phone)} data-placement="mobile-nav" variant="secondary" size="lg">
              <Phone aria-hidden="true" className="size-5" />
              <span className="tabular">Call {formatIndianPhone(phone)}</span>
            </Button>
            <Button
              href={whatsappHref(whatsapp)}
              data-placement="mobile-nav"
              variant="whatsapp"
              size="lg"
            >
              <WhatsAppIcon className="size-5" />
              <span>WhatsApp us</span>
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
