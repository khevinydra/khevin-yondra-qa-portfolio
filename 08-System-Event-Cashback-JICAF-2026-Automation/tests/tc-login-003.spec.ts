import { test, expect } from '@playwright/test';

test.setTimeout(90000);

test('TC-003 - LGN-003-N', async ({ page }) => {

  // ==========================================
  // HEADER TEST CASE
  // ==========================================
  console.log('');
  console.log('==========================================');
  console.log('TC-003 - LGN-003-N');
  console.log('XSS pada Username - Login harus gagal');
  console.log('==========================================');

  // Flag untuk mendeteksi popup alert
  let alertAppeared = false;


  // ==========================================
  // LISTENER - Deteksi JavaScript Dialog
  // ==========================================
  page.on('dialog', async (dialog) => {
    alertAppeared = true;

    console.log('');
    console.log('==========================================');
    console.log('ALERT TERDETEKSI');
    console.log('==========================================');
    console.log(`Dialog message: ${dialog.message()}`);

    await dialog.dismiss();
  });


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

  console.log('Halaman Login berhasil dibuka');


  // ==========================================
  // STEP 2 - Input XSS pada Username
  // ==========================================
  console.log('');
  console.log('STEP 2 - Input script JavaScript pada Username');

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

  await usernameField.fill('<script>alert(1)</script>');

  await page.waitForTimeout(1000);

  console.log('Payload XSS berhasil dimasukkan');


  // ==========================================
  // STEP 3 - Input Password
  // ==========================================
  console.log('');
  console.log('STEP 3 - Input Password sembarang');

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

  await passwordField.fill('validasi');

  await page.waitForTimeout(1000);

  console.log('Password berhasil dimasukkan');


  // ==========================================
  // STEP 4 - Klik tombol Login
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

  console.log('Tombol Login berhasil diklik');


  // ==========================================
  // STEP 5 - Validasi Tidak Ada Popup XSS
  // ==========================================
  console.log('');
  console.log('STEP 5 - Validasi tidak ada popup alert');

  expect(alertAppeared).toBe(false);

  console.log('Tidak ada popup alert XSS');
  console.log('Payload XSS tidak dieksekusi');


  // ==========================================
  // SELESAI
  // ==========================================
  console.log('');
  console.log('==========================================');
  console.log('TC-003 SELESAI');
  console.log('==========================================');
});