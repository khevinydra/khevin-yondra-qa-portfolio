import { test, expect } from '@playwright/test';

test('TC-080 - LGT-001', async ({ page }) => {
  test.setTimeout(90000);

  console.log('');
  console.log('==========================================');
  console.log('TC-080 - LGT-001');
  console.log('Logout dari System, Kembali ke Halaman Login');
  console.log('==========================================');

  // STEP 1 - Buka halaman Login
  console.log('STEP 1 - Buka halaman Login');

  await page.goto(
    'https://dev.ptdika.com/cashback_JICAF2026/login'
  );

  // STEP 2 - Login sebagai Admin
  console.log('STEP 2 - Login sebagai Admin');

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
  await page.waitForTimeout(3000);

  // STEP 3 - Buka Dashboard
  console.log('STEP 3 - Buka Dashboard');

  const dashboardMenu = page.getByRole('link', {
    name: ' Dashboard'
  });

  await expect(dashboardMenu).toBeVisible({
    timeout: 15000
  });

  await dashboardMenu.scrollIntoViewIfNeeded();
  await dashboardMenu.hover();
  await page.waitForTimeout(1500);
  await dashboardMenu.click();
  await page.waitForTimeout(2000);

  // STEP 4 - Validasi Dashboard berhasil dibuka
  console.log('STEP 4 - Validasi Dashboard');

  await expect(
    page.getByRole('link', {
      name: ' Dashboard'
    })
  ).toBeVisible({
    timeout: 10000
  });

  // STEP 5 - Klik Logout
  console.log('STEP 5 - Klik Logout');

  const logoutButton = page.getByRole('link', {
    name: ' Logout'
  });

  await expect(logoutButton).toBeVisible({
    timeout: 10000
  });

  await logoutButton.scrollIntoViewIfNeeded();
  await logoutButton.hover();
  await page.waitForTimeout(1500);
  await logoutButton.click();
  await page.waitForTimeout(3000);

  // STEP 6 - Validasi kembali ke halaman Login
  console.log('STEP 6 - Validasi kembali ke halaman Login');

  await expect(page).toHaveURL(
    /\/cashback_JICAF2026\/login/,
    {
      timeout: 10000
    }
  );

  await expect(
    page.getByRole('textbox', {
      name: 'Username'
    })
  ).toBeVisible({
    timeout: 10000
  });

  await expect(
    page.getByRole('textbox', {
      name: 'Password'
    })
  ).toBeVisible({
    timeout: 10000
  });

  await expect(
    page.getByRole('button', {
      name: 'Login'
    })
  ).toBeVisible({
    timeout: 10000
  });

  // STEP 7 - Screenshot
  console.log('STEP 7 - Screenshot hasil testing');

  await page.screenshot({
    path: 'screenshots/TC-080-LGT-001.png',
    fullPage: true
  });

  console.log('');
  console.log('==========================================');
  console.log('TC-080 SELESAI');
  console.log('==========================================');
});