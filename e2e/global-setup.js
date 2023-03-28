const { chromium } = require('@playwright/test');
import { Index } from './pages/Index';
const username = 'standard_user';
const password = 'secret_sauce';

module.exports = async (config) => {
  const { baseURL, storageState } = config.projects[0].use;
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const index = new Index(page);
  const loginPage = index.getLoginPage();
  await loginPage.goTo(baseURL);
  await loginPage.validLogin(
    process.env.LOGIN_USERNAME,
    process.env.LOGIN_PASSWORD,
  );
  await page.context().storageState({ path: storageState });
  await browser.close();
};
