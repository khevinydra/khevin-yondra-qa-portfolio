import { test, expect } from '@playwright/test';

test('TC-029 - IM-003-N', async ({ page }) => {

  test.setTimeout(90000);

  console.log('');
  console.log('==========================================');
  console.log('TC-029 - IM-003-N');
  console.log('Edit Merchant Tanpa Input Nama Merchant');
  console.log('==========================================');

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
  // STEP 3 - Klik Edit Merchant
  // ==================================================

  console.log('');
  console.log('STEP 3 - Klik Edit Merchant');

  const editMerchantButton = page.getByRole('link')
    .filter({ hasText: /^$/ })
    .nth(1);

  await editMerchantButton.scrollIntoViewIfNeeded();
  await editMerchantButton.hover();
  await page.waitForTimeout(1500);
  await editMerchantButton.click();
  await page.waitForTimeout(2000);

  console.log('Form Edit Merchant berhasil dibuka');


  // ==================================================
  // STEP 4 - Kosongkan Nama Merchant
  // ==================================================

  console.log('');
  console.log('STEP 4 - Kosongkan Nama Merchant');

  const namaMerchant = page.getByRole('textbox', {
    name: 'Nama Merchant*'
  });

  await expect(namaMerchant).toBeVisible({
    timeout: 10000
  });

  await namaMerchant.fill('');

  await expect(namaMerchant).toHaveValue('');

  console.log('Nama Merchant berhasil dikosongkan');


  // ==================================================
  // STEP 5 - Klik Save
  // ==================================================

  console.log('');
  console.log('STEP 5 - Klik Save');

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
  // STEP 6 - Validasi
  // ==================================================

  console.log('');
  console.log('STEP 6 - Validasi');

  const validationMessage = page.getByText(
    'The Merchant Name field is required.'
  );

  await expect(validationMessage).toBeVisible({
    timeout: 10000
  });

  console.log(
    'Validasi berhasil: The Merchant Name field is required.'
  );


  // ==================================================
  // SELESAI
  // ==================================================

  console.log('');
  console.log('==========================================');
  console.log('TC-029 SELESAI');
  console.log('==========================================');

});