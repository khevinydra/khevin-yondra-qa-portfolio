import { test, expect } from '@playwright/test';

test('TC-059 - FNC-006', async ({ page }) => {
  test.setTimeout(90000);

  const referenceID = 'JICAF20260010';

  console.log('');
  console.log('==========================================');
  console.log('TC-059 - FNC-006');
  console.log('Kembalikan Data Cashback ke Verifikator');
  console.log('==========================================');

  // ==================================================
  // STEP 1 - Buka halaman Login
  // ==================================================
  console.log('STEP 1 - Buka halaman Login');

  await page.goto(
    'https://dev.ptdika.com/cashback_JICAF2026/login'
  );

  await expect(
    page.getByRole('textbox', { name: 'Username' })
  ).toBeVisible();

  // ==================================================
  // STEP 2 - Login sebagai Finance
  // ==================================================
  console.log('STEP 2 - Login sebagai Finance');

  const username = page.getByRole('textbox', { name: 'Username' });
  const password = page.getByRole('textbox', { name: 'Password' });

  await username.fill('financeky');
  await password.fill('finance');

  await password.press('Enter');

  await page.waitForTimeout(3000);

  // ==================================================
  // STEP 3 - Buka menu Finance
  // ==================================================
  console.log('STEP 3 - Buka menu Finance');

  const financeMenu = page.getByRole('link', {
    name: ' Finance'
  });

  await expect(financeMenu).toBeVisible();

  await financeMenu.hover();
  await page.waitForTimeout(1500);
  await financeMenu.click();
  await page.waitForTimeout(2000);

  // ==================================================
  // STEP 4 - Cari Reference ID
  // ==================================================
  console.log(`STEP 4 - Cari Reference ID: ${referenceID}`);

  const searchBox = page.getByRole('searchbox', {
    name: 'Search:'
  });

  await searchBox.fill(referenceID);
  await searchBox.press('Enter');
  await page.waitForTimeout(2000);

  // Search kedua sesuai behavior aplikasi
  await searchBox.fill(referenceID);
  await searchBox.press('Enter');
  await page.waitForTimeout(2000);

  // ==================================================
  // STEP 5 - Validasi data ditemukan
  // ==================================================
  console.log('STEP 5 - Validasi data ditemukan');

  const referenceCell = page.getByRole('gridcell', {
    name: referenceID,
    exact: true
  });

  await expect(referenceCell).toBeVisible({
    timeout: 10000
  });

  // ==================================================
  // STEP 6 - Checklist data
  // ==================================================
  console.log('STEP 6 - Checklist data');

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
    timeout: 10000
  });

  const checkbox = dataRow.locator('#data_id');

  await expect(checkbox).toBeVisible();
  await checkbox.check();

  await expect(checkbox).toBeChecked();

  // ==================================================
  // STEP 7 - Klik Kembalikan ke VERIFIKATOR
  // ==================================================
  console.log('STEP 7 - Klik Kembalikan ke VERIFIKATOR');

  const returnButton = page.getByRole('button', {
    name: ' Kembalikan ke VERIFIKATOR'
  });

  await expect(returnButton).toBeVisible();
  await expect(returnButton).toBeEnabled();

  await returnButton.hover();
  await page.waitForTimeout(1500);
  await returnButton.click();
  await page.waitForTimeout(2000);

  // ==================================================
  // STEP 8 - Validasi modal konfirmasi
  // ==================================================
  console.log('STEP 8 - Validasi modal konfirmasi');

  const modal = page.locator('#modal-verif');

  await expect(modal).toBeVisible({
    timeout: 10000
  });

  await expect(
    modal.getByText('Apakah anda yakin?', {
      exact: false
    })
  ).toBeVisible();

  // ==================================================
  // STEP 9 - Klik Save pada modal
  // ==================================================
  console.log('STEP 9 - Klik Save');

  const saveButton = page.getByRole('button', {
    name: 'Save'
  });

  await expect(saveButton).toBeVisible();
  await expect(saveButton).toBeEnabled();

  await saveButton.hover();
  await page.waitForTimeout(1500);
  await saveButton.click();
  await page.waitForTimeout(3000);

  // ==================================================
  // STEP 10 - Logout Finance
  // ==================================================
  console.log('STEP 10 - Logout Finance');

  const logoutButton = page.getByRole('link', {
    name: ' Logout'
  });

  await expect(logoutButton).toBeVisible();

  await logoutButton.hover();
  await page.waitForTimeout(1500);
  await logoutButton.click();
  await page.waitForTimeout(2000);

  // ==================================================
  // STEP 11 - Login sebagai Verifikator
  // ==================================================
  console.log('STEP 11 - Login sebagai Verifikator');

  const usernameVerif = page.getByRole('textbox', {
    name: 'Username'
  });

  const passwordVerif = page.getByRole('textbox', {
    name: 'Password'
  });

  await usernameVerif.fill('verifikatorky');
  await passwordVerif.fill('verif');

  await passwordVerif.press('Enter');

  await page.waitForTimeout(3000);

  // ==================================================
  // STEP 12 - Buka menu Verifikasi
  // ==================================================
  console.log('STEP 12 - Buka menu Verifikasi');

  const verifikasiMenu = page.getByRole('link', {
    name: ' Verifikasi'
  });

  await expect(verifikasiMenu).toBeVisible();

  await verifikasiMenu.hover();
  await page.waitForTimeout(1500);
  await verifikasiMenu.click();
  await page.waitForTimeout(2000);

  // ==================================================
  // STEP 13 - Cari kembali Reference ID
  // ==================================================
  console.log(
    `STEP 13 - Cari kembali Reference ID: ${referenceID}`
  );

  const searchBoxVerif = page.getByRole('searchbox', {
    name: 'Search:'
  });

  await searchBoxVerif.fill(referenceID);
  await searchBoxVerif.press('Enter');
  await page.waitForTimeout(2000);

  // Search kedua
  await searchBoxVerif.fill(referenceID);
  await searchBoxVerif.press('Enter');
  await page.waitForTimeout(2000);

  // ==================================================
  // STEP 14 - Validasi data masuk ke bucket Verifikasi
  // ==================================================
  console.log('STEP 14 - Validasi data masuk ke Verifikasi');

  const resultReference = page.getByRole('gridcell', {
    name: referenceID,
    exact: true
  });

  await expect(resultReference).toBeVisible({
    timeout: 10000
  });

  // ==================================================
  // SCREENSHOT
  // ==================================================
  await page.screenshot({
    path: 'screenshots/TC-059-FNC-006.png',
    fullPage: true
  });

  console.log('');
  console.log('==========================================');
  console.log('TC-059 SELESAI');
  console.log('==========================================');
});