import { test, expect } from '@playwright/test';

test('TC-064 - UBT-004', async ({ page }) => {
  test.setTimeout(90000);

  const referenceID = 'JICAF20260012';

  console.log('');
  console.log('==========================================');
  console.log('TC-064 - UBT-004');
  console.log('Menampilkan Form Upload Bukti Transfer');
  console.log('==========================================');

  // ==================================================
  // STEP 1 - Buka halaman Login
  // ==================================================
  console.log('STEP 1 - Buka halaman Login');

  await page.goto(
    'https://dev.ptdika.com/cashback_JICAF2026/login'
  );

  await expect(
    page.getByRole('textbox', { name: 'Username' })
  ).toBeVisible();

  // ==================================================
  // STEP 2 - Login sebagai Verifikator
  // ==================================================
  console.log('STEP 2 - Login sebagai Verifikator');

  const username = page.getByRole('textbox', {
    name: 'Username'
  });

  const password = page.getByRole('textbox', {
    name: 'Password'
  });

  await username.click();
  await username.fill('verifikatorky');

  await password.fill('verif');
  await password.press('Enter');

  await page.waitForTimeout(5000);

  // ==================================================
  // STEP 3 - Buka menu Upload Bukti Transfer
  // ==================================================
  console.log('STEP 3 - Buka menu Upload Bukti Transfer');

  const uploadMenu = page.getByRole('link', {
    name: ' Upload Bukti Transfer'
  });

  await expect(uploadMenu).toBeVisible({
    timeout: 15000
  });

  await uploadMenu.scrollIntoViewIfNeeded();
  await uploadMenu.hover();
  await page.waitForTimeout(1500);
  await uploadMenu.click();
  await page.waitForTimeout(3000);

  // ==================================================
  // STEP 4 - Search Reference ID
  // ==================================================
  console.log(
    `STEP 4 - Search Reference ID: ${referenceID}`
  );

  const searchBox = page.getByRole('searchbox', {
    name: 'Search:'
  });

  await expect(searchBox).toBeVisible({
    timeout: 10000
  });

  // Search pertama
  await searchBox.fill(referenceID);
  await searchBox.press('Enter');
  await page.waitForTimeout(2000);

  // Search kedua
  await searchBox.fill(referenceID);
  await searchBox.press('Enter');
  await page.waitForTimeout(2000);

  // ==================================================
  // STEP 5 - Validasi data ditemukan
  // ==================================================
  console.log('STEP 5 - Validasi data ditemukan');

  const referenceResult = page.getByRole('gridcell', {
    name: referenceID,
    exact: true
  });

  await expect(referenceResult).toBeVisible({
    timeout: 10000
  });

  // ==================================================
  // STEP 6 - Klik Action untuk membuka Form Upload
  // ==================================================
  console.log('STEP 6 - Klik Action');

  const actionButton = page
    .locator('#table')
    .getByRole('link')
    .filter({
      hasText: /^$/
    })
    .first();

  await expect(actionButton).toBeVisible({
    timeout: 10000
  });

  const popupPromise = page.waitForEvent('popup');

  await actionButton.scrollIntoViewIfNeeded();
  await actionButton.hover();
  await page.waitForTimeout(1500);
  await actionButton.click();

  // ==================================================
  // STEP 7 - Validasi Popup Form Upload
  // ==================================================
  console.log('STEP 7 - Validasi Form Upload Bukti Transfer');

  const popup = await popupPromise;

  await popup.waitForLoadState('domcontentloaded');

  await popup.waitForTimeout(3000);

  // Validasi popup berhasil terbuka
  await expect(popup).toHaveURL(
    /cashback_JICAF2026/,
    {
      timeout: 10000
    }
  );

  // ==================================================
  // STEP 8 - Screenshot
  // ==================================================
  console.log('STEP 8 - Screenshot Form Upload');

  await popup.screenshot({
    path: 'screenshots/TC-064-UBT-004.png',
    fullPage: true
  });

  console.log('');
  console.log('==========================================');
  console.log('TC-064 SELESAI');
  console.log('==========================================');
});