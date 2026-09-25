import { test, expect } from '@playwright/test';

test('TC-035 - K-004', async ({ page }) => {

  test.setTimeout(90000);

  // ==================================================
  // DATA TEST
  // ==================================================

  const keywordTransaksi = 'Trx 1.5jt Cashback 250rb';

  console.log('');
  console.log('==========================================');
  console.log('TC-035 - K-004');
  console.log('Menampilkan Data Berdasarkan Transaksi');
  console.log('==========================================');

  console.log(`Keyword transaksi: ${keywordTransaksi}`);


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
  // STEP 3 - Input Keyword Transaksi
  // ==================================================

  console.log('');
  console.log('STEP 3 - Input Keyword Transaksi');

  const searchBox = page.getByRole('searchbox', {
    name: 'Search:'
  });

  await expect(searchBox).toBeVisible({
    timeout: 10000
  });

  await searchBox.fill(keywordTransaksi);
  await page.waitForTimeout(1000);

  console.log(
    `Keyword berhasil dimasukkan: ${keywordTransaksi}`
  );


  // ==================================================
  // STEP 4 - Tekan Enter
  // ==================================================

  console.log('');
  console.log('STEP 4 - Tekan Enter');

  await searchBox.press('Enter');
  await page.waitForTimeout(2000);

  console.log('Enter berhasil ditekan');


  // ==================================================
  // STEP 5 - Validasi Hasil Pencarian
  // ==================================================

  console.log('');
  console.log('STEP 5 - Validasi Hasil Pencarian');

  const hasilTransaksi = page.getByRole(
    'gridcell',
    {
      name: keywordTransaksi
    }
  ).first();

  await expect(hasilTransaksi).toBeVisible({
    timeout: 10000
  });

  await expect(hasilTransaksi).toHaveText(
    keywordTransaksi
  );

  console.log(
    `Data transaksi berhasil ditemukan: ${keywordTransaksi}`
  );


  // ==================================================
  // SELESAI
  // ==================================================

  console.log('');
  console.log('==========================================');
  console.log('TC-035 SELESAI');
  console.log('==========================================');

});