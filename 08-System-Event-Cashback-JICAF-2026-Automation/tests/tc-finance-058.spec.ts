import { test, expect } from '@playwright/test';

test.setTimeout(90000);

test('TC-058 - FNC-005', async ({ page }) => {

  const referenceID = 'JICAF20260015';

  console.log('');
  console.log('==========================================');
  console.log('TC-058 - FNC-005');
  console.log('Finance - Update Status Menjadi Sudah Transfer');
  console.log('==========================================');
  console.log(`Reference ID : ${referenceID}`);

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

  // Search pertama
  console.log('Search pertama...');

  await searchBox.fill(referenceID);
  await searchBox.press('Enter');
  await page.waitForTimeout(2000);

  console.log('✓ Search pertama selesai');

  // Search kedua
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

  console.log(`✓ Data Reference ID ${referenceID} ditemukan`);

  // ==========================================
  // STEP 5 - CHECKLIST DATA
  // ==========================================

  console.log('');
  console.log('STEP 5 - Checklist data');

  const dataRow = page
    .locator('tbody tr')
    .filter({
      has: page.getByRole('gridcell', {
        name: referenceID,
        exact: true
      })
    })
    .first();

  await expect(dataRow).toBeVisible({
    timeout: 30000
  });

  const checkbox = dataRow.locator('#data_id');

  await expect(checkbox).toBeVisible({
    timeout: 10000
  });

  await checkbox.check();

  await expect(checkbox).toBeChecked();

  console.log('✓ Data berhasil dichecklist');

  // ==========================================
  // STEP 6 - VALIDASI BUTTON UPDATE AKTIF
  // ==========================================

  console.log('');
  console.log('STEP 6 - Validasi button Update Sudah Transfer');

  const updateButton = page.getByRole('button', {
    name: ' Update Sudah Transfer'
  });

  await expect(updateButton).toBeVisible({
    timeout: 30000
  });

  await expect(updateButton).toBeEnabled({
    timeout: 10000
  });

  console.log('✓ Button Update Sudah Transfer aktif');

  // ==========================================
  // STEP 7 - UPDATE SUDAH TRANSFER
  // ==========================================

  console.log('');
  console.log('STEP 7 - Klik Update Sudah Transfer');

  await updateButton.scrollIntoViewIfNeeded();
  await updateButton.hover();
  await page.waitForTimeout(1500);
  await updateButton.click();
  await page.waitForTimeout(2000);

  console.log('✓ Modal Update Sudah Transfer tampil');

  // ==========================================
  // STEP 8 - VALIDASI MODAL
  // ==========================================

  console.log('');
  console.log('STEP 8 - Validasi modal Update Sudah Transfer');

  const modalUpdate = page.locator('#modal-update');

  await expect(modalUpdate).toBeVisible({
    timeout: 30000
  });

  console.log('✓ Modal konfirmasi tampil');

  const confirmationText = modalUpdate.getByText(
    'Apakah anda yakin?…'
  );

  await expect(confirmationText).toBeVisible({
    timeout: 10000
  });

  console.log('✓ Pesan "Apakah anda yakin?" tampil');

  // ==========================================
  // STEP 9 - SAVE
  // ==========================================

  console.log('');
  console.log('STEP 9 - Klik Save');

  const saveButton = page.getByRole('button', {
    name: 'Save'
  });

  await expect(saveButton).toBeVisible({
    timeout: 30000
  });

  await saveButton.scrollIntoViewIfNeeded();
  await saveButton.hover();
  await page.waitForTimeout(1500);
  await saveButton.click();
  await page.waitForTimeout(3000);

  console.log('✓ Update Sudah Transfer berhasil diproses');

  // ==========================================
  // STEP 10 - LOGOUT FINANCE
  // ==========================================

  console.log('');
  console.log('STEP 10 - Logout Finance');

  const logoutButton = page.getByRole('link', {
    name: ' Logout'
  });

  await expect(logoutButton).toBeVisible({
    timeout: 30000
  });

  await logoutButton.scrollIntoViewIfNeeded();
  await logoutButton.hover();
  await page.waitForTimeout(1500);
  await logoutButton.click();
  await page.waitForTimeout(2000);

  console.log('✓ Logout Finance berhasil');

  // ==========================================
  // STEP 11 - LOGIN VERIFIKATOR
  // ==========================================

  console.log('');
  console.log('STEP 11 - Login sebagai Verifikator');

  const usernameVerifier = page.getByRole('textbox', {
    name: 'Username'
  });

  const passwordVerifier = page.getByRole('textbox', {
    name: 'Password'
  });

  const loginVerifierButton = page.getByRole('button', {
    name: 'Login'
  });

  await usernameVerifier.fill('verifikatorky');
  await passwordVerifier.fill('verif');

  await loginVerifierButton.scrollIntoViewIfNeeded();
  await loginVerifierButton.hover();
  await page.waitForTimeout(1500);
  await loginVerifierButton.click();
  await page.waitForTimeout(2000);

  console.log('✓ Login Verifikator berhasil');

  // ==========================================
  // STEP 12 - BUKA UPLOAD BUKTI TRANSFER
  // ==========================================

  console.log('');
  console.log('STEP 12 - Membuka Upload Bukti Transfer');

  const uploadBuktiTransfer = page.getByRole('link', {
    name: ' Upload Bukti Transfer'
  });

  await expect(uploadBuktiTransfer).toBeVisible({
    timeout: 30000
  });

  await uploadBuktiTransfer.scrollIntoViewIfNeeded();
  await uploadBuktiTransfer.hover();
  await page.waitForTimeout(1500);
  await uploadBuktiTransfer.click();
  await page.waitForTimeout(2000);

  console.log('✓ Upload Bukti Transfer berhasil dibuka');

  // ==========================================
  // STEP 13 - VALIDASI DATA BERPINDAH BUCKET
  // ==========================================

  console.log('');
  console.log('STEP 13 - Validasi data berpindah bucket');

  const hasilTransfer = page.getByRole('gridcell', {
    name: referenceID,
    exact: true
  });

  await expect(hasilTransfer).toBeVisible({
    timeout: 30000
  });

  await expect(hasilTransfer).toHaveText(
    referenceID
  );

  console.log(
    `✓ Reference ID ${referenceID} ditemukan di Upload Bukti Transfer`
  );

  // ==========================================
  // STEP 14 - SCREENSHOT
  // ==========================================

  await page.screenshot({
    path: 'screenshots/TC-058-FNC-005.png',
    fullPage: true
  });

  console.log('✓ Screenshot berhasil disimpan');

  // ==========================================
  // HASIL TEST
  // ==========================================

  console.log('');
  console.log('==========================================');
  console.log('TC-058 SELESAI');
  console.log('==========================================');
  console.log(
    `Expected : Reference ID ${referenceID} berhasil di-update menjadi Sudah Transfer`
  );
  console.log(
    `Expected : Data berpindah ke bucket Upload Bukti Transfer`
  );
  console.log(
    `Actual   : Reference ID ${referenceID} ditemukan di Upload Bukti Transfer`
  );
  console.log('Status   : PASS');
  console.log('==========================================');

});