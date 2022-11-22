import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goTo('inventory.html');
});

test('As a user I want to compare the specific element on the landing page using visual comparison', async ({
  page,
}) => {
  const productsPage = new ProductsPage(page);
  await productsPage.productsSortingForLoop();
  await expect(productsPage.footerRobot).toHaveScreenshot('robot.png');
});

test('As a user I want to compare the state of the landing page using visual comparison', async ({
  page,
}) => {
  const productsPage = new ProductsPage(page);
  await productsPage.productsSortingForLoop();
  await expect(page).toHaveScreenshot('landing_page.png');
});
