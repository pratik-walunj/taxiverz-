'use client'

import Link from 'next/link'
import { useEffect, useId, useRef } from 'react'
import { Menu, Phone, X } from 'lucide-react'
import type { NavItem } from '@/config/site'
import { Button } from '@/components/ui/Button'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { formatIndianPhone, telHref } from '@/lib/phone'
import { whatsappHref } from '@/lib/whatsapp'

/**
 * Mobile navigation sheet on the native <dialog> (Phase 7: replaces Radix,
 * ~16 KB less JS). showModal() makes the rest of the page inert (focus stays
 * inside), Esc closes it, and focus returns to the Menu button on close. We
 * add the scroll lock, a click on the backdrop to close, and closing when a
 * link is followed.
 */
export function MobileNav({
  items,
  phone,
  whatsapp,
}: {
  items: readonly NavItem[]
  phone: string
  whatsapp: string
}) {
  const ref = useRef<HTMLDialogElement>(null)
  const titleId = useId()

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    const unlock = () => document.documentElement.style.removeProperty('overflow')
    dialog.addEventListener('close', unlock)
    return () => {
      dialog.removeEventListener('close', unlock)
      unlock()
    }
  }, [])

  const open = () => {
    document.documentElement.style.overflow = 'hidden'
    ref.current?.showModal()
  }
  const close = () => ref.current?.close()

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-haspopup="dialog"
        className="rounded-control inline-flex min-h-12 min-w-12 items-center justify-center gap-2 px-3 font-semibold lg:hidden"
      >
        <Menu aria-hidden="true" className="size-6" />
        <span>Menu</span>
      </button>
      <dialog
        ref={ref}
        aria-labelledby={titleId}
        // A click on the backdrop lands on the <dialog> element itself.
        onClick={(e) => {
          if (e.target === e.currentTarget) close()
        }}
        className="bg-paper shadow-lift backdrop:bg-ink/40 fixed inset-y-0 right-0 left-auto m-0 h-dvh max-h-none w-[min(22rem,88vw)] max-w-none p-0 open:animate-[rise-in_200ms_ease-out]"
      >
        <div className="flex h-full flex-col p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
          <div className="flex items-center justify-between">
            <h2 id={titleId} className="font-heading text-h3 font-bold">
              Menu
            </h2>
            <button
              type="button"
              onClick={close}
              className="rounded-control inline-flex min-h-12 min-w-12 items-center justify-center"
              aria-label="Close menu"
            >
              <X aria-hidden="true" className="size-6" />
            </button>
          </div>
          <nav aria-label="Main" className="mt-4">
            <ul className="divide-line divide-y">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={close}
                    className="flex min-h-12 items-center text-lg font-medium"
                  >
                    {item.label}
                  </Link>
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
        </div>
      </dialog>
    </>
  )
}
