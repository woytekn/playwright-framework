import { test, expect } from '@playwright/test';

import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';

const purchasedProduct = 'Sauce Labs Backpack';

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goTo('inventory.html');
});

test('As a user I want to open a new tab and visit it', async ({
  page,
  context,
}) => {
  const productsPage = new ProductsPage(page);
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    productsPage.openNewTabWithProduct(purchasedProduct),
  ]);
  newPage.locator('text=Sauce Labs Onesie').click();
  // Uncomment await page.pause(); if you want to investigate which tab has been used in the test
  // await page.pause();
});
