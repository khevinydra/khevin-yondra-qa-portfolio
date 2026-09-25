import { test, expect } from '@playwright/test';

test('TC-043 - VKS-001', async ({ page }) => {
  test.setTimeout(90000);

  // =========================================================
  // DATA TEST
  // =========================================================

  const baseUrl =
    'https://dev.ptdika.com/cashback_JICAF2026';

  const username = 'verifikatorky';
  const password = 'verif';

  const nomorHP = '084118247431';

  // =========================================================
  // HEADER
  // =========================================================

  console.log('');
  console.log('==========================================');
  console.log('TC-043 - VKS-001');
  console.log('Verifikasi Data Berdasarkan Keyword Nomor Handphone');
  console.log('==========================================');

  console.log(`Nomor Handphone : ${nomorHP}`);

  // =========================================================
  // STEP 1 - LOGIN VERIFIKATOR
  // =========================================================

  console.log('');
  console.log('STEP 1 - Login Verifikator');

  await page.goto(
    `${baseUrl}/login`,
    {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    }
  );

  const usernameInput = page.getByRole('textbox', {
    name: 'Username'
  });

  const passwordInput = page.getByRole('textbox', {
    name: 'Password'
  });

  const loginButton = page.getByRole('button', {
    name: 'Login'
  });

  await usernameInput.fill(username);
  await passwordInput.fill(password);

  await loginButton.hover();
  await page.waitForTimeout(1500);
  await loginButton.click();
  await page.waitForTimeout(2000);

  // =========================================================
  // STEP 2 - MENUNGGU LOGIN SELESAI
  // =========================================================

  console.log('');
  console.log('STEP 2 - Menunggu Login Selesai');

  await page.waitForLoadState(
    'domcontentloaded'
  );

  await page.waitForTimeout(2000);

  // =========================================================
  // STEP 3 - BUKA MENU VERIFIKASI
  // =========================================================

  console.log('');
  console.log('STEP 3 - Buka Menu Verifikasi');

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

  // =========================================================
  // STEP 4 - VALIDASI SEARCHBOX
  // =========================================================

  console.log('');
  console.log('STEP 4 - Validasi Searchbox');

  const searchBox = page.getByRole('searchbox', {
    name: 'Search:'
  });

  await expect(searchBox).toBeVisible({
    timeout: 30000
  });

  // =========================================================
  // STEP 5 - SEARCH PERTAMA
  // =========================================================

  console.log('');
  console.log('STEP 5 - Search Pertama');

  await searchBox.fill(nomorHP);

  console.log(`Search 1 : ${nomorHP}`);

  await searchBox.press('Enter');

  await page.waitForTimeout(2000);

  // =========================================================
  // STEP 6 - SEARCH KEDUA
  // =========================================================

  console.log('');
  console.log('STEP 6 - Search Kedua');

  await searchBox.fill(nomorHP);

  console.log(`Search 2 : ${nomorHP}`);

  await searchBox.press('Enter');

  await page.waitForTimeout(2000);

  // =========================================================
  // STEP 7 - VALIDASI DATA
  // =========================================================

  console.log('');
  console.log('STEP 7 - Validasi Data Hasil Search');

  const hasilSearch = page.getByRole('gridcell', {
    name: nomorHP,
    exact: true
  });

  await expect(hasilSearch).toBeVisible({
    timeout: 15000
  });

  await expect(hasilSearch).toHaveText(
    nomorHP
  );

  // =========================================================
  // SCREENSHOT
  // =========================================================

  await page.screenshot({
    path: 'test-results/tc-043-search-nomor-handphone.png',
    fullPage: true
  });

  // =========================================================
  // HASIL TEST
  // =========================================================

  console.log('');
  console.log('==========================================');
  console.log('PASS - DATA BERHASIL DITEMUKAN');
  console.log(`Nomor HP ditemukan : ${nomorHP}`);
  console.log('Search dilakukan 2 kali');
  console.log('==========================================');

  // =========================================================
  // SELESAI
  // =========================================================

  console.log('');
  console.log('==========================================');
  console.log('TC-043 SELESAI');
  console.log('==========================================');
});