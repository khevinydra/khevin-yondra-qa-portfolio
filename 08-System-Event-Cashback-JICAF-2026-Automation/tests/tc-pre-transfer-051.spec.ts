import { test, expect } from '@playwright/test';

test.setTimeout(90000);

test('TC-051 - PTF-002', async ({ page }) => {

  const nomorHandphone = '082173422750';

  console.log('');
  console.log('==========================================');
  console.log('TC-051 - PTF-002');
  console.log('Pre-Transfer Search Berdasarkan Nomor Handphone');
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
  // STEP 3 - SEARCH NOMOR HANDPHONE
  // ==========================================

  console.log('');
  console.log('STEP 3 - Search berdasarkan Nomor Handphone');
  console.log(`Input Nomor Handphone : ${nomorHandphone}`);

  const searchBox = page.getByRole('searchbox', {
    name: 'Search:'
  });

  await expect(searchBox).toBeVisible({
    timeout: 30000
  });

  await searchBox.fill(nomorHandphone);
  await searchBox.press('Enter');

  await page.waitForTimeout(2000);

  console.log(
    `✓ Search keyword "${nomorHandphone}" berhasil`
  );

  // ==========================================
  // STEP 4 - VALIDASI HASIL SEARCH
  // ==========================================

  console.log('');
  console.log('STEP 4 - Validasi hasil pencarian');

  const hasilSearch = page.getByRole('gridcell', {
    name: nomorHandphone,
    exact: true
  });

  await expect(hasilSearch).toBeVisible({
    timeout: 30000
  });

  // ==========================================
  // STEP 5 - VALIDASI NOMOR HANDPHONE
  // ==========================================

  await expect(hasilSearch).toHaveText(
    nomorHandphone
  );

  console.log('✓ Nomor Handphone ditemukan');
  console.log(
    `✓ Hasil : ${await hasilSearch.innerText()}`
  );

  // ==========================================
  // HASIL TEST
  // ==========================================

  console.log('');
  console.log('==========================================');
  console.log('TC-051 SELESAI');
  console.log('==========================================');
  console.log(
    `Expected : Data tampil sesuai keyword "${nomorHandphone}"`
  );
  console.log(
    `Actual   : ${await hasilSearch.innerText()}`
  );
  console.log('Status   : PASS');
  console.log('==========================================');

});