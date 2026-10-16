import { type PlaywrightTestConfig, devices } from '@playwright/test'

/*
  Runs against the production build, served by wrangler the same way
  Cloudflare Workers would (see wrangler.jsonc and public/_headers).
 */
let baseURL = 'http://localhost:8787'
let webServer = {
  command: 'pnpm build && pnpm preview',
  url: baseURL,
  reuseExistingServer: !process.env.CI,
  timeout: 120000,
  stdout: 'ignore',
  stderr: 'pipe',
} as const
let testMatch: string | string[] = 'tests/*.spec.ts'

if (process.env.PRODUCTION_URL) {
  baseURL = process.env.PRODUCTION_URL
  webServer = undefined
  // videos are served from R2 in production, so they're worth testing there too
  testMatch = ['tests/production/*.spec.ts', 'tests/videoRanges.spec.ts']
}

const config: PlaywrightTestConfig = {
  testDir: './tests',
  timeout: 30000,
  expect: {
    timeout: 5000,
  },
  fullyParallel: true,
  reporter: [['html', { open: 'never', outputFolder: './tests/report' }]],
  use: {
    actionTimeout: 0,
    baseURL,
    trace: 'retain-on-failure',
  },
  outputDir: './tests/results',
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
      },
    },
  ],
  webServer,
  testMatch,
}

export default config
