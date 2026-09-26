import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from the appropriate .env file
const envPath = path.resolve(process.cwd(), `.env.${process.env.NODE_ENV || 'development'}`);
dotenv.config({ path: envPath });

export default defineConfig({
  
  // --------------------------------------------------------------------------
  // ZONE 1: Global Test Runner Settings
  // (Controls execution, timeouts, reporters, and worker processes)
  // --------------------------------------------------------------------------
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  reporter: [
    ['list'],
    ['html', { open: 'on-failure' }],
  ],

  // --------------------------------------------------------------------------
  // ZONE 2: Default `use` Block (Global Browser Defaults)
  // (Applies to ALL tests unless overridden by a project)
  // --------------------------------------------------------------------------
  use: {
    baseURL: process.env.BASE_URL || 'https://default.example.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10 * 1000,
    navigationTimeout: 15 * 1000,
  },

  // --------------------------------------------------------------------------
  // ZONE 3: Projects Array
  // (Configures specific browsers, auth setups, or screen resolutions)
  // --------------------------------------------------------------------------
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

  // --------------------------------------------------------------------------
  // OPTIONAL: Local Web Server Config
  // --------------------------------------------------------------------------
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});