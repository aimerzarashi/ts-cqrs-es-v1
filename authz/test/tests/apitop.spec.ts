import { test, expect } from '@playwright/test';

const BASE_URL = 'https://authz-api.dev.localhost';

test('should hello world', async ({ request }) => {
  const response = await request.get(`${BASE_URL}`, {});
  expect(response.ok()).toBeTruthy();
  expect(await response.json()).toContainEqual(expect.objectContaining({
    message: 'Hello World',
  }));
});