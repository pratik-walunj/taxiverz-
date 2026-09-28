import Link from 'next/link'
import { business } from '@/config/business'
import { Container } from '@/components/ui/Container'
import { publishedFooterGroups } from '@/lib/nav'
import { formatIndianPhone, telHref } from '@/lib/phone'
import { whatsappHref } from '@/lib/whatsapp'

export function Footer() {
  const groups = publishedFooterGroups()
  const year = new Date().getFullYear()

  return (
    <footer className="border-line bg-mist border-t pt-12 pb-28 md:pb-12">
      <Container>
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <p className="font-heading text-h3 font-bold">{business.brandName}</p>
            <ul className="mt-3 space-y-1">
              <li>
                <a
                  href={telHref(business.phone)}
                  className="tabular hover:text-brand-deep font-semibold"
                >
                  Call {formatIndianPhone(business.phone)}
                </a>
              </li>
              <li>
                <a
                  href={whatsappHref(business.whatsapp)}
                  className="hover:text-brand-deep font-semibold"
                  target="_blank"
                  rel="noopener"
                >
                  WhatsApp {formatIndianPhone(business.whatsapp)}
                </a>
              </li>
              {business.email && (
                <li>
                  <a href={`mailto:${business.email}`} className="hover:text-brand-deep">
                    {business.email}
                  </a>
                </li>
              )}
            </ul>
          </div>

          {business.branches.map((branch) => (
            <address key={branch.id} className="not-italic">
              <p className="font-semibold">{branch.label}</p>
              <p className="text-muted mt-2">
                {branch.streetAddress}
                <br />
                {branch.locality === branch.city
                  ? branch.city
                  : `${branch.locality}, ${branch.city}`}
                , {branch.region} {branch.postalCode}
              </p>
              {branch.hours && <p className="text-muted mt-1">{branch.hours}</p>}
            </address>
          ))}
        </div>

        {groups.length > 0 && (
          <nav aria-label="Footer" className="mt-10 grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            {groups.map((group) => (
              <div key={group.title}>
                <p className="font-semibold">{group.title}</p>
                <ul className="mt-2 space-y-1">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-muted hover:text-brand-deep">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        )}

        <p className="border-line text-muted mt-10 border-t pt-6 text-sm">
          © {year} {business.legalName ?? business.brandName}
        </p>
      </Container>
    </footer>
  )
}
