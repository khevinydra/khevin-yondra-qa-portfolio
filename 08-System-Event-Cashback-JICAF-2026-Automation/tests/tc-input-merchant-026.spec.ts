import { test, expect } from '@playwright/test';
import path from 'path';
import os from 'os';
import fs from 'fs';
import { execFile } from 'child_process';

test.setTimeout(90000);

test('TC-026 - IM-003', async ({ page }) => {

  console.log('');
  console.log('==========================================');
  console.log('TC-026 - IM-003');
  console.log('Download Template Merchant');
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

  await expect(
    page.getByRole('textbox', { name: 'Username' })
  ).toBeVisible({
    timeout: 10000
  });

  console.log('PASS - Halaman Login berhasil dibuka.');

  // ==========================================
  // STEP 2 - Login sebagai Admin
  // ==========================================

  console.log('');
  console.log('STEP 2 - Login sebagai Admin');

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

  console.log('Cursor berada di tombol Login.');

  await page.waitForTimeout(1500);

  await loginButton.click();

  console.log('Tombol Login berhasil diklik.');

  await page.waitForTimeout(2000);

  // ==========================================
  // STEP 3 - Validasi Login
  // ==========================================

  console.log('');
  console.log('STEP 3 - Validasi Login');

  await expect(page).toHaveURL(
    'https://dev.ptdika.com/cashback_JICAF2026/',
    {
      timeout: 15000
    }
  );

  console.log('PASS - Login Admin berhasil.');

  // ==========================================
  // STEP 4 - Membuka menu Input Merchant
  // ==========================================

  console.log('');
  console.log('STEP 4 - Membuka menu Input Merchant');

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
  // STEP 5 - Validasi halaman Input Merchant
  // ==========================================

  console.log('');
  console.log('STEP 5 - Validasi halaman Input Merchant');

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
  // STEP 6 - Mencari tombol Download Template
  // ==========================================

  console.log('');
  console.log('STEP 6 - Mencari tombol Download Template');

  const downloadTemplateButton = page.getByRole(
    'link',
    { name: ' Download Template' }
  );

  await expect(downloadTemplateButton).toBeVisible({
    timeout: 10000
  });

  console.log(
    'PASS - Tombol Download Template ditemukan.'
  );

  // ==========================================
  // STEP 7 - Download Template
  // ==========================================

  console.log('');
  console.log('STEP 7 - Download Template');

  await downloadTemplateButton.scrollIntoViewIfNeeded();
  await downloadTemplateButton.hover();

  console.log(
    'Cursor berada di tombol Download Template.'
  );

  await page.waitForTimeout(1500);

  const [download] = await Promise.all([
    page.waitForEvent('download'),
    downloadTemplateButton.click()
  ]);

  console.log(
    'Tombol Download Template berhasil diklik.'
  );

  await page.waitForTimeout(2000);

  // ==========================================
  // STEP 8 - Mengambil Nama File
  // ==========================================

  console.log('');
  console.log('STEP 8 - Mengambil nama file hasil download');

  const fileName = download.suggestedFilename();

  console.log(
    `Nama file hasil download: ${fileName}`
  );

  expect(fileName).toBeTruthy();

  // ==========================================
  // STEP 9 - Menentukan Lokasi Downloads
  // ==========================================

  console.log('');
  console.log('STEP 9 - Menentukan lokasi penyimpanan file');

  const downloadPath = path.join(
    os.homedir(),
    'Downloads',
    fileName
  );

  console.log(
    `Lokasi file: ${downloadPath}`
  );

  // ==========================================
  // STEP 10 - Menyimpan File
  // ==========================================

  console.log('');
  console.log('STEP 10 - Menyimpan file hasil download');

  await download.saveAs(downloadPath);

  console.log(
    'PASS - File berhasil disimpan.'
  );

  // ==========================================
  // STEP 11 - Validasi File
  // ==========================================

  console.log('');
  console.log('STEP 11 - Validasi file hasil download');

  expect(
    fs.existsSync(downloadPath)
  ).toBeTruthy();

  console.log(
    'PASS - File ditemukan di folder Downloads.'
  );

  // ==========================================
  // STEP 12 - Validasi Ukuran File
  // ==========================================

  console.log('');
  console.log('STEP 12 - Validasi ukuran file');

  const fileStats = fs.statSync(downloadPath);

  expect(fileStats.size).toBeGreaterThan(0);

  console.log(
    `PASS - Ukuran file: ${fileStats.size} bytes`
  );

  // ==========================================
  // STEP 13 - Membuka File Explorer
  // ==========================================

  console.log('');
  console.log('STEP 13 - Membuka File Explorer');

  execFile(
    'explorer.exe',
    ['/select,', downloadPath]
  );

  console.log(
    'PASS - File Explorer dibuka dan file hasil download ditampilkan.'
  );

  // ==========================================
  // TEST SELESAI
  // ==========================================

  console.log('');
  console.log('==========================================');
  console.log('TC-026 SELESAI');
  console.log('==========================================');
});