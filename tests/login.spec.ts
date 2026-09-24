import { test, expect } from '@playwright/test';

test.describe('Partner Portal - Login page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://partners.uat.fastgamernetwork.com/public/documents', { waitUntil: 'networkidle' });
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
      page.getByRole('button', { name: /log in/i }).click(),
    ]);
  });

  test('should display the login form', async ({ page }) => {
  
    await expect(page.locator('form')).toBeVisible();
    await expect(page.getByLabel('Email Address')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.getByRole('button', { name: /sign in|login/i })).toBeVisible();
  });

  test('login with valid credentials', async ({ page }) => {
    await page.fill('input[name="username"]', 'yuji.takahashi@arcadian.la');
    await page.fill('input[name="password"]', 'Arc@d1an2026!');
    await page.click('button[type="submit"]');
    await expect(page.getByText('Authenticator app MFA')).toBeVisible(); 

    // Pause here so you can do the MFA manually once
    await page.pause(); 
  });

  test('should navigate to user prompt page when back button is clicked during MFA state', async ({ page }) => {
    // First, reach MFA state
    await page.fill('input[name="username"]', 'yuji.takahashi@arcadian.la');
    await page.fill('input[name="password"]', 'Arc@d1an2026!');
    await page.click('button[type="submit"]');
    await expect(page.getByText('Authenticator app MFA')).toBeVisible();

    // Then test back button behavior
    await page.goBack();
    await page.waitForLoadState('networkidle');
    await expect(page.getByText(/you're still signed in|Sign in again/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /yuji\.takahashi@arcadian\.la/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /sign in as a different user/i })).toBeVisible();
  });

  test.afterAll(async ({ browser }) => {
    await browser.close();
  });
});



