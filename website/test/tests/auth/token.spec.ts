import { test, expect } from '@playwright/test';
import { BASE_URL } from '../../lib/config';

let email;

test.describe.configure({ mode: 'serial' });

test.beforeAll(async () => {
  const date = new Date();
  email = date.getFullYear().toString()
        + ("00" + ( date.getMonth()+1 )).slice(-2)
        + ("00" + date.getDate()).slice(-2)
        + ("00" + date.getHours()).slice(-2)
        + ("00" + date.getMinutes()).slice(-2)
        + ("00" + date.getSeconds()).slice(-2)
        + ("00" + date.getMilliseconds()).slice(-3)
        + '@example.com';
  console.info(email);
});

test('iam user registration', async ({ page }) => {
  await page.goto(BASE_URL.UI + '/api/auth/signout');
  await page.getByRole('button', { name: 'Sign out' });

  await page.goto(BASE_URL.UI + '/api/auth/signin');
  await expect(page).toHaveTitle('Sign In');
  await page.getByRole('textbox', { name: 'Email' }).fill(email);
  await page.getByRole('button', { name: 'Sign in with Email' }).click();

  await page.goto(BASE_URL.SMTP);
  await page.getByText(email).click();
  const page1Promise = page.waitForEvent('popup');
  await page.frameLocator('#preview-html').getByRole('link', { name: 'Sign in' }).click();
  const page1 = await page1Promise;

  await page.goto(BASE_URL.IAM);
  await page.getByRole('link', { name: 'Administration Console' }).click();

  await page.getByLabel('Username or email').fill('admin');
  await page.getByLabel('Username or email').press('Tab');
  await page.getByLabel('Password').fill('password');
  await page.getByRole('button', { name: 'Sign In' }).click();

  await page.getByTestId('realmSelectorToggle').click();
  await page.getByRole('menuitem', { name: 'aimerzarashi' }).click();

  await page.getByRole('link', { name: 'Users' }).click();
  await page.getByPlaceholder('Search user').click();
  await page.getByPlaceholder('Search user').fill(email);
  await page.getByLabel('Search', { exact: true }).click();
  await expect(page.getByRole('gridcell', { name: email }).nth(1)).toBeAttached();

  await page.getByRole('link', { name: email }).click();
  await expect(page.getByRole('textbox', { name: 'Username' })).toHaveValue(email);
  await expect(page.getByRole('textbox', { name: 'Email' })).toHaveValue(email);

  await page.getByTestId('user-sessions-tab').click();
  await expect(page.getByRole('link', { name: 'website-ui' })).toBeAttached();
});