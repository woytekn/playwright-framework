import { test, expect } from '@playwright/test';
import { customTestWithData } from '../../utils/test-data';
import { Index } from '../../pages/Index';

test.beforeEach(async ({ page }) => {
  const index = new Index(page);
  const loginPage = index.getLoginPage();
  await loginPage.goTo('');
});

// Fixture implementation, extends @playwright/test module. Read more https://playwright.dev/docs/test-fixtures
customTestWithData(
  'Correct login @login',
  async ({ page, testDataForLogin }) => {
    const index = new Index(page);
    const loginPage = index.getLoginPage();
    await loginPage.validLogin(
      testDataForLogin.username,
      testDataForLogin.password,
    );
    await expect(
      loginPage.shoppingCartContainter,
      'Shopping cart containter is visible',
    ).toBeVisible();
  },
);

customTestWithData(
  'Incorrect login @login',
  async ({ page, testDataForLogin }) => {
    const index = new Index(page);
    const loginPage = index.getLoginPage();
    await loginPage.validLogin(
      testDataForLogin.username,
      testDataForLogin.incorrectPassword,
    );
    await expect(loginPage.loginError, 'Login error is present').toBeVisible();
  },
);
