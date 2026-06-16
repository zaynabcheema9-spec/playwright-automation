import { test, expect } from '@playwright/test';
import { ProductPage } from '../src/pages/ProductPage';
import { NavigationPage } from '../src/pages/NavigationPage';

test.describe('Product Page', () => {
  let product: ProductPage;
  let nav: NavigationPage;

  test.beforeEach(async ({ page }) => {
    product = new ProductPage(page);
    nav = new NavigationPage(page);
  });

  test.describe('Grey Jacket', () => {
    test.beforeEach(async () => {
      await product.navigateToGreyJacket();
    });

    test('has correct page URL', async () => {
      await product.assertUrlContains('grey-jacket');
    });

    test('displays product title', async () => {
      await product.assertProductTitle('Grey jacket');
    });

    test('displays correct price', async () => {
      await product.assertPriceContains('£55.00');
    });

    test('product image is visible', async () => {
      await product.assertProductImageVisible();
    });

    test('Add to Cart button is visible', async () => {
      await product.assertAddToCartVisible();
    });

    test('breadcrumb is visible', async () => {
      await product.assertBreadcrumbVisible();
    });

    test('top navigation is present', async () => {
      await nav.assertTopBarVisible();
    });
  });

  test.describe('Noir Jacket', () => {
    test.beforeEach(async () => {
      await product.navigateToNoirJacket();
    });

    test('has correct page URL', async () => {
      await product.assertUrlContains('noir-jacket');
    });

    test('displays product title', async () => {
      await product.assertProductTitle('Noir jacket');
    });

    test('displays correct price', async () => {
      await product.assertPriceContains('£60.00');
    });

    test('Add to Cart button is visible', async () => {
      await product.assertAddToCartVisible();
    });
  });

  test.describe('Striped Top', () => {
    test.beforeEach(async () => {
      await product.navigateToStripedTop();
    });

    test('has correct page URL', async () => {
      await product.assertUrlContains('striped-top');
    });

    test('displays product title', async () => {
      await product.assertProductTitle('Striped top');
    });

    test('displays correct price', async () => {
      await product.assertPriceContains('£50.00');
    });

    test('Add to Cart button is visible', async () => {
      await product.assertAddToCartVisible();
    });
  });
});