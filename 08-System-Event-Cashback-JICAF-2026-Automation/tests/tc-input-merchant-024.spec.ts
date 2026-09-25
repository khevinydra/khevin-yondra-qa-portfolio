import { test, expect } from '@playwright/test';

test.setTimeout(90000);

test('TC-024 - IM-001-N', async ({ page }) => {

  console.log('');
  console.log('==========================================');
  console.log('TC-024 - IM-001-N');
  console.log('Tambah Merchant tanpa input Nama Merchant');
  console.log('==========================================');

  // ==========================================
  // DATA TEST
  // ==========================================

  const mid = String(Date.now()).slice(-6);

  console.log('');
  console.log('DATA TEST');
  console.log(`MID: ${mid}`);
  console.log('Nama Merchant: Kosong');

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

  // Cursor ke Login
  const loginButton = page.getByRole(
    'button',
    { name: 'Login' }
  );

  await loginButton.scrollIntoViewIfNeeded();
  await loginButton.hover();

  console.log('Cursor berada di tombol Login.');

  await page.waitForTimeout(1500);

  await loginButton.click();

  console.log('Tombol Login berhasil diklik.');

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

  await inputMerchantMenu.scrollIntoViewIfNeeded();
  await inputMerchantMenu.hover();

  console.log(
    'Cursor berada di menu Input Merchant.'
  );

  await page.waitForTimeout(1500);

  await inputMerchantMenu.click();

  console.log(
    'Menu Input Merchant berhasil diklik.'
  );

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

  console.log(
    'PASS - Halaman Input Merchant berhasil dibuka.'
  );

  // ==========================================
  // STEP 6 - Klik Tambah Merchant
  // ==========================================

  console.log('');
  console.log('STEP 6 - Klik Tambah Merchant');

  const tambahMerchantButton = page.getByRole(
    'link',
    { name: ' Tambah Merchant' }
  );

  await expect(tambahMerchantButton).toBeVisible({
    timeout: 10000
  });

  await tambahMerchantButton.scrollIntoViewIfNeeded();

  console.log(
    'Cursor bergerak menuju tombol Tambah Merchant.'
  );

  await tambahMerchantButton.hover();

  console.log(
    'Cursor sudah berada di tombol Tambah Merchant.'
  );

  await page.waitForTimeout(1500);

  console.log(
    'Klik tombol Tambah Merchant.'
  );

  await tambahMerchantButton.click();

  await page.waitForTimeout(2000);

  // ==========================================
  // STEP 7 - Validasi halaman Tambah Merchant
  // ==========================================

  console.log('');
  console.log(
    'STEP 7 - Validasi halaman Tambah Merchant'
  );

  const namaMerchantField = page.getByRole(
    'textbox',
    { name: 'Nama Merchant*' }
  );

  await expect(namaMerchantField).toBeVisible({
    timeout: 10000
  });

  console.log(
    'PASS - Halaman Tambah Merchant berhasil dibuka.'
  );

  // ==========================================
  // STEP 8 - Input MID
  // ==========================================

  console.log('');
  console.log(`STEP 8 - Input MID: ${mid}`);

  const midField = page.getByRole(
    'textbox',
    { name: 'MID' }
  );

  await midField.fill(mid);

  await expect(midField).toHaveValue(mid);

  console.log(
    'PASS - MID berhasil diinput.'
  );

  // ==========================================
  // STEP 9 - Nama Merchant dikosongkan
  // ==========================================

  console.log('');
  console.log(
    'STEP 9 - Mengosongkan Nama Merchant'
  );

  await namaMerchantField.fill('');

  await expect(namaMerchantField).toHaveValue('');

  console.log(
    'PASS - Nama Merchant dikosongkan sesuai skenario.'
  );

  // ==========================================
  // STEP 10 - Klik Save
  // ==========================================

  console.log('');
  console.log('STEP 10 - Klik Save');

  const saveButton = page.getByRole(
    'button',
    { name: 'Save' }
  );

  await expect(saveButton).toBeVisible({
    timeout: 10000
  });

  await saveButton.scrollIntoViewIfNeeded();
  await saveButton.hover();

  console.log(
    'Cursor berada di tombol Save.'
  );

  await page.waitForTimeout(1500);

  await saveButton.click();

  console.log(
    'Tombol Save berhasil diklik.'
  );

  await page.waitForTimeout(2000);

  // ==========================================
  // STEP 11 - Validasi Error
  // ==========================================

  console.log('');
  console.log(
    'STEP 11 - Validasi Nama Merchant wajib diisi'
  );

  const errorMessage = page.getByText(
    'The Merchant Name field is required.',
    {
      exact: true
    }
  );

  await expect(errorMessage).toBeVisible({
    timeout: 10000
  });

  console.log(
    'PASS - Pesan error "The Merchant Name field is required." berhasil ditampilkan.'
  );

  // ==========================================
  // STEP 12 - Screenshot
  // ==========================================

  console.log('');
  console.log('STEP 12 - Mengambil Screenshot');

  await page.screenshot({
    path: 'hasil-tambah-merchant-empty-tc-024.png',
    fullPage: true
  });

  console.log(
    'Screenshot berhasil dibuat.'
  );

  // ==========================================
  // TEST SELESAI
  // ==========================================

  console.log('');
  console.log('==========================================');
  console.log('TC-024 SELESAI');
  console.log('==========================================');
});