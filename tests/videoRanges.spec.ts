import { expect, test } from '@playwright/test'

// Browsers need Range requests to seek in a video. See worker/index.ts.
test.describe('Videos', () => {
  test('respond to Range requests with partial content', async ({
    request,
  }) => {
    const response = await request.get('/videos/rush-hour.mp4', {
      headers: { Range: 'bytes=100-199' },
    })

    expect(response.status()).toEqual(206)
    expect(response.headers()['content-range']).toMatch(/^bytes 100-199\/\d+$/)
    expect(response.headers()['content-type']).toEqual('video/mp4')
    expect((await response.body()).length).toEqual(100)
  })

  test('respond to requests without a Range in full', async ({ request }) => {
    const response = await request.head('/videos/rush-hour.mp4')

    expect(response.status()).toEqual(200)
    expect(response.headers()['accept-ranges']).toEqual('bytes')
  })

  test('that don’t exist get the 404 page', async ({ request }) => {
    const response = await request.get('/videos/does-not-exist.mp4')

    expect(response.status()).toEqual(404)
    expect(await response.text()).toContain('This page could not be found')
  })
})
