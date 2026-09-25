import { test, expect } from '@playwright/test';

test.setTimeout(90000);

test('TC-008 - LGN-008-N', async ({ page }) => {

  console.log('');
  console.log('==========================================');
  console.log('TC-008 - LGN-008-N');
  console.log('Akses Dashboard tanpa Login - User harus diarahkan ke Login');
  console.log('==========================================');

  // STEP 1 - Menentukan URL Dashboard
  console.log('STEP 1 - Menentukan URL Dashboard');

  const dashboardUrl =
    'https://dev.ptdika.com/cashback_JICAF2026/dashboard';

  const loginUrl =
    'https://dev.ptdika.com/cashback_JICAF2026/login';

  console.log(`Target URL Dashboard: ${dashboardUrl}`);

  // STEP 2 - Akses Dashboard tanpa Login
  console.log('STEP 2 - Akses Dashboard tanpa Login');

  await page.goto(dashboardUrl, {
    waitUntil: 'commit',
    timeout: 60000
  });

  console.log(`URL setelah akses: ${page.url()}`);

  // STEP 3 - Validasi redirect ke Login
  console.log('STEP 3 - Validasi redirect ke halaman Login');

  await expect(page).toHaveURL(loginUrl, {
    timeout: 10000
  });

  console.log(`URL akhir: ${page.url()}`);
  console.log('PASS - User tidak dapat mengakses Dashboard tanpa Login.');
  console.log('PASS - Sistem otomatis mengarahkan User ke halaman Login.');

  console.log('');
  console.log('==========================================');
  console.log('TC-008 SELESAI');
  console.log('==========================================');
});