import { test, expect } from '@playwright/test';
import { CartPage } from '../src/pages/CartPage';
import { HomePage } from '../src/pages/HomePage';
import { ProductPage } from '../src/pages/ProductPage';
import { NavigationPage } from '../src/pages/NavigationPage';

test.describe('Cart', () => {
  let cart: CartPage;
  let home: HomePage;
  let product: ProductPage;
  let nav: NavigationPage;

  test.beforeEach(async ({ page }) => {
    cart    = new CartPage(page);
    home    = new HomePage(page);
    product = new ProductPage(page);
    nav     = new NavigationPage(page);
  });

  // ── Empty cart ─────────────────────────────────────────────────────────────
  test('cart page loads at /cart URL', async () => {
    await cart.navigate();
    await cart.assertPageUrl();
  });

  test('empty cart shows empty message', async () => {
    await cart.navigate();
    await cart.assertCartIsEmpty();
  });

  test('empty cart shows 0 count in nav', async ({ page }) => {
    await home.navigate();
    await cart.assertCartNavCount(0);
  });

  // ── Add to cart flow ───────────────────────────────────────────────────────
  test('nav cart link navigates to /cart', async ({ page }) => {
    await home.navigate();
    await home.goToCart();
    await cart.assertPageUrl();
  });

  test('checkout link is visible on cart page', async () => {
    await cart.navigate();
    await cart.assertCheckoutVisible();
  });

  // ── Top bar on cart page ───────────────────────────────────────────────────
  test('top nav is present on cart page', async () => {
    await cart.navigate();
    await nav.assertTopBarVisible();
  });
});