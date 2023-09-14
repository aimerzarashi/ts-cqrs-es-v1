import { test, expect } from '@playwright/test';

test('server logon/logoff', async ({ page }) => {
  await page.goto('https://website-ui.dev.localhost/');
  await page.getByRole('link', { name: 'server' }).click();
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByPlaceholder('email@example.com').click();
  await page.getByPlaceholder('email@example.com').fill('test202309112049@example.com');
  await page.getByRole('button', { name: 'Sign in with Email' }).click();
  await page.goto('https://website-smtp.dev.localhost/');
  await page.getByText('test202309112049@example.com').click();
  const page2Promise = page.waitForEvent('popup');
  await page.frameLocator('#preview-html').getByRole('link', { name: 'Sign in' }).click();
  const page2 = await page2Promise;
  await page2.getByRole('link', { name: 'server' }).click();
  await page2.getByText('{"name":null,"email":"test202309112049@example.com","image":null}').click({
    button: 'right'
  });
  await page2.getByText('{"name":null,"email":"test202309112049@example.com","image":null}').click();
  await page2.getByText('CQRS/ESで業務システムをつくろうSign Out{"name":null,"email":"test202309112049@example.com","').press('Escape');
});