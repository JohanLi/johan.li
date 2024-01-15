import { test, expect, Response } from '@playwright/test'

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

  /*
    NextImage seems to ignore your own overrides and always sets "public, max-age=315360000, immutable"
    Note the max-age being 10 years rather than 1 year
    */
  expect(response.headers()['cache-control']).toContain(
    'public, max-age=31536000',
  )

  if (compression) {
    // one of the Next.js chunks appears to be served with Brotli
    expect(response.headers()['content-encoding']).toMatch(/^gzip|br$/)
  }
}

test.describe('Cache headers', () => {
  test('johan.li', async ({ page }) => {
    const js = page.waitForResponse((response) =>
      response.url().endsWith('.js'),
    )

    const css = page.waitForResponse((response) =>
      response.url().endsWith('.css'),
    )

    const image = page.waitForResponse((response) =>
      response.headers()['content-type'].startsWith('image/'),
    )

    await page.goto('/')

    await Promise.all([
      expectCache(js),
      expectCache(css),
      expectCache(image, { compression: false }),
    ])
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
      response.headers()['content-type'].startsWith('image/'),
    )

    await page.goto('/uncharted-waters-2')

    await Promise.all([
      expectCache(js),
      expectCache(css),
      expectCache(gameData),
      expectCache(image, { compression: false }),
    ])
  })

  test('Fingerprint Scanner Simulator', async ({ page }) => {
    const js = page.waitForResponse((response) =>
      response.url().endsWith('.js'),
    )

    const css = page.waitForResponse((response) =>
      response.url().endsWith('.css'),
    )

    const image = page.waitForResponse((response) =>
      response.headers()['content-type'].startsWith('image/'),
    )

    await page.goto('/gta-online/fingerprint-scanner-simulator')

    await Promise.all([
      expectCache(js),
      expectCache(css),
      expectCache(image, { compression: false }),
    ])
  })
})
