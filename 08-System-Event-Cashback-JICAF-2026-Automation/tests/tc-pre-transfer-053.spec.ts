import { test, expect } from '@playwright/test';

test.setTimeout(90000);

test(
  'TC-053 - PTF-004 - Pre-Transfer Data Cashback ke Finance',
  async ({ page }) => {

    // ==========================================
    // 1. Login sebagai Verifikator
    // ==========================================
    await page.goto(
      'https://dev.ptdika.com/cashback_JICAF2026/login',
      {
        waitUntil: 'domcontentloaded',
        timeout: 60000
      }
    );

    await page.waitForTimeout(1500);

    const username = page.getByRole('textbox', {
      name: 'Username'
    });

    await username.click();
    await page.waitForTimeout(700);
    await username.fill('verifikatorky');
    await page.waitForTimeout(1000);

    const password = page.getByRole('textbox', {
      name: 'Password'
    });

    await password.click();
    await page.waitForTimeout(700);
    await password.fill('verif');
    await page.waitForTimeout(1000);

    // ==========================================
    // 2. Login
    // ==========================================
    const loginButton = page.getByRole('button', {
      name: 'Login'
    });

    await loginButton.hover();
    await page.waitForTimeout(1000);
    await loginButton.click();

    await page.waitForTimeout(2500);

    // ==========================================
    // 3. Buka menu Pre-Transfer
    // ==========================================
    const menuPreTransfer = page.getByRole('link', {
      name: ' Pre-Transfer'
    });

    await expect(menuPreTransfer).toBeVisible({
      timeout: 30000
    });

    await menuPreTransfer.hover();
    await page.waitForTimeout(1500);
    await menuPreTransfer.click();

    await page.waitForTimeout(2500);

    // ==========================================
    // 4. Klik Export Excel
    // ==========================================
    const exportExcel = page.getByRole('link', {
      name: 'Export Excel '
    });

    await expect(exportExcel).toBeVisible({
      timeout: 30000
    });

    await exportExcel.hover();
    await page.waitForTimeout(1500);

    const downloadPromise = page.waitForEvent('download');

    await exportExcel.click();

    const download = await downloadPromise;

    console.log(
      `Export berhasil: ${download.suggestedFilename()}`
    );

    await page.waitForTimeout(1500);

    // ==========================================
    // 5. Kembali ke halaman Pre-Transfer
    // ==========================================
    await page.goto(
      'https://dev.ptdika.com/cashback_JICAF2026/pre_transfer',
      {
        waitUntil: 'domcontentloaded',
        timeout: 60000
      }
    );

    await page.waitForTimeout(2000);

    // ==========================================
    // 6. Logout Verifikator
    // ==========================================
    const logoutButton = page.getByRole('link', {
      name: ' Logout'
    });

    await expect(logoutButton).toBeVisible({
      timeout: 30000
    });

    await logoutButton.hover();
    await page.waitForTimeout(1500);
    await logoutButton.click();

    await page.waitForTimeout(2000);

    // ==========================================
    // 7. Login sebagai Finance
    // ==========================================
    const usernameFinance = page.getByRole('textbox', {
      name: 'Username'
    });

    await expect(usernameFinance).toBeVisible({
      timeout: 30000
    });

    await usernameFinance.click();
    await page.waitForTimeout(700);
    await usernameFinance.fill('financeky');
    await page.waitForTimeout(1000);

    const passwordFinance = page.getByRole('textbox', {
      name: 'Password'
    });

    await passwordFinance.click();
    await page.waitForTimeout(700);
    await passwordFinance.fill('finance');
    await page.waitForTimeout(1000);

    // ==========================================
    // 8. Login Finance
    // ==========================================
    const loginFinance = page.getByRole('button', {
      name: 'Login'
    });

    await loginFinance.hover();
    await page.waitForTimeout(1000);
    await loginFinance.click();

    await page.waitForTimeout(2500);

    // ==========================================
    // 9. Buka menu Finance
    // ==========================================
    const menuFinance = page.getByRole('link', {
      name: ' Finance'
    });

    await expect(menuFinance).toBeVisible({
      timeout: 30000
    });

    await menuFinance.hover();
    await page.waitForTimeout(1500);
    await menuFinance.click();

    await page.waitForTimeout(2500);

    // ==========================================
    // 10. Klik Next
    // ==========================================
    const nextButton = page.getByRole('link', {
      name: 'Next'
    });

    await expect(nextButton).toBeVisible({
      timeout: 30000
    });

    await nextButton.hover();
    await page.waitForTimeout(1500);
    await nextButton.click();

    await page.waitForTimeout(2000);

    // ==========================================
    // 11. Validasi
    // ==========================================
    await expect(page).toHaveURL(/finance/);

    console.log(
      'TC-053 PASS - Data cashback berhasil diproses ke Finance'
    );
  }
);