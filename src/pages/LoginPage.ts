import { Page, expect } from "@playwright/test";

export class LoginPage {
  page: Page;

  constructor(page: Page) {
    // On stocke la page Playwright dans la classe
    this.page = page;
  }

  async checkLoginFormIsVisible() {
    // Verifier qu'on est bien sur la page login
    await expect(
      this.page.getByRole("heading", { name: /login to your account/i }),
    ).toBeVisible();
  }

  async login(email: string, password: string) {
    //Remplit les champs email / password et clique sur login
    await this.page.locator('input[data-qa="login-email"]').fill(email);
    await this.page.locator('input[data-qa="login-password"]').fill(password);
    await this.page.locator('button[data-qa="login-button"]').click();
  }

  async checkUserIsLoggedIn() {
    // Vérifier que le user est connecté
    await expect(this.page.getByText(/logged in as/i)).toBeVisible();
  }
}
