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

  // once the zoom animation has finished, the image fits within the viewport, centered
  const viewport = page.viewportSize()!
  await expect
    .poll(async () => {
      const box = (await zoomedImage.boundingBox())!
      const right = viewport.width - (box.x + box.width)
      const bottom = viewport.height - (box.y + box.height)

      return (
        box.x >= -1 &&
        box.y >= -1 &&
        right >= -1 &&
        bottom >= -1 &&
        Math.abs(box.x - right) <= 2 &&
        Math.abs(box.y - bottom) <= 2
      )
    })
    .toBe(true)

  await zoomedImage.click()
  await expect(zoomedImage).toHaveCount(0)
})
