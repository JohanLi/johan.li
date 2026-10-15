import { type Response, expect, test } from '@playwright/test'

/*
  This is being tested because, currently, this app is responsible for setting the correct
  headers for my two other projects. Those projects aren't on their own domains.

  Another potential approach is to run these pages against Lighthouse.
 */

async function expectCache(
  responsePromise: Promise<Response>,
  { compression = true } = {},
) {
  const response = await responsePromise

  expect(response.headers()['cache-control']).toContain(
    'public, max-age=31536000',
  )

  if (compression) {
    // Cloudflare serves zstd to browsers that support it, e.g. Chromium and Firefox
    expect(response.headers()['content-encoding']).toMatch(/^(gzip|br|zstd)$/)
  }
}

test.describe('Cache headers', () => {
  // the homepage has no interactive components, and therefore no JS
  test('johan.li', async ({ page }) => {
    const css = page.waitForResponse((response) =>
      response.url().endsWith('.css'),
    )

    const font = page.waitForResponse((response) =>
      response.url().endsWith('.woff2'),
    )

    const image = page.waitForResponse((response) =>
      response.headers()['content-type']?.startsWith('image/'),
    )

    await page.goto('/')

    await Promise.all([
      expectCache(css),
      expectCache(font, { compression: false }),
      expectCache(image, { compression: false }),
    ])
  })

  test('Article', async ({ page, baseURL }) => {
    const js = page.waitForResponse(
      (response) =>
        // https://static.cloudflareinsights.com/beacon.min.js interferes, hence the baseURL check
        response.url().endsWith('.js') && response.url().startsWith(baseURL),
    )

    await page.goto('/cargo-culting-in-software')

    await expectCache(js)
  })

  test('Uncharted Waters 2', async ({ page }) => {
    const js = page.waitForResponse((response) =>
      response.url().endsWith('.js'),
    )

    const css = page.waitForResponse((response) =>
      response.url().endsWith('.css'),
    )

    const gameData = page.waitForResponse((response) =>
      response.url().endsWith('.wasm'),
    )

    const image = page.waitForResponse((response) =>
      response.headers()['content-type']?.startsWith('image/'),
    )

    await page.goto('/uncharted-waters-2')

    await Promise.all([
      expectCache(js),
      expectCache(css),
      expectCache(gameData),
      expectCache(image, { compression: false }),
    ])
  })

  test('Fingerprint Scanner Simulator', async ({ page, baseURL }) => {
    const js = page.waitForResponse(
      (response) =>
        response.url().endsWith('.js') && response.url().startsWith(baseURL),
    )

    const css = page.waitForResponse((response) =>
      response.url().endsWith('.css'),
    )

    const image = page.waitForResponse((response) =>
      response.headers()['content-type']?.startsWith('image/'),
    )

    await page.goto('/gta-online/fingerprint-scanner-simulator')

    await Promise.all([
      expectCache(js),
      expectCache(css),
      expectCache(image, { compression: false }),
    ])
  })
})
