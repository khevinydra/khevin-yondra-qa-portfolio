import { test, expect } from '@playwright/test';

test.setTimeout(90000);

test('TC-057 - FNC-004', async ({ page }) => {

  const referenceID = 'JICAF20260008';

  console.log('');
  console.log('==========================================');
  console.log('TC-057 - FNC-004');
  console.log('Finance - Lihat Detail Data');
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
  console.log('STEP 3 - Search Reference ID');
  console.log(`Reference ID : ${referenceID}`);

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
  // STEP 4 - VALIDASI DATA
  // ==========================================

  console.log('');
  console.log('STEP 4 - Validasi data berdasarkan Reference ID');

  const hasilSearch = page.getByRole('gridcell', {
    name: referenceID,
    exact: true
  });

  await expect(hasilSearch).toBeVisible({
    timeout: 30000
  });

  await expect(hasilSearch).toHaveText(referenceID);

  console.log('✓ Data Reference ID ditemukan');

  // ==========================================
  // STEP 5 - BUKA DETAIL
  // ==========================================

  console.log('');
  console.log('STEP 5 - Membuka detail data');

  const detailButton = page
    .getByRole('link')
    .filter({ hasText: /^$/ })
    .nth(1);

  await expect(detailButton).toBeVisible({
    timeout: 30000
  });

  const page1Promise = page.waitForEvent('popup');

  await detailButton.scrollIntoViewIfNeeded();
  await detailButton.hover();
  await page.waitForTimeout(1500);
  await detailButton.click();

  const page1 = await page1Promise;

  await page1.waitForLoadState('domcontentloaded');
  await page1.waitForTimeout(2000);

  console.log('✓ Popup detail berhasil dibuka');

  // ==========================================
  // STEP 6 - VALIDASI HALAMAN DETAIL
  // ==========================================

  console.log('');
  console.log('STEP 6 - Validasi halaman detail');

  await expect(page1).toHaveURL(
    /cashback_JICAF2026/,
    {
      timeout: 30000
    }
  );

  console.log(`✓ URL Detail : ${page1.url()}`);

  await page1.screenshot({
    path: 'screenshots/TC-057-FNC-004.png',
    fullPage: true
  });

  console.log('✓ Screenshot detail berhasil disimpan');

  // ==========================================
  // HASIL TEST
  // ==========================================

  console.log('');
  console.log('==========================================');
  console.log('TC-057 SELESAI');
  console.log('==========================================');
  console.log(
    `Expected : Detail data dengan Reference ID "${referenceID}" berhasil dibuka`
  );
  console.log(
    `Actual   : Popup detail berhasil dibuka`
  );
  console.log('Status   : PASS');
  console.log('==========================================');

});