import { test, expect } from '@playwright/test';

test.setTimeout(90000);

test('TC-005 - LGN-005-N', async ({ page }) => {

  console.log('');
  console.log('==========================================');
  console.log('TC-005 - LGN-005-N');
  console.log('HTML Injection pada Username - Login harus gagal');
  console.log('==========================================');

  // STEP 1 - Membuka halaman Login
  console.log('STEP 1 - Membuka halaman Login');
  await page.goto('https://dev.ptdika.com/cashback_JICAF2026/login', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  // STEP 2 - Input HTML Injection pada Username
  console.log('STEP 2 - Input HTML Injection pada Username');
  const usernameField = page.getByRole('textbox', { name: 'Username' });
  await usernameField.fill('<b>admin</b>');

  // STEP 3 - Input Password
  console.log('STEP 3 - Input Password');
  const passwordField = page.getByRole('textbox', { name: 'Password' });
  await passwordField.fill('admin');

  // STEP 4 - Klik Login
  console.log('STEP 4 - Klik tombol Login');
  const loginButton = page.getByRole('button', { name: 'Login' });
  await loginButton.hover();
  await page.waitForTimeout(1500);
  await loginButton.click();
  await page.waitForTimeout(2000);

  // STEP 5 - Validasi Login gagal / tidak masuk Dashboard
  console.log('STEP 5 - Validasi Login gagal');
  await expect(page).not.toHaveURL(
    'https://dev.ptdika.com/cashback_JICAF2026/',
    { timeout: 10000 }
  );

  console.log('Validasi berhasil: Login tidak masuk ke Dashboard.');

  console.log('');
  console.log('==========================================');
  console.log('TC-005 SELESAI');
  console.log('==========================================');
});