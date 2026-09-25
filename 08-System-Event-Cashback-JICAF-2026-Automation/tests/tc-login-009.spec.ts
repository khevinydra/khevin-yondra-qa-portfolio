import { test, expect } from '@playwright/test';

test.setTimeout(90000);

test('TC-009 - LGN-009-N', async ({ page }) => {

  console.log('');
  console.log('==========================================');
  console.log('TC-009 - LGN-009-N');
  console.log('Dashboard tidak dapat diakses setelah Logout menggunakan Back Browser');
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

  // STEP 4 - Logout
  console.log('STEP 4 - Logout');

  const logoutButton = page.getByRole('link', { name: ' Logout' });

  await expect(logoutButton).toBeVisible({ timeout: 10000 });

  await logoutButton.hover();
  await page.waitForTimeout(1500);
  await logoutButton.click();
  await page.waitForTimeout(2000);

  // STEP 5 - Validasi kembali ke halaman Login
  console.log('STEP 5 - Validasi kembali ke halaman Login');

  await expect(page).toHaveURL(
    'https://dev.ptdika.com/cashback_JICAF2026/login',
    { timeout: 15000 }
  );

  console.log('Logout berhasil.');

  // STEP 6 - Menekan tombol Back Browser
  console.log('STEP 6 - Menekan tombol Back Browser');

  await page.goBack();
  await page.waitForTimeout(2000);

  console.log(`URL setelah Back Browser: ${page.url()}`);

  // STEP 7 - Validasi Dashboard tidak dapat diakses
  console.log('STEP 7 - Validasi Dashboard tidak dapat diakses setelah Logout');

  await expect(page).toHaveURL(
    'https://dev.ptdika.com/cashback_JICAF2026/login',
    { timeout: 15000 }
  );

  console.log('PASS - Dashboard tidak dapat diakses setelah Logout.');
  console.log('PASS - User tetap diarahkan ke halaman Login.');

  console.log('');
  console.log('==========================================');
  console.log('TC-009 SELESAI');
  console.log('==========================================');
});