import type { NextConfig } from 'next'
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants'

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
  // No includeSubDomains/preload: www.taxiverz.com has no valid certificate yet (OWNER_TODO L4).
  { key: 'Strict-Transport-Security', value: 'max-age=31536000' },
]

export default function config(phase: string): NextConfig {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER
  return {
    output: 'standalone',
    trailingSlash: true,
    poweredByHeader: false,
    reactStrictMode: true,
    // `page.dev.tsx` routes (the /styleguide/) exist only under `next dev`:
    // never built, deployed or listed in production.
    pageExtensions: isDev ? ['dev.tsx', 'tsx', 'ts'] : ['tsx', 'ts'],
    images: {
      formats: ['image/avif', 'image/webp'],
      qualities: [60, 75],
      deviceSizes: [360, 480, 640, 768, 1024, 1280, 1600, 2000],
    },
    async headers() {
      return [{ source: '/:path*', headers: securityHeaders }]
    },
  }
}
