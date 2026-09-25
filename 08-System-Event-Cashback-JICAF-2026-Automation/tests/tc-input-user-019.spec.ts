import { test, expect } from '@playwright/test';

test.setTimeout(90000);

test('TC-019 - IU-003', async ({ page }) => {

  console.log('');
  console.log('==========================================');
  console.log('TC-019 - IU-003');
  console.log('Filter menampilkan data berdasarkan keyword Username');
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

  // STEP 6 - Validasi Search Box
  console.log('STEP 6 - Validasi Search Box');

  const searchBox = page.getByRole('searchbox', {
    name: 'Search:'
  });

  await expect(searchBox).toBeVisible({
    timeout: 10000
  });

  // STEP 7 - Input keyword Username
  console.log('STEP 7 - Input keyword Username: spgky');

  await searchBox.fill('spgky');
  await page.waitForTimeout(2000);

  // STEP 8 - Validasi baris hasil pencarian
  console.log('STEP 8 - Validasi hasil pencarian');

  const row = page.locator('tbody tr').first();

  await expect(row).toBeVisible({
    timeout: 10000
  });

  // STEP 9 - Validasi kolom Username
  console.log('STEP 9 - Validasi kolom Username');

  const usernameCell = row.locator('td').nth(3);

  await expect(usernameCell).toHaveText('spgky');

  console.log('PASS - Data berhasil difilter berdasarkan Username.');
  console.log('PASS - Username yang ditampilkan sesuai dengan keyword pencarian.');

  console.log('');
  console.log('==========================================');
  console.log('TC-019 SELESAI');
  console.log('==========================================');
});