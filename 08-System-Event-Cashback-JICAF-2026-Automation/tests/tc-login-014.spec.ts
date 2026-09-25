import { test, expect } from '@playwright/test';

test.setTimeout(90000);

test('TC-014 - LGN-014', async ({ page }) => {

  console.log('');
  console.log('==========================================');
  console.log('TC-014 - LGN-014');
  console.log('Login berhasil dengan Username dan Password Valid');
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

  // STEP 2 - Input Username Valid
  console.log('STEP 2 - Input Username Valid');

  const usernameField = page.getByRole('textbox', { name: 'Username' });
  await usernameField.fill('adminky');

  // STEP 3 - Input Password Valid
  console.log('STEP 3 - Input Password Valid');

  const passwordField = page.getByRole('textbox', { name: 'Password' });
  await passwordField.fill('admin');

  // STEP 4 - Klik Login
  console.log('STEP 4 - Klik tombol Login');

  const loginButton = page.getByRole('button', { name: 'Login' });

  await loginButton.hover();
  await page.waitForTimeout(1500);
  await loginButton.click();
  await page.waitForTimeout(2000);

  // STEP 5 - Validasi berhasil masuk Dashboard
  console.log('STEP 5 - Validasi berhasil masuk Dashboard');

  await expect(page).toHaveURL(
    'https://dev.ptdika.com/cashback_JICAF2026/',
    { timeout: 15000 }
  );

  console.log(`URL Dashboard: ${page.url()}`);
  console.log('PASS - Login berhasil dan User masuk ke Dashboard.');

  // STEP 6 - Menampilkan Dashboard
  console.log('STEP 6 - Menampilkan Dashboard');

  await page.waitForTimeout(5000);

  console.log('');
  console.log('==========================================');
  console.log('TC-014 SELESAI');
  console.log('==========================================');
});