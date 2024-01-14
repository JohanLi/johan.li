import { test, expect } from '@playwright/test'

/*
  TODO these headers can be set in different places:
    - Next.js' defaults
    - Next.js config headers()
    - Cloudflare

  Another consideration is that I'm running /uncharted-waters-2 and /gta-online/fingerprint-scanner-simulator
  through this app.
 */

test.skip('Cache-Control', async ({ request }) => {
  const response = await request.get(
    '/favicon-7b2b909ae59ca59d32fae4656050a4bc.ico',
  )
  expect(response.headers()['cache-control']).toEqual(
    'public, max-age=31536000',
  )
})
