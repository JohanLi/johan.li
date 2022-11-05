import { test, expect } from '@playwright/test'

test('Cache-Control', async ({ request }) => {
  const response = await request.get(
    '/favicon-7b2b909ae59ca59d32fae4656050a4bc.ico',
  )
  expect(response.headers()['cache-control']).toEqual(
    'public, max-age=31536000',
  )
})
