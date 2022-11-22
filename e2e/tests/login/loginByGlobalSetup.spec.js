import { test } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('inventory.html');
  // You are signed in!
});
