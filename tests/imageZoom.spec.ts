import { expect, test } from '@playwright/test'

test('Zooming an image', async ({ page }) => {
  await page.goto('/cargo-culting-in-software')

  const image = page.locator('article img.cursor-zoom-in:visible')
  await image.scrollIntoViewIfNeeded()
  // the image becomes zoomable once the larger version has been preloaded
  await expect(image).toBeVisible()
  await image.click()

  const zoomedImage = page.locator('img.cursor-zoom-out')
  await expect(zoomedImage).toBeVisible()

  await zoomedImage.click()
  await expect(zoomedImage).toHaveCount(0)
})
