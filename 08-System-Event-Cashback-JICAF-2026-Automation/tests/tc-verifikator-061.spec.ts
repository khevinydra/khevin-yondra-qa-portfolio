import { test, expect } from '@playwright/test';

test('TC-061 - UBT-001', async ({ page }) => {
  test.setTimeout(90000);

  const namaCustomer = 'faruq';

  console.log('');
  console.log('==========================================');
  console.log('TC-061 - UBT-001');
  console.log('Search berdasarkan Nama Customer');
  console.log('==========================================');

  // ==================================================
  // STEP 1 - Buka halaman Login
  // ==================================================
  console.log('STEP 1 - Buka halaman Login');

  await page.goto(
    'https://dev.ptdika.com/cashback_JICAF2026/login'
  );

  await expect(
    page.getByRole('textbox', { name: 'Username' })
  ).toBeVisible();

  // ==================================================
  // STEP 2 - Login sebagai Verifikator
  // ==================================================
  console.log('STEP 2 - Login sebagai Verifikator');

  const username = page.getByRole('textbox', {
    name: 'Username'
  });

  const password = page.getByRole('textbox', {
    name: 'Password'
  });

  await username.click();
  await username.fill('verifikatorky');

  await password.fill('verif');
  await password.press('Enter');

  await page.waitForTimeout(5000);

  // ==================================================
  // STEP 3 - Buka menu Upload Bukti Transfer
  // ==================================================
  console.log('STEP 3 - Buka menu Upload Bukti Transfer');

  const uploadMenu = page.getByRole('link', {
    name: ' Upload Bukti Transfer'
  });

  await expect(uploadMenu).toBeVisible({
    timeout: 15000
  });

  await uploadMenu.scrollIntoViewIfNeeded();
  await uploadMenu.hover();
  await page.waitForTimeout(1500);
  await uploadMenu.click();
  await page.waitForTimeout(3000);

  // ==================================================
  // STEP 4 - Input Nama Customer pada Search
  // ==================================================
  console.log(
    `STEP 4 - Search Nama Customer: ${namaCustomer}`
  );

  const searchBox = page.getByRole('searchbox', {
    name: 'Search:'
  });

  await expect(searchBox).toBeVisible({
    timeout: 10000
  });

  // Search pertama
  await searchBox.fill(namaCustomer);
  await searchBox.press('Enter');
  await page.waitForTimeout(2000);

  // Search kedua
  await searchBox.fill(namaCustomer);
  await searchBox.press('Enter');
  await page.waitForTimeout(2000);

  // ==================================================
  // STEP 5 - Validasi hasil pencarian
  // ==================================================
  console.log('STEP 5 - Validasi hasil pencarian');

  const customerResult = page.getByRole('gridcell', {
    name: namaCustomer,
    exact: true
  });

  await expect(customerResult).toBeVisible({
    timeout: 10000
  });

  // ==================================================
  // STEP 6 - Screenshot
  // ==================================================
  console.log('STEP 6 - Screenshot hasil testing');

  await page.screenshot({
    path: 'screenshots/TC-061-UBT-001.png',
    fullPage: true
  });

  console.log('');
  console.log('==========================================');
  console.log('TC-061 SELESAI');
  console.log('==========================================');
});