import { expect, test } from '@playwright/test'

/*
  This requires Cloudflare's "Always Use HTTPS" setting to be enabled for the
  johan.li zone (SSL/TLS → Edge Certificates).
 */
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
