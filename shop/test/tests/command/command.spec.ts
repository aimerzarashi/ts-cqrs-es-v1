import { test, expect } from '@playwright/test';
import { BASE_URL } from '../../lib/config';

test('get', async ({ request }) => {
  const response = await request.get(`${BASE_URL.COMMAND}`, {});
  expect(response.ok()).toBeTruthy();
});