import { expect, test } from '@playwright/test'

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

  test('changes highlighted section depending on scroll location', async ({
    page,
  }) => {
    await page.goto('/cargo-culting-in-software')

    await expect(
      page.locator('nav a >> text="Cargo culting in software"'),
    ).toHaveClass(/text-purple-800/)

    // a section is highlighted once its heading reaches the top of the viewport
    await page
      .locator('h2 >> text="Microservices"')
      .evaluate((heading) => heading.scrollIntoView({ block: 'start' }))

    await expect(page.locator('nav a >> text="Microservices"')).toHaveClass(
      /text-purple-800/,
    )
    await expect(
      page.locator('nav a >> text="Cargo culting in software"'),
    ).not.toHaveClass(/text-purple-800/)
  })
})
