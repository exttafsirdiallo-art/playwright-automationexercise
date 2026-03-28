import { Page, Locator, expect } from "@playwright/test";

export class AccountDeletedPage {
  page: Page;
  accountDeletedTitle: Locator;
  continueButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.accountDeletedTitle = this.page.locator(
      'h2[data-qa="account-deleted"]',
    );
    this.continueButton = this.page.locator('a[data-qa="continue-button"]');
  }

  async checkAccountDeletedIsVisible() {
    // Vérifie le message ACCOUNT DELETED!
    await expect(this.accountDeletedTitle).toBeVisible();
  }

  async continue() {
    // Clique sur Continue
    await this.continueButton.click();
  }
}
