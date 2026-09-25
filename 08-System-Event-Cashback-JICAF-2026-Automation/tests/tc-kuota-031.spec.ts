import { test, expect } from '@playwright/test';

test('TC-031 - K-001-N', async ({ page }) => {

  test.setTimeout(90000);

  console.log('');
  console.log('==========================================');
  console.log('TC-031 - K-001-N');
  console.log('Tambah Kuota Tanpa Input All Field');
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
  // STEP 3 - Klik Tambah Kuota
  // ==================================================

  console.log('');
  console.log('STEP 3 - Klik Tambah Kuota');

  const tambahKuotaButton = page.getByRole('button', {
    name: 'Tambah Kuota'
  });

  await tambahKuotaButton.scrollIntoViewIfNeeded();
  await tambahKuotaButton.hover();
  await page.waitForTimeout(1500);
  await tambahKuotaButton.click();
  await page.waitForTimeout(2000);

  console.log('Form Tambah Kuota berhasil dibuka');


  // ==================================================
  // STEP 4 - Validasi Field Wajib
  // ==================================================

  console.log('');
  console.log('STEP 4 - Validasi Field Wajib');

  const requiredFields = page.locator(
    'input:required, select:required, textarea:required'
  );

  const jumlahField = await requiredFields.count();

  console.log(
    `Jumlah field wajib yang ditemukan: ${jumlahField}`
  );

  expect(jumlahField).toBeGreaterThan(0);


  // ==================================================
  // STEP 5 - Klik Simpan Tanpa Mengisi Field
  // ==================================================

  console.log('');
  console.log('STEP 5 - Klik Simpan Tanpa Mengisi Field');

  const simpanButton = page.getByRole('button', {
    name: 'Simpan'
  });

  await simpanButton.scrollIntoViewIfNeeded();
  await simpanButton.hover();
  await page.waitForTimeout(1500);
  await simpanButton.click();
  await page.waitForTimeout(2000);

  console.log('Tombol Simpan berhasil diklik');


  // ==================================================
  // STEP 6 - Validasi Field Invalid
  // ==================================================

  console.log('');
  console.log('STEP 6 - Validasi Field Invalid');

  const invalidFields = page.locator(
    'input:required:invalid, select:required:invalid, textarea:required:invalid'
  );

  const jumlahInvalid = await invalidFields.count();

  console.log(
    `Jumlah field invalid: ${jumlahInvalid}`
  );

  expect(jumlahInvalid).toBeGreaterThan(0);

  console.log(
    'Validasi field wajib berhasil dipicu oleh browser'
  );


  // ==================================================
  // SELESAI
  // ==================================================

  console.log('');
  console.log('==========================================');
  console.log('TC-031 SELESAI');
  console.log('==========================================');

});