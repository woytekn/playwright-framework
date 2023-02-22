import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goTo('inventory.html');
});

test('As a user I want to check if the sorting feature works correctly using for loop', async ({
  page,
}) => {
  const productsPage = new ProductsPage(page);
  await productsPage.productsSortingForLoop();
});

test('As a user I want to check if the sorting feature works correctly using forEach loop', async ({
  page,
}) => {
  const productsPage = new ProductsPage(page);
  await productsPage.productsSortingForEach();
});

test('As a user I want to check if the sorting feature works correctly using for loop with pusing values to the array', async ({
  page,
}) => {
  const productsPage = new ProductsPage(page);
  await productsPage.productsSortingPushingToArray();
});
