import { test, expect } from '@playwright/test';
import { Index } from '../../pages/Index';

const product = 'Sauce Labs Onesie';

test.beforeEach(async ({ page }) => {
  const index = new Index(page);
  const cartPage = index.getCartPage();
  const loginPage = index.getLoginPage();
  await loginPage.goTo('inventory.html');
  await cartPage.clearCartFromOutstandingProducts();
  await loginPage.goTo('inventory.html');
});

test('As a user I want search a specific product and add it to a cart.', async ({
  page,
}) => {
  const index = new Index(page);
  const productsPage = index.getProductsPage();
  await productsPage.addSingleProductToCart(product);
  await expect(page.locator(`text=${product}`)).toBeVisible();
});

test('As a user who added a product to a cart I want to open a cart and see an recently added item', async ({
  page,
}) => {
  const index = new Index(page);
  const productsPage = index.getProductsPage();
  await productsPage.addSingleProductToCart(product);
  await productsPage.openCart();
  await expect(
    productsPage.inventoryItem.locator(`text=${product}`),
  ).toBeVisible();
});
