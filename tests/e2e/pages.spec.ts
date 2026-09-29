import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

const POLICY_PAGES = new Set(['/privacy/', '/terms/', '/refund-policy/'])

/**
 * Every published, indexable page (read from the sitemap, so new pages are
 * covered automatically): renders, one H1, a way to book, breadcrumbs that
 * only link to live pages, and no serious axe issues.
 */
test('every page in the sitemap renders, can be booked from and passes axe', async ({
  page,
  request,
}) => {
  const xml = await (await request.get('/sitemap.xml')).text()
  const paths = [...xml.matchAll(/<loc>https:\/\/taxiverz\.com(\/[^<]*)<\/loc>/g)].map((m) => m[1]!)
  expect(paths.length).toBeGreaterThan(5)
  // The walk grows with the site: allow ~15 s per page (axe is the slow part).
  test.setTimeout(30_000 + paths.length * 15_000)

  for (const path of paths) {
    const response = await page.goto(path)
    expect(response?.status(), path).toBe(200)
    await expect(page.locator('h1'), path).toHaveCount(1)

    const widget = page.getByRole('button', { name: 'Check fare' })
    const enquire = page.getByRole('link', { name: /Enquire on WhatsApp|WhatsApp us/ })
    // Legal pages are the exception: they inform, they don't sell.
    if (!POLICY_PAGES.has(path))
      expect(
        (await widget.count()) +
          (await enquire.count()) +
          (await page.locator('main form').count()),
        `${path} has no way to book`,
      ).toBeGreaterThan(0)

    for (const href of await page
      .getByRole('navigation', { name: 'Breadcrumb' })
      .getByRole('link')
      .evaluateAll((links) => links.map((a) => a.getAttribute('href'))))
      expect(paths.includes(href!) || href === '/', `${path}: breadcrumb to ${href}`).toBe(true)

    const { violations } = await new AxeBuilder({ page }).analyze()
    const serious = violations
      .filter((v) => v.impact === 'serious' || v.impact === 'critical')
      .map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`)
    expect(serious, path).toEqual([])

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    )
    expect(overflow, `${path} scrolls sideways`).toBeLessThanOrEqual(0)
  }
})

test('drafts are not served', async ({ request }) => {
  for (const path of [
    '/wedding-cars/',
    '/shoot-car-rental/',
    '/shoot-car-rental/pre-wedding/',
    '/bus-rental/',
    '/packages/',
    '/packages/everest-mountain-flight/',
    '/blog/',
    '/blog/buddhist-circuit-by-car/',
    '/terms/',
    '/refund-policy/',
    '/reviews/',
    '/cabs/pune/',
    '/cabs/raxaul/',
    '/fleet/audi-a4/',
    '/cabs/gorakhpur/gorakhpur-to-kathmandu/',
  ])
    expect((await request.get(path)).status(), path).toBe(404)
})

test('a service page opens the fare box on its own tab', async ({ page }) => {
  await page.goto('/airport-taxi/')
  await expect(page.getByRole('tab', { name: 'Airport' })).toHaveAttribute('aria-selected', 'true')
  await page.goto('/local-car-rental/gorakhpur/')
  await expect(page.getByRole('tab', { name: 'Local (hourly)' })).toHaveAttribute(
    'aria-selected',
    'true',
  )
})
