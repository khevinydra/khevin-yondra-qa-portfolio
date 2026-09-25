import { test, expect } from '@playwright/test';

test('TC-066 - UBT-005', async ({ page }) => {
  test.setTimeout(90000);

  const referenceID = 'JICAF20260014';
  const filePath =
    'C:\\Users\\User\\Pictures\\Upload Test\\bukti tf bca.jpeg';

  console.log('');
  console.log('==========================================');
  console.log('TC-066 - UBT-005');
  console.log('Upload Bukti Transfer dengan Benar');
  console.log('==========================================');

  // ==========================================
  // STEP 1 - Buka halaman Login
  // ==========================================
  console.log('STEP 1 - Buka halaman Login');

  await page.goto(
    'https://dev.ptdika.com/cashback_JICAF2026/login'
  );

  // ==========================================
  // STEP 2 - Login sebagai Verifikator
  // ==========================================
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
  await page.waitForTimeout(3000);

  // ==========================================
  // STEP 3 - Buka menu Upload Bukti Transfer
  // ==========================================
  console.log('STEP 3 - Buka menu Upload Bukti Transfer');

  const uploadMenu = page.getByRole('link', {
    name: ' Upload Bukti Transfer'
  });

  await uploadMenu.scrollIntoViewIfNeeded();
  await uploadMenu.hover();
  await page.waitForTimeout(1500);
  await uploadMenu.click();
  await page.waitForTimeout(2000);

  // ==========================================
  // STEP 4 - Search berdasarkan Reference ID
  // ==========================================
  console.log(`STEP 4 - Search Reference ID: ${referenceID}`);

  const searchBox = page.getByRole('searchbox', {
    name: 'Search:'
  });

  // Search pertama
  await searchBox.fill(referenceID);
  await searchBox.press('Enter');
  await page.waitForTimeout(2000);

  // Search kedua
  await searchBox.fill(referenceID);
  await searchBox.press('Enter');
  await page.waitForTimeout(2000);

  // ==========================================
  // STEP 5 - Validasi data ditemukan
  // ==========================================
  console.log('STEP 5 - Validasi data ditemukan');

  const referenceCell = page.getByRole('gridcell', {
    name: referenceID,
    exact: true
  });

  await expect(referenceCell).toBeVisible({
    timeout: 10000
  });

  // ==========================================
  // STEP 6 - Buka Form Upload Bukti Transfer
  // ==========================================
  console.log('STEP 6 - Buka Form Upload Bukti Transfer');

  const detailButton = page
    .locator('#table')
    .getByRole('link')
    .filter({ hasText: /^$/ })
    .first();

  await expect(detailButton).toBeVisible({
    timeout: 10000
  });

  const page1Promise = page.waitForEvent('popup');

  await detailButton.scrollIntoViewIfNeeded();
  await detailButton.hover();
  await page.waitForTimeout(1500);
  await detailButton.click();

  const page1 = await page1Promise;

  await page1.waitForLoadState('domcontentloaded');
  await page1.waitForTimeout(3000);

  // ==========================================
  // STEP 7 - Upload file bukti transfer
  // ==========================================
  console.log('STEP 7 - Upload file bukti transfer');
  console.log(`File: ${filePath}`);

  const uploadFileButton = page1.getByRole('button', {
    name: 'Foto Bukti Transfer'
  });

  await expect(uploadFileButton).toBeVisible({
    timeout: 10000
  });

  await uploadFileButton.setInputFiles(filePath);

  await page1.waitForTimeout(2000);

  // ==========================================
  // STEP 8 - Klik Upload Bukti Transfer
  // ==========================================
  console.log('STEP 8 - Klik Upload Bukti Transfer');

  const uploadButton = page1.getByRole('button', {
    name: ' Upload Bukti Transfer'
  });

  await expect(uploadButton).toBeVisible({
    timeout: 10000
  });

  await expect(uploadButton).toBeEnabled();

  // Listener dialog dipasang SEBELUM klik
  let dialogMessage = '';

  page1.once('dialog', async dialog => {
    dialogMessage = dialog.message();

    console.log(`Dialog message: ${dialogMessage}`);

    // Tampilkan popup selama 3 detik
    await new Promise(resolve => setTimeout(resolve, 3000));

    await dialog.accept();
  });

  await uploadButton.scrollIntoViewIfNeeded();
  await uploadButton.hover();
  await page1.waitForTimeout(1500);
  await uploadButton.click();

  await page1.waitForTimeout(3000);

  // ==========================================
  // STEP 9 - Validasi hasil upload
  // ==========================================
  console.log('STEP 9 - Validasi hasil upload');

  expect(dialogMessage).toContain(
    'Bukti Transfer Berhasil diupload'
  );

  // ==========================================
  // STEP 10 - Screenshot
  // ==========================================
  console.log('STEP 10 - Screenshot hasil testing');

  await page1.screenshot({
    path: 'screenshots/TC-066-UBT-005.png',
    fullPage: true
  });

  console.log('');
  console.log('==========================================');
  console.log('TC-066 SELESAI');
  console.log('==========================================');
});