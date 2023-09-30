import { test, expect } from '@playwright/test';
import { BASE_URL } from '../lib/config';

test('get', async ({ request }) => {
  const response = await request.get(`${BASE_URL.API}`, {});
  expect(response.ok()).toBeTruthy();
});