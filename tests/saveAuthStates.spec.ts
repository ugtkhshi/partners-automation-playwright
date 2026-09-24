import { expect, test, test as setup } from '@playwright/test';

test.describe('Partner Portal - Login page', () => {

  test('login with valid credentials and Super user state', async ({ page }) => {
    await page.goto('https://partners.uat.fastgamernetwork.com/public/documents', { waitUntil: 'domcontentloaded' });
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
      page.getByRole('button', { name: /log in/i }).click(),
    ]);
    await page.fill('input[name="username"]', 'yuji.takahashi@arcadian.la');
    await page.fill('input[name="password"]', 'Arc@d1an2026!');
    await page.click('button[type="submit"]');
    await expect(page.getByText('Authenticator app MFA')).toBeVisible(); 
    
    // Pause here so you can do the MFA manually once
    await page.pause(); 
    
    // Wait until you are fully logged in
    await page.waitForURL('https://partners.uat.fastgamernetwork.com/document-library', { waitUntil: 'networkidle' });
    
    // Save the signed-in state to a file
    await page.context().storageState({ path: 'playwright/.auth/superUser.json' });
  });

  test('login with valid credentials and Org Admin state', async ({ page }) => {
    await page.goto('https://partners.uat.fastgamernetwork.com/public/documents', { waitUntil: 'domcontentloaded' });
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
      page.getByRole('button', { name: /log in/i }).click(),
    ]);
    await page.fill('input[name="username"]', 'arc.apiqa+orgadmin@gmail.com');
    await page.fill('input[name="password"]', 'Arc@d1an2026!');
    await page.click('button[type="submit"]');
    await expect(page.getByText('Authenticator app MFA')).toBeVisible(); 
    
    // Pause here so you can do the MFA manually once
    await page.pause(); 

    // Wait until you are fully logged in
    await page.waitForURL('https://partners.uat.fastgamernetwork.com/document-library', { waitUntil: 'networkidle' });
    
    // Save the signed-in state to a file
    await page.context().storageState({ path: 'playwright/.auth/orgAdmin.json' });
  });

  test('login with valid credentials and Admin state', async ({ page }) => {
    await page.goto('https://partners.uat.fastgamernetwork.com/public/documents', { waitUntil: 'domcontentloaded' });
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
      page.getByRole('button', { name: /log in/i }).click(),
    ]);
    await page.fill('input[name="username"]', 'arc.apiqa+admin@gmail.com');
    await page.fill('input[name="password"]', 'Arc@d1an2026!');
    await page.click('button[type="submit"]');
    await expect(page.getByText('Authenticator app MFA')).toBeVisible(); 
    
    // Pause here so you can do the MFA manually once
    await page.pause(); 
    
    // Wait until you are fully logged in
    await page.waitForURL('https://partners.uat.fastgamernetwork.com/document-library', { waitUntil: 'networkidle' });
    
    // Save the signed-in state to a file
    await page.context().storageState({ path: 'playwright/.auth/admin.json' });
  });

  test('login with valid credentials and Content OPS state', async ({ page }) => {
    await page.goto('https://partners.uat.fastgamernetwork.com/public/documents', { waitUntil: 'domcontentloaded' });
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
      page.getByRole('button', { name: /log in/i }).click(),
    ]);
    await page.fill('input[name="username"]', 'arc.apiqa+content@gmail.com');
    await page.fill('input[name="password"]', 'Arc@d1an2026!');
    await page.click('button[type="submit"]');
    await expect(page.getByText('Authenticator app MFA')).toBeVisible(); 
    
    // Pause here so you can do the MFA manually once
    await page.pause(); 

    // Wait until you are fully logged in
    await page.waitForURL('https://partners.uat.fastgamernetwork.com/document-library', { waitUntil: 'networkidle' });
    
    // Save the signed-in state to a file
    await page.context().storageState({ path: 'playwright/.auth/contentOps.json' });
  });

  test('login with valid credentials and Content Reporting state', async ({ page }) => {
    await page.goto('https://partners.uat.fastgamernetwork.com/public/documents', { waitUntil: 'domcontentloaded' });
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
      page.getByRole('button', { name: /log in/i }).click(),
    ]);
    await page.fill('input[name="username"]', 'arc.apiqa+reporting@gmail.com');
    await page.fill('input[name="password"]', 'Arc@d1an2026!');
    await page.click('button[type="submit"]');
    await expect(page.getByText('Authenticator app MFA')).toBeVisible(); 
    
    // Pause here so you can do the MFA manually once
    await page.pause(); 

    // Wait until you are fully logged in
    await page.waitForURL('https://partners.uat.fastgamernetwork.com/document-library', { waitUntil: 'networkidle' });
    
    // Save the signed-in state to a file
    await page.context().storageState({ path: 'playwright/.auth/contentReporting.json' });
  });

  test.afterAll(async ({ browser }) => {
    await browser.close();
  });
});