import { test, expect } from '@playwright/test';

test.describe.configure({
  mode: 'serial'
});

const filePath =
  'C:\\Users\\User\\Pictures\\Upload Test\\bukti tf bca.jpeg';

const opsiPenukaran =
  '1-Kartu Kredit BCA (Trx 1.5jt Cashback 250rb)-1';


// =======================================================
// FUNCTION REGISTER FOTO
// =======================================================

async function registerFoto(
  page: any,
  tenorValue: string,
  tenorNama: string
) {

  console.log('');
  console.log('==========================================');
  console.log(`TC-040 - TENOR ${tenorNama}`);
  console.log('==========================================');


  // =======================================================
  // REGISTER FOTO
  // =======================================================

  console.log('');
  console.log(`STEP 1 - Register Foto - ${tenorNama}`);

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


  // =======================================================
  // ADD NEW DATA
  // =======================================================

  console.log('');
  console.log(`STEP 2 - Add New Data - ${tenorNama}`);

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
  console.log(`STEP 3 - Opsi Penukaran - ${tenorNama}`);

  await page
    .getByLabel('Opsi Penukaran *')
    .selectOption(
      opsiPenukaran
    );


  // =======================================================
  // NAMA NASABAH
  // =======================================================

  const namaNasabah =
    `Nasabah Test ${tenorNama} ${Date.now()}`;

  await page
    .getByRole('textbox', {
      name: 'Nama Lengkap Nasabah *'
    })
    .fill(
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
  // NOMOR ANTRIAN RANDOM
  // =======================================================

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
  // MERCHANT ZERMAN
  // =======================================================

  console.log('');
  console.log(`STEP 4 - Merchant - ${tenorNama}`);

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


  // =======================================================
  // NOMINAL RANDOM
  // MINIMAL RP1.500.000
  // =======================================================

  console.log('');
  console.log(`STEP 5 - Nominal - ${tenorNama}`);

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
  // RRN RANDOM
  // =======================================================

  const rrn =
    Math.floor(
      10000 +
      Math.random() * 90000
    );

  console.log(
    `RRN           : ${rrn}`
  );

  await page
    .getByRole('textbox', {
      name: 'RRN/ApprCode 1*'
    })
    .fill(
      rrn.toString()
    );


  // =======================================================
  // TENOR
  // =======================================================

  console.log('');
  console.log(`STEP 6 - Pilih Tenor - ${tenorNama}`);

  const tenorField =
    page.locator('#Tenor_1');

  await tenorField.waitFor({
    state: 'visible',
    timeout: 15000
  });

  await tenorField.selectOption(
    tenorValue
  );

  await expect(
    tenorField
  ).toHaveValue(
    tenorValue
  );

  console.log(
    `Tenor         : ${tenorNama}`
  );


  // =======================================================
  // UPLOAD BUKTI TRANSFER
  // =======================================================

  console.log('');
  console.log(`STEP 7 - Upload Bukti Transfer - ${tenorNama}`);

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

  console.log('');
  console.log(`STEP 8 - Digit Kartu - ${tenorNama}`);

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
  console.log(`STEP 9 - Tanggal Transaksi - ${tenorNama}`);

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
    `Tanggal hari ini: ${todayDay}`
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
  console.log('------------------------------------------');
  console.log(`DATA TENOR ${tenorNama}`);
  console.log('------------------------------------------');
  console.log(
    `Nama Nasabah      : ${namaNasabah}`
  );
  console.log(
    `Nomor HP          : ${nomorHP}`
  // );
  // console.log(
  //   `Nomor Antrian     : ${nomorAntrian}`
  );
  console.log(
    `Merchant          : ${await page
      .locator(
        '#select2-Merchant_Name_1-container'
      )
      .innerText()}`
  );
  console.log(
    `Nominal           : Rp${nominalFormatted}`
  );
  console.log(
    `RRN               : ${rrn}`
  );
  console.log(
    `Tenor             : ${tenorNama}`
  );
  console.log(
    `Tanggal Transaksi : ${tanggalValue}`
  );
  console.log('------------------------------------------');


  // =======================================================
  // SUBMIT
  // =======================================================

  console.log('');
  console.log(`STEP 10 - Submit Data - ${tenorNama}`);

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
    'Sukses!'
  );

  // Popup ditampilkan 3 detik
  await new Promise(resolve =>
    setTimeout(resolve, 3000)
  );

  await dialog.accept();

  await page.waitForTimeout(2000);

  console.log('');
  console.log(
    `TENOR ${tenorNama} BERHASIL`
  );
}


// =======================================================
// TC-040
// 3 TENOR SEKALIGUS
// =======================================================

test(
  'TC-040 - RGF-003',
  async ({ page }) => {

    test.setTimeout(180000);

    // ===================================================
    // LOGIN SPG
    // ===================================================

    console.log('');
    console.log('==========================================');
    console.log('TC-040 - RGF-003');
    console.log('Register Foto Valid Tenor 3, 6');
    console.log('==========================================');

    console.log('');
    console.log('STEP LOGIN SPG');

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

    await username.fill(
      'spgky'
    );

    await password.fill(
      'spg'
    );

    await loginButton.hover();
    await page.waitForTimeout(1500);
    await loginButton.click();
    await page.waitForTimeout(2000);

    console.log(
      'Login SPG berhasil'
    );


    // ===================================================
    // TENOR 3 BULAN
    // ===================================================

    await registerFoto(
      page,
      '3',
      '3 Bulan'
    );


    // ===================================================
    // TENOR 6 BULAN
    // ===================================================

    await registerFoto(
      page,
      '6',
      '6 Bulan'
    );


    // ===================================================
    // TENOR 12 BULAN
    // ===================================================

    // await registerFoto(
    //   page,
    //   '12',
    //   '12 Bulan'
    // );


    // ===================================================
    // SELESAI
    // ===================================================

    console.log('');
    console.log('==========================================');
    console.log('TC-040 SELESAI');
    console.log('==========================================');

    console.log(
      'Tenor 3 Bulan  : BERHASIL'
    );

    console.log(
      'Tenor 6 Bulan  : BERHASIL'
    );

    // console.log(
    //   'Tenor 12 Bulan : BERHASIL'
    // );

    console.log('==========================================');
  }
);