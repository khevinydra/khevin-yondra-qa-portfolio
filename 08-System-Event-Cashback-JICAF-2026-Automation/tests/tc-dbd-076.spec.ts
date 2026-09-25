import { test, expect } from '@playwright/test';
import { execFile } from 'child_process';
import path from 'path';
import os from 'os';
import fs from 'fs';

test('TC-076 - DBD-002', async ({ page }) => {
  test.setTimeout(90000);

  console.log('');
  console.log('==========================================');
  console.log('TC-076 - DBD-002');
  console.log('Export Data SPG');
  console.log('==========================================');

  // STEP 1 - Buka halaman Login
  console.log('STEP 1 - Buka halaman Login');
  await page.goto('https://dev.ptdika.com/cashback_JICAF2026/login');

  // STEP 2 - Login sebagai Admin
  console.log('STEP 2 - Login sebagai Admin');

  const username = page.getByRole('textbox', { name: 'Username' });
  const password = page.getByRole('textbox', { name: 'Password' });
  const loginButton = page.getByRole('button', { name: 'Login' });

  await username.fill('adminky');
  await password.fill('admin');

  await loginButton.hover();
  await page.waitForTimeout(1500);
  await loginButton.click();
  await page.waitForTimeout(3000);

  // STEP 3 - Buka Dashboard
  console.log('STEP 3 - Buka Dashboard');

  const dashboardMenu = page.getByRole('link', {
    name: ' Dashboard'
  });

  await expect(dashboardMenu).toBeVisible({ timeout: 15000 });
  await dashboardMenu.scrollIntoViewIfNeeded();
  await dashboardMenu.hover();
  await page.waitForTimeout(1500);
  await dashboardMenu.click();
  await page.waitForTimeout(2000);

  // STEP 4 - Filter Dashboard
  console.log('STEP 4 - Filter Dashboard');

  const startDate = page.locator('input[name="start_date"]');
  const filterButton = page.getByRole('button', {
    name: ' Filter'
  });

  await startDate.fill('2026-09-14');

  await filterButton.hover();
  await page.waitForTimeout(1500);
  await filterButton.click();
  await page.waitForTimeout(2000);

  // STEP 5 - Filter ulang
  console.log('STEP 5 - Filter ulang Dashboard');

  await filterButton.hover();
  await page.waitForTimeout(1500);
  await filterButton.click();
  await page.waitForTimeout(2000);

  // STEP 6 - Export Data SPG
  console.log('STEP 6 - Export Data SPG');

  const exportButton = page
    .locator('#table_spg_wrapper')
    .getByRole('button', { name: 'Export Excel' });

  await expect(exportButton).toBeVisible({ timeout: 10000 });

  await exportButton.scrollIntoViewIfNeeded();
  await exportButton.hover();
  await page.waitForTimeout(1500);

  const downloadPromise = page.waitForEvent('download');
  await exportButton.click();

  const download = await downloadPromise;

  // STEP 7 - Simpan file ke Downloads
  console.log('STEP 7 - Simpan file hasil export');

  const downloadDir = path.join(os.homedir(), 'Downloads');
  const fileName = download.suggestedFilename();
  const downloadPath = path.join(downloadDir, fileName);

  await download.saveAs(downloadPath);

  expect(fs.existsSync(downloadPath)).toBeTruthy();

  const fileSize = fs.statSync(downloadPath).size;
  expect(fileSize).toBeGreaterThan(0);

  console.log(`File berhasil disimpan: ${downloadPath}`);

  // STEP 8 - Buka File Explorer
  console.log('STEP 8 - Buka File Explorer');

  execFile('explorer.exe', ['/select,', downloadPath]);

  await page.waitForTimeout(3000);

  // STEP 9 - Screenshot
  console.log('STEP 9 - Screenshot hasil testing');

  await page.screenshot({
    path: 'screenshots/TC-076-DBD-002.png',
    fullPage: true
  });

  console.log('');
  console.log('==========================================');
  console.log('TC-076 SELESAI');
  console.log('==========================================');
});