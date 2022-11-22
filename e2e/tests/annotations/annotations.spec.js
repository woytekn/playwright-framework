import { test } from '@playwright/test';
import { ProductsPage } from '../../pages/ProductsPage';

test.skip('As a user I want to skip this test', async ({ page }) => {
  const productsPage = new ProductsPage(page);
  await productsPage.productsSortingForLoop();
});

test.fixme(
  "As a user I want to mark this test as 'fixme'",
  async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.productsSortingForLoop();
  },
);
