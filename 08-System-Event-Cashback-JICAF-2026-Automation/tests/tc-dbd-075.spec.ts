import { test, expect } from '@playwright/test';

test('TC-075 - DBD-001', async ({ page }) => {
  test.setTimeout(90000);

  console.log('');
  console.log('==========================================');
  console.log('TC-075 - DBD-001');
  console.log('Input Valid Periode dan S/D pada Dashboard');
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

  // STEP 4 - Input Start Date
  console.log('STEP 4 - Input Start Date');

  const startDate = page.locator(
    'input[name="start_date"]'
  );

  await expect(startDate).toBeVisible({
    timeout: 10000
  });

  await startDate.fill('2026-09-01');

  await expect(startDate).toHaveValue(
    '2026-09-01'
  );

  // STEP 5 - Input S/D / End Date
  console.log('STEP 5 - Input S/D / End Date');

  const endDate = page.locator(
    'input[name="end_date"]'
  );

  await expect(endDate).toBeVisible({
    timeout: 10000
  });

  await endDate.fill('2026-09-14');

  await expect(endDate).toHaveValue(
    '2026-09-14'
  );

  // STEP 6 - Klik Filter
  console.log('STEP 6 - Klik Filter');

  const filterButton = page.getByRole('button', {
    name: ' Filter'
  });

  await expect(filterButton).toBeVisible({
    timeout: 10000
  });

  await filterButton.scrollIntoViewIfNeeded();
  await filterButton.hover();
  await page.waitForTimeout(1500);
  await filterButton.click();
  await page.waitForTimeout(3000);

  // STEP 7 - Validasi Dashboard
  console.log('STEP 7 - Validasi data Dashboard');

  await expect(
    page.getByRole('link', {
      name: ' Dashboard'
    })
  ).toBeVisible({
    timeout: 10000
  });

  await expect(startDate).toHaveValue(
    '2026-09-01'
  );

  await expect(endDate).toHaveValue(
    '2026-09-14'
  );

  // STEP 8 - Screenshot
  console.log('STEP 8 - Screenshot hasil testing');

  await page.screenshot({
    path: 'screenshots/TC-075-DBD-001.png',
    fullPage: true
  });

  console.log('');
  console.log('==========================================');
  console.log('TC-075 SELESAI');
  console.log('==========================================');
});