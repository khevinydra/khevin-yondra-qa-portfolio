import { test, expect } from '@playwright/test';

test.setTimeout(90000);

const specialCharacters = [
  "'",
  '"',
  ';',
  '--'
];

for (const character of specialCharacters) {

  test(`TC-006 - LGN-006-N - ${character}`, async ({ page }) => {

    console.log('');
    console.log('==========================================');
    console.log('TC-006 - LGN-006-N');
    console.log(`Karakter khusus Username: ${character}`);
    console.log('Login harus gagal');
    console.log('==========================================');

    // STEP 1 - Membuka halaman Login
    console.log('STEP 1 - Membuka halaman Login');
    await page.goto(
      'https://dev.ptdika.com/cashback_JICAF2026/login',
      {
        waitUntil: 'domcontentloaded',
        timeout: 60000
      }
    );

    // STEP 2 - Input karakter khusus pada Username
    console.log(`STEP 2 - Input karakter khusus Username: ${character}`);
    const usernameField = page.getByRole('textbox', { name: 'Username' });
    await usernameField.fill(character);

    // STEP 3 - Input Password
    console.log('STEP 3 - Input Password');
    const passwordField = page.getByRole('textbox', { name: 'Password' });
    await passwordField.fill('admin');

    // STEP 4 - Klik Login
    console.log('STEP 4 - Klik tombol Login');
    const loginButton = page.getByRole('button', { name: 'Login' });

    await loginButton.hover();
    await page.waitForTimeout(1500);
    await loginButton.click();
    await page.waitForTimeout(2000);

    // STEP 5 - Validasi tidak masuk Dashboard
    console.log('STEP 5 - Validasi Login gagal');

    await expect(page).not.toHaveURL(
      'https://dev.ptdika.com/cashback_JICAF2026/',
      { timeout: 10000 }
    );

    console.log(`Validasi berhasil untuk karakter: ${character}`);

    console.log('');
    console.log('==========================================');
    console.log('TC-006 SELESAI');
    console.log('==========================================');
  });

}