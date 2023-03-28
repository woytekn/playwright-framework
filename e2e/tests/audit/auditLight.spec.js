/*
IMPORTANT NOTE!
It looks like "lighthouse": "10.0.1" is incompatible with playwright-lighthouse package.
To solve this issue stick with: lighthouse@9.6.8
The PR with fix is ready https://github.com/abhinaba-ghosh/playwright-lighthouse/pull/46
*/

const { playAudit } = require('playwright-lighthouse');
const playwright = require('playwright');
import { test } from '@playwright/test';
import { Index } from '../../pages/Index';

test('open browser', async ({ page }) => {
  const browser = await playwright['chromium'].launch({
    args: ['--remote-debugging-port=9222'],
  });
  const index = new Index(page);
  const loginPage = index.getLoginPage();
  // A user is already logged in via the globalSetup
  await loginPage.goTo('inventory.html');

  // The playwright-lighthouse library is designed to create a new tab to run the audit
  const auditPage = await browser.newPage();
  await auditPage.goto('https://www.saucedemo.com/inventory.html');

  await playAudit({
    page: auditPage,
    thresholds: {
      performance: 50,
      accessibility: 50,
      'best-practices': 50,
      seo: 50,
      pwa: 50,
    },
    port: 9222,
    reports: {
      formats: { html: true },
      name: 'lighthouse-report',
      directory: 'lighthouse-report',
    },
  });

  await browser.close();
});
