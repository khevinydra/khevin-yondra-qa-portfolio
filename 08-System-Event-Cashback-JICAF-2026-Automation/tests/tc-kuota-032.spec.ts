import { test, expect } from '@playwright/test';

test('TC-032 - K-001', async ({ page }) => {

  test.setTimeout(90000);

  console.log('');
  console.log('==========================================');
  console.log('TC-032 - K-001');
  console.log('Tambah Kuota dengan Input Data yang Benar');
  console.log('==========================================');


  // ==================================================
  // STEP 1 - Login
  // ==================================================

  console.log('');
  console.log('STEP 1 - Login');

  await page.goto(
    'https://dev.ptdika.com/cashback_JICAF2026/login'
  );

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
  await page.waitForTimeout(2000);

  console.log('Login berhasil');


  // ==================================================
  // STEP 2 - Masuk Menu Kuota
  // ==================================================

  console.log('');
  console.log('STEP 2 - Masuk Menu Kuota');

  const kuotaMenu = page.getByRole('link', {
    name: ' Kuota'
  });

  await kuotaMenu.scrollIntoViewIfNeeded();
  await kuotaMenu.hover();
  await page.waitForTimeout(1500);
  await kuotaMenu.click();
  await page.waitForTimeout(2000);

  await expect(page).toHaveURL(
    'https://dev.ptdika.com/cashback_JICAF2026/admin/quota'
  );

  console.log('Menu Kuota berhasil dibuka');


  // ==================================================
  // STEP 3 - Klik Tambah Kuota
  // ==================================================

  console.log('');
  console.log('STEP 3 - Klik Tambah Kuota');

  const tambahKuotaButton = page.getByRole('button', {
    name: 'Tambah Kuota'
  });

  await tambahKuotaButton.scrollIntoViewIfNeeded();
  await tambahKuotaButton.hover();
  await page.waitForTimeout(1500);
  await tambahKuotaButton.click();
  await page.waitForTimeout(2000);

  console.log('Form Tambah Kuota berhasil dibuka');


  // ==================================================
  // STEP 4 - Pilih Transaksi
  // ==================================================

  console.log('');
  console.log('STEP 4 - Pilih Transaksi');

  const transaksi = page.getByLabel('Transaksi');

  await expect(transaksi).toBeVisible({
    timeout: 10000
  });

  await transaksi.selectOption(
    'Trx 1.5jt Cashback 250rb'
  );

  await expect(transaksi).toHaveValue(
    'Trx 1.5jt Cashback 250rb'
  );

  console.log(
    'Transaksi dipilih: Trx 1.5jt Cashback 250rb'
  );


  // ==================================================
  // STEP 5 - Input Kuota
  // ==================================================

  console.log('');
  console.log('STEP 5 - Input Kuota');

  const kuota = page.getByRole('spinbutton', {
    name: 'Kuota'
  });

  await expect(kuota).toBeVisible({
    timeout: 10000
  });

  await kuota.fill('15');

  await expect(kuota).toHaveValue('15');

  console.log('Kuota diisi: 15');


  // ==================================================
  // STEP 6 - Klik Simpan
  // ==================================================

  console.log('');
  console.log('STEP 6 - Klik Simpan');

  const simpanButton = page.getByRole('button', {
    name: 'Simpan'
  });

  await simpanButton.scrollIntoViewIfNeeded();
  await simpanButton.hover();
  await page.waitForTimeout(1500);
  await simpanButton.click();
  await page.waitForTimeout(2000);

  console.log('Tombol Simpan berhasil diklik');


  // ==================================================
  // STEP 7 - Validasi Hasil
  // ==================================================

  console.log('');
  console.log('STEP 7 - Validasi Hasil');

  const successMessage = page.getByText(
    'Success! Kuota berhasil ditambahkan.'
  );

  await expect(successMessage).toBeVisible({
    timeout: 10000
  });

  console.log(
    'Validasi berhasil: Success! Kuota berhasil ditambahkan.'
  );


  // ==================================================
  // SELESAI
  // ==================================================

  console.log('');
  console.log('==========================================');
  console.log('TC-032 SELESAI');
  console.log('==========================================');

});