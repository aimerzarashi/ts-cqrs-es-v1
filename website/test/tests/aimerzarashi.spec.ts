import { test, expect } from '@playwright/test';

const BASE_URL = 'https://website-ui.aimerzarashi.com';

test('has title', async ({ page }) => {
  await page.goto(BASE_URL);
  await expect(page).toHaveTitle('CQRS/ESで業務システムをつくろう');
});