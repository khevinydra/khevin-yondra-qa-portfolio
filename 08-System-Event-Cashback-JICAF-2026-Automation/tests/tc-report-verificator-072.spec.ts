import { test, expect } from '@playwright/test';

test('TC-072 - RVT-001', async ({ page }) => {
  test.setTimeout(90000);

  console.log('');
  console.log('==========================================');
  console.log('TC-072 - RVT-001');
  console.log('Filter Report Verificator berdasarkan Tanggal');
  console.log('==========================================');

  // STEP 1 - Buka halaman Login
  console.log('STEP 1 - Buka halaman Login');
  await page.goto('https://dev.ptdika.com/cashback_JICAF2026/login');

  // STEP 2 - Login sebagai Admin
  console.log('STEP 2 - Login sebagai Admin');

  const username = page.getByRole('textbox', { name: 'Username' });
  const password = page.getByRole('textbox', { name: 'Password' });
  const loginButton = page.getByRole('button', { name: 'Login' });

  await username.fill('adminky');
  await password.fill('admin');

  await loginButton.hover();
  await page.waitForTimeout(1500);
  await loginButton.click();
  await page.waitForTimeout(3000);

  // STEP 3 - Buka Report Verificator
  console.log('STEP 3 - Buka menu Report Verificator');

  const reportVerificatorMenu = page.getByRole('link', {
    name: ' Report Verificator'
  });

  await expect(reportVerificatorMenu).toBeVisible({ timeout: 15000 });
  await reportVerificatorMenu.scrollIntoViewIfNeeded();
  await reportVerificatorMenu.hover();
  await page.waitForTimeout(1500);
  await reportVerificatorMenu.click();
  await page.waitForTimeout(2000);

  // STEP 4 - Input tanggal filter
  console.log('STEP 4 - Input tanggal filter');

  const startDate = page.locator('input[name="start_date"]');

  await expect(startDate).toBeVisible({ timeout: 10000 });
  await startDate.fill('2026-09-14');
  await expect(startDate).toHaveValue('2026-09-14');

  // STEP 5 - Klik Filter
  console.log('STEP 5 - Klik Filter');

  const filterButton = page.getByRole('button', { name: 'Filter' });

  await filterButton.scrollIntoViewIfNeeded();
  await filterButton.hover();
  await page.waitForTimeout(1500);
  await filterButton.click();
  await page.waitForTimeout(3000);

  // STEP 6 - Validasi data Report Verificator
  console.log('STEP 6 - Validasi data Report Verificator');

  await expect(page.getByRole('link', {
    name: ' Report Verificator'
  })).toBeVisible();

  // STEP 7 - Screenshot
  console.log('STEP 7 - Screenshot hasil testing');

  await page.screenshot({
    path: 'screenshots/TC-072-RVT-001.png',
    fullPage: true
  });

  console.log('');
  console.log('==========================================');
  console.log('TC-072 SELESAI');
  console.log('==========================================');
});