import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class AccountDeletedPage extends BasePage {
  // =========================
  // Confirmation
  // =========================
  accountDeletedTitle: Locator;
  continueButton: Locator;

  constructor(page: Page) {
    super(page);

    this.accountDeletedTitle = this.page.locator(
      'h2[data-qa="account-deleted"]',
    );
    this.continueButton = this.page.locator('a[data-qa="continue-button"]');
  }

  // ============================================================
  // Vérifications
  // ============================================================

  async checkAccountDeletedIsVisible() {
    // Vérifie le message ACCOUNT DELETED!
    await this.checkVisible(this.accountDeletedTitle);
  }

  // ============================================================
  // Actions
  // ============================================================

  async continue() {
    // Clique sur Continue
    await this.click(this.continueButton);
  }
}
