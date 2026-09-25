import { test, expect } from '@playwright/test';

test(
  'TC-041 - RGF-004-N',
  async ({ page }) => {

    test.setTimeout(90000);

    // =======================================================
    // DATA TEST
    // =======================================================

    const rrnDuplicate = '39485';

    const filePath =
      'C:\\Users\\User\\Pictures\\Upload Test\\bukti tf bca.jpeg';

    const opsiPenukaran =
      '1-Kartu Kredit BCA (Trx 1.5jt Cashback 250rb)-1';

    console.log('');
    console.log('==========================================');
    console.log('TC-041 - RGF-004-N');
    console.log('Register Foto dengan RRN yang Sudah Digunakan');
    console.log('==========================================');

    console.log(
      `RRN Duplicate : ${rrnDuplicate}`
    );


    // =======================================================
    // LOGIN SPG
    // =======================================================

    console.log('');
    console.log('STEP 1 - Login SPG');

    await page.goto(
      'https://dev.ptdika.com/cashback_JICAF2026/login',
      {
        waitUntil: 'domcontentloaded',
        timeout: 30000
      }
    );

    const username =
      page.getByRole('textbox', {
        name: 'Username'
      });

    const password =
      page.getByRole('textbox', {
        name: 'Password'
      });

    const loginButton =
      page.getByRole('button', {
        name: 'Login'
      });

    await username.waitFor({
      state: 'visible',
      timeout: 15000
    });

    await username.fill('spgky');

    await password.fill('spg');

    await loginButton.hover();
    await page.waitForTimeout(1500);
    await loginButton.click();
    await page.waitForTimeout(2000);


    // =======================================================
    // TUNGGU LOGIN SELESAI
    // =======================================================

    console.log('');
    console.log('STEP 2 - Menunggu Login Selesai');

    const registerFoto =
      page.getByRole('link', {
        name: ' Register Foto'
      });

    await registerFoto.waitFor({
      state: 'visible',
      timeout: 15000
    });


    // =======================================================
    // REGISTER FOTO
    // =======================================================

    console.log('');
    console.log('STEP 3 - Buka Register Foto');

    await registerFoto.scrollIntoViewIfNeeded();
    await registerFoto.hover();
    await page.waitForTimeout(1500);
    await registerFoto.click();
    await page.waitForTimeout(2000);


    // =======================================================
    // ADD NEW DATA
    // =======================================================

    console.log('');
    console.log('STEP 4 - Add New Data');

    const addNewData =
      page.getByRole('link', {
        name: ' Add New Data'
      });

    await addNewData.waitFor({
      state: 'visible',
      timeout: 15000
    });

    await addNewData.scrollIntoViewIfNeeded();
    await addNewData.hover();
    await page.waitForTimeout(1500);
    await addNewData.click();
    await page.waitForTimeout(2000);


    // =======================================================
    // TUNGGU FORM
    // =======================================================

    await page
      .getByLabel('Opsi Penukaran *')
      .waitFor({
        state: 'visible',
        timeout: 15000
      });


    // =======================================================
    // OPSI PENUKARAN
    // =======================================================

    console.log('');
    console.log('STEP 5 - Pilih Opsi Penukaran');

    const opsiPenukaranField =
      page.getByLabel(
        'Opsi Penukaran *'
      );

    await opsiPenukaranField.selectOption(
      opsiPenukaran
    );

    await expect(
      opsiPenukaranField
    ).toHaveValue(
      opsiPenukaran
    );


    // =======================================================
    // NAMA NASABAH
    // =======================================================

    console.log('');
    console.log('STEP 6 - Input Nama Nasabah');

    const namaNasabah =
      `Nasabah Duplicate RRN ${Date.now()}`;

    const namaNasabahField =
      page.getByRole('textbox', {
        name: 'Nama Lengkap Nasabah *'
      });

    await namaNasabahField.waitFor({
      state: 'visible',
      timeout: 15000
    });

    await namaNasabahField.fill(
      namaNasabah
    );


    // =======================================================
    // NOMOR HP RANDOM
    // =======================================================

    const nomorHP =
      '08' +
      Math.floor(
        1000000000 +
        Math.random() * 9000000000
      );

    console.log('');
    console.log(
      `Nomor HP      : ${nomorHP}`
    );

    await page
      .getByRole('textbox', {
        name: 'Nomor Handphone*'
      })
      .fill(
        nomorHP.toString()
      );


    // =======================================================
    // // NOMOR ANTRIAN RANDOM
    // // =======================================================

    // const nomorAntrian =
    //   Math.floor(
    //     10 + Math.random() * 90
    //   );

    // console.log(
    //   `Nomor Antrian : ${nomorAntrian}`
    // );

    // await page
    //   .getByRole('textbox', {
    //     name: 'Nomor Antrian *'
    //   })
    //   .fill(
    //     nomorAntrian.toString()
    //   );


    // =======================================================
    // MERCHANT = ZERMAN
    // =======================================================

    console.log('');
    console.log('STEP 7 - Pilih Merchant Zerman');

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
      'Merchant 1   : Zerman'
    );


    // =======================================================
    // NOMINAL RANDOM
    // =======================================================

    console.log('');
    console.log('STEP 8 - Input Nominal');

    const nominal =
      Math.floor(
        1500000 +
        Math.random() * 500000
      );

    const nominalFormatted =
      nominal.toLocaleString('id-ID');

    console.log(
      `Nominal       : Rp${nominalFormatted}`
    );

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


    // =======================================================
    // RRN DUPLICATE
    // =======================================================

    console.log('');
    console.log('STEP 9 - Input RRN Duplicate');

    const rrnField =
      page.getByRole('textbox', {
        name: 'RRN/ApprCode 1*'
      });

    await rrnField.fill(
      rrnDuplicate
    );

    console.log(
      `RRN           : ${rrnDuplicate} (DUPLICATE)`
    );


    // =======================================================
    // TENOR 3 BULAN
    // =======================================================

    console.log('');
    console.log('STEP 10 - Pilih Tenor 3 Bulan');

    const tenorField =
      page.locator('#Tenor_1');

    await tenorField.waitFor({
      state: 'visible',
      timeout: 15000
    });

    await tenorField.selectOption(
      '3'
    );

    await expect(
      tenorField
    ).toHaveValue(
      '3'
    );

    console.log(
      'Tenor         : 3 Bulan'
    );


    // =======================================================
    // UPLOAD BUKTI TRANSAKSI
    // =======================================================

    console.log('');
    console.log('STEP 11 - Upload Bukti Transaksi');

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


    // =======================================================
    // DIGIT AWAL KARTU
    // =======================================================

    await page
      .getByRole('textbox', {
        name: 'digit awal'
      })
      .fill(
        '541268'
      );


    // =======================================================
    // DIGIT AKHIR KARTU
    // =======================================================

    await page
      .getByRole('textbox', {
        name: 'digit akhir'
      })
      .fill(
        '8587'
      );


    // =======================================================
    // TANGGAL TRANSAKSI = HARI INI
    // =======================================================

    console.log('');
    console.log('STEP 12 - Tanggal Transaksi');

    const tanggalTransaksi =
      page.getByRole('textbox', {
        name: 'Tanggal Transaksi *'
      });

    await tanggalTransaksi.click();

    await page.waitForTimeout(1000);

    const today =
      new Date();

    const todayDay =
      String(
        today.getDate()
      );

    console.log(
      `Tanggal hari ini : ${todayDay}`
    );

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

    const tanggalValue =
      await tanggalTransaksi.inputValue();

    console.log(
      `Tanggal transaksi: ${tanggalValue}`
    );


    // =======================================================
    // LOG DATA
    // =======================================================

    console.log('');
    console.log('==========================================');
    console.log('DATA SUBMIT');
    console.log('==========================================');

    console.log(
      `Nama          : ${namaNasabah}`
    );

    console.log(
      `Nomor HP      : ${nomorHP}`
    // );

    // console.log(
    //   `Nomor Antrian : ${nomorAntrian}`
    );

    console.log(
      'Merchant      : Zerman'
    );

    console.log(
      `Nominal       : Rp${nominalFormatted}`
    );

    console.log(
      `RRN           : ${rrnDuplicate}`
    );

    console.log(
      'Tenor         : 3 Bulan'
    );

    console.log(
      `Tanggal       : ${tanggalValue}`
    );

    console.log(
      '=========================================='
    );


    // =======================================================
    // SUBMIT DATA
    // =======================================================

    console.log('');
    console.log('STEP 13 - Submit Data');

    const submitButton =
      page.getByRole('button', {
        name: 'Submit Data'
      });

    await submitButton.scrollIntoViewIfNeeded();
    await submitButton.hover();
    await page.waitForTimeout(1500);
    await submitButton.click();


    // =======================================================
    // VALIDASI RRN DUPLIKAT
    // =======================================================

    console.log('');
    console.log('STEP 14 - Validasi RRN Duplicate');

    const pesanRRN =
      page.getByText(
        'RRN/ApprCode Sudah digunakan',
        {
          exact: true
        }
      );

    await expect(
      pesanRRN
    ).toBeVisible({
      timeout: 15000
    });


    // =======================================================
    // ASSERTION
    // =======================================================

    expect(
      await pesanRRN.isVisible()
    ).toBeTruthy();

    console.log('');
    console.log('==========================================');
    console.log('PASS - RRN DUPLICATE DITOLAK');
    console.log('==========================================');

    console.log(
      'Expected : RRN/ApprCode Sudah digunakan'
    );

    console.log(
      'Actual   : RRN/ApprCode Sudah digunakan'
    );

    console.log('==========================================');

  }
);