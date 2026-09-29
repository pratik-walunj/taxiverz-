import { expect, test, type Page } from '@playwright/test'

/**
 * INP budget (CLAUDE.md: < 200 ms) on the interactions that matter, with the
 * CPU throttled 4× like Lighthouse's mobile run. Lighthouse's navigation run
 * can't measure INP, so we record Event Timing entries in the page.
 */
const INP_BUDGET_MS = 200

async function throttle(page: Page) {
  const cdp = await page.context().newCDPSession(page)
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 })
}

async function observe(page: Page) {
  await page.evaluate(() => {
    const w = window as unknown as { __inp: number[] }
    w.__inp = []
    new PerformanceObserver((list) => {
      for (const e of list.getEntries() as PerformanceEventTiming[])
        if (e.interactionId) w.__inp.push(e.duration)
    }).observe({ type: 'event', buffered: true, durationThreshold: 16 } as PerformanceObserverInit)
  })
}

async function worst(page: Page) {
  // Let the last event's entry be delivered.
  await page.waitForTimeout(500)
  return page.evaluate(() => Math.max(0, ...(window as unknown as { __inp: number[] }).__inp))
}

test('fare box interactions stay under the INP budget', async ({ page }) => {
  await page.goto('/')
  await page.waitForLoadState('networkidle')
  await throttle(page)
  await observe(page)
  await page.getByRole('tab', { name: 'Round trip' }).click()
  await page.getByRole('tab', { name: 'One way' }).click()
  const pickup = page.getByRole('combobox', { name: 'Pickup' })
  await pickup.click()
  await pickup.pressSequentially('Gorakh', { delay: 60 })
  await page
    .getByRole('option', { name: /Gorakhpur/ })
    .first()
    .click()
  expect(await worst(page)).toBeLessThan(INP_BUDGET_MS)
})

test('opening and closing the mobile menu stays under the INP budget', async ({ page }, info) => {
  test.skip(info.project.name !== 'mobile-360', 'the menu button is mobile-only')
  await page.goto('/')
  await page.waitForLoadState('networkidle')
  await throttle(page)
  await observe(page)
  await page.getByRole('button', { name: 'Menu' }).click()
  await expect(page.getByRole('dialog', { name: 'Menu' })).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog', { name: 'Menu' })).toBeHidden()
  expect(await worst(page)).toBeLessThan(INP_BUDGET_MS)
})

test('the mobile menu traps focus and returns it to the button', async ({ page }, info) => {
  test.skip(info.project.name !== 'mobile-360', 'the menu button is mobile-only')
  await page.goto('/')
  const button = page.getByRole('button', { name: 'Menu' })
  await button.click()
  const dialog = page.getByRole('dialog', { name: 'Menu' })
  await expect(dialog).toBeVisible()
  for (let i = 0; i < 8; i++) {
    await page.keyboard.press('Tab')
    expect(await dialog.evaluate((d) => d.contains(document.activeElement))).toBe(true)
  }
  await dialog.getByRole('button', { name: 'Close menu' }).click()
  await expect(dialog).toBeHidden()
  await expect(button).toBeFocused()
})
