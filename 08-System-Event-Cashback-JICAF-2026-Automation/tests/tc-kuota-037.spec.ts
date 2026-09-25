import { test, expect } from '@playwright/test';

test('TC-037 - K-002', async ({ page }) => {

  test.setTimeout(90000);

  console.log('');
  console.log('==========================================');
  console.log('TC-037 - K-002');
  console.log('Edit Kuota dengan Mengisi All Field');
  console.log('Tambah (+) dan Kurang (-) Kuota');
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
  // STEP 4 - Input Kuota Tambah (+)
  // ==================================================

  console.log('');
  console.log('STEP 4 - Input Kuota Tambah (+)');

  const updateKuota = page.getByRole('textbox', {
    name: 'Update Kuota*'
  });

  await expect(updateKuota).toBeVisible({
    timeout: 10000
  });

  await updateKuota.fill('1');

  await expect(updateKuota).toHaveValue('1');

  console.log('Jumlah kuota diisi: 1');
  console.log('Mode: Tambah (+)');


  // ==================================================
  // STEP 5 - Klik Update Tambah (+)
  // ==================================================

  console.log('');
  console.log('STEP 5 - Klik Update Tambah (+)');

  const updateButton = page.getByRole('button', {
    name: 'Update'
  });

  const dialogTambahPromise = page.waitForEvent('dialog', {
    timeout: 30000
  });

  await updateButton.scrollIntoViewIfNeeded();
  await updateButton.hover();
  await page.waitForTimeout(1500);
  await updateButton.click();

  const dialogTambah = await dialogTambahPromise;

  console.log(
    `Dialog tambah: ${dialogTambah.message()}`
  );

  expect(dialogTambah.message()).toContain(
    'Data berhasil diupdate'
  );

  console.log(
    'Popup berhasil muncul. Menunggu 3 detik sebelum Accept...'
  );

  await new Promise(resolve =>
    setTimeout(resolve, 3000)
  );

  await dialogTambah.accept();

  await page.waitForTimeout(2000);

  console.log('Popup tambah berhasil di-accept');


  // ==================================================
  // STEP 6 - Klik Action Edit Kembali
  // ==================================================

  console.log('');
  console.log('STEP 6 - Klik Action Edit Kembali');

  const editButtonKedua = page
    .locator('#table')
    .getByRole('link')
    .filter({ hasText: /^$/ })
    .first();

  await expect(editButtonKedua).toBeVisible({
    timeout: 10000
  });

  await editButtonKedua.scrollIntoViewIfNeeded();
  await editButtonKedua.hover();
  await page.waitForTimeout(1500);
  await editButtonKedua.click();
  await page.waitForTimeout(2000);

  console.log('Form Edit Kuota berhasil dibuka kembali');


  // ==================================================
  // STEP 7 - Pilih Kurang (-)
  // ==================================================

  console.log('');
  console.log('STEP 7 - Pilih Kurang (-)');

  const kurangRadio = page.getByRole('radio', {
    name: 'Kurang (-)'
  });

  await expect(kurangRadio).toBeVisible({
    timeout: 10000
  });

  await kurangRadio.check();

  await expect(kurangRadio).toBeChecked();

  console.log('Mode Kurang (-) berhasil dipilih');


  // ==================================================
  // STEP 8 - Input Kuota Kurang (-)
  // ==================================================

  console.log('');
  console.log('STEP 8 - Input Kuota Kurang (-)');

  await updateKuota.fill('1');

  await expect(updateKuota).toHaveValue('1');

  console.log('Jumlah kuota diisi: 1');


  // ==================================================
  // STEP 9 - Klik Update Kurang (-)
  // ==================================================

  console.log('');
  console.log('STEP 9 - Klik Update Kurang (-)');

  const dialogKurangPromise = page.waitForEvent('dialog', {
    timeout: 30000
  });

  await updateButton.scrollIntoViewIfNeeded();
  await updateButton.hover();
  await page.waitForTimeout(1500);
  await updateButton.click();

  const dialogKurang = await dialogKurangPromise;

  console.log(
    `Dialog kurang: ${dialogKurang.message()}`
  );

  expect(dialogKurang.message()).toContain(
    'Data berhasil diupdate'
  );

  console.log(
    'Popup berhasil muncul. Menunggu 3 detik sebelum Accept...'
  );

  await new Promise(resolve =>
    setTimeout(resolve, 3000)
  );

  await dialogKurang.accept();

  await page.waitForTimeout(2000);

  console.log('Popup kurang berhasil di-accept');


  // ==================================================
  // SELESAI
  // ==================================================

  console.log('');
  console.log('==========================================');
  console.log('TC-037 SELESAI');
  console.log('==========================================');

});