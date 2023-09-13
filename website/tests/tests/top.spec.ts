import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://website-ui.dev.localhost/');
  await expect(page).toHaveTitle('CQRS/ESで業務システムをつくろう');
});

test('has topMenu', async ({ page }) => {
    await page.goto('https://website-ui.dev.localhost/');
    const topMenu = page.locator('.topMenu');
    await expect(topMenu).toHaveText('TOP MENU');
});

test('regression test', async ({ page }) => {
  await page.goto('https://website-ui.dev.localhost/');
  await expect(page).toHaveScreenshot();
});
