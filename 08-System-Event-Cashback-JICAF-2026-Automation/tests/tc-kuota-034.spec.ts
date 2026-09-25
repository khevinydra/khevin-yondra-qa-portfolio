import { test, expect } from '@playwright/test';
import path from 'path';
import os from 'os';
import fs from 'fs';
import { execFile } from 'child_process';

test('TC-034 - K-003', async ({ page }) => {

  test.setTimeout(90000);

  // ==================================================
  // DATA TEST
  // ==================================================

  const today = new Date();

  const firstDayOfMonth = new Date(
    today.getFullYear(),
    today.getMonth(),
    1
  );

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  const startDateValue = formatDate(firstDayOfMonth);
  const endDateValue = formatDate(today);

  console.log('');
  console.log('==========================================');
  console.log('TC-034 - K-003');
  console.log('Export Data Kuota Berdasarkan Periode Bulan Berjalan');
  console.log('==========================================');

  console.log(`Tanggal mulai  : ${startDateValue}`);
  console.log(`Tanggal selesai: ${endDateValue}`);


  // ==================================================
  // STEP 1 - Login
  // ==================================================

  console.log('');
  console.log('STEP 1 - Login');

  await page.goto(
    'https://dev.ptdika.com/cashback_JICAF2026/login'
  );

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
  await page.waitForTimeout(2000);

  console.log('Login berhasil');


  // ==================================================
  // STEP 2 - Masuk Menu Kuota
  // ==================================================

  console.log('');
  console.log('STEP 2 - Masuk Menu Kuota');

  const kuotaMenu = page.getByRole('link', {
    name: ' Kuota'
  });

  await kuotaMenu.scrollIntoViewIfNeeded();
  await kuotaMenu.hover();
  await page.waitForTimeout(1500);
  await kuotaMenu.click();
  await page.waitForTimeout(2000);

  await expect(page).toHaveURL(
    'https://dev.ptdika.com/cashback_JICAF2026/admin/quota'
  );

  console.log('Menu Kuota berhasil dibuka');


  // ==================================================
  // STEP 3 - Input Periode Tanggal
  // ==================================================

  console.log('');
  console.log('STEP 3 - Input Periode Tanggal');

  const startDate = page.locator(
    'input[name="start_date"]'
  );

  const endDate = page.locator(
    'input[name="end_date"]'
  );

  await expect(startDate).toBeVisible({
    timeout: 10000
  });

  await expect(endDate).toBeVisible({
    timeout: 10000
  });

  await startDate.fill(startDateValue);
  await endDate.fill(endDateValue);

  await expect(startDate).toHaveValue(
    startDateValue
  );

  await expect(endDate).toHaveValue(
    endDateValue
  );

  console.log(
    `Periode export: ${startDateValue} s/d ${endDateValue}`
  );


  // ==================================================
  // STEP 4 - Klik Filter
  // ==================================================

  console.log('');
  console.log('STEP 4 - Klik Filter');

  const filterButton = page.getByRole('button', {
    name: ' Filter'
  });

  await filterButton.scrollIntoViewIfNeeded();
  await filterButton.hover();
  await page.waitForTimeout(1500);
  await filterButton.click();
  await page.waitForTimeout(2000);

  console.log('Tombol Filter berhasil diklik');


  // ==================================================
  // STEP 5 - Validasi Halaman Kuota
  // ==================================================

  console.log('');
  console.log('STEP 5 - Validasi Halaman Kuota');

  await expect(page).toHaveURL(
    'https://dev.ptdika.com/cashback_JICAF2026/admin/quota'
  );

  console.log('Halaman Kuota berhasil ditampilkan');


  // ==================================================
  // STEP 6 - Export Data ke Excel
  // ==================================================

  console.log('');
  console.log('STEP 6 - Export Data ke Excel');

  const exportButton = page.getByRole('button', {
    name: ' Export'
  });

  await exportButton.scrollIntoViewIfNeeded();
  await exportButton.hover();
  await page.waitForTimeout(1500);

  const [download] = await Promise.all([
    page.waitForEvent('download'),
    exportButton.click()
  ]);

  await page.waitForTimeout(2000);

  console.log('Tombol Export berhasil diklik');


  // ==================================================
  // STEP 7 - Ambil Nama File Export
  // ==================================================

  console.log('');
  console.log('STEP 7 - Ambil Nama File Export');

  const fileName = download.suggestedFilename();

  expect(fileName).toBeTruthy();

  console.log(
    `Nama file hasil export: ${fileName}`
  );


  // ==================================================
  // STEP 8 - Simpan File ke Folder Downloads
  // ==================================================

  console.log('');
  console.log('STEP 8 - Simpan File ke Folder Downloads');

  const downloadPath = path.join(
    os.homedir(),
    'Downloads',
    fileName
  );

  await download.saveAs(downloadPath);

  console.log(
    `File tersimpan di: ${downloadPath}`
  );


  // ==================================================
  // STEP 9 - Validasi File
  // ==================================================

  console.log('');
  console.log('STEP 9 - Validasi File');

  expect(fs.existsSync(downloadPath)).toBeTruthy();

  const fileStats = fs.statSync(downloadPath);

  expect(fileStats.size).toBeGreaterThan(0);

  console.log('File berhasil dibuat');
  console.log(`Ukuran file: ${fileStats.size} bytes`);


  // ==================================================
  // STEP 10 - Buka Windows Explorer
  // ==================================================

  console.log('');
  console.log('STEP 10 - Buka Windows Explorer');

  execFile(
    'explorer.exe',
    ['/select,', downloadPath]
  );

  console.log('File export ditampilkan di Windows Explorer');


  // ==================================================
  // SELESAI
  // ==================================================

  console.log('');
  console.log('==========================================');
  console.log('TC-034 SELESAI');
  console.log('==========================================');

});