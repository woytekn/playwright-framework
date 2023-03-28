export class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.shoppingCartContainter = page.locator('#shopping_cart_container');
    this.loginError = page.locator("[data-test='error']");
  }

  async goTo(path) {
    await this.page.goto(path);
    await this.page.waitForLoadState();
  }

  async validLogin(username, password) {
    await this.usernameInput.type(process.env.LOGIN_USERNAME);
    await this.passwordInput.type(process.env.LOGIN_PASSWORD);
    Promise.all([
      await this.page.waitForLoadState(),
      await this.loginButton.click(),
    ]);
  }
}
