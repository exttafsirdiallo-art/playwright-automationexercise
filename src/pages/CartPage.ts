import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CartPage extends BasePage {
  // =========================
  // Header
  // =========================
  cartLink: Locator;

  // =========================
  // Cart table
  // =========================
  cartRows: Locator;

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
    this.cartLink = this.page.locator("header").locator('a[href="/view_cart"]');

    // Cart table
    this.cartRows = this.page.locator("#cart_info_table tbody tr");

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
  // Navigation
  // ============================================================

  async openFromHeader() {
    await this.click(this.cartLink);
    await expect(this.page).toHaveURL(/\/view_cart/i);
  }

  // ============================================================
  // Vérifications panier
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

  async checkProductQuantity(expectedQty: number) {
    const qtyText = (
      await this.page.locator(".cart_quantity button").first().innerText()
    ).trim();

    expect(qtyText).toBe(String(expectedQty));
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

  // ============================================================
  // Utils
  // ============================================================

  private extractNumber(text: string): number {
    return Number(text.replace(/[^\d]/g, ""));
  }
}
