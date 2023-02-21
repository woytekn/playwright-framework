import { LoginPage } from './LoginPage';
import { ProductsPage } from './ProductsPage';
import { CartPage } from './CartPage';
import { CheckoutPage } from './CheckoutPage';
import { SharedPage } from './SharedPage';

export class Index {
  constructor(page) {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.productsPage = new ProductsPage(this.page);
    this.cartPage = new CartPage(this.page);
    this.checkoutPage = new CheckoutPage(this.page);
    this.sharedPage = new SharedPage(this.page);
  }

  getLoginPage() {
    return this.loginPage;
  }

  getProductsPage() {
    return this.productsPage;
  }

  getCartPage() {
    return this.cartPage;
  }

  getCheckoutPage() {
    return this.checkoutPage;
  }

  getSharedPage() {
    return this.sharedPage;
  }
}
