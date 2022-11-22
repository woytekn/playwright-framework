import { test, expect } from '@playwright/test';
import { Index } from '../../pages/Index';
const firstName = 'Wojtek';
const lastName = 'TheQa';
const zipPostalCode = '61-144';
const purchasedProduct = 'Sauce Labs Onesie';
const totalPrice = '$7.99';
const itemQuantity = '1';

test.beforeEach(async ({ page }) => {
  const index = new Index(page);
  const loginPage = index.getLoginPage();
  await loginPage.goTo('inventory.html');
});

test('As a user who added a product to a cart I want to checkout', async ({
  page,
}) => {
  const index = new Index(page);
  const loginPage = index.getLoginPage();
  const productsPage = index.getProductsPage();
  const cartPage = index.getCartPage();
  const checkoutPage = index.getCheckoutPage();
  await productsPage.addSingleProductToCartAndOpenCart(purchasedProduct);
  await expect(
    productsPage.inventoryItem.locator(`text=${purchasedProduct}`),
  ).toBeVisible();
  await cartPage.checkoutButton.click();
  await checkoutPage.fillCheckoutInformation(
    firstName,
    lastName,
    zipPostalCode,
  );
  await checkoutPage.clickContinueCheckoutButton();
  await expect(page.locator('.inventory_item_name')).toHaveText(
    purchasedProduct,
  );
  await expect(checkoutPage.checkoutSummarySectionInfo).toHaveClass([
    'summary_info_label',
    'summary_value_label',
    'summary_info_label',
    'summary_value_label',
    'summary_subtotal_label',
    'summary_tax_label',
    'summary_total_label',
    'cart_footer',
  ]);
  await expect(page.locator('.summary_subtotal_label')).toContainText(
    totalPrice,
  );
  await expect(checkoutPage.cartItemQuantity).toHaveText(itemQuantity);
  await checkoutPage.clickFinishCheckoutButton();
  await expect(checkoutPage.purchaseConfirmTextHeader).toBeVisible();
  await checkoutPage.clickGoBackCheckoutButton();
  await expect(
    loginPage.shoppingCartContainter,
    'Shopping cart containter is visible',
  ).toBeVisible();
});

test('As a user who added a product to a cart I want to cancel the purchase', async ({
  page,
}) => {
  const index = new Index(page);
  const loginPage = index.getLoginPage();
  const productsPage = index.getProductsPage();
  const cartPage = index.getCartPage();
  const checkoutPage = index.getCheckoutPage();
  await productsPage.addSingleProductToCartAndOpenCart(purchasedProduct);
  await expect(
    productsPage.inventoryItem.locator(`text=${purchasedProduct}`),
  ).toBeVisible();
  await cartPage.checkoutButton.click();
  await checkoutPage.fillCheckoutInformation(
    firstName,
    lastName,
    zipPostalCode,
  );
  await checkoutPage.clickCancelCheckoutButton();
  await expect(
    loginPage.shoppingCartContainter,
    'Shopping cart containter is visible',
  ).toBeVisible();
});
