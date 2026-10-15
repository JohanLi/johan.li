import { expect, test } from '@playwright/test'

test('Not found', async ({ page }) => {
  const response = await page.goto('/does-not-exist')

  expect(response.status()).toEqual(404)
  await expect(page).toHaveTitle('Page not found - Johan Li')
  await expect(
    page.getByRole('link', { name: 'Fingerprint Scanner Simulator' }),
  ).toBeVisible()
})
