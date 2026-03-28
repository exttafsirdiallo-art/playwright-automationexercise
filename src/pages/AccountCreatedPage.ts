import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class AccountCreatedPage extends BasePage {
  // =========================
  // Confirmation
  // =========================
  accountCreatedTitle: Locator;
  continueButton: Locator;
  loggedInAsText: Locator;

  constructor(page: Page) {
    super(page);

    // Confirmation
    this.accountCreatedTitle = this.page.locator(
      'h2[data-qa="account-created"]',
    );
    this.continueButton = this.page.locator('a[data-qa="continue-button"]');
    this.loggedInAsText = this.page.locator("a").filter({
      hasText: /logged in as/i,
    });
  }

  // ============================================================
  // Vérifications
  // ============================================================

  async checkAccountCreatedIsVisible() {
    // Vérifie le message ACCOUNT CREATED!
    await this.checkVisible(this.accountCreatedTitle);
  }

  async checkLoggedInAs(username: string) {
    // Vérifie que l'utilisateur est connecté
    await this.checkContainsText(this.loggedInAsText, username);
  }

  // ============================================================
  // Actions
  // ============================================================

  async continue() {
    // Clique sur Continue
    await this.click(this.continueButton);
  }
}
