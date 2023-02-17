import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';

/*
If you want to check how the visual comparison failure works, just uncomment the below line. It will change the viewport, so that screens will not match.
 test.use({ viewport: { width: 600, height: 900 } });
*/

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goTo('inventory.html');
});

test('As a user I want to compare the specific element on the landing page using visual comparison', async ({
  page,
}) => {
  const productsPage = new ProductsPage(page);
  await expect(productsPage.footerRobot).toHaveScreenshot('robot.png');
});

test('As a user I want to compare the state of the landing page using visual comparison', async ({
  page,
}) => {
  await expect(page).toHaveScreenshot('landing_page.png');
});
