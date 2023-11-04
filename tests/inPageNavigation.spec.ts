import { test, expect } from '@playwright/test'

test.describe('In-page navigation', () => {
  test('renders sections based on H2 tags', async ({ page }) => {
    await page.goto('/cargo-culting-in-software')

    const h2List = await page.locator('article h2').allTextContents()
    const sections = await page
      .locator('nav', {
        has: page.locator(`a >> text="Cargo culting in software"`),
      })
      .locator('ul li')
      .allTextContents()

    expect(h2List).toEqual(sections)
  })

  /*
    At least in Chrome and Firefox, refreshing a page will preserve the
    scroll location. (However, when Next.js is run using `next dev`,
    refreshes actually scroll you to the top.)
   */
  test('changes highlighted section depending on scroll location', async ({
    page,
  }) => {
    await page.goto('/how-not-to-design-an-sdk')

    await expect(
      page.locator('nav a >> text="How not to design an SDK"'),
    ).toHaveClass(/text-purple-800/)

    await page
      .locator('h2 >> text="Opinions about the Java SDK"')
      .scrollIntoViewIfNeeded()

    await expect(page.locator('nav a >> text="A good SDK"')).toHaveClass(
      /text-purple-800/,
    )
  })
})
