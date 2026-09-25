import { test, expect } from '@playwright/test';

test.setTimeout(90000);

test(
  'TC-052 - Menampilkan Form Detail Data Cashback',
  async ({ page }) => {

    // ==========================================
    // 1. Buka halaman Login
    // ==========================================
    await page.goto(
      'https://dev.ptdika.com/cashback_JICAF2026/login',
      {
        waitUntil: 'domcontentloaded',
        timeout: 60000
      }
    );

    await page.waitForTimeout(1500);

    // ==========================================
    // 2. Isi Username
    // ==========================================
    const username = page.getByRole('textbox', {
      name: 'Username'
    });

    await username.click();
    await page.waitForTimeout(700);

    await username.fill('verifikatorky');
    await page.waitForTimeout(1000);

    // ==========================================
    // 3. Isi Password
    // ==========================================
    const password = page.getByRole('textbox', {
      name: 'Password'
    });

    await password.click();
    await page.waitForTimeout(700);

    await password.fill('verif');
    await page.waitForTimeout(1000);

    // ==========================================
    // 4. Klik Login
    // ==========================================
    const loginButton = page.getByRole('button', {
      name: 'Login'
    });

    await loginButton.click();

    await page.waitForTimeout(2500);

    // ==========================================
    // 5. Buka menu Pre-Transfer
    // ==========================================
    const menuPreTransfer = page.getByRole('link', {
      name: ' Pre-Transfer'
    });

    await expect(menuPreTransfer).toBeVisible({
      timeout: 30000
    });

    await menuPreTransfer.hover();
    await page.waitForTimeout(1000);

    await menuPreTransfer.click();

    await page.waitForTimeout(2500);

    // ==========================================
    // 6. Cari tombol View Detail
    // ==========================================
    const tombolViewDetail = page.locator(
      'tr:nth-child(10) > td:nth-child(11) > .btn'
    );

    await expect(tombolViewDetail).toBeVisible({
      timeout: 30000
    });

    // Arahkan cursor ke tombol terlebih dahulu
    await tombolViewDetail.hover();

    // Beri waktu supaya cursor terlihat
    await page.waitForTimeout(1500);

    // ==========================================
    // 7. Klik View Detail
    // ==========================================
    const page1Promise = page.waitForEvent('popup');

    await tombolViewDetail.click();

    // ==========================================
    // 8. Tunggu popup
    // ==========================================
    const page1 = await page1Promise;

    await page1.waitForLoadState('domcontentloaded', {
      timeout: 30000
    });

    await page1.waitForTimeout(2000);

    // ==========================================
    // 9. Validasi Form Detail
    // ==========================================
    const formDetail = page1.locator('h1');

    await expect(formDetail).toBeVisible({
      timeout: 30000
    });

    await page1.waitForTimeout(1500);

    console.log(
      'TC-052 PASS - Form Detail Data Cashback berhasil ditampilkan'
    );
  }
);