import { test, expect } from '@playwright/test';

test('TC-073 - RVT-002', async ({ page }) => {
  test.setTimeout(90000);

  const verifikatorName = 'adminky';

  console.log('');
  console.log('==========================================');
  console.log('TC-073 - RVT-002');
  console.log('Filter Report Verificator berdasarkan Verifikator Name');
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

  // STEP 4 - Input Verifikator Name
  console.log('STEP 4 - Input Verifikator Name');

  const searchBox = page.getByRole('searchbox', {
    name: 'Search:'
  });

  await expect(searchBox).toBeVisible({ timeout: 10000 });

  await searchBox.fill(verifikatorName);
  await searchBox.press('Enter');
  await page.waitForTimeout(2000);

  // STEP 5 - Search ulang
  console.log('STEP 5 - Search ulang Verifikator Name');

  await searchBox.fill(verifikatorName);
  await searchBox.press('Enter');
  await page.waitForTimeout(3000);

  // STEP 6 - Validasi kolom Verifikator Name
  console.log('STEP 6 - Validasi hasil pencarian');

  const verifikatorColumn = page.getByRole('columnheader', {
    name: 'Verifikator Name'
  });

  await expect(verifikatorColumn).toBeVisible({ timeout: 10000 });

  const result = page.getByRole('gridcell', {
    name: verifikatorName,
    exact: true
  });

  await expect(result).toBeVisible({ timeout: 10000 });

  // STEP 7 - Klik hasil
  console.log('STEP 7 - Klik hasil Verifikator Name');

  await result.scrollIntoViewIfNeeded();
  await result.hover();
  await page.waitForTimeout(1500);
  await result.click();
  await page.waitForTimeout(2000);

  // STEP 8 - Screenshot
  console.log('STEP 8 - Screenshot hasil testing');

  await page.screenshot({
    path: 'screenshots/TC-073-RVT-002.png',
    fullPage: true
  });

  console.log('');
  console.log('==========================================');
  console.log('TC-073 SELESAI');
  console.log('==========================================');
});