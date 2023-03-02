export class CheckoutPage {
  /**
   * @param {import('@playwright/test').Page} page
   */

  constructor(page) {
    this.page = page;
    this.firstName = page.getByTestId('first-name');
    this.lastName = page.getByTestId('last-name');
    this.zipPostalCode = page.getByTestId('postal-code');
    this.continueCheckoutButton = page.getByTestId('continue');
    this.checkoutSummarySectionInfo = page.locator('.summary_info > div');
    this.cartItemQuantity = page.locator('.cart_quantity');
    this.finishCheckoutButton = page.getByTestId('finish');
    this.purchaseConfirmTextHeader = page.locator(
      ".complete-header:has-text('THANK YOU FOR YOUR ORDER')",
    );
    this.goBackCheckoutButton = page.getByTestId('back-to-products');
    this.cancelCheckoutButton = page.getByTestId('cancel');
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
