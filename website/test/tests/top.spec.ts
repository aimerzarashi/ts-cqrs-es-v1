import { test, expect } from '@playwright/test';
import { BASE_URL } from '../lib/config';

test('has title', async ({ page }) => {
  await page.goto(BASE_URL.UI);
  await expect(page).toHaveTitle('CQRS/ESで業務システムをつくろう');
});

test('has topMenu', async ({ page }) => {
  await page.goto(BASE_URL.UI);
  const topMenu = page.locator('.topMenu');
  await expect(topMenu).toHaveText('TOP MENU');
});

/*
test('regression test', async ({ page }) => {
  await page.goto(BASE_URL);
  await expect(page).toHaveScreenshot();
});
*/