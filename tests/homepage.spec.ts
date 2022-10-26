import { test, expect } from '@playwright/test'

test('Homepage', async ({ page }) => {
  await page.goto('/')

  await expect(page).toHaveTitle(/Johan Li -/)

  const articleLinks = page
    .locator('h2 >> text="Articles"')
    .locator('..')
    .locator('a')

  expect(await articleLinks.count()).toBeGreaterThan(0)

  await articleLinks.last().click()

  await expect(page).toHaveTitle(/Cargo culting in software - Johan Li/)
})
