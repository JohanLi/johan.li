import type { PlaywrightTestConfig } from '@playwright/test'
import { devices } from '@playwright/test'

let baseURL = 'http://localhost:3000'
let webServer = {
  command: 'pnpm start',
  port: 3000,
  stdout: 'ignore',
  stderr: 'pipe',
} as const
let testMatch = 'tests/*.spec.ts'

if (process.env.PRODUCTION_URL) {
  baseURL = process.env.PRODUCTION_URL
  webServer = undefined
  testMatch = 'tests/production/*.spec.ts'
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
