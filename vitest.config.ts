import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
    // Unit tests import server modules directly; the guard only matters in Next bundles.
    alias: {
      'server-only': fileURLToPath(new URL('./node_modules/server-only/empty.js', import.meta.url)),
    },
  },
  test: {
    include: ['tests/unit/**/*.test.ts'],
    environment: 'node',
    coverage: {
      provider: 'v8',
      include: ['src/lib/pricing/**'],
      // The fare engine requires ≥ 90 % line coverage (REBUILD_PLAN Phase 3).
      thresholds: { lines: 90 },
      reporter: ['text-summary'],
    },
  },
})
