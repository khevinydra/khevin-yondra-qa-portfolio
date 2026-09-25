import { test, expect } from '@playwright/test';

test.setTimeout(90000);

test('TC-023 - IM-001', async ({ page }) => {

  console.log('');
  console.log('==========================================');
  console.log('TC-023 - IM-001');
  console.log('Filter Input Merchant berdasarkan Nama Merchant');
  console.log('==========================================');

  // ==========================================
  // DATA TEST
  // ==========================================

  const namaMerchant = 'Test1';

  console.log('');
  console.log('DATA TEST');
  console.log(`Nama Merchant: ${namaMerchant}`);

  // ==========================================
  // STEP 1 - Membuka halaman Login
  // ==========================================

  console.log('');
  console.log('STEP 1 - Membuka halaman Login');

  await page.goto(
    'https://dev.ptdika.com/cashback_JICAF2026/login',
    {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    }
  );

  await expect(
    page.getByRole('textbox', { name: 'Username' })
  ).toBeVisible({
    timeout: 10000
  });

  console.log('PASS - Halaman Login berhasil dibuka.');

  // ==========================================
  // STEP 2 - Login sebagai Admin
  // ==========================================

  console.log('');
  console.log('STEP 2 - Login sebagai Admin');

  const usernameField = page.getByRole(
    'textbox',
    { name: 'Username' }
  );

  const passwordField = page.getByRole(
    'textbox',
    { name: 'Password' }
  );

  await usernameField.fill('adminky');
  await passwordField.fill('admin');

  const loginButton = page.getByRole(
    'button',
    { name: 'Login' }
  );

  await loginButton.hover();
  await page.waitForTimeout(1500);
  await loginButton.click();
  await page.waitForTimeout(2000);

  // ==========================================
  // STEP 3 - Validasi Login
  // ==========================================

  console.log('');
  console.log('STEP 3 - Validasi Login');

  await expect(page).toHaveURL(
    'https://dev.ptdika.com/cashback_JICAF2026/',
    {
      timeout: 15000
    }
  );

  console.log('PASS - Login Admin berhasil.');

  // ==========================================
  // STEP 4 - Membuka menu Input Merchant
  // ==========================================

  console.log('');
  console.log('STEP 4 - Membuka menu Input Merchant');

  const inputMerchantMenu = page.getByRole(
    'link',
    { name: ' Input Merchant' }
  );

  await expect(inputMerchantMenu).toBeVisible({
    timeout: 10000
  });

  await inputMerchantMenu.hover();
  await page.waitForTimeout(1500);
  await inputMerchantMenu.click();
  await page.waitForTimeout(2000);

  // ==========================================
  // STEP 5 - Validasi halaman Input Merchant
  // ==========================================

  console.log('');
  console.log('STEP 5 - Validasi halaman Input Merchant');

  await expect(page).toHaveURL(
    'https://dev.ptdika.com/cashback_JICAF2026/admin/merchant',
    {
      timeout: 15000
    }
  );

  console.log('PASS - Halaman Input Merchant berhasil dibuka.');

  // ==========================================
  // STEP 6 - Mencari Merchant berdasarkan Nama
  // ==========================================

  console.log('');
  console.log(
    `STEP 6 - Mencari Merchant: ${namaMerchant}`
  );

  const searchBox = page.getByRole(
    'searchbox',
    { name: 'Search:' }
  );

  await expect(searchBox).toBeVisible({
    timeout: 10000
  });

  await searchBox.fill(namaMerchant);
  await page.waitForTimeout(2000);

  console.log(
    `PASS - Nama Merchant "${namaMerchant}" dimasukkan ke Search.`
  );

  // ==========================================
  // STEP 7 - Validasi hasil pencarian
  // ==========================================

  console.log('');
  console.log('STEP 7 - Validasi hasil pencarian');

  const hasilMerchant = page.getByRole(
    'gridcell',
    {
      name: namaMerchant,
      exact: true
    }
  );

  await expect(hasilMerchant).toBeVisible({
    timeout: 15000
  });

  await expect(hasilMerchant).toHaveText(
    namaMerchant
  );

  console.log(
    `PASS - Merchant "${namaMerchant}" berhasil ditemukan.`
  );

  // ==========================================
  // STEP 8 - Screenshot
  // ==========================================

  console.log('');
  console.log('STEP 8 - Mengambil Screenshot');

  await page.screenshot({
    path: 'hasil-filter-merchant-tc-023.png',
    fullPage: true
  });

  console.log('Screenshot berhasil dibuat.');

  // ==========================================
  // TEST SELESAI
  // ==========================================

  console.log('');
  console.log('==========================================');
  console.log('TC-023 SELESAI');
  console.log('==========================================');
});