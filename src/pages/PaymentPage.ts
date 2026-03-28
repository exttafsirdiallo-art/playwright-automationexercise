import { Page, Locator, expect } from "@playwright/test";
import { paymentData } from "../data/paymentData";

export class PaymentPage {
  page: Page;

  nameOnCardInput: Locator;
  cardNumberInput: Locator;
  cvcInput: Locator;
  expiryMonthInput: Locator;
  expiryYearInput: Locator;
  payButton: Locator;
  orderPlacedTitle: Locator;

  constructor(page: Page) {
    this.page = page;

    this.nameOnCardInput = this.page.locator('input[data-qa="name-on-card"]');
    this.cardNumberInput = this.page.locator('input[data-qa="card-number"]');
    this.cvcInput = this.page.locator('input[data-qa="cvc"]');
    this.expiryMonthInput = this.page.locator('input[data-qa="expiry-month"]');
    this.expiryYearInput = this.page.locator('input[data-qa="expiry-year"]');
    this.payButton = this.page.locator('button[data-qa="pay-button"]');
    this.orderPlacedTitle = this.page.locator('h2[data-qa="order-placed"]');
  }

  async checkPaymentPageIsVisible() {
    // Vérifie qu'on est bien sur la page Payment
    await expect(this.page).toHaveURL(/\/payment/i);
    await expect(this.nameOnCardInput).toBeVisible();
  }

  async fillPaymentInformation() {
    const card = paymentData.validCard;

    await this.checkPaymentPageIsVisible();
    await this.nameOnCardInput.fill(card.nameOnCard);
    await this.cardNumberInput.fill(card.cardNumber);
    await this.cvcInput.fill(card.cvc);
    await this.expiryMonthInput.fill(card.expiryMonth);
    await this.expiryYearInput.fill(card.expiryYear);
  }

  async payAndConfirmOrder() {
    // Clique sur Pay and Confirm Order
    await expect(this.payButton).toBeVisible();
    await this.payButton.click();
  }

  async checkOrderPlacedIsVisible() {
    // Vérifie le message ORDER PLACED!
    await expect(this.orderPlacedTitle).toBeVisible();
  }
}
