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

test('Show sign button when signed off', async ({ page }) => {
  await page.goto('https://website-ui.dev.localhost/api/auth/signout');
  await page.getByRole('button', { name: 'Sign out' });

  await page.goto('https://website-ui.dev.localhost/tests/auth/client');
  await expect(page.getByRole('button', { name: 'Sign In' })).toBeAttached();
  await expect(page.getByRole('button', { name: 'Sign Out' })).not.toBeAttached();
});

test('Behavior when pressing the sign-in button', async ({ page }) => {
  await page.goto('https://website-ui.dev.localhost/tests/auth/client');
  await page.getByRole('button', { name: 'Sign In' }).click();

  // https://website-ui.dev.localhost/api/auth/signin'
  await expect(page).toHaveTitle('Sign In');
  await page.getByRole('textbox', { name: 'Email' }).fill(email);
  await page.getByRole('button', { name: 'Sign in with Email' }).click();

  // https://website-ui.dev.localhost/api/auth/verify-request
  await expect(page).toHaveTitle('Verify Request');
});

test('Show sign button when signed in', async ({ page }) => {
  await page.goto('https://website-smtp.dev.localhost/');
  await page.getByText(email).click();
  const page1Promise = page.waitForEvent('popup');
  await page.frameLocator('#preview-html').getByRole('link', { name: 'Sign in' }).click();
  const page1 = await page1Promise;

  await page1.waitForTimeout(2000);
  await expect(page1.getByRole('button', { name: 'Sign In' })).not.toBeAttached();
  await expect(page1.getByRole('button', { name: 'Sign Out' })).toBeAttached();
});