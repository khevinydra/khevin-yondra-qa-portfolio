import { test, expect } from '@playwright/test';

test.setTimeout(90000);

test('TC-047 - VKS-004', async ({ page }) => {

  const referenceID = 'JICAF20260007';
  const namaBaru = `Nasabah Test ${Date.now()} Update`;

  console.log('');
  console.log('==========================================');
  console.log('TC-047 - VKS-004');
  console.log('Edit Data Input Field dengan Benar');
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

  console.log('Login sebagai Verifikator berhasil.');

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
  // STEP 5 - Validasi Reference ID
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

  // Tunggu popup sebelum click
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
  // STEP 8 - Ubah Nama Nasabah dengan Data Valid
  // =========================================================

  console.log('STEP 8 - Ubah Nama Nasabah');

  const namaNasabah = page1.getByRole('textbox', {
    name: 'Nama Lengkap Nasabah *'
  });

  await expect(namaNasabah).toBeVisible({
    timeout: 30000
  });

  await namaNasabah.fill(namaBaru);

  console.log(
    `Nama Nasabah diubah menjadi: ${namaBaru}`
  );

  // =========================================================
  // STEP 9 - Validasi Button Simpan
  // =========================================================

  console.log('STEP 9 - Validasi Button Simpan');

  const buttonSimpan = page1.getByRole('button', {
    name: /Simpan/
  });

  await expect(buttonSimpan).toBeVisible({
    timeout: 30000
  });

  await expect(buttonSimpan).toBeEnabled();

  console.log(
    'Button Simpan dalam kondisi ENABLED.'
  );

  // =========================================================
  // STEP 10 - Klik Simpan
  // =========================================================

  console.log('STEP 10 - Klik Button Simpan');

  // Listener dipasang sebelum click
  const dialogPromise = page1.waitForEvent('dialog', {
    timeout: 120000
  });

  await buttonSimpan.scrollIntoViewIfNeeded();
  await buttonSimpan.hover();
  await page1.waitForTimeout(1500);
  await buttonSimpan.click();

  // =========================================================
  // STEP 11 - Validasi Popup Success
  // =========================================================

  console.log('STEP 11 - Validasi Popup Success');

  const dialog = await dialogPromise;

  const dialogMessage = dialog.message();

  console.log('');
  console.log('---------- POPUP SUCCESS ----------');
  console.log(`Popup : ${dialogMessage}`);

  await expect(dialogMessage).toContain(
    'Sukses mengubah data!'
  );

  console.log(
    'Popup success berhasil ditampilkan.'
  );

  // Tahan popup agar terlihat
  console.log(
    'Menahan popup selama 3 detik...'
  );

  await new Promise(resolve => setTimeout(resolve, 3000));

  await dialog.accept();

  console.log(
    'Popup success berhasil ditutup.'
  );

  // =========================================================
  // STEP 12 - Screenshot
  // =========================================================

  console.log('STEP 12 - Screenshot hasil testing');

  await page1.screenshot({
    path: 'screenshots/TC-047-VKS-004.png',
    fullPage: true
  });

  // =========================================================
  // TEST SELESAI
  // =========================================================

  console.log('');
  console.log('==========================================');
  console.log('TC-047 SELESAI');
  console.log('==========================================');
  console.log(`Reference ID : ${referenceID}`);
  console.log(`Nama Baru    : ${namaBaru}`);
  console.log('Button Simpan : ENABLED');
  console.log('Expected     : Sukses mengubah data!');
  console.log(`Actual       : ${dialogMessage}`);
  console.log('Result       : SESUAI');
  console.log('==========================================');
});