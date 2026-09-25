import { test, expect } from '@playwright/test';

test('TC-067 - RRN-001-N', async ({ page }) => {
  test.setTimeout(90000);

  const rrn = '909';

  console.log('');
  console.log('==========================================');
  console.log('TC-067 - RRN-001-N');
  console.log('Cek RRN dengan RRN yang Tidak Ditemukan');
  console.log('==========================================');

  // ==========================================
  // STEP 1 - Buka halaman Login
  // ==========================================
  console.log('STEP 1 - Buka halaman Login');

  await page.goto(
    'https://dev.ptdika.com/cashback_JICAF2026/login'
  );

  // ==========================================
  // STEP 2 - Login sebagai Finance
  // ==========================================
  console.log('STEP 2 - Login sebagai Finance');

  const username = page.getByRole('textbox', {
    name: 'Username'
  });

  const password = page.getByRole('textbox', {
    name: 'Password'
  });

  const loginButton = page.getByRole('button', {
    name: 'Login'
  });

  await username.fill('financeky');
  await password.fill('finance');

  await loginButton.hover();
  await page.waitForTimeout(1500);
  await loginButton.click();
  await page.waitForTimeout(3000);

  // ==========================================
  // STEP 3 - Buka menu Cek RRN
  // ==========================================
  console.log('STEP 3 - Buka menu Cek RRN');

  const cekRrnMenu = page.getByRole('link', {
    name: ' Cek RRN'
  });

  await cekRrnMenu.scrollIntoViewIfNeeded();
  await cekRrnMenu.hover();
  await page.waitForTimeout(1500);
  await cekRrnMenu.click();
  await page.waitForTimeout(2000);

  // ==========================================
  // STEP 4 - Input RRN
  // ==========================================
  console.log(`STEP 4 - Input RRN: ${rrn}`);

  const rrnInput = page.getByRole('textbox', {
    name: 'Cek RRN'
  });

  await expect(rrnInput).toBeVisible({
    timeout: 10000
  });

  await rrnInput.fill(rrn);

  // ==========================================
  // STEP 5 - Submit pencarian RRN
  // ==========================================
  console.log('STEP 5 - Submit pencarian RRN');

  await rrnInput.press('Enter');
  await page.waitForTimeout(3000);

  // ==========================================
  // STEP 6 - Validasi RRN tidak ditemukan
  // ==========================================
  console.log('STEP 6 - Validasi pesan RRN tidak ditemukan');

  const errorMessage = page.getByText(
    'RRN tidak ditemukan',
    {
      exact: true
    }
  );

  await expect(errorMessage).toBeVisible({
    timeout: 10000
  });

  // ==========================================
  // STEP 7 - Screenshot
  // ==========================================
  console.log('STEP 7 - Screenshot hasil testing');

  await page.screenshot({
    path: 'screenshots/TC-067-CRR-001-N.png',
    fullPage: true
  });

  console.log('');
  console.log('==========================================');
  console.log('TC-067 SELESAI');
  console.log('==========================================');
});