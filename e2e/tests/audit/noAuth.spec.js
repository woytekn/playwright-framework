/*
IMPORTANT NOTE!
It looks like "lighthouse": "10.0.1" is incompatible with playwright-lighthouse package.
To solve this issue stick with: lighthouse@9.6.8
The PR with fix is ready https://github.com/abhinaba-ghosh/playwright-lighthouse/pull/46
*/

const { playAudit } = require('playwright-lighthouse');
const playwright = require('playwright');
import { test } from '@playwright/test';

test('open browser', async () => {
  const browser = await playwright['chromium'].launch({
    args: ['--remote-debugging-port=9222'],
  });
  const page = await browser.newPage();
  await page.goto('https://netguru.com');

  await playAudit({
    page: page,
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
