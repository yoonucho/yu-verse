import { defineConfig, devices } from '@playwright/test';


/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'yu-books',
      testDir: './tests/yu-books',
      use: { ...devices['Desktop Chrome'], baseURL: 'http://127.0.0.1:3000' },
    },
    {
      name: 'yu-calendar',
      testDir: './tests/yu-calendar',
      use: { ...devices['Desktop Chrome'], baseURL: 'http://127.0.0.1:3001' },
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer: [
    {
      command: 'pnpm --filter yu-books dev',
      url: 'http://127.0.0.1:3000',
      reuseExistingServer: !process.env.CI,
    },
    {
      command: 'pnpm --filter yu-calendar dev',
      url: 'http://127.0.0.1:3001',
      reuseExistingServer: !process.env.CI,
    },
  ],
});