import { test, expect } from '@playwright/test';

test.setTimeout(90000);

test('TC-046 - VKS-001-N', async ({ page }) => {

  const referenceID = 'JICAF20260007';

  console.log('');
  console.log('==========================================');
  console.log('TC-046 - VKS-004-N');
  console.log('Edit Data dengan Nama, Nomor HP dan Amount Kosong');
  console.log('==========================================');

  // =========================================================
  // STEP 1 - Buka halaman Login
  // =========================================================

  console.log('');
  console.log('STEP 1 - Buka halaman Login');

  await page.goto(
    'https://dev.ptdika.com/cashback_JICAF2026/login',
    {
      waitUntil: 'domcontentloaded',
      timeout: 120000
    }
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

  await expect(username).toBeVisible();
  await expect(password).toBeVisible();

  // =========================================================
  // STEP 2 - Login sebagai Verifikator
  // =========================================================

  console.log('STEP 2 - Login sebagai Verifikator');

  await username.fill('verifikatorky');
  await password.fill('verif');

  await loginButton.hover();
  await page.waitForTimeout(1500);
  await loginButton.click();
  await page.waitForTimeout(2000);

  await page.waitForLoadState('domcontentloaded');

  console.log('Login Verifikator berhasil.');

  // =========================================================
  // STEP 3 - Buka menu Verifikasi
  // =========================================================

  console.log('STEP 3 - Buka menu Verifikasi');

  const menuVerifikasi = page.getByRole('link', {
    name: ' Verifikasi'
  });

  await expect(menuVerifikasi).toBeVisible({
    timeout: 30000
  });

  await menuVerifikasi.scrollIntoViewIfNeeded();
  await menuVerifikasi.hover();
  await page.waitForTimeout(1500);
  await menuVerifikasi.click();
  await page.waitForTimeout(2000);

  console.log('Menu Verifikasi berhasil dibuka.');

  // =========================================================
  // STEP 4 - Search Reference ID
  // =========================================================

  console.log('STEP 4 - Search Reference ID');
  console.log(`Reference ID: ${referenceID}`);

  const searchBox = page.getByRole('searchbox', {
    name: 'Search:'
  });

  await expect(searchBox).toBeVisible({
    timeout: 30000
  });

  // Search pertama
  await searchBox.fill(referenceID);
  await searchBox.press('Enter');
  await page.waitForTimeout(2000);

  // Search kedua sesuai flow TC sebelumnya
  await searchBox.fill(referenceID);
  await searchBox.press('Enter');
  await page.waitForTimeout(2000);

  // =========================================================
  // STEP 5 - Validasi data ditemukan
  // =========================================================

  console.log('STEP 5 - Validasi Reference ID ditemukan');

  const hasilSearch = page.getByRole('gridcell', {
    name: referenceID,
    exact: true
  });

  await expect(hasilSearch).toBeVisible({
    timeout: 15000
  });

  console.log('Reference ID berhasil ditemukan.');

  // =========================================================
  // STEP 6 - Buka Detail Data
  // =========================================================

  console.log('STEP 6 - Buka Detail Data');

  const detailButton = page
    .getByRole('link')
    .filter({ hasText: /^$/ })
    .nth(1);

  await expect(detailButton).toBeVisible({
    timeout: 30000
  });

  await detailButton.scrollIntoViewIfNeeded();

  // Tunggu popup sebelum klik
  const page1Promise = page.waitForEvent('popup', {
    timeout: 120000
  });

  await detailButton.hover();
  await page.waitForTimeout(1500);
  await detailButton.click();
  await page.waitForTimeout(2000);

  const page1 = await page1Promise;

  await page1.waitForLoadState('domcontentloaded', {
    timeout: 120000
  });

  await page1.waitForTimeout(2000);

  console.log('Detail data berhasil dibuka.');

  // =========================================================
  // STEP 7 - Klik Edit
  // =========================================================

  console.log('STEP 7 - Klik Edit');

  const buttonEdit = page1.getByRole('button', {
    name: ' Edit'
  });

  await expect(buttonEdit).toBeVisible({
    timeout: 30000
  });

  await buttonEdit.scrollIntoViewIfNeeded();
  await buttonEdit.hover();
  await page1.waitForTimeout(1500);
  await buttonEdit.click();
  await page1.waitForTimeout(2000);

  console.log('Form Edit berhasil dibuka.');

  // =========================================================
  // STEP 8 - Kosongkan Nama Nasabah
  // =========================================================

  console.log('STEP 8 - Kosongkan Nama Lengkap Nasabah');

  const namaNasabah = page1.getByRole('textbox', {
    name: 'Nama Lengkap Nasabah *'
  });

  await expect(namaNasabah).toBeVisible({
    timeout: 30000
  });

  await namaNasabah.fill('');

  console.log('Nama Lengkap Nasabah dikosongkan.');

  // =========================================================
  // STEP 9 - Kosongkan Nomor Handphone
  // =========================================================

  console.log('STEP 9 - Kosongkan Nomor Handphone');

  const nomorHandphone = page1.getByRole('textbox', {
    name: 'Nomor Handphone yang'
  });

  await expect(nomorHandphone).toBeVisible({
    timeout: 30000
  });

  await nomorHandphone.fill('');

  console.log('Nomor Handphone dikosongkan.');

  // =========================================================
  // STEP 10 - Kosongkan Amount
  // =========================================================

  console.log('STEP 10 - Kosongkan Amount');

  const amount = page1.getByRole('textbox', {
    name: 'Masukan Amount'
  });

  await expect(amount).toBeVisible({
    timeout: 30000
  });

  await amount.fill('');

  console.log('Amount dikosongkan.');

  // =========================================================
  // STEP 11 - Validasi Button Simpan
  // =========================================================

  console.log('STEP 11 - Validasi Button Simpan');

  const buttonSimpan = page1.getByRole('button', {
    name: /Simpan/
  });

  await expect(buttonSimpan).toBeVisible({
    timeout: 30000
  });

  const kondisiButton = await buttonSimpan.isDisabled();

  console.log('');
  console.log('---------- VALIDASI BUTTON ----------');
  console.log(`Button Simpan disabled : ${kondisiButton}`);

  // Expected Result:
  // Button Simpan tetap ENABLED
  await expect(buttonSimpan).toBeEnabled();

  console.log('Button Simpan tetap ENABLED.');

  // =========================================================
  // STEP 12 - Klik Simpan
  // =========================================================

  console.log('');
  console.log('STEP 12 - Klik Button Simpan');

  await buttonSimpan.scrollIntoViewIfNeeded();
  await buttonSimpan.hover();
  await page1.waitForTimeout(1500);
  await buttonSimpan.click();
  await page1.waitForTimeout(3000);

  console.log('Button Simpan berhasil diklik.');
  console.log('Sistem selesai memproses data.');

  // =========================================================
  // STEP 13 - Screenshot
  // =========================================================

  console.log('STEP 13 - Screenshot hasil testing');

  await page1.screenshot({
    path: 'screenshots/TC-046-VKS-004-N.png',
    fullPage: true
  });

  // =========================================================
  // TEST SELESAI
  // =========================================================

  console.log('');
  console.log('==========================================');
  console.log('TC-046 SELESAI');
  console.log('==========================================');
  console.log('Field kosong : Nama Nasabah, Nomor HP, Amount');
  console.log('Button Simpan : ENABLED');
  console.log('Action : Simpan berhasil diklik');
  console.log('Result : Validasi dilanjutkan oleh sistem');
  console.log('==========================================');
});