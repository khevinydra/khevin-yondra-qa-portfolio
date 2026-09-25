import { test, expect } from '@playwright/test';

test.setTimeout(90000);

test('TC-025 - IM-002', async ({ page }) => {

  console.log('');
  console.log('==========================================');
  console.log('TC-025 - IM-002');
  console.log('Tambah Merchant dengan semua field valid');
  console.log('==========================================');

  // ==========================================
  // DATA TEST
  // ==========================================

  const mid = String(Date.now()).slice(-6);
  const merchantName = `TestMerchant${Date.now()}`;

  console.log('');
  console.log('DATA TEST');
  console.log(`Nama Merchant: ${merchantName}`);
  console.log(`MID: ${mid}`);

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
  await tambahMerchantButton.hover();

  console.log(
    'Cursor berada di tombol Tambah Merchant.'
  );

  await page.waitForTimeout(1500);

  await tambahMerchantButton.click();

  console.log(
    'Tombol Tambah Merchant berhasil diklik.'
  );

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
  // STEP 8 - Input Nama Merchant
  // ==========================================

  console.log('');
  console.log(
    `STEP 8 - Input Nama Merchant: ${merchantName}`
  );

  await namaMerchantField.fill(merchantName);

  await expect(namaMerchantField).toHaveValue(
    merchantName
  );

  console.log(
    'PASS - Nama Merchant berhasil diinput.'
  );

  // ==========================================
  // STEP 9 - Input MID
  // ==========================================

  console.log('');
  console.log(`STEP 9 - Input MID: ${mid}`);

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
  // STEP 10 - Menyiapkan Popup Sukses
  // ==========================================

  console.log('');
  console.log('STEP 10 - Menyiapkan Popup Sukses');

  page.once('dialog', async dialog => {

    console.log('');
    console.log('==========================================');
    console.log('POPUP SUKSES MUNCUL');
    console.log('==========================================');

    console.log(
      `Dialog message: ${dialog.message()}`
    );

    // Validasi pesan popup
    expect(dialog.message()).toContain(
      'data berhasil disave'
    );

    console.log(
      'PASS - Pesan popup sukses sesuai.'
    );

    console.log(
      'Popup akan dibiarkan terlihat selama 3 detik...'
    );

    // Jeda agar popup terlihat
    await new Promise(resolve =>
      setTimeout(resolve, 3000)
    );

    console.log('');
    console.log(
      'Konfirmasi popup sukses.'
    );

    await dialog.accept();

    console.log(
      'PASS - Popup sukses berhasil dikonfirmasi.'
    );
  });

  // ==========================================
  // STEP 11 - Klik Save
  // ==========================================

  console.log('');
  console.log('STEP 11 - Klik Save');

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

  // ==========================================
  // STEP 12 - Tunggu proses penyimpanan
  // ==========================================

  console.log('');
  console.log('STEP 12 - Menunggu proses penyimpanan');

  await page.waitForTimeout(3000);

  console.log(
    'PASS - Proses penyimpanan selesai.'
  );

  // ==========================================
  // STEP 13 - Validasi data Merchant
  // ==========================================

  console.log('');
  console.log(
    'STEP 13 - Validasi Merchant berhasil ditambahkan'
  );

  const searchBox = page.getByRole(
    'searchbox',
    { name: 'Search:' }
  );

  await expect(searchBox).toBeVisible({
    timeout: 10000
  });

  await searchBox.fill(merchantName);

  await page.waitForTimeout(2000);

  const hasilMerchant = page
    .locator('tbody tr')
    .filter({
      hasText: merchantName
    })
    .first();

  await expect(hasilMerchant).toBeVisible({
    timeout: 15000
  });

  console.log(
    `PASS - Merchant "${merchantName}" berhasil ditemukan pada tabel.`
  );

  // ==========================================
  // STEP 14 - Screenshot
  // ==========================================

  console.log('');
  console.log('STEP 14 - Mengambil Screenshot');

  await page.screenshot({
    path: 'hasil-tambah-merchant-tc-025.png',
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
  console.log('TC-025 SELESAI');
  console.log('==========================================');
});