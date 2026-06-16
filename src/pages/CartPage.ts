import { Page, Locator, expect } from '@playwright/test';

/**
 * CartPage — https://sauce-demo.myshopify.com/cart
 *
 * Real DOM from sauce-demo.myshopify.com:
 *   "Your cart is empty." when empty
 *   Cart count shown in nav: "My Cart (N)"
 *   Checkout link: /cart (same page, scrolls to checkout section)
 */
export class CartPage {
  readonly page: Page;

  // ── Cart nav indicator ──────────────────────────────────────────────────────
  // "My Cart (0)" link in header — count updates after add-to-cart
  readonly cartNavLink: Locator;

  // ── Cart page content ───────────────────────────────────────────────────────
  readonly emptyCartMessage: Locator;
  readonly checkoutLink: Locator;

  constructor(page: Page) {
    this.page = page;

    // Nav cart — matches "My Cart (0)", "My Cart (1)" etc.
    this.cartNavLink = page.getByRole('link', { name: /My Cart/i }).first();

    // On /cart page when empty
    this.emptyCartMessage = page.getByText('Your cart is empty.');

    // Checkout button on cart page
    this.checkoutLink = page.getByRole('link', { name: /Check Out/i }).first();
  }

  // ── Actions ──────────────────────────────────────────────────────────────────

  async navigate(): Promise<void> {
    await this.page.goto('/cart');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async getCartCount(): Promise<number> {
    // Extract number from "My Cart (3)"
    const text = await this.cartNavLink.innerText();
    const match = text.match(/\((\d+)\)/);
    return match ? parseInt(match[1], 10) : 0;
  }

  // ── Assertions ───────────────────────────────────────────────────────────────

  async assertPageUrl(): Promise<void> {
    await expect(this.page).toHaveURL(/\/cart/);
  }

  async assertCartIsEmpty(): Promise<void> {
    await expect(this.emptyCartMessage).toBeVisible();
  }

  async assertCartNavCount(expectedCount: number): Promise<void> {
    await expect(this.cartNavLink).toContainText(`(${expectedCount})`);
  }

  async assertCheckoutVisible(): Promise<void> {
    await expect(this.checkoutLink).toBeVisible();
  }
}