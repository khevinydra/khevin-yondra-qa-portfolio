import { test, expect } from '@playwright/test';

test('TC-068 - RRN-002-N', async ({ page }) => {
  test.setTimeout(90000);

  console.log('');
  console.log('==========================================');
  console.log('TC-068 - RRN-002-N');
  console.log('Cek RRN Tanpa Input RRN');
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
  // STEP 4 - Klik field RRN tanpa input
  // ==========================================
  console.log('STEP 4 - Klik field RRN tanpa mengisi data');

  const rrnInput = page.getByRole('textbox', {
    name: 'Cek RRN'
  });

  await expect(rrnInput).toBeVisible({
    timeout: 10000
  });

  await rrnInput.click();

  // ==========================================
  // STEP 5 - Tekan Enter tanpa input RRN
  // ==========================================
  console.log('STEP 5 - Tekan Enter tanpa input RRN');

  await rrnInput.press('Enter');
  await page.waitForTimeout(2000);

  // ==========================================
  // STEP 6 - Validasi pesan required
  // ==========================================
  console.log('STEP 6 - Validasi pesan required');

  const requiredMessage = page.getByText(
    'The RRN / Approval Code field',
    {
      exact: false
    }
  );

  await expect(requiredMessage).toBeVisible({
    timeout: 10000
  });

  await expect(requiredMessage).toContainText(
    'The RRN / Approval Code field is required.'
  );

  // ==========================================
  // STEP 7 - Screenshot
  // ==========================================
  console.log('STEP 7 - Screenshot hasil testing');

  await page.screenshot({
    path: 'screenshots/TC-068-RRN-002-N.png',
    fullPage: true
  });

  console.log('');
  console.log('==========================================');
  console.log('TC-068 SELESAI');
  console.log('==========================================');
});