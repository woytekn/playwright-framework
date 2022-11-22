import { Index } from './Index';
const product = 'Sauce Labs Onesie';

export class CartPage {
  /**
   * @param {import('@playwright/test').Page} page
   */

  constructor(page) {
    this.page = page;
    this.removeButton = page.locator('text=Remove');
    this.checkoutButton = page.locator('text=Checkout');
  }

  async goTo(path) {
    await this.page.goto(path);
  }

  async clearCartFromOutstandingProducts() {
    const index = new Index(this.page);
    const productsPage = index.getProductsPage();
    await productsPage.addSingleProductToCart(product);
    await productsPage.openCart();
    if (await this.removeButton.isVisible()) {
      let count = await this.removeButton.count();
      for (let i = 0; i < count; ++i) {
        if (await this.removeButton.isVisible()) {
          await this.removeButton.click();
        } else {
          break;
        }
      }
    }
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}
