import { faker } from "@faker-js/faker";
import { Page, expect } from "@playwright/test";

export class SignupLoginPage {
  page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async checkNewUserSignupIsVisible() {
    // Vérifie qu'on voit bien le bloc "New User Signup!"
    await expect(
      this.page.getByRole("heading", { name: /new user signup!/i }),
    ).toBeVisible();
  }

  async signup(name: string, email: string) {
    // Remplit Name + Email dans la section "New User Signup!"
    await this.page.locator('input[data-qa="signup-name"]').fill(name);
    await this.page.locator('input[data-qa="signup-email"]').fill(email);

    // Clique sur le bouton Signup
    await this.page.locator('button[data-qa="signup-button"]').click();
  }

  async checkEnterAccountInformationIsVisible() {
    // Verifier qu'on arrive bien sur la page formulaire de création de compte
    // Vérifie qu'on arrive sur la page du formulaire de création de compte
    await expect(
      this.page.getByRole("heading", { name: /enter account information/i }),
    ).toBeVisible();
  }
}
