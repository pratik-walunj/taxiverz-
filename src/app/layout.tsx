import type { Metadata, Viewport } from 'next'
import { Anek_Latin, Mukta } from 'next/font/google'
import type { ReactNode } from 'react'
import { business } from '@/config/business'
import { site } from '@/config/site'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { SkipLink } from '@/components/layout/SkipLink'
import { StickyActionBar } from '@/components/layout/StickyActionBar'
import './globals.css'

const mukta = Mukta({
  subsets: ['latin', 'devanagari'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-mukta',
  display: 'swap',
})

const anek = Anek_Latin({
  subsets: ['latin'],
  variable: '--font-anek',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  applicationName: site.name,
  verification: { google: business.googleSiteVerification },
  formatDetection: { telephone: false },
}

// Pinch-zoom stays enabled: no maximumScale / userScalable (CLAUDE.md).
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#ffffff',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-IN" className={`${mukta.variable} ${anek.variable}`}>
      <body className="flex min-h-dvh flex-col antialiased">
        <SkipLink />
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <StickyActionBar />
      </body>
    </html>
  )
}
