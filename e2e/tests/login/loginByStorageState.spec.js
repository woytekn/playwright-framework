import { test, expect } from '@playwright/test';
import { Index } from '../../pages/Index';

const username = 'standard_user';
const password = 'secret_sauce';
let webContext;

test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const index = new Index(page);
  const loginPage = index.getLoginPage();
  await loginPage.goTo('');
  await loginPage.validLogin(username, password);
  await context.storageState({ path: 'state.json' });
  webContext = await browser.newContext({ storageState: 'state.json' });
});

test('Visit main page with login by storageState @login', async () => {
  const page = await webContext.newPage();
  const index = new Index(page);
  const loginPage = index.getLoginPage();
  await loginPage.goTo('/inventory.html');
  await expect(
    loginPage.shoppingCartContainter,
    'Shopping cart containter is visible',
  ).toBeVisible();
});
