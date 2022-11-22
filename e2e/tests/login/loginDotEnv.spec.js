import { test, expect } from '@playwright/test';
import { Index } from '../../pages/Index';

test.beforeEach(async ({ page }) => {
  const index = new Index(page);
  const loginPage = index.getLoginPage();
  await loginPage.goTo('');
});

test('Correct login @login', async ({ page }) => {
  const index = new Index(page);
  const loginPage = index.getLoginPage();
  await loginPage.validLogin(
    process.env.LOGIN_USERNAME,
    process.env.LOGIN_PASSWORD,
  );
  await expect(
    loginPage.shoppingCartContainter,
    'Shopping cart containter is visible',
  ).toBeVisible();
});
