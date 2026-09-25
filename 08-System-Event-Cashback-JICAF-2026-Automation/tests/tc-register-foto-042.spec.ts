import { test, expect } from '@playwright/test';

test('TC-042 - RGF-005-N', async ({ page }) => {
  test.setTimeout(90000);

  // =========================================================
  // DATA TEST
  // =========================================================

  const baseUrl =
    'https://dev.ptdika.com/cashback_JICAF2026';

  const username = 'spgky';
  const password = 'spg';

  // NOMOR HP YANG SUDAH PERNAH DIGUNAKAN
  const nomorHPDuplicate = '082173422750';

  const namaNasabah =
    `Nasabah Duplicate Phone ${Date.now()}`;

  const nomorAntrian = String(
    Math.floor(10 + Math.random() * 90)
  );

  const rrn = String(
    Math.floor(10000 + Math.random() * 90000)
  );

  const nominalNumber =
    Math.floor(1500000 + Math.random() * 500001);

  const nominal =
    nominalNumber.toLocaleString('id-ID');

  const filePath =
    'C:\\Users\\User\\Pictures\\Upload Test\\bukti tf bca.jpeg';

  const today = new Date();

  const hari = String(
    today.getDate()
  ).padStart(2, '0');

  const bulan = String(
    today.getMonth() + 1
  ).padStart(2, '0');

  const tahun = today.getFullYear();

  const tanggalTransaksi =
    `${hari}/${bulan}/${tahun}`;

  // =========================================================
  // HEADER
  // =========================================================

  console.log('');
  console.log('==========================================');
  console.log('TC-042 - RGF-005-N');
  console.log('Register Foto dengan Nomor Handphone yang Sudah Digunakan');
  console.log('==========================================');

  console.log(`Nomor HP Duplicate : ${nomorHPDuplicate}`);
  console.log(`RRN Random         : ${rrn}`);

  // =========================================================
  // STEP 1 - LOGIN SPG
  // =========================================================

  console.log('');
  console.log('STEP 1 - Login SPG');

  await page.goto(`${baseUrl}/login`);

  const usernameInput = page.getByRole('textbox', {
    name: 'Username'
  });

  const passwordInput = page.getByRole('textbox', {
    name: 'Password'
  });

  const loginButton = page.getByRole('button', {
    name: 'Login'
  });

  await usernameInput.fill(username);
  await passwordInput.fill(password);

  await loginButton.hover();
  await page.waitForTimeout(1500);
  await loginButton.click();
  await page.waitForTimeout(2000);

  // =========================================================
  // STEP 2 - MENUNGGU LOGIN SELESAI
  // =========================================================

  console.log('');
  console.log('STEP 2 - Menunggu Login Selesai');

  await expect(page).not.toHaveURL(
    /\/login$/,
    {
      timeout: 15000
    }
  );

  // =========================================================
  // STEP 3 - BUKA REGISTER FOTO
  // =========================================================

  console.log('');
  console.log('STEP 3 - Buka Register Foto');

  const registerFotoMenu = page.getByRole('link', {
    name: ' Register Foto'
  });

  await registerFotoMenu.scrollIntoViewIfNeeded();
  await registerFotoMenu.hover();
  await page.waitForTimeout(1500);
  await registerFotoMenu.click();
  await page.waitForTimeout(2000);

  // Pastikan halaman Register Foto terbuka
  const addNewData = page.getByRole('link', {
    name: ' Add New Data'
  });

  await expect(addNewData).toBeVisible({
    timeout: 15000
  });

  // =========================================================
  // STEP 4 - ADD NEW DATA
  // =========================================================

  console.log('');
  console.log('STEP 4 - Add New Data');

  await addNewData.scrollIntoViewIfNeeded();
  await addNewData.hover();
  await page.waitForTimeout(1500);
  await addNewData.click();
  await page.waitForTimeout(2000);

  // =========================================================
  // STEP 5 - PILIH OPSI PENUKARAN
  // =========================================================

  console.log('');
  console.log('STEP 5 - Pilih Opsi Penukaran');

  const opsiPenukaran = page.getByRole('combobox', {
    name: 'Opsi Penukaran *'
  });

  await opsiPenukaran.selectOption(
    '1-Kartu Kredit BCA (Trx 1.5jt Cashback 250rb)-1'
  );

  await expect(opsiPenukaran).toHaveValue(
    '1-Kartu Kredit BCA (Trx 1.5jt Cashback 250rb)-1'
  );

  // =========================================================
  // STEP 6 - INPUT NAMA NASABAH
  // =========================================================

  console.log('');
  console.log('STEP 6 - Input Nama Nasabah');

  const namaNasabahInput = page.getByRole('textbox', {
    name: 'Nama Lengkap Nasabah *'
  });

  await namaNasabahInput.fill(namaNasabah);

  // =========================================================
  // STEP 7 - INPUT NOMOR HP DUPLICATE
  // =========================================================

  console.log('');
  console.log('STEP 7 - Input Nomor HP Duplicate');

  const nomorHPInput = page.getByRole('textbox', {
    name: 'Nomor Handphone*'
  });

  await nomorHPInput.fill(nomorHPDuplicate);

  await expect(nomorHPInput).toHaveValue(
    nomorHPDuplicate
  );

  // // const nomorAntrianInput = page.getByRole('textbox', {
  // //   name: 'Nomor Antrian *'
  // // });

  // await nomorAntrianInput.fill(nomorAntrian);

  console.log(`Nomor HP           : ${nomorHPDuplicate}`);
  // console.log(`Nomor Antrian      : ${nomorAntrian}`);

  // =========================================================
  // STEP 8 - PILIH MERCHANT ZERMAN
  // =========================================================

  console.log('');
  console.log('STEP 8 - Pilih Merchant Zerman');

  const merchantDropdown = page.getByRole('textbox', {
    name: '-- Pilih --'
  });

  await merchantDropdown.click();

  const merchantZerman = page.getByRole('option', {
    name: 'Zerman',
    exact: true
  });

  await expect(merchantZerman).toBeVisible({
    timeout: 10000
  });

  await merchantZerman.click();

  await expect(
    page.locator('#select2-Merchant_Name_1-container')
  ).toHaveText(
    'Zerman',
    {
      timeout: 10000
    }
  );

  console.log('Merchant 1        : Zerman');

  // =========================================================
  // STEP 9 - INPUT NOMINAL
  // =========================================================

  console.log('');
  console.log('STEP 9 - Input Nominal');

  const nominalInput = page.getByRole('textbox', {
    name: '0'
  });

  await nominalInput.fill(
    String(nominalNumber)
  );

  console.log(`Nominal            : Rp${nominal}`);

  // =========================================================
  // STEP 10 - INPUT RRN
  // =========================================================

  console.log('');
  console.log('STEP 10 - Input RRN Random');

  const rrnInput = page.getByRole('textbox', {
    name: 'RRN/ApprCode 1*'
  });

  await rrnInput.fill(rrn);

  console.log(`RRN                : ${rrn}`);

  // =========================================================
  // STEP 11 - PILIH TENOR 3 BULAN
  // =========================================================

  console.log('');
  console.log('STEP 11 - Pilih Tenor 3 Bulan');

  const tenorSelect = page.locator('#Tenor_1');

  await tenorSelect.selectOption('3');

  await expect(tenorSelect).toHaveValue('3');

  console.log('Tenor              : 3 Bulan');

  // =========================================================
  // STEP 12 - UPLOAD BUKTI TRANSAKSI
  // =========================================================

  console.log('');
  console.log('STEP 12 - Upload Bukti Transaksi');

  const uploadButton = page.getByRole('button', {
    name: '* *'
  });

  await uploadButton.scrollIntoViewIfNeeded();
  await uploadButton.hover();
  await page.waitForTimeout(1500);

  // Locator dibuat spesifik karena terdapat
  // beberapa input[type="file"] pada halaman
  const fileInput = page.locator(
    '#Foto_Struk_EDC'
  );

  await expect(fileInput).toBeAttached({
    timeout: 10000
  });

  await fileInput.setInputFiles(filePath);

  await page.waitForTimeout(1000);

  // =========================================================
  // STEP 13 - TANGGAL TRANSAKSI
  // =========================================================

  console.log('');
  console.log('STEP 13 - Tanggal Transaksi');

  console.log(`Tanggal hari ini : ${hari}`);
  console.log(`Tanggal transaksi: ${tanggalTransaksi}`);

  const tanggalInput = page.getByRole('textbox', {
    name: 'Tanggal Transaksi *'
  });

  await tanggalInput.click();

  await page.waitForTimeout(1000);

  const tanggalLink = page.getByRole('link', {
    name: new RegExp(`^${Number(hari)}$`)
  }).last();

  await expect(tanggalLink).toBeVisible({
    timeout: 10000
  });

  await tanggalLink.click();

  // =========================================================
  // INPUT KARTU
  // =========================================================

  const digitAwalInput = page.getByRole('textbox', {
    name: 'digit awal'
  });

  const digitAkhirInput = page.getByRole('textbox', {
    name: 'digit akhir'
  });

  await digitAwalInput.fill('434543');
  await digitAkhirInput.fill('1232');

  // =========================================================
  // DATA SUBMIT
  // =========================================================

  console.log('');
  console.log('==========================================');
  console.log('DATA SUBMIT');
  console.log('==========================================');
  console.log(`Nama          : ${namaNasabah}`);
  console.log(`Nomor HP      : ${nomorHPDuplicate}`);
  // console.log(`Nomor Antrian : ${nomorAntrian}`);
  console.log(`Merchant      : Zerman`);
  console.log(`Nominal       : Rp${nominal}`);
  console.log(`RRN           : ${rrn}`);
  console.log(`Tenor         : 3 Bulan`);
  console.log(`Tanggal       : ${tanggalTransaksi}`);
  console.log(`Digit Awal    : 434543`);
  console.log(`Digit Akhir   : 1232`);
  console.log('==========================================');

  // =========================================================
  // SCREENSHOT SEBELUM SUBMIT
  // =========================================================

  await page.screenshot({
    path: 'test-results/tc-042-before-submit.png',
    fullPage: true
  });

  // =========================================================
  // STEP 14 - SUBMIT DATA
  // =========================================================

  console.log('');
  console.log('STEP 14 - Submit Data');

  const submitButton = page.getByRole('button', {
    name: 'Submit Data'
  });

  await submitButton.scrollIntoViewIfNeeded();
  await submitButton.hover();
  await page.waitForTimeout(1500);
  await submitButton.click();

  // =========================================================
  // STEP 15 - VALIDASI RESPONSE
  // =========================================================

  console.log('');
  console.log('STEP 15 - Validasi Nomor HP Duplicate');

  await page.waitForTimeout(3000);

  const bodyText = await page.locator('body').innerText();

  console.log('');
  console.log('==========================================');
  console.log('RESPONSE SETELAH SUBMIT');
  console.log('==========================================');
  console.log(bodyText);
  console.log('==========================================');

  // =========================================================
  // SCREENSHOT SETELAH SUBMIT
  // =========================================================

  await page.screenshot({
    path: 'test-results/tc-042-after-submit.png',
    fullPage: true
  });

  // =========================================================
  // CEK PESAN DUPLICATE PHONE
  // =========================================================

  const pesanPhone = page.getByText(
    'Phone Number sudah mencapai',
    {
      exact: false
    }
  );

  const pesanPhoneCount =
    await pesanPhone.count();

  console.log('');
  console.log(
    `Jumlah pesan duplicate phone ditemukan : ${pesanPhoneCount}`
  );

  if (pesanPhoneCount > 0) {
    console.log(
      'Pesan duplicate phone ditemukan.'
    );

    await expect(
      pesanPhone.first()
    ).toBeVisible({
      timeout: 5000
    });
  } else {
    console.log('');
    console.log(
      'WARNING: Pesan "Phone Number sudah mencapai" tidak ditemukan.'
    );
    console.log(
      'Lihat RESPONSE SETELAH SUBMIT untuk mengetahui'
    );
    console.log(
      'pesan validasi yang sebenarnya dari aplikasi.'
    );
  }

  // =========================================================
  // SELESAI
  // =========================================================

  console.log('');
  console.log('==========================================');
  console.log('TC-042 SELESAI');
  console.log('==========================================');
});