import { Page, expect } from "@playwright/test";

export class HomePage {
  page: Page;

  constructor(page: Page) {
    // On stock la page Playwright dans la classe
    this.page = page;
  }

  async acceptCookiesIfPresent() {
    // Tente d’accepter les cookies si la pop-up est affichée
    // Si elle n’existe pas, on ignore l’erreur et on continue
    await this.page
      .locator(
        'button.fc-button.fc-cta-consent[aria-label="Consent"], button.fc-button.fc-cta-consent:has-text("Consent")',
      )
      .click({ timeout: 3000 })
      .catch(() => {});
  }

  async checkHomeIsVisible() {
    // Verifier que le lien "Signup / Login" est visible
    await expect(
      this.page.getByRole("link", { name: /signup\s*\/\s*login/i }),
    ).toBeVisible();
  }

  async goToLogin() {
    // Clique sur "Signup / Login"
    await this.page.getByRole("link", { name: /signup\s*\/\s*login/i }).click();
  }
}
