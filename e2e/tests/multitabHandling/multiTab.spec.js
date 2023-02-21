import { test, expect } from '@playwright/test';

import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';
import { SharedPage } from '../../pages/SharedPage';

const newPageLocators = {
  sauceLabsOnesie: 'text=Sauce Labs Onesie',
  sauceLabsBackpack: 'Sauce Labs Backpack',
};

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
    productsPage.openNewTabWithProduct(newPageLocators.sauceLabsBackpack),
  ]);
  const sharedPage = new SharedPage(newPage);
  await productsPage.selectProductByText(
    newPage,
    newPageLocators.sauceLabsOnesie,
  );
  await expect(newPage.locator(newPageLocators.sauceLabsOnesie)).toBeVisible();
  await sharedPage.addToCartButtonClick();
  // Uncomment await page.pause(); if you want to investigate which tab has been used in the test
  // await page.pause();
});
