import { test, expect } from '@playwright/test';

// In this test, baseURL is being overridden for the crossorigin testing purposes, without it, the test will run on standard base url and add everything what is after 'goto' to it.

test.use({ baseURL: '' });
test('netguru', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await expect(page).toHaveTitle('Swag Labs');
  await page.goto('https://www.netguru.com/');
  await expect(page).toHaveTitle('Digital Acceleration Company | Netguru');
});
