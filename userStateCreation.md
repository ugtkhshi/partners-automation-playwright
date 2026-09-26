Method 3: Save and Reuse Authentication State (Best for CI/CD Pipelines)
In a professional or CI/CD environment, you don't want to log in and face MFA on every single test run. The industry standard is to log in manually once, save the cookies and storage state to a JSON file, and inject that session into your subsequent tests so they start already logged in.

Step 1: Create a setup script to capture the session:

TypeScript
// auth.setup.ts
import { test as setup } from '@playwright/test';

setup('authenticate', async ({ page }) => {
  await page.goto('https://example.com/login');
  await page.fill('#username', 'your-email@company.com');
  await page.fill('#password', 'your-password');
  await page.click('#submit-btn');

  // Pause here so you can do the MFA manually once
  await page.pause(); 

  // Wait until you are fully logged in
  await page.waitForURL('https://example.com/dashboard');

  // Save the signed-in state to a file
  await page.context().storageState({ path: 'playwright/.auth/user.json' });
});


Step 2: Consume the saved state in your regular tests:

TypeScript
// dashboard.spec.ts
import { test } from '@playwright/test';

// Tell this test file to use the saved cookies/session
test.use({ storageState: 'playwright/.auth/user.json' });

test('view dashboard without dealing with MFA', async ({ page }) => {
  // This page will load completely logged in, skipping the MFA screen entirely
  await page.goto('https://example.com/dashboard');
  
  // Your test assertions here...
});