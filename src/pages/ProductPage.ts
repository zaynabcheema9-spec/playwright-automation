import { Page, expect } from '@playwright/test';

export class ProductPage {
  constructor(private page: Page) {}

  // Navigation Methods
  async navigateToGreyJacket() {
    await this.page.goto('/products/grey-jacket');
  }

  async navigateToNoirJacket() {
    await this.page.goto('/products/noir-jacket');
  }

  async navigateToStripedTop() {
    await this.page.goto('/products/striped-top');
  }

  // Assertions
  async assertUrlContains(text: string) {
    await expect(this.page).toHaveURL(new RegExp(text));
  }

  async assertProductTitle(title: string) {
  await expect(
    this.page.locator('.product-single__title')
  ).toContainText(title);
}

  async assertPriceContains(price: string) {
  await expect(
    this.page.locator('.product-price')
  ).toContainText(price);
}

  async assertProductImageVisible() {
    await expect(this.page.locator('img').first()).toBeVisible();
  }

 async assertAddToCartVisible() {
  await expect(
    this.page.locator('#AddToCart')
  ).toBeVisible();
}
  async assertBreadcrumbVisible() {
    await expect(
      this.page.locator('nav, .breadcrumb').first()
    ).toBeVisible();
  }



  async clickRelatedProduct(productName: string) {
    await this.page.getByText(productName).click();
  }

  // Existing Methods
  async navigateToFirstProduct() {
    const firstProduct = this.page
      .locator('a[href*="/products/"]')
      .first();

    await firstProduct.click();
  }

  async assertProductTitleVisible() {
    await expect(
      this.page.locator('h1, .product__title')
    ).toBeVisible();
  }

  async addToCart() {
    const addBtn = this.page.locator(
      'button[name="add"], [data-testid="add-to-cart"]'
    ).first();

    await addBtn.waitFor({ state: 'visible' });
    await addBtn.click();
  }

  async assertCartUpdated() {
    await expect(
      this.page.locator(
        '[data-testid="cart-count"], .cart-count'
      )
    ).toBeVisible();
  }
}