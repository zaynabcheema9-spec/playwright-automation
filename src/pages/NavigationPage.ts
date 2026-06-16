import { Page, Locator, expect } from '@playwright/test';

/**
 * NavigatorPage — shared header/nav present on all pages
 * Extracted separately so every spec can reuse without duplication
 */
export class NavigationPage {
  readonly page: Page;

  readonly topSearchLink: Locator;
  readonly topAboutLink: Locator;
  readonly topLoginLink: Locator;
  readonly topSignupLink: Locator;
  readonly topCartLink: Locator;

  constructor(page: Page) {
    this.page = page;

    this.topSearchLink = page.getByRole('link', { name: 'Search', exact: true }).first();
    this.topAboutLink  = page.getByRole('link', { name: 'About Us', exact: true }).first();
    this.topLoginLink  = page.getByRole('link', { name: 'Log In', exact: true });
    this.topSignupLink = page.getByRole('link', { name: 'Sign up', exact: true });
    this.topCartLink   = page.getByRole('link', { name: /My Cart/ }).first();
  }

  async goToLogin(): Promise<void> {
    await this.topLoginLink.click();
    await this.page.waitForURL(/\/account\/login/);
  }

  async goToSearch(): Promise<void> {
    await this.topSearchLink.click();
    await this.page.waitForURL(/\/search/);
  }

  async assertTopBarVisible(): Promise<void> {
    await expect(this.topSearchLink).toBeVisible();
    await expect(this.topLoginLink).toBeVisible();
    await expect(this.topCartLink).toBeVisible();
  }
}