import { test, expect } from '@playwright/test';
import { Index } from '../../pages/Index';

const product = 'Sauce Labs Onesie';

test.beforeEach(async ({ page }) => {
  const index = new Index(page);
  const loginPage = index.getLoginPage();
  await loginPage.goTo('inventory.html');
});

test('As a user who added a product to a cart I want to open a cart and remove an recently added item', async ({
  page,
}) => {
  const index = new Index(page);
  const productsPage = index.getProductsPage();
  const cartPage = index.getCartPage();
  const loginPage = index.getLoginPage();
  await productsPage.addSingleProductToCart(product);
  await productsPage.openCart();
  await expect(
    productsPage.inventoryItem.locator(`text=${product}`),
  ).toBeVisible();
  await cartPage.removeButton.click();
  await loginPage.goTo('inventory.html');
  await productsPage.openCart();
  await expect(productsPage.cartItem).toBeHidden();
});
