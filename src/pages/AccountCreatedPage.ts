import { Page, expect } from "@playwright/test";

export class AccountCreatedPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async checkAccountCreatedIsVisible() {
    // Vérifie le message ACCOUNT CREATED!
    await expect(
      this.page.locator('h2[data-qa="account-created"]'),
    ).toBeVisible();
  }

  async continue() {
    // Clique sur Continue
    await this.page.locator('a[data-qa="continue-button"]').click();
  }

  async checkLoggedInAs(username: string) {
    // Vérifie que l'utilisateur est connecté
    await expect(
      this.page.getByText(new RegExp(`logged in as\\s+${username}`, "i")),
    ).toBeVisible();
  }
}
