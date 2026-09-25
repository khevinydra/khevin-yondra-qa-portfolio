import { test, expect } from '@playwright/test';

test('TC-060 - FNC-007', async ({ page }) => {
  test.setTimeout(90000);

  const nomorHandphone = '2412312312412';

  console.log('');
  console.log('==========================================');
  console.log('TC-060 - FNC-007');
  console.log('Kembalikan Data Cashback ke Pre-Transfer');
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

  const username = page.getByRole('textbox', {
    name: 'Username'
  });

  const password = page.getByRole('textbox', {
    name: 'Password'
  });

  await username.click();
  await username.fill('financeky');

  await password.fill('finance');
  await password.press('Enter');

  // Beri waktu aplikasi menyelesaikan proses login
  await page.waitForTimeout(5000);

  // ==================================================
  // STEP 3 - Buka menu Finance
  // ==================================================
  console.log('STEP 3 - Buka menu Finance');

  const financeMenu = page.getByRole('link', {
    name: ' Finance'
  });

  await expect(financeMenu).toBeVisible({
    timeout: 15000
  });

  await financeMenu.scrollIntoViewIfNeeded();
  await financeMenu.hover();
  await page.waitForTimeout(1500);
  await financeMenu.click();
  await page.waitForTimeout(3000);

  // ==================================================
  // STEP 4 - Cari berdasarkan Nomor Handphone
  // ==================================================
  console.log(
    `STEP 4 - Cari Nomor Handphone: ${nomorHandphone}`
  );

  const searchBox = page.getByRole('searchbox', {
    name: 'Search:'
  });

  await expect(searchBox).toBeVisible({
    timeout: 10000
  });

  // Search pertama
  await searchBox.fill(nomorHandphone);
  await searchBox.press('Enter');
  await page.waitForTimeout(2000);

  // Search kedua
  await searchBox.fill(nomorHandphone);
  await searchBox.press('Enter');
  await page.waitForTimeout(2000);

  // ==================================================
  // STEP 5 - Validasi data ditemukan
  // ==================================================
  console.log('STEP 5 - Validasi data ditemukan');

  const phoneCell = page.getByRole('gridcell', {
    name: nomorHandphone,
    exact: true
  });

  await expect(phoneCell).toBeVisible({
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
        name: nomorHandphone,
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
  // STEP 7 - Klik Kembalikan ke Pre-Transfer
  // ==================================================
  console.log('STEP 7 - Klik Kembalikan ke Pre-Transfer');

  const returnButton = page.getByRole('button', {
    name: ' Kembalikan ke Pre-Transfer'
  });

  await expect(returnButton).toBeVisible({
    timeout: 10000
  });

  await expect(returnButton).toBeEnabled();

  await returnButton.scrollIntoViewIfNeeded();
  await returnButton.hover();
  await page.waitForTimeout(1500);
  await returnButton.click();
  await page.waitForTimeout(2000);

  // ==================================================
  // STEP 8 - Validasi Modal Konfirmasi
  // ==================================================
  console.log('STEP 8 - Validasi modal konfirmasi');

  const modal = page.locator('#modal-pre-trans');

  await expect(modal).toBeVisible({
    timeout: 10000
  });

  await expect(
    modal.getByText('Apakah anda yakin?', {
      exact: false
    })
  ).toBeVisible();

  // ==================================================
  // STEP 9 - Klik Save
  // ==================================================
  console.log('STEP 9 - Klik Save');

  const saveButton = page.getByRole('button', {
    name: 'Save'
  });

  await expect(saveButton).toBeVisible({
    timeout: 10000
  });

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

  await expect(logoutButton).toBeVisible({
    timeout: 10000
  });

  await logoutButton.hover();
  await page.waitForTimeout(1500);
  await logoutButton.click();
  await page.waitForTimeout(3000);

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

  await expect(usernameVerif).toBeVisible({
    timeout: 10000
  });

  await usernameVerif.fill('verifikatorky');
  await passwordVerif.fill('verif');

  await passwordVerif.press('Enter');
  await page.waitForTimeout(5000);

  // ==================================================
  // STEP 12 - Buka menu Pre-Transfer
  // ==================================================
  console.log('STEP 12 - Buka menu Pre-Transfer');

  const preTransferMenu = page.getByRole('link', {
    name: ' Pre-Transfer'
  });

  await expect(preTransferMenu).toBeVisible({
    timeout: 15000
  });

  await preTransferMenu.scrollIntoViewIfNeeded();
  await preTransferMenu.hover();
  await page.waitForTimeout(1500);
  await preTransferMenu.click();
  await page.waitForTimeout(3000);

  // ==================================================
  // STEP 13 - Cari Nomor Handphone
  // ==================================================
  console.log(
    `STEP 13 - Cari Nomor Handphone: ${nomorHandphone}`
  );

  const searchBoxPreTransfer = page.getByRole('searchbox', {
    name: 'Search:'
  });

  await expect(searchBoxPreTransfer).toBeVisible({
    timeout: 10000
  });

  // Search pertama
  await searchBoxPreTransfer.fill(nomorHandphone);
  await searchBoxPreTransfer.press('Enter');
  await page.waitForTimeout(2000);

  // Search kedua
  await searchBoxPreTransfer.fill(nomorHandphone);
  await searchBoxPreTransfer.press('Enter');
  await page.waitForTimeout(2000);

  // ==================================================
  // STEP 14 - Validasi data masuk ke Pre-Transfer
  // ==================================================
  console.log(
    'STEP 14 - Validasi data masuk ke Pre-Transfer'
  );

  const resultPhone = page.getByRole('gridcell', {
    name: nomorHandphone,
    exact: true
  });

  await expect(resultPhone).toBeVisible({
    timeout: 10000
  });

  // ==================================================
  // SCREENSHOT
  // ==================================================
  await page.screenshot({
    path: 'screenshots/TC-060-FNC-007.png',
    fullPage: true
  });

  console.log('');
  console.log('==========================================');
  console.log('TC-060 SELESAI');
  console.log('==========================================');
});