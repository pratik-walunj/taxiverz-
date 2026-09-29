import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

/** Draft templates, rendered with sample data by the dev-only previews. */
const PREVIEWS = [
  '/styleguide/route/',
  '/styleguide/vehicle/',
  '/styleguide/vehicle/?v=audi-a4',
  '/styleguide/service/?s=wedding-cars',
  '/styleguide/service/?s=shoot-car-rental&t=pre-wedding',
  '/styleguide/service/?s=bus-rental',
  '/styleguide/service/?s=bike-rental',
]

for (const path of PREVIEWS)
  test(`${path}: one H1, no serious axe issues, no sideways scroll`, async ({ page }) => {
    await page.goto(path, { waitUntil: 'networkidle' })
    await expect(page.locator('h1')).toHaveCount(1)
    const { violations } = await new AxeBuilder({ page })
      // The dev overlay (Next's error/indicator button) is not part of the page.
      .exclude('nextjs-portal')
      .analyze()
    const serious = violations
      .filter((v) => v.impact === 'serious' || v.impact === 'critical')
      .map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`)
    expect(serious).toEqual([])
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    )
    expect(overflow).toBeLessThanOrEqual(0)
  })
