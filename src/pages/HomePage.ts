import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {
  // =========================
  // Header
  // =========================
  signupLoginLink: Locator;
  loggedInAsText: Locator;
  deleteAccountLink: Locator;

  // =========================
  // Cookies
  // =========================
  cookiesAcceptButton: Locator;

  // =========================
  // Footer / Subscription
  // =========================
  footer: Locator;
  subscriptionTitle: Locator;
  subscriptionEmailInput: Locator;
  subscriptionButton: Locator;
  subscriptionSuccessMessage: Locator;

  constructor(page: Page) {
    super(page);

    // Header
    this.signupLoginLink = this.page.getByRole("link", {
      name: /signup\s*\/\s*login/i,
    });

    this.loggedInAsText = this.page.locator("a").filter({
      hasText: /logged in as/i,
    });

    this.deleteAccountLink = this.page.getByRole("link", {
      name: /delete account/i,
    });

    // Cookies
    this.cookiesAcceptButton = this.page.locator(
      'button.fc-button.fc-cta-consent[aria-label="Consent"], button.fc-button.fc-cta-consent:has-text("Consent")',
    );

    // Footer / Subscription
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
  // Navigation / visibilité
  // ============================================================

  async checkHomeIsVisible() {
    await this.checkVisible(this.signupLoginLink);
  }

  async goToLogin() {
    await this.click(this.signupLoginLink);
  }

  async checkLoggedInAs(username: string) {
    await this.checkContainsText(this.loggedInAsText, username);
  }

  async goToDeleteAccount() {
    await this.click(this.deleteAccountLink);
  }

  // ============================================================
  // Cookies
  // ============================================================

  async acceptCookiesIfPresent() {
    await this.cookiesAcceptButton.click({ timeout: 3000 }).catch(() => {});
  }

  // ============================================================
  // Footer / Subscription
  // ============================================================

  async scrollToFooter() {
    await this.scrollIntoView(this.footer);
  }

  async checkSubscriptionIsVisible() {
    await this.checkVisible(this.subscriptionTitle);
  }

  async subscribeWithEmail(email: string) {
    await this.fill(this.subscriptionEmailInput, email);
    await expect(this.subscriptionButton).toBeEnabled();
    await this.click(this.subscriptionButton);
  }

  async checkSubscriptionSuccess() {
    await this.checkVisible(this.subscriptionSuccessMessage);
    await this.checkContainsText(
      this.subscriptionSuccessMessage,
      /successfully subscribed/i,
    );
  }
}
