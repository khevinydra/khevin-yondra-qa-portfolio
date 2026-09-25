import { test, expect } from '@playwright/test';

test('TC-039 - RGF-002-N', async ({ page }) => {

  test.setTimeout(90000);

  // ==================================================
  // DATA TEST
  // ==================================================

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
  const todayDay = String(today.getDate());

  const nomorHP =
    '08' +
    Math.floor(
      1000000000 +
      Math.random() * 9000000000
    );

  const nomorAntrian =
    Math.floor(
      10 + Math.random() * 90
    );

  const rrn =
    Math.floor(
      10000 +
      Math.random() * 90000
    );

  const nominal =
    Math.floor(
      1000000 +
      Math.random() * 499999
    );

  const nominalFormatted =
    nominal.toLocaleString('id-ID');

  const filePath =
    'C:\\Users\\User\\Pictures\\Upload Test\\bukti tf bca.jpeg';

  console.log('');
  console.log('==========================================');
  console.log('TC-039 - RGF-002-N');
  console.log('Nominal Transaksi di Bawah Rp 1.500.000');
  console.log('==========================================');

  console.log(`Tanggal transaksi : ${todayDate}`);
  console.log(`Nominal           : Rp${nominalFormatted}`);
  console.log(`RRN               : ${rrn}`);
  console.log(`Nomor HP          : ${nomorHP}`);
  console.log(`Nomor Antrian     : ${nomorAntrian}`);


  // ==================================================
  // STEP 1 - Validasi File Upload
  // ==================================================

  console.log('');
  console.log('STEP 1 - Validasi File Upload');

  const fs = require('fs');

  expect(
    fs.existsSync(filePath),
    `File tidak ditemukan: ${filePath}`
  ).toBeTruthy();

  console.log(`File ditemukan: ${filePath}`);


  // ==================================================
  // STEP 2 - Login SPG
  // ==================================================

  console.log('');
  console.log('STEP 2 - Login SPG');

  await page.goto(
    'https://dev.ptdika.com/cashback_JICAF2026/login',
    {
      waitUntil: 'domcontentloaded',
      timeout: 30000
    }
  );

  await page
    .getByRole('textbox', {
      name: 'Username'
    })
    .waitFor({
      state: 'visible',
      timeout: 15000
    });

  await page
    .getByRole('textbox', {
      name: 'Username'
    })
    .fill('spgky');

  await page
    .getByRole('textbox', {
      name: 'Password'
    })
    .fill('spg');

  const loginButton =
    page.getByRole('button', {
      name: 'Login'
    });

  await loginButton.hover();
  await page.waitForTimeout(1500);
  await loginButton.click();
  await page.waitForTimeout(2000);

  console.log('Login SPG berhasil');


  // ==================================================
  // STEP 3 - Masuk Register Foto
  // ==================================================

  console.log('');
  console.log('STEP 3 - Masuk Register Foto');

  const registerFotoMenu =
    page.getByRole('link', {
      name: ' Register Foto'
    });

  await registerFotoMenu.waitFor({
    state: 'visible',
    timeout: 15000
  });

  await registerFotoMenu.scrollIntoViewIfNeeded();
  await registerFotoMenu.hover();
  await page.waitForTimeout(1500);
  await registerFotoMenu.click();
  await page.waitForTimeout(2000);

  console.log('Menu Register Foto berhasil dibuka');


  // ==================================================
  // STEP 4 - Add New Data
  // ==================================================

  console.log('');
  console.log('STEP 4 - Add New Data');

  const addNewDataButton =
    page.getByRole('link', {
      name: ' Add New Data'
    });

  await addNewDataButton.waitFor({
    state: 'visible',
    timeout: 15000
  });

  await addNewDataButton.scrollIntoViewIfNeeded();
  await addNewDataButton.hover();
  await page.waitForTimeout(1500);
  await addNewDataButton.click();
  await page.waitForTimeout(2000);

  console.log('Form Add New Data berhasil dibuka');


  // ==================================================
  // STEP 5 - Pilih Opsi Penukaran
  // ==================================================

  console.log('');
  console.log('STEP 5 - Pilih Opsi Penukaran');

  const opsiPenukaranField =
    page.getByLabel('Opsi Penukaran *');

  await opsiPenukaranField.waitFor({
    state: 'visible',
    timeout: 15000
  });

  await opsiPenukaranField.selectOption(
    opsiPenukaran
  );

  await expect(
    opsiPenukaranField
  ).toHaveValue(
    opsiPenukaran
  );

  console.log(
    `Opsi penukaran: ${opsiPenukaran}`
  );


  // ==================================================
  // STEP 6 - Nama Nasabah
  // ==================================================

  console.log('');
  console.log('STEP 6 - Input Nama Nasabah');

  const namaNasabah =
    'testautomation';

  await page
    .getByRole('textbox', {
      name: 'Nama Lengkap Nasabah *'
    })
    .fill(namaNasabah);


  // ==================================================
  // STEP 7 - Nomor HP
  // ==================================================

  console.log('');
  console.log('STEP 7 - Input Nomor HP');

  await page
    .getByRole('textbox', {
      name: 'Nomor Handphone*'
    })
    .fill(
      nomorHP.toString()
    );


  // ==================================================
  // STEP 8 - Nomor Antrian
  // ==================================================

  // console.log('');
  // console.log('STEP 8 - Input Nomor Antrian');

  // await page
  //   .getByRole('textbox', {
  //     name: 'Nomor Antrian *'
  //   })
  //   .fill(
  //     nomorAntrian.toString()
  //   );


  // ==================================================
  // STEP 9 - Merchant Zerman
  // ==================================================

  console.log('');
  console.log('STEP 9 - Pilih Merchant Zerman');

  const merchantDropdown =
    page.getByRole('textbox', {
      name: '-- Pilih --'
    });

  await merchantDropdown.waitFor({
    state: 'visible',
    timeout: 15000
  });

  await merchantDropdown.click();

  const merchantZerman =
    page.getByRole('option', {
      name: 'Zerman',
      exact: true
    });

  await expect(
    merchantZerman
  ).toBeVisible({
    timeout: 10000
  });

  await merchantZerman.click();

  await expect(
    page.locator(
      '#select2-Merchant_Name_1-container'
    )
  ).toHaveText(
    'Zerman',
    {
      timeout: 10000
    }
  );

  console.log(
    'Merchant 1: Zerman'
  );


  // ==================================================
  // STEP 10 - Nominal Transaksi
  // ==================================================

  console.log('');
  console.log('STEP 10 - Input Nominal Transaksi');

  const nominalField =
    page.getByRole('textbox', {
      name: '0'
    });

  await nominalField.waitFor({
    state: 'visible',
    timeout: 15000
  });

  await nominalField.fill(
    nominalFormatted
  );


  // ==================================================
  // STEP 11 - RRN
  // ==================================================

  console.log('');
  console.log('STEP 11 - Input RRN');

  await page
    .getByRole('textbox', {
      name: 'RRN/ApprCode 1*'
    })
    .fill(
      rrn.toString()
    );


  // ==================================================
  // STEP 12 - Tenor
  // ==================================================

  console.log('');
  console.log('STEP 12 - Pilih Tenor 6 Bulan');

  const tenorField =
    page.locator('#Tenor_1');

  await tenorField.waitFor({
    state: 'visible',
    timeout: 15000
  });

  await tenorField.selectOption('6');

  await expect(
    tenorField
  ).toHaveValue('6');


  // ==================================================
  // STEP 13 - Upload Bukti Transfer
  // ==================================================

  console.log('');
  console.log('STEP 13 - Upload Bukti Transfer');

  const uploadButton =
    page.getByRole('button', {
      name: '* *'
    });

  await uploadButton.waitFor({
    state: 'visible',
    timeout: 15000
  });

  await uploadButton.setInputFiles(
    filePath
  );

  console.log('File berhasil dipilih');


  // ==================================================
  // STEP 14 - Digit Awal Kartu
  // ==================================================

  console.log('');
  console.log('STEP 14 - Input Digit Awal Kartu');

  await page
    .getByRole('textbox', {
      name: 'digit awal'
    })
    .fill('541268');


  // ==================================================
  // STEP 15 - Digit Akhir Kartu
  // ==================================================

  console.log('');
  console.log('STEP 15 - Input Digit Akhir Kartu');

  // LOCATOR DIAMBIL DARI TC-040
  await page
    .getByRole('textbox', {
      name: 'digit akhir'
    })
    .fill('8587');


  // ==================================================
  // STEP 16 - Tanggal Transaksi Hari Ini
  // ==================================================

  console.log('');
  console.log(
    `STEP 16 - Pilih Tanggal Transaksi Hari Ini: ${todayDate}`
  );

  const tanggalTransaksi =
    page.getByRole('textbox', {
      name: 'Tanggal Transaksi *'
    });

  await tanggalTransaksi.click();

  await page.waitForTimeout(1000);

  // Tanggal mengikuti tanggal komputer saat test dijalankan
  const tanggalHariIni =
    page.getByRole('link', {
      name: todayDay,
      exact: true
    });

  await expect(
    tanggalHariIni
  ).toBeVisible({
    timeout: 10000
  });

  await tanggalHariIni.hover();
  await page.waitForTimeout(1500);
  await tanggalHariIni.click();
  await page.waitForTimeout(1000);

  console.log(
    `Tanggal transaksi dipilih: ${todayDate}`
  );


  // ==================================================
  // STEP 17 - Validasi Tanggal
  // ==================================================

  console.log('');
  console.log('STEP 17 - Validasi Tanggal');

  const tanggalValue =
    await tanggalTransaksi.inputValue();

  console.log(
    `Tanggal pada field: ${tanggalValue}`
  );

  expect(
    tanggalValue
  ).not.toBe('');


  // ==================================================
  // STEP 18 - Log Data
  // ==================================================

  console.log('');
  console.log('==========================================');
  console.log('DATA TRANSAKSI');
  console.log('==========================================');

  console.log(
    `Nama Nasabah       : ${namaNasabah}`
  );

  console.log(
    `Nomor HP           : ${nomorHP}`
  );

  console.log(
    `Nomor Antrian      : ${nomorAntrian}`
  );

  console.log(
    `Merchant           : ${await page
      .locator(
        '#select2-Merchant_Name_1-container'
      )
      .innerText()}`
  );

  console.log(
    `Nominal            : Rp${nominalFormatted}`
  );

  console.log(
    `RRN                : ${rrn}`
  );

  console.log(
    `Tenor              : 6 Bulan`
  );

  console.log(
    `Tanggal Transaksi  : ${tanggalValue}`
  );

  console.log('==========================================');


  // ==================================================
  // STEP 19 - Submit Data
  // ==================================================

  console.log('');
  console.log('STEP 19 - Submit Data');

  const submitButton =
    page.getByRole('button', {
      name: 'Submit Data'
    });

  const dialogPromise =
    page.waitForEvent('dialog', {
      timeout: 15000
    });

  await submitButton.scrollIntoViewIfNeeded();
  await submitButton.hover();
  await page.waitForTimeout(1500);
  await submitButton.click();

  const dialog =
    await dialogPromise;

  console.log(
    `Dialog message: ${dialog.message()}`
  );

  expect(
    dialog.message()
  ).toContain(
    'Minimal Transaksi Rp 1.500.000'
  );

  // Popup ditahan 3 detik agar terlihat
  await new Promise(resolve =>
    setTimeout(resolve, 3000)
  );

  await dialog.accept();

  await page.waitForTimeout(2000);


  // ==================================================
  // SELESAI
  // ==================================================

  console.log('');
  console.log('==========================================');
  console.log('TC-039 SELESAI');
  console.log('==========================================');

});