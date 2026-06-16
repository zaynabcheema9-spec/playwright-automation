import { test, expect } from '@playwright/test';
import { HomePage } from '../src/pages/HomePage';
import { NavigationPage } from '../src/pages/NavigationPage';
test.describe('Home Page', () => {
  let home: HomePage;
  let nav: NavigationPage;

  test.beforeEach(async ({ page }) => {
    home = new HomePage(page);
    nav  = new NavigationPage(page);
    await home.navigate();
  });

  // ── Title & Meta ──────────────────────────────────────────────────────────
  test('has correct page title', async () => {
    await home.assertPageTitle();
  });

  // ── Hero ──────────────────────────────────────────────────────────────────
  test('hero section is visible with site name and tagline', async () => {
    await home.assertHeroVisible();
  });

  // ── Navigation ────────────────────────────────────────────────────────────
  test('main navigation links are visible', async () => {
    await home.assertNavigationVisible();
  });

  test('top bar links are visible', async () => {
    await nav.assertTopBarVisible();
  });

  // ── Products ──────────────────────────────────────────────────────────────
  test('frontpage products are listed', async () => {
    await home.assertProductsVisible();
  });

  test('has at least 3 product links', async () => {
    await home.assertProductCount(3);
  });

  // ── Navigation clicks ─────────────────────────────────────────────────────
  test('clicking Catalog navigates to /collections/all', async ({ page }) => {
    await home.goToCatalog();
    await expect(page).toHaveURL(/\/collections\/all/);
  });

  test('clicking Grey jacket navigates to product page', async ({ page }) => {
    await home.clickGreyJacket();
    await expect(page).toHaveURL(/grey-jacket/);
  });

  test('clicking Noir jacket navigates to product page', async ({ page }) => {
    await home.clickNoirJacket();
    await expect(page).toHaveURL(/noir-jacket/);
  });

  test('clicking Striped top navigates to product page', async ({ page }) => {
    await home.clickStripedTop();
    await expect(page).toHaveURL(/striped-top/);
  });

  // ── Footer ────────────────────────────────────────────────────────────────
  test('footer links are visible', async () => {
    await home.assertFooterVisible();
  });
});