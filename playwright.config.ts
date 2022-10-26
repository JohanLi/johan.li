import type { PlaywrightTestConfig } from '@playwright/test'
import { devices } from '@playwright/test'

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
    /*
      localhost results in `apiRequestContext.get: connect ECONNREFUSED ::1:3000`
      when calling request.get() for some reason
     */
    baseURL: 'http://127.0.0.1:3000',
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
  webServer: {
    command: 'npm run build && npm run start:prod',
    port: 3000,
  },
}

export default config
