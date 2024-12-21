import { expect, test } from '@playwright/test'

test.only('Fingerprint Scanner Simulator', async ({ page }) => {
  await page.goto('/gta-online/fingerprint-scanner-simulator')

  await expect(page).toHaveTitle(
    'Fingerprint Scanner Simulator - GTA Online Casino Heist',
  )

  await expect(page.locator('img').first()).toBeVisible()

  await page.getByRole('button', { name: 'HARD' }).click()

  await expect(page.locator('img').first()).not.toBeVisible()

  await expect(
    page.getByRole('heading', { name: 'What’s this?' }),
  ).toBeVisible()
})
