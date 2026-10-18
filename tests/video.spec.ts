import { type Page, expect, test } from '@playwright/test'

// see src/components/video/VideoPlayer.tsx
async function getHydratedVideo(page: Page) {
  const video = page.locator('article video')
  await video.scrollIntoViewIfNeeded()
  // Astro removes the ssr attribute once an island has been hydrated
  await expect(page.locator('astro-island:not([ssr]) video')).toHaveCount(1)
  return video
}

function isPaused(page: Page) {
  return page
    .locator('article video')
    .evaluate((v: HTMLVideoElement) => v.paused)
}

test('Videos with sound play when the poster is clicked', async ({ page }) => {
  await page.goto('/why-do-we-laugh-a-personal-reflection')
  await getHydratedVideo(page)
  expect(await isPaused(page)).toBe(true)

  const play = page.getByRole('button', { name: 'Play video' })
  await play.click()

  await expect(play).toHaveCount(0)
  expect(await isPaused(page)).toBe(false)
})
