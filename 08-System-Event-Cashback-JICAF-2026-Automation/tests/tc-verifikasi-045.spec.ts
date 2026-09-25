import { test, expect } from '@playwright/test';

test.setTimeout(90000);

test('TC-045 - VKS-003', async ({ page }) => {

  const referenceID = 'JICAF20260007';

  console.log('');
  console.log('==========================================');
  console.log('TC-045 - VKS-003');
  console.log('Menampilkan Halaman Form Verifikasi Cashback');
  console.log('==========================================');

  // =========================================================
  // STEP 1 - Buka halaman Login
  // =========================================================

  console.log('');
  console.log('STEP 1 - Buka halaman Login');

  await page.goto(
    'https://dev.ptdika.com/cashback_JICAF2026/login'
  );

  await expect(
    page.getByRole('textbox', { name: 'Username' })
  ).toBeVisible();

  await expect(
    page.getByRole('textbox', { name: 'Password' })
  ).toBeVisible();

  // =========================================================
  // STEP 2 - Login sebagai Verifikator
  // =========================================================

  console.log('STEP 2 - Login sebagai Verifikator');

  const username = page.getByRole('textbox', {
    name: 'Username'
  });

  const password = page.getByRole('textbox', {
    name: 'Password'
  });

  const loginButton = page.getByRole('button', {
    name: 'Login'
  });

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

  const verifikasiMenu = page.getByRole('link', {
    name: ' Verifikasi'
  });

  await verifikasiMenu.scrollIntoViewIfNeeded();
  await verifikasiMenu.hover();
  await page.waitForTimeout(1500);
  await verifikasiMenu.click();
  await page.waitForTimeout(2000);

  // =========================================================
  // STEP 4 - Pastikan halaman Verifikasi terbuka
  // =========================================================

  console.log('STEP 4 - Validasi halaman Verifikasi');

  const searchBox = page.getByRole('searchbox', {
    name: 'Search:'
  });

  await expect(searchBox).toBeVisible({
    timeout: 30000
  });

  console.log('Halaman Verifikasi berhasil terbuka.');

  // =========================================================
  // STEP 5 - Search Reference ID
  // =========================================================

  console.log('STEP 5 - Search Reference ID');
  console.log(`Reference ID: ${referenceID}`);

  await searchBox.fill(referenceID);
  await searchBox.press('Enter');
  await page.waitForTimeout(2000);

  // Search kedua sesuai flow TC sebelumnya
  await searchBox.fill(referenceID);
  await searchBox.press('Enter');
  await page.waitForTimeout(2000);

  // =========================================================
  // STEP 6 - Validasi data ditemukan
  // =========================================================

  console.log('STEP 6 - Validasi Reference ID ditemukan');

  const hasilSearch = page.getByRole('gridcell', {
    name: referenceID,
    exact: true
  });

  await expect(hasilSearch).toBeVisible({
    timeout: 15000
  });

  console.log('Reference ID berhasil ditemukan.');

  // =========================================================
  // STEP 7 - Klik Action / Detail
  // =========================================================

  console.log('STEP 7 - Klik Action / Detail');

  const detailButton = page
    .getByRole('link')
    .filter({ hasText: /^$/ })
    .nth(1);

  await detailButton.scrollIntoViewIfNeeded();

  // Tunggu popup sebelum melakukan click
  const page1Promise = page.waitForEvent('popup');

  await detailButton.hover();
  await page.waitForTimeout(1500);
  await detailButton.click();
  await page.waitForTimeout(2000);

  // =========================================================
  // STEP 8 - Validasi popup Form Verifikasi
  // =========================================================

  console.log('STEP 8 - Validasi popup Form Verifikasi Cashback');

  const page1 = await page1Promise;

  await page1.waitForLoadState('domcontentloaded');
  await page1.waitForTimeout(2000);

  await expect(page1).toHaveURL(
    /cashback_JICAF2026/
  );

  console.log('');
  console.log('==========================================');
  console.log('PASS - FORM VERIFIKASI CASHBACK TERBUKA');
  console.log(`Reference ID : ${referenceID}`);
  console.log(`URL Popup    : ${page1.url()}`);
  console.log('==========================================');

  // Screenshot
  await page1.screenshot({
    path: 'screenshots/TC-045-VKS-003.png',
    fullPage: true
  });

  console.log('');
  console.log('==========================================');
  console.log('TC-045 SELESAI');
  console.log('==========================================');
});