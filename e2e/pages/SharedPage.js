export class SharedPage {
  // Below @param import is necessary to see autocompletion for methods
  /**
   * @param {import('@playwright/test').Page} page
   */

  constructor(page) {
    this.page = page;
    this.addToCartButton = page.locator('text=Add to cart');
  }
  async addToCartButtonClick() {
    await this.addToCartButton.click();
  }

  async productClick() {
    await this.addToCartButton.click();
  }
}
