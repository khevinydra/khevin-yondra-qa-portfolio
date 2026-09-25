import { test, expect } from '@playwright/test';

test.setTimeout(90000);

test('TC-050 - PTF-001', async ({ page }) => {

  const namaCustomer = 'phoenix';

  console.log('');
  console.log('==========================================');
  console.log('TC-050 - PTF-001');
  console.log('Pre-Transfer Search Berdasarkan Nama Customer');
  console.log('==========================================');

  // ==========================================
  // STEP 1 - LOGIN VERIFIKATOR
  // ==========================================

  console.log('');
  console.log('STEP 1 - Login sebagai Verifikator');

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

  await username.fill('verifikatorky');
  await password.fill('verif');

  await loginButton.scrollIntoViewIfNeeded();
  await loginButton.hover();
  await page.waitForTimeout(1500);
  await loginButton.click();
  await page.waitForTimeout(2000);

  console.log('✓ Login Verifikator berhasil');

  // ==========================================
  // STEP 2 - BUKA MENU PRE-TRANSFER
  // ==========================================

  console.log('');
  console.log('STEP 2 - Membuka menu Pre-Transfer');

  const menuPreTransfer = page.getByRole('link', {
    name: ' Pre-Transfer'
  });

  await expect(menuPreTransfer).toBeVisible({
    timeout: 30000
  });

  await menuPreTransfer.scrollIntoViewIfNeeded();
  await menuPreTransfer.hover();
  await page.waitForTimeout(1500);
  await menuPreTransfer.click();
  await page.waitForTimeout(2000);

  console.log('✓ Menu Pre-Transfer berhasil dibuka');

  // ==========================================
  // STEP 3 - SEARCH NAMA CUSTOMER
  // ==========================================

  console.log('');
  console.log('STEP 3 - Search berdasarkan Nama Customer');
  console.log(`Input Nama Customer : ${namaCustomer}`);

  const searchBox = page.getByRole('searchbox', {
    name: 'Search:'
  });

  await expect(searchBox).toBeVisible({
    timeout: 30000
  });

  await searchBox.fill(namaCustomer);
  await searchBox.press('Enter');

  await page.waitForTimeout(2000);

  console.log(`✓ Search keyword "${namaCustomer}" berhasil`);

  // ==========================================
  // STEP 4 - VALIDASI HASIL SEARCH
  // ==========================================

  console.log('');
  console.log('STEP 4 - Validasi hasil pencarian');

  const hasilCustomer = page.getByRole('gridcell', {
    name: namaCustomer,
    exact: true
  });

  await expect(hasilCustomer).toBeVisible({
    timeout: 30000
  });

  await expect(hasilCustomer).toHaveText(
    namaCustomer
  );

  console.log('✓ Nama Customer ditemukan');
  console.log(`✓ Hasil : ${await hasilCustomer.innerText()}`);

  // ==========================================
  // HASIL TEST
  // ==========================================

  console.log('');
  console.log('==========================================');
  console.log('TC-050 SELESAI');
  console.log('==========================================');
  console.log(`Expected : Data tampil sesuai keyword "${namaCustomer}"`);
  console.log(`Actual   : ${await hasilCustomer.innerText()}`);
  console.log('Status   : PASS');
  console.log('==========================================');

});