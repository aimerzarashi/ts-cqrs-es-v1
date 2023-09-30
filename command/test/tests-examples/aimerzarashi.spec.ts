import { test, expect } from '@playwright/test';
import { BASE_URL } from '../lib/config';

test('get', async ({ request }) => {
  const response = await request.get(`${BASE_URL.API}`, {});
  expect(response.ok()).toBeTruthy();
  expect(await response.json()).toEqual(expect.objectContaining({
    message: 'Hello World'
  }));
});

test('post', async ({ request }) => {
  const response = await request.post(`${BASE_URL.API}`, {});
  expect(response.ok()).toBeTruthy();
  expect(await response.json()).toEqual(expect.objectContaining({
    message: "Hello World"
  }));
});