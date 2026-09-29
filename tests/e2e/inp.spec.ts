import { expect, test, type Page } from '@playwright/test'

/**
 * Interaction latency on the interactions that matter, CPU throttled 4× like
 * Lighthouse's mobile run (Lighthouse's navigation run can't measure INP, so
 * we record Event Timing entries in the page).
 *
 * The CLAUDE.md budget is INP < 200 ms. On the development PC the CPU
 * benchmark often sits at 500–700 (Lighthouse calibrates for ~1000+), so 4×
 * here is closer to 6–8× and a hard 200 ms assertion would measure the PC,
 * not the site. These tests therefore guard against regressions at 1000 ms
 * (the 1.2 s first-keystroke problem fixed in Phase 7 would fail) and log the
 * samples; the 200 ms budget is verified with field data (web-vitals → GA4,
 * Phase 8). See docs/PROGRESS.md, Phase 7.
 */
const INP_BUDGET_MS = 200
const REGRESSION_GUARD_MS = 1000

async function throttle(page: Page) {
  const cdp = await page.context().newCDPSession(page)
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 })
}

async function observe(page: Page) {
  await page.evaluate(() => {
    const w = window as unknown as { __inp: [string, number][] }
    w.__inp = []
    new PerformanceObserver((list) => {
      for (const e of list.getEntries() as PerformanceEventTiming[])
        if (e.interactionId) w.__inp.push([e.name, e.duration])
    }).observe({ type: 'event', buffered: true, durationThreshold: 16 } as PerformanceObserverInit)
  })
}

async function worst(page: Page, label: string) {
  // Let the last event's entry be delivered.
  await page.waitForTimeout(500)
  const all = await page.evaluate(() => (window as unknown as { __inp: [string, number][] }).__inp)
  const max = Math.max(0, ...all.map(([, d]) => d))
  console.log(
    `${label}: worst ${Math.round(max)} ms (budget ${INP_BUDGET_MS}) — ${all
      .map(([n, d]) => `${n} ${Math.round(d)}`)
      .join(', ')}`,
  )
  return max
}

test('fare box interactions: no latency regression', async ({ page }, info) => {
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
  expect(await worst(page, `fare box ${info.project.name}`)).toBeLessThan(REGRESSION_GUARD_MS)
})

test('mobile menu open and close: no latency regression', async ({ page }, info) => {
  test.skip(info.project.name !== 'mobile-360', 'the menu button is mobile-only')
  await page.goto('/')
  await page.waitForLoadState('networkidle')
  await throttle(page)
  await observe(page)
  await page.getByRole('button', { name: 'Menu' }).click()
  await expect(page.getByRole('dialog', { name: 'Menu' })).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog', { name: 'Menu' })).toBeHidden()
  expect(await worst(page, 'menu')).toBeLessThan(REGRESSION_GUARD_MS)
})

test('the mobile menu keeps focus off the page and returns it to the button', async ({
  page,
}, info) => {
  test.skip(info.project.name !== 'mobile-360', 'the menu button is mobile-only')
  await page.goto('/')
  const button = page.getByRole('button', { name: 'Menu' })
  await button.click()
  const dialog = page.getByRole('dialog', { name: 'Menu' })
  await expect(dialog).toBeVisible()
  // A modal <dialog> makes the page inert: Tab cycles through the dialog and the
  // browser's own UI (reported as <body>), never onto page content behind it.
  for (let i = 0; i < 8; i++) {
    await page.keyboard.press('Tab')
    const where = await dialog.evaluate(
      (d) => d.contains(document.activeElement) || document.activeElement === document.body,
    )
    expect(where).toBe(true)
  }
  await dialog.getByRole('button', { name: 'Close menu' }).click()
  await expect(dialog).toBeHidden()
  await expect(button).toBeFocused()
})
