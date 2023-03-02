import { expect } from '@playwright/test';

let productTextContent;
const options = ['az', 'za', 'lohi', 'hilo'];
const products = [
  'Sauce Labs Backpack',
  'Test.allTheThings() T-Shirt (Red)',
  'Sauce Labs Onesie',
  'Sauce Labs Fleece Jacket',
];

export class ProductsPage {
  // Below @param import is necessary to see autocompletion for methods
  /**
   * @param {import('@playwright/test').Page} page
   */

  constructor(page, browser) {
    this.page = page;
    this.browser = browser;
    this.productSortingDropdown = page.locator('.product_sort_container');
    this.inventoryItem = page.locator('.inventory_item_name').nth(0);
    this.inventoryAllProducts = page.locator('.inventory_item_name');
    this.addToCartButton = page.locator('text=Add to cart');
    this.cartButton = page.locator('#shopping_cart_container');
    this.cartItem = page.locator('.cart_item');
    this.footerRobot = page.locator('.footer_robot');
  }

  async productsSortingForLoop() {
    let count = options.length;
    for (let i = 0; i < count; i++) {
      await this.productSortingDropdown.selectOption(options[i]);
      expect(this.inventoryItem.nth(0)).toHaveText(products[i]);
      productTextContent = await this.inventoryItem.nth(0).textContent();
      console.log(productTextContent);
    }
  }

  async productsSortingForEach() {
    options.forEach(async (options, index) => {
      await this.productSortingDropdown.selectOption(options);
      /*** An example how dynamic locator values can be used.
      await expect(
        this.productSortingDropdown.locator(`option[value=${options}]`)
      ).toHaveText(products[index]);
      ***/
      await expect(this.inventoryItem.nth(0)).toHaveText(products[index]);
      productTextContent = await this.inventoryItem.nth(0).textContent();
      console.log(productTextContent);
    });
  }

  /*
  Simpler version of productsSortingPushingToArray() 
  */
  // async productsSortingPushingToArray() {
  //   let count = options.length;
  //   let productsCount = await this.inventoryAllProducts.count();
  //   const arrayOfProducts = [];

  //   for (let i = 0; i < count; i++) {
  //     await this.productSortingDropdown.selectOption(options[i]);
  //     arrayOfProducts.length = 0;
  //     console.log(options[i]);

  //     for (let i = 0; i < productsCount; i++) {
  //       let currentItem = await this.inventoryAllProducts.nth(i).textContent();
  //       arrayOfProducts.push(currentItem);
  //     }
  //     console.log(arrayOfProducts);
  //     expect(this.inventoryItem.nth(0)).toHaveText(arrayOfProducts[0]);
  //   }
  // }

  async productsSortingPushingToArray() {
    let count = options.length;
    let productsCount = await this.inventoryAllProducts.count();

    for (let i = 0; i < count; i++) {
      await this.productSortingDropdown.selectOption(options[i]);
      const arrayOfProducts = await Promise.all(
        Array(productsCount)
          .fill(0)
          .map(async (_, index) => {
            let currentItem = await this.inventoryAllProducts
              .nth(index)
              .textContent();
            return currentItem;
          }),
      );
      expect(this.inventoryItem.nth(0)).toHaveText(arrayOfProducts[0]);
    }
  }
  async addSingleProductToCart(product) {
    const count = await this.inventoryAllProducts.count();

    for (let i = 0; i < count; ++i) {
      if ((await this.inventoryAllProducts.nth(i).textContent()) === product) {
        await this.addToCartButton.nth(i).click();
        break;
      }
    }
  }

  async openCart() {
    await this.cartButton.waitFor();
    await Promise.all([
      await this.page.waitForLoadState(),
      await this.cartButton.click(),
    ]);
  }

  async addSingleProductToCartAndOpenCart(product) {
    await this.addSingleProductToCart(product);
    await this.openCart();
  }

  async openNewTabWithProduct(product) {
    await this.inventoryItem
      .locator(`text=${product}`)
      .click({ button: 'middle' });
  }

  async selectProductByText(page, text) {
    await page.locator(text).click();
  }

  async addToCartButtonClick() {
    await this.addToCartButton.click();
  }
}
