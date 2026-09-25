import { test, expect } from '@playwright/test';

test.setTimeout(90000);

test('TC-016 - LGN-016-N', async ({ page }) => {

  console.log('');
  console.log('==========================================');
  console.log('TC-016 - LGN-016-N');
  console.log('Akses URL Login Invalid');
  console.log('Halaman Login normal tidak boleh diakses');
  console.log('==========================================');

  // STEP 1 - Menentukan URL Login Invalid
  console.log('STEP 1 - Menentukan URL Login Invalid');

  const invalidUrl =
    'https://dev.ptdika.com/cashback_JICAF2026/login/A';

  console.log(`Target URL: ${invalidUrl}`);

  // STEP 2 - Akses URL Invalid
  console.log('STEP 2 - Membuka URL Login Invalid');

  await page.goto(invalidUrl, {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  await page.waitForTimeout(2000);

  console.log(`URL saat ini: ${page.url()}`);

  // STEP 3 - Validasi tidak masuk Dashboard
  console.log('STEP 3 - Validasi tidak masuk Dashboard');

  await expect(page).not.toHaveURL(
    'https://dev.ptdika.com/cashback_JICAF2026/',
    { timeout: 10000 }
  );

  console.log('PASS - User tidak masuk ke Dashboard.');

  // STEP 4 - Validasi tidak diarahkan ke halaman Login normal
  console.log('STEP 4 - Validasi tidak diarahkan ke halaman Login normal');

  await expect(page).not.toHaveURL(
    'https://dev.ptdika.com/cashback_JICAF2026/login',
    { timeout: 10000 }
  );

  console.log('PASS - URL Login normal tidak dapat diakses melalui URL invalid.');

  console.log('');
  console.log('==========================================');
  console.log('TC-016 SELESAI');
  console.log('==========================================');
});