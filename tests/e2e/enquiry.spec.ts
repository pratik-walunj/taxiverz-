import { expect, test, type Page } from '@playwright/test'

const REF = 'TVZ-260929-7K2M'

async function fillCorporate(page: Page) {
  await page.goto('/corporate-car-rental/')
  const form = page.getByRole('form', { name: 'Set up car travel for your company' })
  await form.getByLabel('Company').fill('Sample Traders Pvt Ltd')
  await form.getByLabel('Your name').fill('Test Manager')
  await form.getByLabel('Mobile number').fill('9876543210')
  await form.getByLabel('Trips per month').selectOption('11–50')
  return form
}

test('corporate enquiry checks the GSTIN and returns a reference', async ({ page }) => {
  let body: Record<string, unknown> | null = null
  await page.route('**/api/leads/', async (route) => {
    body = route.request().postDataJSON() as Record<string, unknown>
    await route.fulfill({ json: { ok: true, ref: REF } })
  })
  const form = await fillCorporate(page)
  await form.getByLabel('GSTIN (optional)').fill('12345')
  await form.getByRole('button', { name: 'Send enquiry' }).click()
  await expect(form.getByText(/Check the GSTIN/)).toBeVisible()
  expect(body).toBeNull()

  await form.getByLabel('GSTIN (optional)').fill('09aaacs1234a1z5')
  await form.getByRole('button', { name: 'Send enquiry' }).click()
  await expect(page.getByRole('status')).toContainText(REF)
  expect(body).toMatchObject({
    type: 'enquiry-corporate',
    details: { company: 'Sample Traders Pvt Ltd', gstin: '09AAACS1234A1Z5', monthlyTrips: '11–50' },
    contact: { name: 'Test Manager', phone: '+919876543210' },
  })
})

test('a failed enquiry hands the details to WhatsApp', async ({ page }) => {
  await page.route('**/api/leads/', (route) =>
    route.fulfill({ status: 503, json: { ok: false, ref: REF } }),
  )
  const form = await fillCorporate(page)
  await form.getByRole('button', { name: 'Send enquiry' }).click()
  const alert = page.getByRole('alert').filter({ hasText: 'WhatsApp' })
  await expect(alert).toBeVisible()
  const href = decodeURIComponent(
    (await alert.getByRole('link', { name: 'Send on WhatsApp' }).getAttribute('href')) ?? '',
  )
  expect(href).toContain('Sample Traders Pvt Ltd')
  expect(href).toContain(REF)
})

test('a destination guide renders its MDX body and links onward', async ({ page }) => {
  await page.goto('/destinations/gorakhpur/places-to-visit/')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Places to visit in Gorakhpur')
  await expect(page.getByRole('heading', { level: 2, name: 'Gorakhnath Temple' })).toBeVisible()
  await expect(page.locator('article a[href="/cabs/gorakhpur/"]')).toBeVisible()
  expect(await page.locator('article').innerText()).not.toMatch(/\{\/\*|OWNER|DRAFT/)
})

test('the legacy blog URL lands on the Gorakhpur guide', async ({ page }) => {
  await page.goto('/blog.html')
  expect(new URL(page.url()).pathname).toBe('/destinations/gorakhpur/places-to-visit/')
})

test('the contact form needs a message and returns a reference', async ({ page }) => {
  let body: Record<string, unknown> | null = null
  await page.route('**/api/leads/', async (route) => {
    body = route.request().postDataJSON() as Record<string, unknown>
    await route.fulfill({ json: { ok: true, ref: REF } })
  })
  await page.goto('/contact/')
  const form = page.getByRole('form', { name: 'Send us a message' })
  await expect(form.getByRole('link', { name: 'privacy policy' })).toHaveAttribute(
    'href',
    '/privacy/',
  )
  await form.getByLabel('Your name').fill('Test Visitor')
  await form.getByLabel('Mobile number').fill('9876543210')
  await form.getByRole('button', { name: 'Send message' }).click()
  await expect(form.getByText('Write your message.')).toBeVisible()
  await form.getByLabel('Your message').fill('Do you have an office in Pune?')
  await form.getByRole('button', { name: 'Send message' }).click()
  await expect(page.getByRole('status')).toContainText(REF)
  expect(body).toMatchObject({
    type: 'contact',
    contact: { message: 'Do you have an office in Pune?' },
  })
})

test('the attach-your-taxi form sends the vehicle', async ({ page }) => {
  let body: Record<string, unknown> | null = null
  await page.route('**/api/leads/', async (route) => {
    body = route.request().postDataJSON() as Record<string, unknown>
    await route.fulfill({ json: { ok: true, ref: REF } })
  })
  await page.goto('/attach-your-taxi/')
  const form = page.getByRole('form', { name: 'Tell us about your vehicle' })
  await form.getByLabel('Your name').fill('Ravi Owner')
  await form.getByLabel('Mobile number').fill('9876543210')
  await form.getByRole('button', { name: 'Send enquiry' }).click()
  await expect(form.getByText('Enter the vehicle model.')).toBeVisible()
  await form.getByLabel('Vehicle model').fill('Innova Crysta')
  await form.getByLabel('Year (optional)').fill('2021')
  await form.getByLabel('Permit (optional)').selectOption('All-India tourist permit')
  await form.getByLabel('City').fill('Gorakhpur')
  await form.getByRole('button', { name: 'Send enquiry' }).click()
  await expect(page.getByRole('status')).toContainText(REF)
  expect(body).toMatchObject({
    type: 'partner-attach',
    details: { vehicle: 'Innova Crysta', vehicleYear: 2021, permit: 'All-India tourist permit' },
  })
})

test('legacy about, contact and FAQ URLs reach their pages', async ({ page }) => {
  for (const [from, to] of [
    ['/about.html', '/about/'],
    ['/contact.html', '/contact/'],
    ['/faq.html', '/faq/'],
  ]) {
    await page.goto(from!)
    expect(new URL(page.url()).pathname, from).toBe(to)
  }
})
