import { test, expect } from '@playwright/test';

test.setTimeout(90000);

test('TC-011 - LGN-011-N', async ({ page }) => {

  console.log('');
  console.log('==========================================');
  console.log('TC-011 - LGN-011-N');
  console.log('Login dengan Username Invalid dan Password Valid');
  console.log('Login harus gagal');
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

  // STEP 2 - Input Username Invalid
  console.log('STEP 2 - Input Username Invalid');

  const usernameField = page.getByRole('textbox', { name: 'Username' });
  await usernameField.fill('razor');

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

  // STEP 5 - Validasi tidak masuk Dashboard
  console.log('STEP 5 - Validasi tidak masuk Dashboard');

  await expect(page).not.toHaveURL(
    'https://dev.ptdika.com/cashback_JICAF2026/',
    { timeout: 10000 }
  );

  console.log('PASS - User tidak masuk ke Dashboard.');

  // STEP 6 - Validasi diarahkan ke halaman Login
  console.log('STEP 6 - Validasi diarahkan ke halaman Login');

  await expect(page).toHaveURL(
    'https://dev.ptdika.com/cashback_JICAF2026/panel/login',
    { timeout: 10000 }
  );

  console.log(`URL akhir: ${page.url()}`);
  console.log('PASS - User diarahkan kembali ke halaman Login.');

  console.log('');
  console.log('==========================================');
  console.log('TC-011 SELESAI');
  console.log('==========================================');
});