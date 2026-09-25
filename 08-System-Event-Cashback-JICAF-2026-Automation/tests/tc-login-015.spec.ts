import { test, expect } from '@playwright/test';

test.setTimeout(90000);

test('TC-015 - LGN-015', async ({ page }) => {

  console.log('');
  console.log('==========================================');
  console.log('TC-015 - LGN-015');
  console.log('Akses URL Login Valid');
  console.log('Halaman Login harus berhasil ditampilkan');
  console.log('==========================================');

  // STEP 1 - Membuka URL Login
  console.log('STEP 1 - Membuka URL Login');

  const loginUrl =
    'https://dev.ptdika.com/cashback_JICAF2026/login';

  console.log(`Target URL: ${loginUrl}`);

  await page.goto(loginUrl, {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  await page.waitForTimeout(2000);

  // STEP 2 - Validasi URL halaman Login
  console.log('STEP 2 - Validasi URL halaman Login');

  await expect(page).toHaveURL(loginUrl, {
    timeout: 10000
  });

  console.log(`URL saat ini: ${page.url()}`);
  console.log('PASS - URL Login berhasil dibuka.');

  // STEP 3 - Validasi field Username
  console.log('STEP 3 - Validasi field Username');

  const usernameField = page.getByRole('textbox', { name: 'Username' });

  await expect(usernameField).toBeVisible({
    timeout: 10000
  });

  // STEP 4 - Validasi field Password
  console.log('STEP 4 - Validasi field Password');

  const passwordField = page.getByRole('textbox', { name: 'Password' });

  await expect(passwordField).toBeVisible({
    timeout: 10000
  });

  // STEP 5 - Validasi tombol Login
  console.log('STEP 5 - Validasi tombol Login');

  const loginButton = page.getByRole('button', { name: 'Login' });

  await expect(loginButton).toBeVisible({
    timeout: 10000
  });

  console.log('PASS - Form Login berhasil ditampilkan.');
  console.log('PASS - Username, Password, dan tombol Login tersedia.');

  console.log('');
  console.log('==========================================');
  console.log('TC-015 SELESAI');
  console.log('==========================================');
});