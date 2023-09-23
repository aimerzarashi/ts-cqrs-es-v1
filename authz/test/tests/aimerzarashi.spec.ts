import { test, expect } from '@playwright/test';

const BASE_URL = 'https://authz-api.aimerzarashi.com';

test('get', async ({ request }) => {
  const response = await request.get(`${BASE_URL}`, {});
  expect(response.ok()).toBeTruthy();
  expect(await response.json()).toEqual(expect.objectContaining({
    message: 'Hello World'
  }));
});

test('post', async ({ request }) => {
  const response = await request.post(`${BASE_URL}`, {});
  expect(response.ok()).toBeTruthy();
  expect(await response.json()).toEqual(expect.objectContaining({
    message: "Hello World"
  }));
});