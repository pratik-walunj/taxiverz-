import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'

const REF = 'TVZ-260928-7K2M'

async function pickPlace(page: Page, label: string, query: string, option: RegExp) {
  const box = page.getByRole('combobox', { name: label })
  await box.fill(query)
  await page.getByRole('option', { name: option }).first().click()
}

async function seriousViolations(page: Page) {
  const { violations } = await new AxeBuilder({ page }).analyze()
  return violations
    .filter((v) => v.impact === 'serious' || v.impact === 'critical')
    .map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`)
}

function futureDate(days: number) {
  const d = new Date(Date.now() + days * 86_400_000)
  return d.toISOString().slice(0, 10)
}

async function toContactStep(page: Page) {
  await page.goto('/')
  await pickPlace(page, 'Pickup', 'Gorakh', /Gorakhpur/)
  await pickPlace(page, 'Drop', 'Kathm', /Kathmandu/)
  await page.getByRole('button', { name: 'Check fare' }).click()

  await expect(page).toHaveURL(/\/book\/\?type=one-way&from=gorakhpur&to=kathmandu/)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(/Gorakhpur to Kathmandu/)
  expect(await seriousViolations(page)).toEqual([])

  await page.getByRole('link', { name: /^Choose Sedan/ }).click()
  await expect(page).toHaveURL(/class=sedan/)
  await page.getByLabel('Travel date').fill(futureDate(7))
  await page.getByLabel('Pickup time').fill('07:30')
  await page.getByRole('button', { name: 'Continue' }).click()

  await expect(page.getByRole('heading', { name: 'Your details' })).toBeFocused()
  await page.getByLabel('Name').fill('Test Rider')
  await page.getByLabel('Mobile number').fill('9876543210')
  expect(await seriousViolations(page)).toEqual([])
}

test('fare check to confirmed booking', async ({ page }) => {
  let body: Record<string, unknown> | null = null
  await page.route('**/api/leads/', async (route) => {
    body = route.request().postDataJSON() as Record<string, unknown>
    await route.fulfill({ json: { ok: true, ref: REF } })
  })
  await toContactStep(page)
  await page.getByRole('button', { name: 'Confirm booking' }).click()

  await expect(page).toHaveURL(new RegExp(`/book/confirmed/\\?ref=${REF}`))
  await expect(page.getByText(REF)).toBeVisible()
  expect(body).toMatchObject({
    type: 'booking',
    trip: { type: 'one-way', from: 'gorakhpur', to: 'kathmandu', classSlug: 'sedan' },
    contact: { name: 'Test Rider', phone: '+919876543210' },
  })

  const wa = page.getByRole('link', { name: /WhatsApp us about this booking/ })
  const href = decodeURIComponent((await wa.getAttribute('href')) ?? '')
  expect(href).toContain('https://wa.me/918576000083')
  expect(href).toContain(REF)
  expect(href).toContain('Kathmandu')
  await expect(page.locator('main a[href="tel:+918576000083"]')).toBeVisible()
  expect(await seriousViolations(page)).toEqual([])
})

test('a failed submit falls back to WhatsApp with the trip', async ({ page }) => {
  await page.route('**/api/leads/', (route) =>
    route.fulfill({ status: 503, json: { ok: false, ref: REF } }),
  )
  await toContactStep(page)
  await page.getByRole('button', { name: 'Confirm booking' }).click()

  await expect(page.getByRole('heading', { name: /send your booking on WhatsApp/ })).toBeVisible()
  const href = decodeURIComponent(
    (await page.getByRole('link', { name: 'Send on WhatsApp' }).getAttribute('href')) ?? '',
  )
  expect(href).toContain(REF)
  expect(href).toContain('Gorakhpur')
  expect(href).toContain('Test Rider')
})

test('the fare widget works from the keyboard', async ({ page }) => {
  await page.goto('/book/')
  const oneWay = page.getByRole('tab', { name: 'One way' })
  await oneWay.focus()
  await page.keyboard.press('ArrowRight')
  await expect(page.getByRole('tab', { name: 'Round trip' })).toBeFocused()
  await expect(page.getByRole('tab', { name: 'Round trip' })).toHaveAttribute('aria-selected', 'true')

  const pickup = page.getByRole('combobox', { name: 'Pickup' })
  await pickup.fill('Gorakh')
  await page.keyboard.press('ArrowDown')
  await page.keyboard.press('Enter')
  await expect(pickup).toHaveValue(/Gorakhpur/)

  await page.getByRole('button', { name: 'Check fare' }).click()
  await expect(page.getByRole('alert').filter({ hasText: /./ })).toBeVisible()
})

test('/book/ is noindex and out of the sitemap', async ({ page, request }) => {
  await page.goto('/book/')
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/)
  const sitemap = await (await request.get('/sitemap.xml')).text()
  expect(sitemap).not.toContain('/book/')
})

test('no horizontal scroll on the funnel at 360px', async ({ page }) => {
  for (const path of ['/', '/book/', '/book/?type=one-way&from=gorakhpur&to=kathmandu']) {
    await page.goto(path)
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    )
    expect(overflow, path).toBeLessThanOrEqual(0)
  }
})
