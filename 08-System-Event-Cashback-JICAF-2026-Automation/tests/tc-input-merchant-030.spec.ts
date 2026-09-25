import { test, expect } from '@playwright/test';

test('TC-030 - IM-003', async ({ page }) => {

  test.setTimeout(90000);

  // ==================================================
  // DATA TEST
  // ==================================================

  const merchantYangMauDiUpdate = 'Update';
  const namaMerchantBaru = 'Super Wow';

  console.log('');
  console.log('==========================================');
  console.log('TC-030 - IM-003');
  console.log('Edit Merchant - Update Nama Merchant');
  console.log('==========================================');

  console.log(`Merchant yang akan di-update : ${merchantYangMauDiUpdate}`);
  console.log(`Nama merchant baru           : ${namaMerchantBaru}`);


  // ==================================================
  // STEP 1 - Login
  // ==================================================

  console.log('');
  console.log('STEP 1 - Login');

  await page.goto(
    'https://dev.ptdika.com/cashback_JICAF2026/login'
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

  await username.fill('adminky');
  await password.fill('admin');

  await loginButton.hover();
  await page.waitForTimeout(1500);
  await loginButton.click();
  await page.waitForTimeout(2000);

  console.log('Login berhasil');


  // ==================================================
  // STEP 2 - Masuk Input Merchant
  // ==================================================

  console.log('');
  console.log('STEP 2 - Masuk Input Merchant');

  const inputMerchantMenu = page.getByRole('link', {
    name: ' Input Merchant'
  });

  await inputMerchantMenu.scrollIntoViewIfNeeded();
  await inputMerchantMenu.hover();
  await page.waitForTimeout(1500);
  await inputMerchantMenu.click();
  await page.waitForTimeout(2000);

  await expect(page).toHaveURL(
    'https://dev.ptdika.com/cashback_JICAF2026/admin/merchant'
  );

  console.log('Input Merchant berhasil dibuka');


  // ==================================================
  // STEP 3 - Cari Merchant
  // ==================================================

  console.log('');
  console.log('STEP 3 - Cari Merchant');

  const searchBox = page.getByRole('searchbox', {
    name: 'Search:'
  });

  await searchBox.fill(merchantYangMauDiUpdate);
  await page.waitForTimeout(2000);

  console.log(
    `Mencari merchant: ${merchantYangMauDiUpdate}`
  );


  // ==================================================
  // STEP 4 - Temukan Row Merchant
  // ==================================================

  console.log('');
  console.log('STEP 4 - Temukan Row Merchant');

  const merchantRow = page.locator('tbody tr')
    .filter({
      hasText: merchantYangMauDiUpdate
    })
    .first();

  await expect(merchantRow).toBeVisible({
    timeout: 10000
  });

  console.log('Merchant berhasil ditemukan');


  // ==================================================
  // STEP 5 - Klik Edit Merchant
  // ==================================================

  console.log('');
  console.log('STEP 5 - Klik Edit Merchant');

  const editButton = merchantRow.getByRole('link').first();

  await expect(editButton).toBeVisible({
    timeout: 10000
  });

  await editButton.scrollIntoViewIfNeeded();
  await editButton.hover();
  await page.waitForTimeout(1500);
  await editButton.click();
  await page.waitForTimeout(2000);

  console.log('Form Edit Merchant berhasil dibuka');


  // ==================================================
  // STEP 6 - Update Nama Merchant
  // ==================================================

  console.log('');
  console.log('STEP 6 - Update Nama Merchant');

  const namaMerchant = page.getByRole('textbox', {
    name: 'Nama Merchant*'
  });

  await expect(namaMerchant).toBeVisible({
    timeout: 10000
  });

  await namaMerchant.fill(namaMerchantBaru);

  await expect(namaMerchant).toHaveValue(
    namaMerchantBaru
  );

  console.log(
    `Nama Merchant diubah menjadi: ${namaMerchantBaru}`
  );


  // ==================================================
  // STEP 7 - Klik Save
  // ==================================================

  console.log('');
  console.log('STEP 7 - Klik Save');

  const saveButton = page.getByRole('button', {
    name: 'Save'
  });

  await saveButton.scrollIntoViewIfNeeded();
  await saveButton.hover();
  await page.waitForTimeout(1500);
  await saveButton.click();
  await page.waitForTimeout(2000);

  console.log('Tombol Save berhasil diklik');


  // ==================================================
  // STEP 8 - Validasi Hasil Update
  // ==================================================

  console.log('');
  console.log('STEP 8 - Validasi Hasil Update');

  const successMessage = page.getByText(
    'Sukses!Berhasil Update'
  );

  await expect(successMessage).toBeVisible({
    timeout: 10000
  });

  console.log(
    'Validasi berhasil: Sukses!Berhasil Update'
  );


  // ==================================================
  // SELESAI
  // ==================================================

  console.log('');
  console.log('==========================================');
  console.log('TC-030 SELESAI');
  console.log('==========================================');

});