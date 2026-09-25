import { test, expect } from '@playwright/test';

test('TC-036 - K-002-N', async ({ page }) => {

  test.setTimeout(90000);

  console.log('');
  console.log('==========================================');
  console.log('TC-036 - K-002-N');
  console.log('Edit Kuota dengan Mengosongkan All Field');
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
  // STEP 2 - Masuk Menu Kuota
  // ==================================================

  console.log('');
  console.log('STEP 2 - Masuk Menu Kuota');

  const kuotaMenu = page.getByRole('link', {
    name: ' Kuota'
  });

  await kuotaMenu.scrollIntoViewIfNeeded();
  await kuotaMenu.hover();
  await page.waitForTimeout(1500);
  await kuotaMenu.click();
  await page.waitForTimeout(2000);

  await expect(page).toHaveURL(
    'https://dev.ptdika.com/cashback_JICAF2026/admin/quota'
  );

  console.log('Menu Kuota berhasil dibuka');


  // ==================================================
  // STEP 3 - Klik Action Edit
  // ==================================================

  console.log('');
  console.log('STEP 3 - Klik Action Edit');

  const editButton = page
    .locator('#table')
    .getByRole('link')
    .filter({ hasText: /^$/ })
    .first();

  await expect(editButton).toBeVisible({
    timeout: 10000
  });

  await editButton.scrollIntoViewIfNeeded();
  await editButton.hover();
  await page.waitForTimeout(1500);
  await editButton.click();
  await page.waitForTimeout(2000);

  console.log('Form Edit Kuota berhasil dibuka');


  // ==================================================
  // STEP 4 - Validasi Form Edit
  // ==================================================

  console.log('');
  console.log('STEP 4 - Validasi Form Edit');

  const updateKuota = page.getByRole('textbox', {
    name: 'Update Kuota*'
  });

  await expect(updateKuota).toBeVisible({
    timeout: 10000
  });

  console.log(
    'Form Edit Kuota berhasil ditampilkan'
  );


  // ==================================================
  // STEP 5 - Klik Update Tanpa Input
  // ==================================================

  console.log('');
  console.log('STEP 5 - Klik Update Tanpa Input');

  const updateButton = page.getByRole('button', {
    name: 'Update'
  });

  await updateButton.scrollIntoViewIfNeeded();
  await updateButton.hover();
  await page.waitForTimeout(1500);
  await updateButton.click();
  await page.waitForTimeout(2000);

  console.log('Tombol Update berhasil diklik');


  // ==================================================
  // STEP 6 - Validasi Pesan Error
  // ==================================================

  console.log('');
  console.log('STEP 6 - Validasi Pesan Error');

  const validationMessage = page.getByText(
    'Jumlah Nominal tidak boleh kosong'
  );

  await expect(validationMessage).toBeVisible({
    timeout: 10000
  });

  console.log(
    'Validasi berhasil: Jumlah Nominal tidak boleh kosong'
  );


  // ==================================================
  // SELESAI
  // ==================================================

  console.log('');
  console.log('==========================================');
  console.log('TC-036 SELESAI');
  console.log('==========================================');

});