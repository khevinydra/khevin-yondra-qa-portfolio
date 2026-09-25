import { test, expect } from '@playwright/test';

test.setTimeout(90000);

test('TC-048 - VKS-005', async ({ page }) => {

  const referenceID = 'JICAF20260007';

  console.log('');
  console.log('==========================================');
  console.log('TC-048 - VKS-005');
  console.log('Verifikasi Data');
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
  // STEP 3 - Buka Menu Verifikasi
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
  // STEP 4 - Pastikan Data Verifikasi Tersedia
  // =========================================================

  console.log('STEP 4 - Validasi halaman Verifikasi');

  const searchBox = page.getByRole('searchbox', {
    name: 'Search:'
  });

  await expect(searchBox).toBeVisible({
    timeout: 30000
  });

  // Search Reference ID agar data yang digunakan jelas
  console.log(`Reference ID: ${referenceID}`);

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

  // Listener popup dipasang sebelum click
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
  // STEP 7 - Validasi Button Verifikasi
  // =========================================================

  console.log('STEP 7 - Validasi Button Verifikasi');

  const buttonVerifikasi = page1.getByRole('button', {
    name: /Verifikasi/
  });

  await expect(buttonVerifikasi).toBeVisible({
    timeout: 30000
  });

  console.log('Button Verifikasi ditemukan.');

  // =========================================================
  // STEP 8 - Klik Button Verifikasi
  // =========================================================

  console.log('STEP 8 - Klik Button Verifikasi');

  await buttonVerifikasi.scrollIntoViewIfNeeded();
  await buttonVerifikasi.hover();
  await page1.waitForTimeout(1500);
  await buttonVerifikasi.click();
  await page1.waitForTimeout(2000);

  console.log('Button Verifikasi berhasil diklik.');

  // =========================================================
  // STEP 9 - Validasi Modal Konfirmasi
  // =========================================================

  console.log('STEP 9 - Validasi Modal Konfirmasi');

  const modalKonfirmasi = page1.getByText(
    'Apakah anda yakin?',
    {
      exact: true
    }
  );

  await expect(modalKonfirmasi).toBeVisible({
    timeout: 15000
  });

  console.log(
    'Modal "Apakah anda yakin?" berhasil muncul.'
  );

  // =========================================================
  // STEP 10 - Siapkan Listener Popup Success
  // =========================================================

  console.log('STEP 10 - Siapkan listener popup success');

  // Listener dipasang SEBELUM klik OK
  const dialogPromise = page1.waitForEvent('dialog', {
    timeout: 30000
  });

  console.log('Listener popup success siap.');

  // =========================================================
  // STEP 11 - Klik OK pada Modal Konfirmasi
  // =========================================================

  console.log('STEP 11 - Klik OK pada Modal Konfirmasi');

  const buttonOK = page1.getByRole('button', {
    name: 'OK',
    exact: true
  });

  await expect(buttonOK).toBeVisible({
    timeout: 10000
  });

  console.log('Button OK ditemukan.');

  await buttonOK.scrollIntoViewIfNeeded();
  await buttonOK.hover();
  await page1.waitForTimeout(1500);
  await buttonOK.click();
  await page1.waitForTimeout(2000);

  console.log('Button OK berhasil diklik.');

  // =========================================================
  // STEP 12 - Tangkap Popup Success
  // =========================================================

  console.log('STEP 12 - Menunggu popup sukses');

  const dialog = await dialogPromise;

  const dialogMessage = dialog.message();

  console.log('');
  console.log('---------- HASIL VERIFIKASI ----------');
  console.log(`Popup : ${dialogMessage}`);

  // =========================================================
  // STEP 13 - Validasi Pesan Success
  // =========================================================

  console.log('STEP 13 - Validasi pesan success');

  expect(dialogMessage).toContain(
    'Sukses verifikasi data!'
  );

  console.log(
    'Pesan "Sukses verifikasi data!" berhasil ditemukan.'
  );

  // Tahan popup selama 3 detik agar terlihat
  console.log(
    'Menahan popup selama 3 detik...'
  );

  await new Promise(resolve => setTimeout(resolve, 3000));

  await dialog.accept();

  console.log(
    'Popup sukses berhasil dikonfirmasi.'
  );

  // =========================================================
  // STEP 14 - Screenshot
  // =========================================================

  console.log('STEP 14 - Screenshot hasil testing');

  await page1.screenshot({
    path: 'screenshots/TC-048-VKS-005.png',
    fullPage: true
  });

  // =========================================================
  // TEST SELESAI
  // =========================================================

  console.log('');
  console.log('==========================================');
  console.log('TC-048 SELESAI');
  console.log('==========================================');
  console.log(`Reference ID : ${referenceID}`);
  console.log('Button Verifikasi : BERHASIL DIKLIK');
  console.log('Modal Konfirmasi : MUNCUL');
  console.log('Button OK : BERHASIL DIKLIK');
  console.log('Expected : Sukses verifikasi data!');
  console.log(`Actual : ${dialogMessage}`);
  console.log('Result : SESUAI');
  console.log('==========================================');
});