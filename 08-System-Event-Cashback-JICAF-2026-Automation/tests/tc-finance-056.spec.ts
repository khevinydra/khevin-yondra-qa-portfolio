import { test, expect } from '@playwright/test';

test.setTimeout(90000);

test('TC-056 - FNC-003', async ({ page }) => {

  const referenceID = 'JICAF20260008';

  console.log('');
  console.log('==========================================');
  console.log('TC-056 - FNC-003');
  console.log('Finance - Search Berdasarkan Reference ID');
  console.log('==========================================');

  // ==========================================
  // STEP 1 - LOGIN FINANCE
  // ==========================================

  console.log('');
  console.log('STEP 1 - Login sebagai Finance');

  await page.goto(
    'https://dev.ptdika.com/cashback_JICAF2026/login',
    {
      waitUntil: 'domcontentloaded',
      timeout: 60000
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

  await username.fill('financeky');
  await password.fill('finance');

  await loginButton.scrollIntoViewIfNeeded();
  await loginButton.hover();
  await page.waitForTimeout(1500);
  await loginButton.click();
  await page.waitForTimeout(2000);

  console.log('✓ Login Finance berhasil');

  // ==========================================
  // STEP 2 - BUKA MENU FINANCE
  // ==========================================

  console.log('');
  console.log('STEP 2 - Membuka menu Finance');

  const menuFinance = page.getByRole('link', {
    name: ' Finance'
  });

  await expect(menuFinance).toBeVisible({
    timeout: 30000
  });

  await menuFinance.scrollIntoViewIfNeeded();
  await menuFinance.hover();
  await page.waitForTimeout(1500);
  await menuFinance.click();
  await page.waitForTimeout(2000);

  console.log('✓ Menu Finance berhasil dibuka');

  // ==========================================
  // STEP 3 - SEARCH REFERENCE ID
  // ==========================================

  console.log('');
  console.log('STEP 3 - Search berdasarkan Reference ID');
  console.log(`Input Reference ID : ${referenceID}`);

  const searchBox = page.getByRole('searchbox', {
    name: 'Search:'
  });

  await expect(searchBox).toBeVisible({
    timeout: 30000
  });

  // SEARCH PERTAMA
  console.log('');
  console.log('Search pertama...');

  await searchBox.fill(referenceID);
  await searchBox.press('Enter');
  await page.waitForTimeout(2000);

  console.log('✓ Search pertama selesai');

  // SEARCH KEDUA
  console.log('Search kedua...');

  await searchBox.fill(referenceID);
  await searchBox.press('Enter');
  await page.waitForTimeout(2000);

  console.log('✓ Search kedua selesai');

  // ==========================================
  // STEP 4 - VALIDASI HASIL SEARCH
  // ==========================================

  console.log('');
  console.log('STEP 4 - Validasi hasil pencarian');

  const hasilSearch = page.getByRole('gridcell', {
    name: referenceID,
    exact: true
  });

  await expect(hasilSearch).toBeVisible({
    timeout: 30000
  });

  // ==========================================
  // STEP 5 - VALIDASI REFERENCE ID
  // ==========================================

  await expect(hasilSearch).toHaveText(
    referenceID
  );

  console.log('✓ Reference ID ditemukan');
  console.log(
    `✓ Hasil : ${await hasilSearch.innerText()}`
  );

  // ==========================================
  // STEP 6 - SCREENSHOT
  // ==========================================

  await page.screenshot({
    path: 'screenshots/TC-056-FNC-003.png',
    fullPage: true
  });

  console.log('✓ Screenshot berhasil disimpan');

  // ==========================================
  // HASIL TEST
  // ==========================================

  console.log('');
  console.log('==========================================');
  console.log('TC-056 SELESAI');
  console.log('==========================================');
  console.log(
    `Expected : Data Finance tampil sesuai Reference ID "${referenceID}"`
  );
  console.log(
    `Actual   : ${await hasilSearch.innerText()}`
  );
  console.log('Status   : PASS');
  console.log('==========================================');

});