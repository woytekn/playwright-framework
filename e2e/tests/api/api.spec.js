const { test, expect } = require('@playwright/test');

const json = {
  page: 2,
  per_page: 6,
  total: 12,
  total_pages: 2,
  data: [
    {
      id: 7,
      email: 'michael.lawson@reqres.in',
      first_name: 'Wojtek',
      last_name: 'Nartowski',
      avatar: 'https://reqres.in/img/faces/7-image.jpg',
    },
  ],
  support: {
    url: 'https://reqres.in/#support-heading',
    text: 'To keep ReqRes free, contributions towards server costs are appreciated!',
  },
};

test.describe('Dog API', () => {
  let page;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
  });

  test.afterEach(async () => {
    await page.close();
  });

  test('should return correct data for test_breed', async () => {
    await page.route('https://reqres.in/api/users?page=2', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(json),
      });
    });

    await page.goto('https://reqres.in/');
    await page.click('[data-id="users"]');
    const response = await page.evaluate(() => {
      return fetch('https://reqres.in/api/users?page=2').then(
        async (response) => {
          return {
            status: response.status,
            data: await response.json(),
          };
        },
      );
    });
    expect(response.status).toBe(200);
    expect(response.data).toEqual(json);
    console.log(response.data, json);
  });
});
