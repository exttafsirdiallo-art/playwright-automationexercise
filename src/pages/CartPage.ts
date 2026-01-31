import { Page, Locator, expect } from "@playwright/test";

export class CartPage {
  page: Page;

  // Header
  cartLink: Locator;

  // Footer / Subscription
  footer: Locator;
  subscriptionTitle: Locator;
  subscriptionEmailInput: Locator;
  subscriptionButton: Locator;
  subscriptionSuccessMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    // Accès Cart depuis le header
    this.cartLink = this.page.locator("header").locator('a[href="/view_cart"]');

    // Footer
    this.footer = this.page.locator("footer");

    // Titre "SUBSCRIPTION"
    this.subscriptionTitle = this.footer.locator("h2").filter({
      hasText: /subscription/i,
    });

    // ⚠️ ID mal orthographié sur le site
    this.subscriptionEmailInput = this.page.locator("#susbscribe_email");
    this.subscriptionButton = this.page.locator("#subscribe");
    this.subscriptionSuccessMessage = this.page.locator("#success-subscribe");
  }

  async openFromHeader() {
    // Clique sur Cart dans le header
    await this.cartLink.click();
    await expect(this.page).toHaveURL(/\/view_cart/i);
  }

  async scrollToFooter() {
    // Descend jusqu'au footer
    await this.footer.scrollIntoViewIfNeeded();
  }

  async checkSubscriptionIsVisible() {
    // Vérifie que le bloc Subscription est visible
    await expect(this.subscriptionTitle).toBeVisible();
  }

  async subscribeWithEmail(email: string) {
    // Saisit l'email et clique Subscribe
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
