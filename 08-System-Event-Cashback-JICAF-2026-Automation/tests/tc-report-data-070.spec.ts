import { test, expect } from '@playwright/test';

test('TC-070 - RPD-001', async ({ page }) => {
  test.setTimeout(90000);

  console.log('');
  console.log('==========================================');
  console.log('TC-070 - RPD-001');
  console.log('Filter Data Berdasarkan Status');
  console.log('==========================================');

  // ==========================================
  // STEP 1 - Buka halaman Login
  // ==========================================
  console.log('STEP 1 - Buka halaman Login');

  await page.goto(
    'https://dev.ptdika.com/cashback_JICAF2026/login'
  );

  // ==========================================
  // STEP 2 - Login sebagai Admin
  // ==========================================
  console.log('STEP 2 - Login sebagai Admin');

  const username = page.getByRole('textbox', {
    name: 'Username'
  });

  const password = page.getByRole('textbox', {
    name: 'Password'
  });

  const loginButton = page.getByRole('button', {
    name: 'Login'
  });

  await username.fill('adminky');
  await password.fill('admin');

  await loginButton.hover();
  await page.waitForTimeout(1500);
  await loginButton.click();
  await page.waitForTimeout(3000);

  // ==========================================
  // STEP 3 - Buka menu Report Data
  // ==========================================
  console.log('STEP 3 - Buka menu Report Data');

  const reportDataMenu = page.getByRole('link', {
    name: ' Report Data'
  });

  await expect(reportDataMenu).toBeVisible({
    timeout: 15000
  });

  await reportDataMenu.scrollIntoViewIfNeeded();
  await reportDataMenu.hover();
  await page.waitForTimeout(1500);
  await reportDataMenu.click();
  await page.waitForTimeout(2000);

  // ==========================================
  // STEP 4 - Filter Status Kosong
  // ==========================================
  console.log('STEP 4 - Filter Status Kosong');

  const statusDropdown = page.locator('#status');

  await expect(statusDropdown).toBeVisible({
    timeout: 10000
  });

  await statusDropdown.selectOption('');

  const filterButton = page.getByRole('button', {
    name: ' Filter'
  });

  await filterButton.hover();
  await page.waitForTimeout(1500);
  await filterButton.click();
  await page.waitForTimeout(2000);

  // ==========================================
  // STEP 5 - Filter Status 1
  // ==========================================
  console.log('STEP 5 - Filter Status 1');

  await statusDropdown.selectOption('1');

  await filterButton.hover();
  await page.waitForTimeout(1500);
  await filterButton.click();
  await page.waitForTimeout(2000);

  // ==========================================
  // STEP 6 - Filter Status 2
  // ==========================================
  console.log('STEP 6 - Filter Status 2');

  await statusDropdown.selectOption('2');

  await filterButton.hover();
  await page.waitForTimeout(1500);
  await filterButton.click();
  await page.waitForTimeout(2000);

  // ==========================================
  // STEP 7 - Validasi data Status 2
  // ==========================================
  console.log('STEP 7 - Validasi data Status 2');

  const statusTwoLink = page.getByRole('link', {
    name: '2',
    exact: true
  });

  await expect(statusTwoLink).toBeVisible({
    timeout: 10000
  });

  await statusTwoLink.hover();
  await page.waitForTimeout(1500);
  await statusTwoLink.click();
  await page.waitForTimeout(2000);

  // ==========================================
  // STEP 8 - Filter Status 3
  // ==========================================
  console.log('STEP 8 - Filter Status 3');

  await statusDropdown.selectOption('3');

  await filterButton.hover();
  await page.waitForTimeout(1500);
  await filterButton.click();
  await page.waitForTimeout(2000);

  // ==========================================
  // STEP 9 - Filter Status 4
  // ==========================================
  console.log('STEP 9 - Filter Status 4');

  await statusDropdown.selectOption('4');

  await filterButton.hover();
  await page.waitForTimeout(1500);
  await filterButton.click();
  await page.waitForTimeout(2000);

  // ==========================================
  // STEP 10 - Validasi halaman Report Data
  // ==========================================
  console.log('STEP 10 - Validasi halaman Report Data');

  await expect(page.locator('.card-body')).toBeVisible({
    timeout: 10000
  });

  // ==========================================
  // STEP 11 - Screenshot
  // ==========================================
  console.log('STEP 11 - Screenshot hasil testing');

  await page.screenshot({
    path: 'screenshots/TC-070-RPD-001.png',
    fullPage: true
  });

  console.log('');
  console.log('==========================================');
  console.log('TC-070 SELESAI');
  console.log('==========================================');
});