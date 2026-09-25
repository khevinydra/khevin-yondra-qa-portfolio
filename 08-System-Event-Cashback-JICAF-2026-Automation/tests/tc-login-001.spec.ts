import { test, expect } from '@playwright/test';

test.setTimeout(90000);

test('TC-001 - LGN-001-N', async ({ page }) => {

  // ==========================================
  // HEADER TEST CASE
  // ==========================================
  console.log('');
  console.log('==========================================');
  console.log('TC-001 - LGN-001-N');
  console.log('SQL Injection pada Username - Login harus gagal');
  console.log('==========================================');

  // ==========================================
  // STEP 1 - Membuka halaman Login
  // ==========================================
  console.log('');
  console.log('STEP 1 - Membuka halaman Login');

  await page.goto(
    'https://dev.ptdika.com/cashback_JICAF2026/login',
    {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    }
  );

  await page.waitForTimeout(1500);

  // ==========================================
  // STEP 2 - Input SQL Injection pada Username
  // ==========================================
  console.log('');
  console.log('STEP 2 - Input SQL Injection pada Username');

  const usernameField = page.getByRole('textbox', {
    name: 'Username'
  });

  await expect(usernameField).toBeVisible({
    timeout: 30000
  });

  await usernameField.hover();
  await page.waitForTimeout(1500);
  await usernameField.click();
  await page.waitForTimeout(700);
  await usernameField.fill("' OR '1'='1");
  await page.waitForTimeout(1000);

  // ==========================================
  // STEP 3 - Input Password
  // ==========================================
  console.log('');
  console.log('STEP 3 - Input Password');

  const passwordField = page.getByRole('textbox', {
    name: 'Password'
  });

  await expect(passwordField).toBeVisible({
    timeout: 30000
  });

  await passwordField.hover();
  await page.waitForTimeout(1500);
  await passwordField.click();
  await page.waitForTimeout(700);
  await passwordField.fill('passwordtest');
  await page.waitForTimeout(1000);

  // ==========================================
  // STEP 4 - Klik Login
  // ==========================================
  console.log('');
  console.log('STEP 4 - Klik tombol Login');

  const loginButton = page.getByRole('button', {
    name: 'Login'
  });

  await expect(loginButton).toBeVisible({
    timeout: 30000
  });

  await loginButton.hover();
  await page.waitForTimeout(1500);
  await loginButton.click();
  await page.waitForTimeout(2500);

  // ==========================================
  // STEP 5 - Validasi Login Gagal
  // ==========================================
  console.log('');
  console.log('STEP 5 - Validasi Login Gagal');

  await expect(page).not.toHaveURL(
    'https://dev.ptdika.com/cashback_JICAF2026/',
    {
      timeout: 10000
    }
  );

  console.log('Login gagal sesuai expected result');
  console.log('SQL Injection tidak berhasil melakukan bypass');

  // ==========================================
  // SELESAI
  // ==========================================
  console.log('');
  console.log('==========================================');
  console.log('TC-001 SELESAI');
  console.log('==========================================');
});