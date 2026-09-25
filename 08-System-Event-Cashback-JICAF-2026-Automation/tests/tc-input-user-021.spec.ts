import { test, expect } from '@playwright/test';

test.setTimeout(90000);

test('TC-021 - IU-004', async ({ page }) => {

  console.log('');
  console.log('==========================================');
  console.log('TC-021 - IU-004');
  console.log('Input All Field - Menambahkan User dengan seluruh field valid');
  console.log('==========================================');

  // DATA TEST
  const timestamp = Date.now();

  const username = `testauto${timestamp}`;
  const nama = 'Validasi Automation';
  const nik = String(timestamp).slice(-8);
  const password = 'bisa';

  console.log('');
  console.log('DATA TEST');
  console.log(`Username: ${username}`);
  console.log(`Nama: ${nama}`);
  console.log(`NIK: ${nik}`);
  console.log('Password: ********');
  console.log('Privilege: Admin');

  // STEP 1 - Membuka halaman Login
  console.log('');
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

  const loginUsername = page.getByRole('textbox', {
    name: 'Username'
  });

  const loginPassword = page.getByRole('textbox', {
    name: 'Password'
  });

  await expect(loginUsername).toBeVisible({
    timeout: 10000
  });

  await loginUsername.fill('adminky');
  await loginPassword.fill('admin');

  const loginButton = page.getByRole('button', {
    name: 'Login'
  });

  await loginButton.hover();
  await page.waitForTimeout(1500);
  await loginButton.click();
  await page.waitForTimeout(2000);

  // STEP 3 - Validasi berhasil Login
  console.log('STEP 3 - Validasi berhasil Login');

  await expect(page).toHaveURL(
    'https://dev.ptdika.com/cashback_JICAF2026/',
    {
      timeout: 15000
    }
  );

  console.log('PASS - Login berhasil.');

  // STEP 4 - Membuka menu Input User
  console.log('STEP 4 - Membuka menu Input User');

  const inputUserMenu = page.getByRole('link', {
    name: ' Input User'
  });

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
    {
      timeout: 15000
    }
  );

  console.log('PASS - Halaman Input User berhasil dibuka.');

  // STEP 6 - Input Username User Baru
  console.log(`STEP 6 - Input Username: ${username}`);

  await page.getByRole('textbox', {
    name: 'Username *'
  }).fill(username);

  // STEP 7 - Input Nama
  console.log(`STEP 7 - Input Nama: ${nama}`);

  await page.getByRole('textbox', {
    name: 'Nama *'
  }).fill(nama);

  // STEP 8 - Input NIK
  console.log(`STEP 8 - Input NIK: ${nik}`);

  await page.getByRole('textbox', {
    name: 'NIK *'
  }).fill(nik);

  // STEP 9 - Input Password User
  console.log('STEP 9 - Input Password User');

  await page.getByRole('textbox', {
    name: 'Password *'
  }).fill(password);

  // STEP 10 - Pilih Privilege Admin
  console.log('STEP 10 - Pilih Privilege Admin');

  const privilege = page.getByLabel('Privilage *');

  await privilege.selectOption('1');

  await expect(privilege).toHaveValue('1');

  console.log('PASS - Privilege Admin berhasil dipilih.');

  // STEP 11 - Klik Submit
  console.log('STEP 11 - Klik Submit');

  const submitButton = page.getByRole('button', {
    name: 'Submit'
  });

  await expect(submitButton).toBeVisible({
    timeout: 10000
  });

  await submitButton.hover();
  await page.waitForTimeout(1500);
  await submitButton.click();
  await page.waitForTimeout(2000);

  // STEP 12 - Validasi pesan berhasil
  console.log('STEP 12 - Validasi hasil Submit');

  const successMessage = page.getByText(
    'Berhasil Menambah User!',
    {
      exact: true
    }
  );

  await expect(successMessage).toBeVisible({
    timeout: 15000
  });

  console.log('PASS - Pesan "Berhasil Menambah User!" berhasil ditampilkan.');

  // STEP 13 - Validasi data User berhasil masuk ke tabel
  console.log('STEP 13 - Validasi data User pada tabel');

  const searchBox = page.getByRole('searchbox', {
    name: 'Search:'
  });

  await expect(searchBox).toBeVisible({
    timeout: 10000
  });

  await searchBox.fill(username);
  await page.waitForTimeout(2000);

  const userRow = page.locator('tbody tr').filter({
    hasText: username
  }).first();

  await expect(userRow).toBeVisible({
    timeout: 10000
  });

  console.log(`PASS - User ${username} berhasil ditemukan pada tabel.`);

  // STEP 14 - Screenshot hasil
  console.log('STEP 14 - Mengambil Screenshot');

  await page.screenshot({
    path: 'hasil-submit-tc-021.png',
    fullPage: true
  });

  console.log('Screenshot berhasil dibuat.');

  console.log('');
  console.log('==========================================');
  console.log('TC-021 SELESAI');
  console.log('==========================================');
});