import { test, expect } from '@playwright/test';
import { execFile } from 'child_process';
import path from 'path';
import os from 'os';
import fs from 'fs';

test('TC-071 - RPD-002', async ({ page }) => {
  test.setTimeout(90000);

  console.log('');
  console.log('==========================================');
  console.log('TC-071 - RPD-002');
  console.log('Export Data Report Data ke Excel');
  console.log('==========================================');

  // ==========================================
  // STEP 1 - Buka halaman Login
  // ==========================================
  console.log('STEP 1 - Buka halaman Login');

  await page.goto(
    'https://dev.ptdika.com/cashback_JICAF2026/login'
  );

  // ==========================================
  // STEP 2 - Login sebagai Admin
  // ==========================================
  console.log('STEP 2 - Login sebagai Admin');

  const username = page.getByRole('textbox', {
    name: 'Username'
  });

  const password = page.getByRole('textbox', {
    name: 'Password'
  });

  const loginButton = page.getByRole('button', {
    name: 'Login'
  });

  await username.fill('adminky');
  await password.fill('admin');

  await loginButton.hover();
  await page.waitForTimeout(1500);
  await loginButton.click();
  await page.waitForTimeout(3000);

  // ==========================================
  // STEP 3 - Buka menu Report Data
  // ==========================================
  console.log('STEP 3 - Buka menu Report Data');

  const reportDataMenu = page.getByRole('link', {
    name: ' Report Data'
  });

  await expect(reportDataMenu).toBeVisible({
    timeout: 15000
  });

  await reportDataMenu.scrollIntoViewIfNeeded();
  await reportDataMenu.hover();
  await page.waitForTimeout(1500);
  await reportDataMenu.click();
  await page.waitForTimeout(2000);

  // ==========================================
  // STEP 4 - Pilih filter status
  // ==========================================
  console.log('STEP 4 - Pilih filter status');

  const statusDropdown = page.locator('#status');

  await expect(statusDropdown).toBeVisible({
    timeout: 10000
  });

  await statusDropdown.selectOption('');

  // ==========================================
  // STEP 5 - Klik Filter
  // ==========================================
  console.log('STEP 5 - Klik Filter');

  const filterButton = page.getByRole('button', {
    name: ' Filter'
  });

  await filterButton.hover();
  await page.waitForTimeout(1500);
  await filterButton.click();
  await page.waitForTimeout(3000);

  // ==========================================
  // STEP 6 - Export Excel
  // ==========================================
  console.log('STEP 6 - Export data ke Excel');

  const exportExcelButton = page.getByRole('link', {
    name: 'Export Excel '
  });

  await expect(exportExcelButton).toBeVisible({
    timeout: 10000
  });

  const downloadPromise = page.waitForEvent('download');

  await exportExcelButton.scrollIntoViewIfNeeded();
  await exportExcelButton.hover();
  await page.waitForTimeout(1500);
  await exportExcelButton.click();

  const download = await downloadPromise;

  // ==========================================
  // STEP 7 - Simpan file ke Downloads
  // ==========================================
  console.log('STEP 7 - Simpan file hasil export');

  const downloadsPath = path.join(
    os.homedir(),
    'Downloads'
  );

  const fileName = download.suggestedFilename();
  const downloadPath = path.join(
    downloadsPath,
    fileName
  );

  await download.saveAs(downloadPath);

  console.log(`File: ${downloadPath}`);

  // ==========================================
  // STEP 8 - Validasi file
  // ==========================================
  console.log('STEP 8 - Validasi file hasil export');

  expect(fs.existsSync(downloadPath)).toBe(true);

  const fileStats = fs.statSync(downloadPath);

  expect(fileStats.size).toBeGreaterThan(0);

  console.log(`Nama file: ${fileName}`);
  console.log(`Ukuran file: ${fileStats.size} bytes`);

  // ==========================================
  // STEP 9 - Buka File Explorer
  // ==========================================
  console.log('STEP 9 - Buka File Explorer');

  execFile(
    'explorer.exe',
    ['/select,', downloadPath]
  );

  await page.waitForTimeout(3000);

  // ==========================================
  // STEP 10 - Screenshot
  // ==========================================
  console.log('STEP 10 - Screenshot hasil testing');

  await page.screenshot({
    path: 'screenshots/TC-071-RPD-002.png',
    fullPage: true
  });

  console.log('');
  console.log('==========================================');
  console.log('TC-071 SELESAI');
  console.log('==========================================');
});