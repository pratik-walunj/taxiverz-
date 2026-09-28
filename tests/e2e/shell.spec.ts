import { expect, test } from '@playwright/test'

test('home page renders its heading and contact actions', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(/Taxi service in Gorakhpur/)
  await expect(page.locator('a[href="tel:+918576000083"]:visible').first()).toBeVisible()
  await expect(page.locator('a[href^="https://wa.me/918576000083"]:visible').first()).toBeVisible()
})

test('a legacy URL lands on its effective destination', async ({ page }) => {
  const response = await page.goto('/Gorakhpur-To-Kathmandu.HTML')
  expect(response?.status()).toBe(200)
  expect(new URL(page.url()).pathname).toBe('/')
})

test('unknown pages show the 404 page', async ({ page }) => {
  const response = await page.goto('/no-such-page/')
  expect(response?.status()).toBe(404)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Page not found')
})
