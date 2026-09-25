import { test, expect } from '@playwright/test';

test.setTimeout(90000);

test('TC-012 - LGN-012-N', async ({ page }) => {

  console.log('');
  console.log('==========================================');
  console.log('TC-012 - LGN-012-N');
  console.log('Login tanpa input Username dan Password');
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

  // STEP 2 - Klik Login tanpa mengisi Username dan Password
  console.log('STEP 2 - Klik tombol Login tanpa input data');

  const loginButton = page.getByRole('button', { name: 'Login' });

  await loginButton.hover();
  await page.waitForTimeout(1500);
  await loginButton.click();
  await page.waitForTimeout(2000);

  // STEP 3 - Validasi tidak masuk Dashboard
  console.log('STEP 3 - Validasi tidak masuk Dashboard');

  await expect(page).not.toHaveURL(
    'https://dev.ptdika.com/cashback_JICAF2026/',
    { timeout: 10000 }
  );

  console.log('PASS - Login tanpa Username dan Password tidak masuk Dashboard.');
  console.log(`URL saat ini: ${page.url()}`);

  console.log('');
  console.log('==========================================');
  console.log('TC-012 SELESAI');
  console.log('==========================================');
});