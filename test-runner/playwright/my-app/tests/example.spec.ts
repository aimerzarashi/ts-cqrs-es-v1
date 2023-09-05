import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://web-ui.dev.localhost/');
  await expect(page).toHaveTitle('CQRS/ESで業務システムをつくろう');
  await expect(page).toHaveScreenshot();
});

test('has topMenu', async ({ page }) => {
    await page.goto('https://web-ui.dev.localhost/');
    const topMenu = page.locator('.topMenu');
    await expect(topMenu).toHaveText('TOP MENU');
});