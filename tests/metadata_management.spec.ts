import { test, expect, BrowserContext, Page } from '@playwright/test';

test.describe('Partner Portal - Metadata Management', () => {
  let context: BrowserContext;
  let page: Page;

  // Runs exactly ONCE before any test cases begin
  test.beforeAll(async ({ browser }) => {
    // Create an isolated fresh browser session
    context = await browser.newContext();
    page = await context.newPage();

    // Navigate to the target landing page
    await page.goto('https://partners.uat.fastgamernetwork.com/metadata');
    
    // Perform authentication steps if login screen is intercepted
    const usernameInput = page.locator('input[name="username"]');
    if (await usernameInput.isVisible()) {
      await usernameInput.fill('alexis.ticong@arcadian.la');
      await page.fill('input[name="password"]', '@Ndroid1234567');
      await page.click('button[type="submit"]');
      
      // Verify MFA prompt structure loads completely
      await expect(page.getByText('Authenticator app MFA')).toBeVisible();
      
      console.log('👉 PAUSED: Type your MFA token code into the opened browser, submit it, then click "Resume" in the Playwright Inspector.');
      await page.pause(); 
    }

    // Await primary portal asset initialization before proceeding to test specs
    await expect(page.locator('h1, h2', { hasText: 'Metadata Management' })).toBeVisible();
  });

  // Clean up and close down the browser context window once testing completes
  test.afterAll(async () => {
    await context.close();
  });

  test('should display sidebar navigation correctly', async () => {
    // Verify essential sidebar menu items exist
    await expect(page.getByRole('link', { name: 'Document Library' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Channel Management' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Organization Management' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Metadata Management' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Audit Logs' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Settings' })).toBeVisible();
  });

  test('should display top portal headers and user profiles', async () => {
    // Verify Organization Selector dropdown and User Profile button
    await expect(page.getByRole('button', { name: 'Select organization...' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Alexis Ticong' })).toBeVisible();
  });

  test('should display action toolbar items', async () => {
    // Verify control toolbar buttons next to the header
    await expect(page.getByRole('button', { name: 'Create Metadata' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Show Filters' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Refresh' })).toBeVisible();
  });

  test('should load the metadata data table with correct headers', async () => {
    const table = page.locator('table');
    await expect(table).toBeVisible();

    // Verify presence of table column headers
    const headers = ['Display Name', 'Category', 'Type Value', 'Active', 'Published', 'Last Updated', 'Actions'];
    for (const header of headers) {
      await expect(table.locator('th', { hasText: header })).toBeVisible();
    }
  });

  test('should verify table pagination and entry counters', async () => {
    // Verify items per page dropdown and entry text
    await expect(page.locator('text=Items per page:')).toBeVisible();
    await expect(page.locator('text=Showing 1 to 10 of 443 entries')).toBeVisible();

    // Verify pagination button controls
    await expect(page.getByRole('button', { name: 'First' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Previous' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Next' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Last' })).toBeVisible();
  });
});
