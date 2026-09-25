import { test, expect } from '@playwright/test';

test.setTimeout(90000);

test('TC-020 - IU-001-N', async ({ page }) => {

  console.log('');
  console.log('==========================================');
  console.log('TC-020 - IU-001-N');
  console.log('Empty All Field - Submit Input User tanpa mengisi field');
  console.log('==========================================');

  // STEP 1 - Membuka halaman Login
  console.log('STEP 1 - Membuka halaman Login');

  await page.goto(
    'https://dev.ptdika.com/cashback_JICAF2026/login',
    {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    }
  );

  // STEP 2 - Login sebagai Admin
  console.log('STEP 2 - Login sebagai Admin');

  const usernameField = page.getByRole('textbox', { name: 'Username' });
  await usernameField.fill('adminky');

  const passwordField = page.getByRole('textbox', { name: 'Password' });
  await passwordField.fill('admin');

  const loginButton = page.getByRole('button', { name: 'Login' });

  await loginButton.hover();
  await page.waitForTimeout(1500);
  await loginButton.click();
  await page.waitForTimeout(2000);

  // STEP 3 - Validasi berhasil Login
  console.log('STEP 3 - Validasi berhasil Login');

  await expect(page).toHaveURL(
    'https://dev.ptdika.com/cashback_JICAF2026/',
    { timeout: 15000 }
  );

  console.log('Login berhasil.');

  // STEP 4 - Membuka menu Input User
  console.log('STEP 4 - Membuka menu Input User');

  const inputUserMenu = page.getByRole('link', { name: ' Input User' });

  await expect(inputUserMenu).toBeVisible({
    timeout: 10000
  });

  await inputUserMenu.hover();
  await page.waitForTimeout(1500);
  await inputUserMenu.click();
  await page.waitForTimeout(2000);

  // STEP 5 - Validasi halaman Input User
  console.log('STEP 5 - Validasi halaman Input User');

  await expect(page).toHaveURL(
    'https://dev.ptdika.com/cashback_JICAF2026/admin/input_user',
    { timeout: 15000 }
  );

  // STEP 6 - Validasi tombol Submit
  console.log('STEP 6 - Validasi tombol Submit');

  const submitButton = page.getByRole('button', {
    name: 'Submit'
  });

  await expect(submitButton).toBeVisible({
    timeout: 10000
  });

  // STEP 7 - Klik Submit tanpa mengisi semua field
  console.log('STEP 7 - Klik Submit tanpa mengisi field');

  await submitButton.hover();
  await page.waitForTimeout(1500);
  await submitButton.click();
  await page.waitForTimeout(2000);

  // STEP 8 - Validasi Alert Utama
  console.log('STEP 8 - Validasi alert utama');

  await expect(
    page.getByText(
      'Gagal menambah user. Mohon lengkapi data dengan benar.'
    )
  ).toBeVisible({
    timeout: 10000
  });

  console.log('PASS - Alert utama berhasil muncul.');

  // STEP 9 - Validasi Username Required
  console.log('STEP 9 - Validasi Username Required');

  await expect(
    page.getByText('The Username field is required.')
  ).toBeVisible();

  // STEP 10 - Validasi Nama Required
  console.log('STEP 10 - Validasi Nama Required');

  await expect(
    page.getByText('The Nama field is required.')
  ).toBeVisible();

  // STEP 11 - Validasi NIK Required
  console.log('STEP 11 - Validasi NIK Required');

  await expect(
    page.getByText('The NIK field is required.')
  ).toBeVisible();

  // STEP 12 - Validasi Password Required
  console.log('STEP 12 - Validasi Password Required');

  await expect(
    page.getByText('The Password field is required.')
  ).toBeVisible();

  // STEP 13 - Validasi Privilage Required
  console.log('STEP 13 - Validasi Privilage Required');

  await expect(
    page.getByText('The Privilage field is required.')
  ).toBeVisible();

  // STEP 14 - Validasi tetap di halaman Input User
  console.log('STEP 14 - Validasi tetap di halaman Input User');

  await expect(page).toHaveURL(
    'https://dev.ptdika.com/cashback_JICAF2026/admin/input_user',
    { timeout: 10000 }
  );

  console.log('PASS - Sistem menolak Submit dengan seluruh field kosong.');
  console.log('PASS - Seluruh validasi required berhasil ditampilkan.');

  console.log('');
  console.log('==========================================');
  console.log('TC-020 SELESAI');
  console.log('==========================================');
});