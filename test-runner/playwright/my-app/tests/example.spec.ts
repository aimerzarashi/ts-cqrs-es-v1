import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://web.dev.localhost/');
//  await page.goto('http://web-ui:3000');

  await expect(page).toHaveTitle(/Create Next App/);
  await expect(page).toHaveScreenshot();
});