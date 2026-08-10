import { test, expect } from '@playwright/test';

test.describe('Partner Portal - Public Documents', () => {

  test('should display public documents table', async ({ page }) => {
    await page.goto('https://partners.uat.fastgamernetwork.com/public/documents', { waitUntil: 'networkidle' });

    await expect(page.getByText('Partner Portal')).toBeVisible();
    await expect(page.getByText('Public Documents')).toBeVisible();

    const table = page.locator('table');
    await expect(table).toBeVisible();
  });

  test('should verify document metadata', async ({ page }) => {
    await page.goto('https://partners.uat.fastgamernetwork.com/public/documents', { waitUntil: 'networkidle' });

    const rows = page.locator('tbody tr');
    const rowCount = await rows.count();
    expect(rowCount).toBeGreaterThan(1);

    const firstRow = rows.nth(0);
    const firstRowCells = firstRow.locator('td');

    await expect(firstRowCells.nth(0)).not.toHaveText('');
    await expect(firstRowCells.nth(1)).not.toHaveText('');
    await expect(firstRowCells.nth(2)).toHaveText(/\d+(?:\.\d+)?\s*(KB|MB|GB)/i);
    await expect(firstRowCells.nth(3)).toHaveText(/\d{4}-\d{2}-\d{2}/);
    await expect(firstRowCells.nth(4)).toHaveText(/v\d+/i);

    const secondRow = rows.nth(1);
    const secondRowCells = secondRow.locator('td');

    await expect(secondRowCells.nth(0)).not.toHaveText('');
    await expect(secondRowCells.nth(1)).not.toHaveText('');
    await expect(secondRowCells.nth(2)).toHaveText(/\d+(?:\.\d+)?\s*(KB|MB|GB)/i);
    await expect(secondRowCells.nth(3)).toHaveText(/\d{4}-\d{2}-\d{2}/);
    await expect(secondRowCells.nth(4)).toHaveText(/v\d+/i);
  });

  test('should open document preview', async ({ page }) => {
    await page.goto('https://partners.uat.fastgamernetwork.com/public/documents', { waitUntil: 'networkidle' });

    const viewButton = page.getByRole('button', { name: /view/i }).first();

    const [newPage] = await Promise.all([
      page.context().waitForEvent('page'),
      viewButton.click()
    ]);

    await newPage.waitForLoadState();

    await expect(newPage).toHaveURL(/\.pdf/i);
  });

  test('should download document', async ({ page }) => {
    await page.goto('https://partners.uat.fastgamernetwork.com/public/documents', { waitUntil: 'networkidle' });

    const downloadButton = page.getByRole('button', { name: /download/i }).first();

    const download = await Promise.all([
      page.waitForEvent('download'),
      downloadButton.click()
    ]);

    const suggestedFilename = await download[0].suggestedFilename();

    expect(suggestedFilename).toContain('.pdf');
  });

  test('should display login button', async ({ page }) => {
    await page.goto('https://partners.uat.fastgamernetwork.com/public/documents', { waitUntil: 'networkidle' });

    const loginButton = page.getByRole('button', { name: /log in/i });

    await expect(loginButton).toBeVisible();
    await expect(loginButton).toBeEnabled();
  });

  test('should navigate to login page when login button is clicked', async ({ page }) => {
    await page.goto('https://partners.uat.fastgamernetwork.com/public/documents', { waitUntil: 'networkidle' });

    const loginButton = page.getByRole('button', { name: /log in/i });

    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle' }),
      loginButton.click()
    ]);

    await expect(page).toHaveURL('https://partners.uat.fastgamernetwork.com/login');
  });
});