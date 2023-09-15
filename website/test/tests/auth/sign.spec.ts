import { test, expect } from '@playwright/test';

const date = new Date();
const yyyy = date.getFullYear().toString();
const MM = ("00" + date.getMonth()).slice(-2);
const dd = ("00" + date.getDate()).slice(-2);
const hh = ("00" + date.getHours()).slice(-2);
const mm = ("00" + date.getMinutes()).slice(-2);
const ss = ("00" + date.getSeconds()).slice(-2);
const email = yyyy + MM + dd + hh + mm + ss + '@example.com';
console.info(email);

test.beforeEach(async ({ page }) => {
  // Runs before each test and logs off.
  await page.goto('https://website-ui.dev.localhost/api/auth/signout');
  await page.getByRole('button', { name: 'Sign out' });
});

test('Show sign button when signed off', async ({ page }) => {
  await page.goto('https://website-ui.dev.localhost/tests/auth/server');
  await expect(page).toHaveScreenshot();
  await expect(page.getByRole('button', { name: 'Sign In' })).toBeAttached();
  await expect(page.getByRole('button', { name: 'Sign Out' })).not.toBeAttached();
});

test('Behavior when pressing the sign-in button', async ({ page }) => {
  await page.goto('https://website-ui.dev.localhost/tests/auth/server');
  await expect(page).toHaveScreenshot();
  await page.getByRole('button', { name: 'Sign In' }).click();

  // https://website-ui.dev.localhost/api/auth/signin'
  await expect(page).toHaveTitle('Sign In');
  await expect(page).toHaveScreenshot();
  await page.getByRole('textbox', { name: 'Email' }).fill(email);
  await page.getByRole('button', { name: 'Sign in with Email' }).click();

  // https://website-ui.dev.localhost/api/auth/verify-request
  await expect(page).toHaveTitle('Verify Request');
  await expect(page).toHaveScreenshot();
});

test('Show sign button when signed in', async ({ page }) => {
  await page.goto('https://website-smtp.dev.localhost');
  await page.getByText(email).first().click();
  const page1Promise = page.waitForEvent('popup');
  await page.frameLocator('#preview-html').getByRole('link', { name: 'Sign in' }).click();

  await page.goto('https://website-ui.dev.localhost/tests/auth/server');
  await expect(page).toHaveScreenshot();
  await expect(page.getByRole('button', { name: 'Sign In' })).not.toBeAttached();
  await expect(page.getByRole('button', { name: 'Sign Out' })).toBeAttached();
});


