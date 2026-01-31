import { Page, Locator, expect } from "@playwright/test";

export class CartPage {
  page: Page;

  // =========================
  // Navigation
  // =========================
  cartLink: Locator;

  // =========================
  // Cart table (TC12)
  // =========================
  cartRows: Locator;

  // =========================
  // Subscription (TC11)
  // =========================
  footer: Locator;
  subscriptionTitle: Locator;
  subscriptionEmailInput: Locator;
  subscriptionButton: Locator;
  subscriptionSuccessMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    // ---- Lien Cart (header) ----
    this.cartLink = this.page.locator("header").locator('a[href="/view_cart"]');

    // ---- Lignes du panier ----
    this.cartRows = this.page.locator("#cart_info_table tbody tr");

    // ---- Footer / Subscription ----
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
  // Navigation
  // ============================================================

  async openFromHeader() {
    await this.cartLink.click();
    await expect(this.page).toHaveURL(/\/view_cart/i);
  }

  // ============================================================
  // Assertions Panier (TC12)
  // ============================================================

  async checkTwoProductsInCart() {
    await expect(this.cartRows).toHaveCount(2);
  }

  async checkEachProductQtyIsOne() {
    const count = await this.cartRows.count();

    for (let i = 0; i < count; i++) {
      const row = this.cartRows.nth(i);
      const qtyText = (
        await row.locator(".cart_quantity button").innerText()
      ).trim();

      expect(qtyText, `Quantité inattendue sur la ligne ${i + 1}`).toBe("1");
    }
  }

  async checkTotalEqualsPriceTimesQty() {
    const count = await this.cartRows.count();

    for (let i = 0; i < count; i++) {
      const row = this.cartRows.nth(i);

      const priceText = (await row.locator(".cart_price p").innerText()).trim();
      const totalText = (await row.locator(".cart_total p").innerText()).trim();
      const qtyText = (
        await row.locator(".cart_quantity button").innerText()
      ).trim();

      const price = this.extractNumber(priceText);
      const total = this.extractNumber(totalText);
      const qty = Number(qtyText);

      expect(
        total,
        `Total incorrect sur la ligne ${i + 1} (price=${price}, qty=${qty}, total=${total})`,
      ).toBe(price * qty);
    }
  }

  // ============================================================
  // Subscription (TC11)
  // ============================================================

  async scrollToFooter() {
    await this.footer.scrollIntoViewIfNeeded();
  }

  async checkSubscriptionIsVisible() {
    await expect(this.subscriptionTitle).toBeVisible();
  }

  async subscribeWithEmail(email: string) {
    await expect(this.subscriptionEmailInput).toBeVisible();
    await this.subscriptionEmailInput.fill(email);

    await expect(this.subscriptionButton).toBeEnabled();
    await this.subscriptionButton.click();
  }

  async checkSubscriptionSuccess() {
    await expect(this.subscriptionSuccessMessage).toBeVisible();
    await expect(this.subscriptionSuccessMessage).toContainText(
      /successfully subscribed/i,
    );
  }

  // ============================================================
  // Utils
  // ============================================================

  private extractNumber(text: string): number {
    return Number(text.replace(/[^\d]/g, ""));
  }
}
