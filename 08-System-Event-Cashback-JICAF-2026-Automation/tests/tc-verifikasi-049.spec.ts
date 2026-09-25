import { test, expect } from '@playwright/test';

test.setTimeout(90000);

test('TC-049 - VKS-006', async ({ page }) => {

  const referenceID = 'JICAF20260020';
  const noteText = `Update Notes Validasi ${Date.now()}`;

  console.log('');
  console.log('==========================================');
  console.log('TC-049 - VKS-006');
  console.log('Input Note Valid');
  console.log('==========================================');

  // =========================================================
  // STEP 1 - Buka halaman Login
  // =========================================================

  console.log('');
  console.log('STEP 1 - Buka halaman Login');

  await page.goto(
    'https://dev.ptdika.com/cashback_JICAF2026/login',
    {
      waitUntil: 'domcontentloaded',
      timeout: 120000
    }
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

  await expect(username).toBeVisible();
  await expect(password).toBeVisible();

  // =========================================================
  // STEP 2 - Login sebagai Verifikator
  // =========================================================

  console.log('STEP 2 - Login sebagai Verifikator');

  await username.fill('verifikatorky');
  await password.fill('verif');

  await loginButton.hover();
  await page.waitForTimeout(1500);
  await loginButton.click();
  await page.waitForTimeout(2000);

  await page.waitForLoadState('domcontentloaded');

  console.log('Login Verifikator berhasil.');

  // =========================================================
  // STEP 3 - Buka Menu Verifikasi
  // =========================================================

  console.log('STEP 3 - Buka menu Verifikasi');

  const menuVerifikasi = page.getByRole('link', {
    name: ' Verifikasi'
  });

  await expect(menuVerifikasi).toBeVisible({
    timeout: 30000
  });

  await menuVerifikasi.scrollIntoViewIfNeeded();
  await menuVerifikasi.hover();
  await page.waitForTimeout(1500);
  await menuVerifikasi.click();
  await page.waitForTimeout(2000);

  console.log('Menu Verifikasi berhasil dibuka.');

  // =========================================================
  // STEP 4 - Search Reference ID
  // =========================================================

  console.log('STEP 4 - Search Reference ID');
  console.log(`Reference ID: ${referenceID}`);

  const searchBox = page.getByRole('searchbox', {
    name: 'Search:'
  });

  await expect(searchBox).toBeVisible({
    timeout: 30000
  });

  // Search pertama
  await searchBox.fill(referenceID);
  await searchBox.press('Enter');
  await page.waitForTimeout(2000);

  // Search kedua sesuai flow TC sebelumnya
  await searchBox.fill(referenceID);
  await searchBox.press('Enter');
  await page.waitForTimeout(2000);

  // =========================================================
  // STEP 5 - Validasi Reference ID
  // =========================================================

  console.log('STEP 5 - Validasi Reference ID ditemukan');

  const hasilSearch = page.getByRole('gridcell', {
    name: referenceID,
    exact: true
  });

  await expect(hasilSearch).toBeVisible({
    timeout: 15000
  });

  console.log('Reference ID berhasil ditemukan.');

  // =========================================================
  // STEP 6 - Cari Baris Data Berdasarkan Reference ID
  // =========================================================

  console.log('STEP 6 - Cari baris data berdasarkan Reference ID');

  const dataRow = page
    .locator('tbody tr')
    .filter({
      hasText: referenceID
    })
    .first();

  await expect(dataRow).toBeVisible({
    timeout: 15000
  });

  console.log(
    'Baris data Reference ID berhasil ditemukan.'
  );

  // =========================================================
  // STEP 7 - Buka Detail Data
  // =========================================================

  console.log('STEP 7 - Buka Detail Data');

  const detailButton = dataRow
    .getByRole('link')
    .first();

  await expect(detailButton).toBeVisible({
    timeout: 15000
  });

  console.log('Action button Detail ditemukan.');

  await detailButton.scrollIntoViewIfNeeded();

  // Listener popup dipasang sebelum click
  const page1Promise = page.waitForEvent('popup', {
    timeout: 120000
  });

  await detailButton.hover();
  await page.waitForTimeout(1500);
  await detailButton.click();
  await page.waitForTimeout(2000);

  const page1 = await page1Promise;

  await page1.waitForLoadState('domcontentloaded', {
    timeout: 120000
  });

  await page1.waitForTimeout(2000);

  console.log('Detail data berhasil dibuka.');

  // =========================================================
  // STEP 8 - Input Note
  // =========================================================

  console.log('STEP 8 - Input Note');

  const note = page1.getByRole('textbox', {
    name: 'Note'
  });

  await expect(note).toBeVisible({
    timeout: 30000
  });

  await note.fill(noteText);

  console.log(
    `Note berhasil diisi: ${noteText}`
  );

  // =========================================================
  // STEP 9 - Validasi Button Save Note
  // =========================================================

  console.log('STEP 9 - Validasi Button Save Note');

  const buttonSaveNote = page1.getByRole('button', {
    name: /Save Note/
  });

  await expect(buttonSaveNote).toBeVisible({
    timeout: 30000
  });

  await expect(buttonSaveNote).toBeEnabled();

  console.log(
    'Button Save Note dalam kondisi ENABLED.'
  );

  // =========================================================
  // STEP 10 - Klik Save Note
  // =========================================================

  console.log('STEP 10 - Klik Save Note');

  await buttonSaveNote.scrollIntoViewIfNeeded();
  await buttonSaveNote.hover();
  await page1.waitForTimeout(1500);
  await buttonSaveNote.click();
  await page1.waitForTimeout(2000);

  console.log(
    'Button Save Note berhasil diklik.'
  );

  // =========================================================
  // STEP 11 - Validasi Modal Konfirmasi
  // =========================================================

  console.log('STEP 11 - Validasi Modal Konfirmasi');

  const modalKonfirmasi = page1.getByText(
    'Apakah anda yakin?',
    {
      exact: true
    }
  );

  await expect(modalKonfirmasi).toBeVisible({
    timeout: 15000
  });

  console.log(
    'Modal "Apakah anda yakin?" berhasil muncul.'
  );

  // =========================================================
  // STEP 12 - Siapkan Listener Popup Success
  // =========================================================

  console.log(
    'STEP 12 - Siapkan listener popup success'
  );

  // Listener harus dipasang sebelum klik OK
  const dialogPromise = page1.waitForEvent('dialog', {
    timeout: 30000
  });

  console.log(
    'Listener popup success siap.'
  );

  // =========================================================
  // STEP 13 - Klik OK pada Modal Konfirmasi
  // =========================================================

  console.log(
    'STEP 13 - Klik OK pada Modal Konfirmasi'
  );

  const buttonOK = page1.getByRole('button', {
    name: 'OK',
    exact: true
  });

  await expect(buttonOK).toBeVisible({
    timeout: 10000
  });

  console.log('Button OK ditemukan.');

  await buttonOK.scrollIntoViewIfNeeded();
  await buttonOK.hover();
  await page1.waitForTimeout(1500);
  await buttonOK.click();
  await page1.waitForTimeout(2000);

  console.log(
    'Button OK berhasil diklik.'
  );

  // =========================================================
  // STEP 14 - Tangkap Popup Success
  // =========================================================

  console.log(
    'STEP 14 - Menunggu popup sukses'
  );

  const dialog = await dialogPromise;

  const dialogMessage = dialog.message();

  console.log('');
  console.log('---------- HASIL SAVE NOTE ----------');
  console.log(`Popup : ${dialogMessage}`);

  // =========================================================
  // STEP 15 - Validasi Pesan Success
  // =========================================================

  console.log(
    'STEP 15 - Validasi pesan success'
  );

  expect(dialogMessage).toContain(
    'Sukses update note!'
  );

  console.log(
    'Pesan "Sukses update note!" berhasil ditemukan.'
  );

  // Tahan popup selama 3 detik
  console.log(
    'Menahan popup selama 3 detik...'
  );

  await new Promise(resolve => setTimeout(resolve, 3000));

  await dialog.accept();

  console.log(
    'Popup sukses berhasil dikonfirmasi.'
  );

  // =========================================================
  // STEP 16 - Screenshot
  // =========================================================

  console.log(
    'STEP 16 - Screenshot hasil testing'
  );

  await page1.screenshot({
    path: 'screenshots/TC-049-VKS-006.png',
    fullPage: true
  });

  // =========================================================
  // TEST SELESAI
  // =========================================================

  console.log('');
  console.log('==========================================');
  console.log('TC-049 SELESAI');
  console.log('==========================================');
  console.log(`Reference ID : ${referenceID}`);
  console.log(`Input Note   : ${noteText}`);
  console.log('Button Save Note : ENABLED');
  console.log('Modal Konfirmasi : MUNCUL');
  console.log('Button OK : BERHASIL DIKLIK');
  console.log('Expected : Sukses update note!');
  console.log(`Actual   : ${dialogMessage}`);
  console.log('Result   : SESUAI');
  console.log('==========================================');
});