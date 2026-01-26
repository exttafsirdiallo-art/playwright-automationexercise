import { Page, expect } from "@playwright/test";

export class AccountInformationPage {
  page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async checkPageIsVisible() {
    // Verifier qu'on est bien sur la page "ENTER ACCOUNT INFORMATION"
    await expect(
      this.page.getByRole("heading", { name: /enter account information/i }),
    ).toBeVisible();
  }

  async fillAccountInformation(password: string) {
    // Remplit les infos de base du compte
    // Civilité
    await this.page.locator("#id_gender1").check();

    // Mot de passe
    await this.page.locator('input[data-qa="password"]').fill(password);

    // Date de naissance
    await this.page.locator('select[data-qa="days"]').selectOption("10");
    await this.page.locator('select[data-qa="months"]').selectOption("5");
    await this.page.locator('select[data-qa="years"]').selectOption("1995");

    // Newsletter
    await this.page.locator("#newsletter").check();
    await this.page.locator("#optin").check();
  }

  async fillAddressInformation() {
    await this.page.locator('input[data-qa="first_name"]').fill("Test");
    await this.page.locator('input[data-qa="last_name"]').fill("User");
    await this.page.locator('input[data-qa="company"]').fill("QA Company");

    await this.page.locator('input[data-qa="address"]').fill("10 rue de Test");
    await this.page.locator('input[data-qa="address2"]').fill("Bat A");

    await this.page.locator('select[data-qa="country"]').selectOption("Canada");

    await this.page.locator('input[data-qa="state"]').fill("QC");
    await this.page.locator('input[data-qa="city"]').fill("Montreal");
    await this.page.locator('input[data-qa="zipcode"]').fill("H2H2H2");
    await this.page
      .locator('input[data-qa="mobile_number"]')
      .fill("0600000000");
  }

  async createAccount() {
    // Clique sur le bouton "Create Account"
    await this.page.locator('button[data-qa="create-account"]').click();
  }

  async checkAccountCreated() {
    // Vérifie le message "ACCOUNT CREATED!"
    await expect(
      this.page.getByRole("heading", { name: /account created!/i }),
    ).toBeVisible();
  }

  async continueAfterAccountCreated() {
    // Clique sur "Continue" après création du compte
    await this.page.locator('a[data-qa="continue-button"]').click();
  }
}
