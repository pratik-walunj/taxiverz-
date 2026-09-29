import { defineConfig, devices } from '@playwright/test'

/**
 * Axe on the templates that have no published page yet (route, vehicle,
 * luxury/shoot/bus services), through their dev-only previews under
 * /styleguide/ — which exist only under `next dev`. `npm run test:templates`.
 */
export default defineConfig({
  testDir: 'tests/templates',
  timeout: 120_000,
  use: { baseURL: 'http://127.0.0.1:3300' },
  projects: [
    {
      name: 'mobile-360',
      use: { ...devices['Pixel 5'], viewport: { width: 360, height: 780 }, channel: 'chrome' },
    },
    {
      name: 'desktop-1280',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 800 },
        channel: 'chrome',
      },
    },
  ],
  webServer: {
    command: 'node node_modules/next/dist/bin/next dev -p 3300',
    env: { NEXT_DIST_DIR: '.next-templates' },
    url: 'http://127.0.0.1:3300/styleguide/',
    reuseExistingServer: true,
    timeout: 180_000,
  },
})
