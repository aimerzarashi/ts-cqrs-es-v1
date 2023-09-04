import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
//  await page.goto('http://web-ui.sandbox.svc.cluster.local:3000');
  await page.goto('https://web-ui.dev.localhost/');

  await expect(page).toHaveTitle(/Create Next App/);
  await expect(page).toHaveScreenshot();
});