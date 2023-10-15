import { test, expect } from '@playwright/test';
import { BASE_URL } from '../../lib/config';

let email;

test.describe.configure({ mode: 'serial' });

test.beforeAll(async () => {
  const date = new Date();
  email = date.getFullYear().toString()
        + ("00" + date.getMonth() + 1).slice(-2)
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
  await page.goto(BASE_URL.UI + '/api/auth/signout');
  await page.getByRole('button', { name: 'Sign out' });

  await page.goto(BASE_URL.UI + '/tests/auth/secure');
  await expect(page).toHaveTitle('Sign In');
  await page.getByRole('textbox', { name: 'Email' }).fill(email);
  await page.getByRole('button', { name: 'Sign in with Email' }).click();

  await expect(page).toHaveTitle('Verify Request');
});

test('Show secure page when signed in', async ({ page }) => {
  await page.goto(BASE_URL.SMTP);
  await page.getByText(email).click();
  const page1Promise = page.waitForEvent('popup');
  await page.frameLocator('#preview-html').getByRole('link', { name: 'Sign in' }).click();
  const page1 = await page1Promise;

  await page1.waitForTimeout(2000);
  await expect(page1.getByRole('button', { name: 'Sign In' })).not.toBeAttached();
  await expect(page1.getByRole('button', { name: 'Sign Out' })).toBeAttached();
});