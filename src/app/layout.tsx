import { GoogleTagManager } from '@next/third-parties/google'
import type { Metadata, Viewport } from 'next'
import { Anek_Latin, Mukta } from 'next/font/google'
import type { ReactNode } from 'react'
import { business } from '@/config/business'
import { publicEnv } from '@/config/public-env'
import { site } from '@/config/site'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { SkipLink } from '@/components/layout/SkipLink'
import { StickyActionBar } from '@/components/layout/StickyActionBar'
import { Tracking } from '@/components/tracking/Tracking'
import './globals.css'

// Only Latin is preloaded; the Devanagari faces stay in the CSS (unicode-range)
// and load only on pages that show Hindi text, such as milestone labels.
const mukta = Mukta({
  subsets: ['latin'],
  // 500 is not loaded: font-medium text falls back to the nearest loaded weight.
  weight: ['400', '600', '700'],
  variable: '--font-mukta',
  display: 'swap',
})

// Headings only: not preloaded, so the page's text never waits on it (LCP);
// headings render in the fallback for a moment and swap in when it arrives.
const anek = Anek_Latin({
  subsets: ['latin'],
  variable: '--font-anek',
  display: 'swap',
  preload: false,
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
        <Tracking />
      </body>
      {publicEnv.gtmId && <GoogleTagManager gtmId={publicEnv.gtmId} />}
    </html>
  )
}
