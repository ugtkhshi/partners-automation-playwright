import path from 'path';
import { test, expect } from '@playwright/test';

test.use({
  storageState: path.join(__dirname, '../playwright/.auth/superUser.json'),
});

test('view dashboard without dealing with MFA', async ({ page }) => {
  // This page will load completely logged in, skipping the MFA screen entirely
  await page.goto('https://partners.uat.fastgamernetwork.com/document-library', { waitUntil: 'networkidle' });

  await expect(page.getByText('Partner Portal')).toBeVisible();
  await page.pause(); 

  console.log(await page.context().cookies());
});


