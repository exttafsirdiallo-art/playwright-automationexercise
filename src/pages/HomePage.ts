import { Page, Locator, expect } from "@playwright/test";

export class HomePage {
  page: Page;

  // =========================
  // Locators communs
  // =========================
  signupLoginLink: Locator;

  // =========================
  // Cookies
  // =========================
  cookiesAcceptButton: Locator;

  // =========================
  // TC10 - Subscription
  // =========================
  footer: Locator;
  subscriptionTitle: Locator;
  subscriptionEmailInput: Locator;
  subscriptionButton: Locator;
  subscriptionSuccessMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    // ---- Locators communs ----
    this.signupLoginLink = this.page.getByRole("link", {
      name: /signup\s*\/\s*login/i,
    });

    // ---- Cookies ----
    this.cookiesAcceptButton = this.page.locator(
      'button.fc-button.fc-cta-consent[aria-label="Consent"], button.fc-button.fc-cta-consent:has-text("Consent")',
    );

    // ---- TC10 : Subscription ----
    this.footer = this.page.locator("footer");

    this.subscriptionTitle = this.footer.locator("h2").filter({
      hasText: /subscription/i,
    });

    // ⚠️ ID mal orthographié sur AutomationExercise
    this.subscriptionEmailInput = this.page.locator("#susbscribe_email");

    this.subscriptionButton = this.page.locator("#subscribe");

    this.subscriptionSuccessMessage = this.page.locator("#success-subscribe");
  }

  // ============================================================
  // Actions génériques Home
  // ============================================================

  async acceptCookiesIfPresent() {
    // Accepte les cookies si la pop-up est présente
    await this.cookiesAcceptButton.click({ timeout: 3000 }).catch(() => {});
  }

  async checkHomeIsVisible() {
    // Vérifie que la Home est visible via un élément clé
    await expect(this.signupLoginLink).toBeVisible();
  }

  async goToLogin() {
    // Clique sur "Signup / Login"
    await this.signupLoginLink.click();
  }

  // ============================================================
  // TC10 - Verify Subscription in Home Page
  // ============================================================

  async scrollToFooter() {
    // Scroll jusqu'au footer
    await this.footer.scrollIntoViewIfNeeded();
  }

  async checkSubscriptionIsVisible() {
    // Vérifie que le bloc Subscription est visible
    await expect(this.subscriptionTitle).toBeVisible();
  }

  async subscribeWithEmail(email: string) {
    // Saisit l'email et clique sur Subscribe
    await expect(this.subscriptionEmailInput).toBeVisible();
    await this.subscriptionEmailInput.fill(email);

    await expect(this.subscriptionButton).toBeEnabled();
    await this.subscriptionButton.click();
  }

  async checkSubscriptionSuccess() {
    // Vérifie le message de succès
    await expect(this.subscriptionSuccessMessage).toBeVisible();
    await expect(this.subscriptionSuccessMessage).toContainText(
      /successfully subscribed/i,
    );
  }
}
