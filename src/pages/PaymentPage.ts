import { Page, expect } from "@playwright/test";

export class PaymentPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async fillPaymentInformation() {
    // Remplit les informations de paiement
    await this.page.locator('input[data-qa="name-on-card"]').fill("Test User");
    await this.page
      .locator('input[data-qa="card-number"]')
      .fill("4111111111111111");
    await this.page.locator('input[data-qa="cvc"]').fill("123");
    await this.page.locator('input[data-qa="expiry-month"]').fill("12");
    await this.page.locator('input[data-qa="expiry-year"]').fill("2030");
  }

  async payAndConfirmOrder() {
    // Clique sur Pay and Confirm Order
    await this.page.locator('button[data-qa="pay-button"]').click();
  }

  async checkOrderPlacedIsVisible() {
    // Vérifie le message de succès
    await expect(this.page.locator('h2[data-qa="order-placed"]')).toBeVisible();
  }
}
