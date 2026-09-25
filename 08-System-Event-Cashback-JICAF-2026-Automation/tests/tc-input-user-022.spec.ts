import { test, expect } from '@playwright/test';

test.setTimeout(90000);

test('TC-022 - IU-005', async ({ page }) => {

  console.log('');
  console.log('==========================================');
  console.log('TC-022 - IU-005');
  console.log('Delete User berdasarkan NIK');
  console.log('==========================================');

  // ==========================================
  // DATA TEST
  // ==========================================

  const targetNIK = '69446255';

  console.log('');
  console.log('DATA TEST');
  console.log(`NIK Target: ${targetNIK}`);

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

  await loginButton.hover();
  await page.waitForTimeout(1500);
  await loginButton.click();
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
  // STEP 4 - Membuka menu Input User
  // ==========================================

  console.log('');
  console.log('STEP 4 - Membuka menu Input User');

  const inputUserMenu = page.getByRole(
    'link',
    { name: ' Input User' }
  );

  await expect(inputUserMenu).toBeVisible({
    timeout: 10000
  });

  await inputUserMenu.hover();
  await page.waitForTimeout(1500);
  await inputUserMenu.click();
  await page.waitForTimeout(2000);

  // ==========================================
  // STEP 5 - Validasi halaman Input User
  // ==========================================

  console.log('');
  console.log('STEP 5 - Validasi halaman Input User');

  await expect(page).toHaveURL(
    'https://dev.ptdika.com/cashback_JICAF2026/admin/input_user',
    {
      timeout: 15000
    }
  );

  console.log('PASS - Halaman Input User berhasil dibuka.');

  // ==========================================
  // STEP 6 - Mencari User berdasarkan NIK
  // ==========================================

  console.log('');
  console.log(`STEP 6 - Mencari User berdasarkan NIK: ${targetNIK}`);

  const searchBox = page.getByRole(
    'searchbox',
    { name: 'Search:' }
  );

  await expect(searchBox).toBeVisible({
    timeout: 10000
  });

  await searchBox.fill(targetNIK);
  await page.waitForTimeout(2000);

  console.log(`PASS - NIK ${targetNIK} dimasukkan ke Search.`);

  // ==========================================
  // STEP 7 - Validasi User ditemukan
  // ==========================================

  console.log('');
  console.log('STEP 7 - Validasi User ditemukan');

  const targetRow = page
    .locator('tbody tr')
    .filter({
      hasText: targetNIK
    })
    .first();

  await expect(targetRow).toBeVisible({
    timeout: 15000
  });

  console.log(`PASS - User dengan NIK ${targetNIK} ditemukan.`);

  // ==========================================
  // STEP 8 - Mencari tombol Delete
  // ==========================================

  console.log('');
  console.log('STEP 8 - Mencari tombol Delete');

  const deleteButton = targetRow
    .getByRole('link')
    .first();

  await expect(deleteButton).toBeVisible({
    timeout: 10000
  });

  console.log('PASS - Tombol Delete ditemukan.');

  // ==========================================
  // STEP 9 - Menyiapkan Popup Konfirmasi
  // ==========================================

  console.log('');
  console.log('STEP 9 - Menyiapkan Popup Konfirmasi Delete');

  page.once('dialog', async dialog => {

    console.log('');
    console.log('==========================================');
    console.log('POPUP KONFIRMASI DELETE MUNCUL');
    console.log('==========================================');

    console.log(`Dialog message: ${dialog.message()}`);

    // Validasi isi popup
    expect(dialog.message()).toBe(
      'Anda yakin ingin menghapus data?'
    );

    console.log(
      'PASS - Pesan popup sesuai.'
    );

    console.log(
      'Popup akan dibiarkan terlihat selama 3 detik...'
    );

    // Jeda agar popup terlihat di browser
    await new Promise(resolve => setTimeout(resolve, 3000));

    console.log('');
    console.log('STEP - Konfirmasi Delete');

    console.log(
      'OK diklik secara otomatis oleh Playwright.'
    );

    await dialog.accept();

    console.log(
      'PASS - Popup konfirmasi berhasil diterima.'
    );
  });

  // ==========================================
  // STEP 10 - Klik Delete
  // ==========================================

  console.log('');
  console.log('STEP 10 - Klik tombol Delete');

  await deleteButton.hover();

  console.log(
    'Cursor berada di tombol Delete.'
  );

  await page.waitForTimeout(1500);

  await deleteButton.click();

  console.log(
    'Tombol Delete berhasil diklik.'
  );

  // ==========================================
  // STEP 11 - Tunggu proses Delete
  // ==========================================

  console.log('');
  console.log('STEP 11 - Menunggu proses Delete');

  await page.waitForTimeout(3000);

  await expect(
    page.locator('table')
  ).toBeVisible({
    timeout: 15000
  });

  console.log(
    'PASS - Proses Delete selesai.'
  );

  // ==========================================
  // STEP 12 - Mencari kembali NIK
  // ==========================================

  console.log('');
  console.log(
    `STEP 12 - Mencari kembali NIK: ${targetNIK}`
  );

  const searchBoxAfterDelete = page.getByRole(
    'searchbox',
    { name: 'Search:' }
  );

  await expect(searchBoxAfterDelete).toBeVisible({
    timeout: 10000
  });

  await searchBoxAfterDelete.fill(targetNIK);

  await page.waitForTimeout(2000);

  // ==========================================
  // STEP 13 - Validasi User sudah terhapus
  // ==========================================

  console.log('');
  console.log(
    'STEP 13 - Validasi User sudah terhapus'
  );

  const deletedUserRow = page
    .locator('tbody tr')
    .filter({
      hasText: targetNIK
    });

  await expect(deletedUserRow).toHaveCount(0, {
    timeout: 10000
  });

  console.log(
    `PASS - User dengan NIK ${targetNIK} sudah terhapus.`
  );

  // ==========================================
  // STEP 14 - Screenshot
  // ==========================================

  console.log('');
  console.log('STEP 14 - Mengambil Screenshot');

  await page.screenshot({
    path: 'hasil-delete-tc-022.png',
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
  console.log('TC-022 SELESAI');
  console.log('==========================================');
});