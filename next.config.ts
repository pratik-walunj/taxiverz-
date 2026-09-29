import createMDX from '@next/mdx'
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

// MDX bodies (content/destinations, content/blog) are imported by pages, never
// routed directly, so pageExtensions stays unchanged.
const withMDX = createMDX({})

export default function config(phase: string): NextConfig {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER
  return withMDX({
    output: 'standalone',
    // The template tests run `next dev` in their own folder so they never clash with
    // the production build that `npm run check` typechecks (Phase 7).
    distDir: process.env.NEXT_DIST_DIR ?? '.next',
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
  })
}
