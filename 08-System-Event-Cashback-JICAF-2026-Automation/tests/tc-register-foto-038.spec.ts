import { test, expect } from '@playwright/test';

test('TC-038 - RGF-001-N', async ({ page }) => {

  test.setTimeout(90000);

  // ==================================================
  // DATA TEST
  // ==================================================

  const transaksi = 'Trx 1.5jt Cashback 250rb';

  const opsiPenukaran =
    '1-Kartu Kredit BCA (Trx 1.5jt Cashback 250rb)-1';

  const today = new Date();

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  const todayDate = formatDate(today);

  console.log('');
  console.log('==========================================');
  console.log('TC-038 - RGF-001-N');
  console.log('Register Foto Kosong Semua Field');
  console.log('Transaksi Kartu Kredit BCA');
  console.log('==========================================');

  console.log(`Tanggal pengecekan quota : ${todayDate}`);
  console.log(`Transaksi                : ${transaksi}`);


  // ==================================================
  // STEP 1 - Login Admin
  // ==================================================

  console.log('');
  console.log('STEP 1 - Login Admin');

  await page.goto(
    'https://dev.ptdika.com/cashback_JICAF2026/login'
  );

  const usernameAdmin = page.getByRole('textbox', {
    name: 'Username'
  });

  const passwordAdmin = page.getByRole('textbox', {
    name: 'Password'
  });

  const loginAdminButton = page.getByRole('button', {
    name: 'Login'
  });

  await usernameAdmin.fill('adminky');
  await passwordAdmin.fill('admin');

  await loginAdminButton.hover();
  await page.waitForTimeout(1500);
  await loginAdminButton.click();
  await page.waitForTimeout(2000);

  console.log('Login Admin berhasil');


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
  // STEP 3 - Filter Kuota Hari Ini
  // ==================================================

  console.log('');
  console.log('STEP 3 - Filter Kuota Hari Ini');

  const startDate = page.locator(
    'input[name="start_date"]'
  );

  const endDate = page.locator(
    'input[name="end_date"]'
  );

  await startDate.fill(todayDate);
  await endDate.fill(todayDate);

  await expect(startDate).toHaveValue(todayDate);
  await expect(endDate).toHaveValue(todayDate);

  const filterButton = page.getByRole('button', {
    name: ' Filter'
  });

  await filterButton.scrollIntoViewIfNeeded();
  await filterButton.hover();
  await page.waitForTimeout(1500);
  await filterButton.click();
  await page.waitForTimeout(2000);

  console.log(
    `Filter quota: ${todayDate} s/d ${todayDate}`
  );


  // ==================================================
  // STEP 4 - Cari Transaksi
  // ==================================================

  console.log('');
  console.log('STEP 4 - Cari Transaksi');

  const row = page
    .locator('#table tbody tr')
    .filter({
      hasText: transaksi
    })
    .first();

  await expect(row).toBeVisible({
    timeout: 10000
  });

  console.log(
    `Transaksi ditemukan: ${transaksi}`
  );


  // ==================================================
  // STEP 5 - Baca Data Quota
  // ==================================================

  console.log('');
  console.log('STEP 5 - Baca Data Quota');

  const cells = row.locator('td');

  const jumlahCell = await cells.count();

  expect(jumlahCell).toBeGreaterThan(0);

  const quota = Number(
    (
      await cells.nth(3).innerText()
    ).trim()
  );

  const available = Number(
    (
      await cells.nth(4).innerText()
    ).trim()
  );

  const used = Number(
    (
      await cells.nth(5).innerText()
    ).trim()
  );

  console.log('');
  console.log('==========================================');
  console.log('DATA QUOTA HARI INI');
  console.log('==========================================');
  console.log(`Quota     : ${quota}`);
  console.log(`Available : ${available}`);
  console.log(`Used      : ${used}`);
  console.log('==========================================');


  // ==================================================
  // STEP 6 - Validasi Quota Tersedia
  // ==================================================

  console.log('');
  console.log('STEP 6 - Validasi Quota Tersedia');

  expect(quota).toBeGreaterThan(0);
  expect(available).toBeGreaterThan(0);

  console.log(
    'Quota tersedia dan dapat digunakan untuk testing'
  );


  // ==================================================
  // STEP 7 - Logout Admin
  // ==================================================

  console.log('');
  console.log('STEP 7 - Logout Admin');

  const logoutButton = page.getByRole('link', {
    name: ' Logout'
  });

  await logoutButton.scrollIntoViewIfNeeded();
  await logoutButton.hover();
  await page.waitForTimeout(1500);
  await logoutButton.click();
  await page.waitForTimeout(2000);

  console.log('Logout Admin berhasil');


  // ==================================================
  // STEP 8 - Login SPG
  // ==================================================

  console.log('');
  console.log('STEP 8 - Login SPG');

  const usernameSPG = page.getByRole('textbox', {
    name: 'Username'
  });

  const passwordSPG = page.getByRole('textbox', {
    name: 'Password'
  });

  const loginSPGButton = page.getByRole('button', {
    name: 'Login'
  });

  await usernameSPG.fill('spgky');
  await passwordSPG.fill('spg');

  await loginSPGButton.hover();
  await page.waitForTimeout(1500);
  await loginSPGButton.click();
  await page.waitForTimeout(2000);

  console.log('Login SPG berhasil');


  // ==================================================
  // STEP 9 - Masuk Register Foto
  // ==================================================

  console.log('');
  console.log('STEP 9 - Masuk Register Foto');

  const registerFotoMenu = page.getByRole('link', {
    name: ' Register Foto'
  });

  await registerFotoMenu.scrollIntoViewIfNeeded();
  await registerFotoMenu.hover();
  await page.waitForTimeout(1500);
  await registerFotoMenu.click();
  await page.waitForTimeout(2000);

  console.log('Menu Register Foto berhasil dibuka');


  // ==================================================
  // STEP 10 - Add New Data
  // ==================================================

  console.log('');
  console.log('STEP 10 - Add New Data');

  const addNewDataButton = page.getByRole('link', {
    name: ' Add New Data'
  });

  await addNewDataButton.scrollIntoViewIfNeeded();
  await addNewDataButton.hover();
  await page.waitForTimeout(1500);
  await addNewDataButton.click();
  await page.waitForTimeout(2000);

  console.log('Form Add New Data berhasil dibuka');


  // ==================================================
  // STEP 11 - Pilih Opsi Penukaran
  // ==================================================

  console.log('');
  console.log('STEP 11 - Pilih Opsi Penukaran');

  const opsiPenukaranField = page.getByLabel(
    'Opsi Penukaran *'
  );

  await expect(opsiPenukaranField).toBeVisible({
    timeout: 10000
  });

  await opsiPenukaranField.selectOption(
    opsiPenukaran
  );

  await expect(opsiPenukaranField).toHaveValue(
    opsiPenukaran
  );

  console.log(
    `Opsi penukaran dipilih: ${opsiPenukaran}`
  );


  // ==================================================
  // STEP 12 - Submit Tanpa Mengisi Field
  // ==================================================

  console.log('');
  console.log('STEP 12 - Submit Tanpa Mengisi Field');

  const submitButton = page.getByRole('button', {
    name: 'Submit Data'
  });

  await submitButton.scrollIntoViewIfNeeded();
  await submitButton.hover();
  await page.waitForTimeout(1500);
  await submitButton.click();
  await page.waitForTimeout(2000);

  console.log(
    'Submit Data berhasil diklik'
  );


  // ==================================================
  // STEP 13 - Validasi Customer Name
  // ==================================================

  console.log('');
  console.log('STEP 13 - Validasi Customer Name');

  await expect(
    page.getByText(
      'The Customer Name field is required.'
    )
  ).toBeVisible({
    timeout: 10000
  });

  console.log('Validasi Customer Name berhasil');


  // ==================================================
  // STEP 14 - Validasi Phone Number
  // ==================================================

  console.log('');
  console.log('STEP 14 - Validasi Phone Number');

  await expect(
    page.getByText(
      'The Phone Number field is required.'
    )
  ).toBeVisible({
    timeout: 10000
  });

  console.log('Validasi Phone Number berhasil');


  // ==================================================
  // STEP 15 - Validasi Merchant Name
  // ==================================================

  console.log('');
  console.log('STEP 15 - Validasi Merchant Name');

  await expect(
    page.getByText(
      'The Merchant Name 1 field is required.'
    )
  ).toBeVisible({
    timeout: 10000
  });

  console.log('Validasi Merchant Name berhasil');


  // ==================================================
  // STEP 16 - Validasi Nominal Transaksi
  // ==================================================

  console.log('');
  console.log('STEP 16 - Validasi Nominal Transaksi');

  await expect(
    page.getByText(
      'The Nominal Transaksi 1 field is required.'
    )
  ).toBeVisible({
    timeout: 10000
  });

  console.log('Validasi Nominal Transaksi berhasil');


  // ==================================================
  // STEP 17 - Validasi RRN / Approval Code
  // ==================================================

  console.log('');
  console.log('STEP 17 - Validasi RRN / Approval Code');

  await expect(
    page.getByText(
      'RRN/ApprCode tidak boleh',
      {
        exact: false
      }
    )
  ).toBeVisible({
    timeout: 10000
  });

  console.log('Validasi RRN/ApprCode berhasil');


  // ==================================================
  // STEP 18 - Validasi Tenor
  // ==================================================

  console.log('');
  console.log('STEP 18 - Validasi Tenor');

  await expect(
    page.getByText(
      'The Tenor 1 field is required.'
    )
  ).toBeVisible({
    timeout: 10000
  });

  console.log('Validasi Tenor berhasil');


  // ==================================================
  // STEP 19 - Validasi File
  // ==================================================

  console.log('');
  console.log('STEP 19 - Validasi File');

  await expect(
    page.getByText(
      'File tidak boleh kosong.'
    )
  ).toBeVisible({
    timeout: 10000
  });

  console.log('Validasi File berhasil');


  // ==================================================
  // STEP 20 - Validasi 4 Digit Awal
  // ==================================================

  console.log('');
  console.log('STEP 20 - Validasi 4 Digit Awal');

  await expect(
    page.getByText(
      'digit awal tidak boleh kosong.'
    )
  ).toBeVisible({
    timeout: 10000
  });

  console.log('Validasi 4 Digit Awal berhasil');


  // ==================================================
  // STEP 21 - Validasi 4 Digit Akhir
  // ==================================================

  console.log('');
  console.log('STEP 21 - Validasi 4 Digit Akhir');

  await expect(
    page.getByText(
      'The 4 digit akhir field is required.'
    )
  ).toBeVisible({
    timeout: 10000
  });

  console.log('Validasi 4 Digit Akhir berhasil');


  // ==================================================
  // STEP 22 - Validasi Transaction Date
  // ==================================================

  console.log('');
  console.log('STEP 22 - Validasi Transaction Date');

  await expect(
    page.getByText(
      'The Transaction Date field is required.'
    )
  ).toBeVisible({
    timeout: 10000
  });

  console.log('Validasi Transaction Date berhasil');


  // ==================================================
  // SELESAI
  // ==================================================

  console.log('');
  console.log('==========================================');
  console.log('TC-038 SELESAI');
  console.log('==========================================');

  console.log(`Quota     : ${quota}`);
  console.log(`Available : ${available}`);
  console.log(`Used      : ${used}`);

  console.log('');
  console.log(
    'Seluruh field Register Foto berhasil divalidasi sebagai mandatory.'
  );

  console.log('==========================================');

});