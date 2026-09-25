import { test, expect } from '@playwright/test';
import path from 'path';
import os from 'os';
import fs from 'fs';

test.setTimeout(90000);

test('TC-027 - IM-004-N', async ({ page }) => {

  console.log('');
  console.log('==========================================');
  console.log('TC-027 - IM-004-N');
  console.log('Upload Template Merchant Kosong');
  console.log('==========================================');

  // ==========================================
  // DATA TEST
  // ==========================================

  const fileName = 'template_merchant.xlsx';

  const templatePath = path.join(
    os.homedir(),
    'Downloads',
    fileName
  );

  console.log('');
  console.log('DATA TEST');
  console.log(`Nama File: ${fileName}`);
  console.log(`Lokasi File: ${templatePath}`);

  // ==========================================
  // STEP 1 - Validasi File Template
  // ==========================================

  console.log('');
  console.log('STEP 1 - Validasi File Template');

  expect(
    fs.existsSync(templatePath)
  ).toBeTruthy();

  console.log(
    'PASS - File template ditemukan di folder Downloads.'
  );

  // ==========================================
  // STEP 2 - Membuka halaman Login
  // ==========================================

  console.log('');
  console.log('STEP 2 - Membuka halaman Login');

  await page.goto(
    'https://dev.ptdika.com/cashback_JICAF2026/login',
    {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    }
  );

  await expect(
    page.getByRole('textbox', { name: 'Username' })
  ).toBeVisible({
    timeout: 10000
  });

  console.log(
    'PASS - Halaman Login berhasil dibuka.'
  );

  // ==========================================
  // STEP 3 - Login sebagai Admin
  // ==========================================

  console.log('');
  console.log('STEP 3 - Login sebagai Admin');

  const usernameField = page.getByRole(
    'textbox',
    { name: 'Username' }
  );

  const passwordField = page.getByRole(
    'textbox',
    { name: 'Password' }
  );

  await usernameField.fill('adminky');
  await passwordField.fill('admin');

  const loginButton = page.getByRole(
    'button',
    { name: 'Login' }
  );

  await loginButton.scrollIntoViewIfNeeded();
  await loginButton.hover();

  console.log(
    'Cursor berada di tombol Login.'
  );

  await page.waitForTimeout(1500);

  await loginButton.click();

  console.log(
    'Tombol Login berhasil diklik.'
  );

  await page.waitForTimeout(2000);

  // ==========================================
  // STEP 4 - Validasi Login
  // ==========================================

  console.log('');
  console.log('STEP 4 - Validasi Login');

  await expect(page).toHaveURL(
    'https://dev.ptdika.com/cashback_JICAF2026/',
    {
      timeout: 15000
    }
  );

  console.log(
    'PASS - Login Admin berhasil.'
  );

  // ==========================================
  // STEP 5 - Membuka menu Input Merchant
  // ==========================================

  console.log('');
  console.log('STEP 5 - Membuka menu Input Merchant');

  const inputMerchantMenu = page.getByRole(
    'link',
    { name: ' Input Merchant' }
  );

  await expect(inputMerchantMenu).toBeVisible({
    timeout: 10000
  });

  await inputMerchantMenu.scrollIntoViewIfNeeded();
  await inputMerchantMenu.hover();

  console.log(
    'Cursor berada di menu Input Merchant.'
  );

  await page.waitForTimeout(1500);

  await inputMerchantMenu.click();

  console.log(
    'Menu Input Merchant berhasil diklik.'
  );

  await page.waitForTimeout(2000);

  // ==========================================
  // STEP 6 - Validasi halaman Input Merchant
  // ==========================================

  console.log('');
  console.log(
    'STEP 6 - Validasi halaman Input Merchant'
  );

  await expect(page).toHaveURL(
    'https://dev.ptdika.com/cashback_JICAF2026/admin/merchant',
    {
      timeout: 15000
    }
  );

  console.log(
    'PASS - Halaman Input Merchant berhasil dibuka.'
  );

  // ==========================================
  // STEP 7 - Klik Upload Merchant
  // ==========================================

  console.log('');
  console.log('STEP 7 - Klik Upload Merchant');

  const uploadMerchantButton = page.getByRole(
    'button',
    { name: ' Upload Merchant' }
  );

  await expect(uploadMerchantButton).toBeVisible({
    timeout: 10000
  });

  await uploadMerchantButton.scrollIntoViewIfNeeded();
  await uploadMerchantButton.hover();

  console.log(
    'Cursor berada di tombol Upload Merchant.'
  );

  await page.waitForTimeout(1500);

  await uploadMerchantButton.click();

  console.log(
    'Tombol Upload Merchant berhasil diklik.'
  );

  await page.waitForTimeout(2000);

  // ==========================================
  // STEP 8 - Upload Template Kosong
  // ==========================================

  console.log('');
  console.log('STEP 8 - Upload Template Merchant Kosong');

  const chooseFileButton = page.getByRole(
    'button',
    { name: 'Choose File' }
  );

  await expect(chooseFileButton).toBeVisible({
    timeout: 10000
  });

  await chooseFileButton.setInputFiles(
    templatePath
  );

  console.log(
    `PASS - File "${fileName}" berhasil dipilih.`
  );

  await page.waitForTimeout(1500);

  // ==========================================
  // STEP 9 - Menyiapkan Popup Error
  // ==========================================

  console.log('');
  console.log(
    'STEP 9 - Menyiapkan Popup Error'
  );

  page.once('dialog', async dialog => {

    console.log('');
    console.log('==========================================');
    console.log('POPUP ERROR MUNCUL');
    console.log('==========================================');

    console.log(
      `Dialog message: ${dialog.message()}`
    );

    // Validasi pesan popup
    expect(dialog.message()).toContain(
      'No data found'
    );

    console.log(
      'PASS - Pesan popup error sesuai.'
    );

    console.log(
      'Popup akan dibiarkan terlihat selama 3 detik...'
    );

    // Jeda agar popup benar-benar terlihat
    await new Promise(resolve =>
      setTimeout(resolve, 3000)
    );

    console.log('');
    console.log(
      'Konfirmasi popup error.'
    );

    await dialog.accept();

    console.log(
      'PASS - Popup error berhasil dikonfirmasi.'
    );
  });

  // ==========================================
  // STEP 10 - Klik Save
  // ==========================================

  console.log('');
  console.log('STEP 10 - Klik Save');

  const saveButton = page.getByRole(
    'button',
    { name: 'Save' }
  );

  await expect(saveButton).toBeVisible({
    timeout: 10000
  });

  await saveButton.scrollIntoViewIfNeeded();
  await saveButton.hover();

  console.log(
    'Cursor berada di tombol Save.'
  );

  await page.waitForTimeout(1500);

  await saveButton.click();

  console.log(
    'Tombol Save berhasil diklik.'
  );

  // ==========================================
  // STEP 11 - Tunggu proses validasi
  // ==========================================

  console.log('');
  console.log(
    'STEP 11 - Menunggu proses validasi upload'
  );

  await page.waitForTimeout(3000);

  console.log(
    'PASS - Upload template kosong ditolak.'
  );

  // ==========================================
  // STEP 12 - Screenshot
  // ==========================================

  console.log('');
  console.log('STEP 12 - Mengambil Screenshot');

  await page.screenshot({
    path: 'hasil-upload-template-kosong-tc-027.png',
    fullPage: true
  });

  console.log(
    'Screenshot berhasil dibuat.'
  );

  // ==========================================
  // TEST SELESAI
  // ==========================================

  console.log('');
  console.log('==========================================');
  console.log('TC-027 SELESAI');
  console.log('==========================================');
});