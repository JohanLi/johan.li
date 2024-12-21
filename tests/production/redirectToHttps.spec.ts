import { expect, test } from '@playwright/test'

// this is handled by Fly.io through fly.toml
test('responds to http but redirects to https', async ({
  request,
  baseURL,
}) => {
  const response = await request.get(baseURL.replace('https://', 'http://'), {
    // makes it work like redirect: 'manual' https://developer.mozilla.org/en-US/docs/Web/API/fetch#redirect
    maxRedirects: 0,
  })

  expect(response.status()).toEqual(301)
  expect(response.headers()['location']).toEqual(baseURL)
})
