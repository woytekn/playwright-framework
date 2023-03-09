import { Index } from './Index';
const product = 'Sauce Labs Onesie';

export class CartPage {
  /**
   * @param {import('@playwright/test').Page} page
   */

  constructor(page) {
    this.page = page;
    this.checkoutButton = page.locator('text=Checkout');
    this.removeButton = page.locator('text=Remove');
  }

  async goTo(path) {
    await this.page.goto(path);
  }

  async clearCartFromOutstandingProducts() {
    const index = new Index(this.page);
    const productsPage = index.getProductsPage();
    await productsPage.addSingleProductToCart(product);
    await productsPage.openCart();
    const removeButton = 'text=Remove';
    await this.page.waitForSelector(removeButton);
    /*
    $$eval is a Playwright method that allows us to evaluate a function in the context of the page and pass the result back to Node.js. In this case, we're passing a function that selects all the remove buttons on the page using the same selector we used with waitForSelector. $$eval returns an array of all the values returned by the function for each element that matches the selector.
    */
    let count = await this.page.$$eval(
      removeButton,
      (buttons) => buttons.length,
    );
    for (let i = 0; i < count; ++i) {
      const removeButtons = await this.page.$$(removeButton);
      await removeButtons[i].click();
    }
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}
