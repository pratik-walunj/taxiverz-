import { defineConfig, devices } from '@playwright/test'

/** E2E runs against the production build: `npm run build` first. */
export default defineConfig({
  testDir: 'tests/e2e',
  use: { baseURL: 'http://127.0.0.1:3200' },
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
    command: 'node node_modules/next/dist/bin/next start -p 3200',
    url: 'http://127.0.0.1:3200/',
    reuseExistingServer: true,
  },
})
