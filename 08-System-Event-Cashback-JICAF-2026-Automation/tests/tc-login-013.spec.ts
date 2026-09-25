import { test, expect } from '@playwright/test';

test.setTimeout(90000);

test('TC-013 - LGN-013-N', async ({ page }) => {

  console.log('');
  console.log('==========================================');
  console.log('TC-013 - LGN-013-N');
  console.log('Login dengan Username tidak terdaftar dan Password sembarang');
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

  // STEP 2 - Input Username tidak terdaftar
  console.log('STEP 2 - Input Username tidak terdaftar');

  const usernameField = page.getByRole('textbox', { name: 'Username' });
  await usernameField.fill('viper');

  // STEP 3 - Input Password sembarang
  console.log('STEP 3 - Input Password sembarang');

  const passwordField = page.getByRole('textbox', { name: 'Password' });
  await passwordField.fill('blade');

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

  // STEP 6 - Validasi berada di halaman Login
  console.log('STEP 6 - Validasi diarahkan ke halaman Login');

  await expect(page).toHaveURL(
    'https://dev.ptdika.com/cashback_JICAF2026/panel/login',
    { timeout: 10000 }
  );

  console.log(`URL akhir: ${page.url()}`);
  console.log('PASS - User diarahkan kembali ke halaman Login.');

  console.log('');
  console.log('==========================================');
  console.log('TC-013 SELESAI');
  console.log('==========================================');
});