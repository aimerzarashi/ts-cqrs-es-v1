import { test, expect } from '@playwright/test';

let email;

test.describe.configure({ mode: 'serial' });

test.beforeAll(async () => {
  const date = new Date();
  email = date.getFullYear().toString()
        + ("00" + date.getMonth()).slice(-2)
        + ("00" + date.getDate()).slice(-2)
        + ("00" + date.getHours()).slice(-2)
        + ("00" + date.getMinutes()).slice(-2)
        + ("00" + date.getSeconds()).slice(-2)
        + ("00" + date.getMilliseconds()).slice(-3)
        + '@example.com';
  console.info(email);
});

test('Show secure page when signed off', async ({ page }) => {
  // Runs before each test and logs off.
  await page.goto('https://website-ui.dev.localhost/api/auth/signout');
  await page.getByRole('button', { name: 'Sign out' });

  await page.goto('https://website-ui.dev.localhost/tests/auth/secure');
  await expect(page).toHaveTitle('Sign In');
  await expect(page).toHaveScreenshot();
  await page.getByRole('textbox', { name: 'Email' }).fill(email);
  await page.getByRole('button', { name: 'Sign in with Email' }).click();

  // https://website-ui.dev.localhost/api/auth/verify-request
  await expect(page).toHaveTitle('Verify Request');
  await expect(page).toHaveScreenshot();
});

test('Show secure page when signed in', async ({ page }) => {
  await page.goto('https://website-smtp.dev.localhost');
  await page.getByText(email).first().click();
  const page1Promise = page.waitForEvent('popup');
  await page.frameLocator('#preview-html').getByRole('link', { name: 'Sign in' }).click();

  await page.goto('https://website-ui.dev.localhost/tests/auth/secure');
  await expect(page).toHaveScreenshot();
  await expect(page.getByRole('button', { name: 'Sign Out' })).toBeAttached();
});