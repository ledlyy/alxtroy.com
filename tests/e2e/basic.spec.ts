import AxeBuilder from '@axe-core/playwright'
import { test, expect } from '@playwright/test'

test('home loads with no critical a11y issues', async ({ page }) => {
  await page.goto('/')
  // Prefer reduced motion for stability
  await page.emulateMedia({ reducedMotion: 'reduce' })
  const accessibilityScanResults = await new AxeBuilder({ page }).analyze()
  const critical = accessibilityScanResults.violations.filter((v) => v.impact === 'critical')
  expect(critical).toHaveLength(0)
})

test('cookie banner can accept/deny', async ({ page }) => {
  await page.goto('/')
  const banner = page.getByRole('dialog', { name: /your privacy matters/i })
  await expect(banner).toBeVisible()
  await page.getByRole('button', { name: /accept/i }).click()
  await expect(banner).toBeHidden()
})
