import { Page, Locator, expect } from '@playwright/test';

/**
 * HomePage — https://sauce-demo.myshopify.com/
 *
 * Locator strategy (priority order):
 *  1. getByRole()  — semantic, most resilient
 *  2. getByLabel() — form fields
 *  3. getByText()  — stable visible text
 *  4. locator()    — CSS/href only when above can't work
 */
export class HomePage {
  readonly page: Page;

  // ── Navigation ─────────────────────────────────────────────────────────────
  readonly navHome: Locator;
  readonly navCatalog: Locator;
  readonly navBlog: Locator;
  readonly navAbout: Locator;
  readonly navLogin: Locator;
  readonly navCart: Locator;

  // ── Hero ───────────────────────────────────────────────────────────────────
  readonly siteTitle: Locator;
  readonly siteTagline: Locator;

  // ── Products (frontpage) ───────────────────────────────────────────────────
  readonly greyJacketLink: Locator;
  readonly noirJacketLink: Locator;
  readonly stripedTopLink: Locator;
  readonly allProductLinks: Locator;

  // ── Footer ─────────────────────────────────────────────────────────────────
  readonly footerSearch: Locator;
  readonly footerAbout: Locator;

  constructor(page: Page) {
    this.page = page;

    // Navigation — role=link + accessible name
    this.navHome    = page.getByRole('link', { name: 'Home',       exact: true });
    this.navCatalog = page.getByRole('link', { name: 'Catalog',    exact: true });
    this.navBlog    = page.getByRole('link', { name: 'Blog',       exact: true });
    this.navAbout   = page.getByRole('link', { name: 'About Us',   exact: true }).first();
    this.navLogin   = page.getByRole('link', { name: 'Login',      exact: true });
    this.navCart    = page.getByRole('link', { name: /My Cart/i }).first();

    // Hero
    this.siteTitle   = page.getByRole('heading', { name: 'Sauce Demo', level: 1 });
    this.siteTagline = page.getByRole('heading', {
      name: 'Just a demo site showing off what Sauce can do.',
      level: 3,
    });

    // Product cards — by link text (product name)
    this.greyJacketLink  = page.getByRole('link', { name: /Grey jacket/i   }).first();
    this.noirJacketLink  = page.getByRole('link', { name: /Noir jacket/i   }).first();
    this.stripedTopLink  = page.getByRole('link', { name: /Striped top/i   }).first();
    this.allProductLinks = page.locator('a[href*="/products/"]');

    // Footer
    this.footerSearch = page.getByRole('link', { name: 'Search', exact: true }).last();
    this.footerAbout  = page.getByRole('link', { name: 'About Us', exact: true }).last();
  }

  // ── Actions ────────────────────────────────────────────────────────────────

  async navigate(): Promise<void> {
    await this.page.goto('/');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async goToCatalog(): Promise<void> {
    await this.navCatalog.click();
    await this.page.waitForURL(/\/collections\/all/);
  }

  async goToCart(): Promise<void> {
    await this.navCart.click();
    await this.page.waitForURL(/\/cart/);
  }

  async clickGreyJacket(): Promise<void> {
    await this.greyJacketLink.click();
    await this.page.waitForURL(/grey-jacket/);
  }

  async clickNoirJacket(): Promise<void> {
    await this.noirJacketLink.click();
    await this.page.waitForURL(/noir-jacket/);
  }

  async clickStripedTop(): Promise<void> {
    await this.stripedTopLink.click();
    await this.page.waitForURL(/striped-top/);
  }

  // ── Assertions ─────────────────────────────────────────────────────────────

  async assertPageTitle(): Promise<void> {
    await expect(this.page).toHaveTitle('Sauce Demo');
  }

  async assertHeroVisible(): Promise<void> {
    await expect(this.siteTitle).toBeVisible();
    await expect(this.siteTagline).toBeVisible();
  }

  async assertNavigationVisible(): Promise<void> {
    await expect(this.navHome).toBeVisible();
    await expect(this.navCatalog).toBeVisible();
    await expect(this.navBlog).toBeVisible();
  }

  async assertProductsVisible(): Promise<void> {
    await expect(this.greyJacketLink).toBeVisible();
    await expect(this.noirJacketLink).toBeVisible();
    await expect(this.stripedTopLink).toBeVisible();
  }

  async assertProductCount(expectedMin: number): Promise<void> {
    const count = await this.allProductLinks.count();
    expect(count).toBeGreaterThanOrEqual(expectedMin);
  }

  async assertFooterVisible(): Promise<void> {
    await expect(this.footerSearch).toBeVisible();
    await expect(this.footerAbout).toBeVisible();
  }
}