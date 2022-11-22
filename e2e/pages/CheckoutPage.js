export class CheckoutPage {
  /**
   * @param {import('@playwright/test').Page} page
   */

  constructor(page) {
    this.page = page;
    this.firstName = page.locator('#first-name');
    this.lastName = page.locator('#last-name');
    this.zipPostalCode = page.locator('#postal-code');
    this.continueCheckoutButton = page.locator('#continue');
    this.checkoutSummarySectionInfo = page.locator('.summary_info > div');
    this.cartItemQuantity = page.locator('.cart_quantity');
    this.finishCheckoutButton = page.locator('#finish');
    this.purchaseConfirmTextHeader = page.locator(
      ".complete-header:has-text('THANK YOU FOR YOUR ORDER')",
    );
    this.goBackCheckoutButton = page.locator('#back-to-products');
    this.cancelCheckoutButton = page.locator('#cancel');
  }

  async goTo(path) {
    await this.page.goto(path);
  }

  async fillCheckoutInformation(firstName, lastName, zipPostalCode) {
    await this.firstName.type(firstName);
    await this.lastName.type(lastName);
    await this.zipPostalCode.type(zipPostalCode);
  }

  async clickContinueCheckoutButton() {
    await this.continueCheckoutButton.click();
  }

  async clickFinishCheckoutButton() {
    await this.finishCheckoutButton.click();
  }

  async clickGoBackCheckoutButton() {
    await this.goBackCheckoutButton.click();
  }

  async clickCancelCheckoutButton() {
    await this.cancelCheckoutButton.click();
  }
}
