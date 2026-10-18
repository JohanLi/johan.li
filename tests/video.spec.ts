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

test.describe('Video clips', () => {
  test('play by themselves, and can be paused', async ({ page }) => {
    await page.goto('/returning-to-the-game-that-started-it-all')
    await getHydratedVideo(page)

    const pause = page.getByRole('button', { name: 'Pause video' })
    await expect(pause).toBeVisible()
    expect(await isPaused(page)).toBe(false)

    await pause.click()
    await expect(page.getByRole('button', { name: 'Play video' })).toBeVisible()
    expect(await isPaused(page)).toBe(true)
  })

  test.describe('when reduced motion is preferred', () => {
    test('only play when asked to', async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'reduce' })
      await page.goto('/returning-to-the-game-that-started-it-all')
      await getHydratedVideo(page)

      const play = page.getByRole('button', { name: 'Play video' })
      await expect(play).toBeVisible()
      expect(await isPaused(page)).toBe(true)

      await play.click()
      await expect(
        page.getByRole('button', { name: 'Pause video' }),
      ).toBeVisible()
      expect(await isPaused(page)).toBe(false)
    })
  })
})

test('Videos with sound play when the poster is clicked', async ({ page }) => {
  await page.goto('/why-do-we-laugh-a-personal-reflection')
  await getHydratedVideo(page)
  expect(await isPaused(page)).toBe(true)

  const play = page.getByRole('button', { name: 'Play video' })
  await play.click()

  await expect(play).toHaveCount(0)
  expect(await isPaused(page)).toBe(false)
})
