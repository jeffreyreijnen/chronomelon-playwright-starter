import { defineConfig, devices } from '@playwright/test';
import env from './env';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: env.CI ? 1 : 0,
  workers: undefined,
  reporter: [
    ...(env.CI ? ([['list']] as const) : ([] as const)),
    ['html', { open: 'never' }] as const,
    ...(env.ENABLE_ALLURE ? ([['allure-playwright']] as const) : ([] as const)),
  ],
  outputDir: 'test-results',
  expect: {
    timeout: 10_000,
  },
  use: {
    headless: true,
    actionTimeout: 0,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    testIdAttribute: 'data-test',
    baseURL: env.BASE_URL_SAUCE, // Default; tests can override or use explicit URLs
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});

