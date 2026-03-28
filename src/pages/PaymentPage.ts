import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { paymentData } from "../data/paymentData";

export class PaymentPage extends BasePage {
  // =========================
  // Payment form
  // =========================
  nameOnCardInput: Locator;
  cardNumberInput: Locator;
  cvcInput: Locator;
  expiryMonthInput: Locator;
  expiryYearInput: Locator;
  payButton: Locator;

  // =========================
  // Confirmation
  // =========================
  orderPlacedTitle: Locator;

  constructor(page: Page) {
    super(page);

    // Payment form
    this.nameOnCardInput = this.page.locator('input[data-qa="name-on-card"]');
    this.cardNumberInput = this.page.locator('input[data-qa="card-number"]');
    this.cvcInput = this.page.locator('input[data-qa="cvc"]');
    this.expiryMonthInput = this.page.locator('input[data-qa="expiry-month"]');
    this.expiryYearInput = this.page.locator('input[data-qa="expiry-year"]');
    this.payButton = this.page.locator('button[data-qa="pay-button"]');

    // Confirmation
    this.orderPlacedTitle = this.page.locator('h2[data-qa="order-placed"]');
  }

  // ============================================================
  // Vérifications
  // ============================================================

  async checkPaymentPageIsVisible() {
    // Vérifie qu'on est bien sur la page Payment
    await expect(this.nameOnCardInput).toBeVisible();
    await this.checkVisible(this.nameOnCardInput);
  }

  async checkOrderPlacedIsVisible() {
    // Vérifie le message ORDER PLACED!
    await this.checkVisible(this.orderPlacedTitle);
  }

  // ============================================================
  // Actions
  // ============================================================

  async fillPaymentInformation() {
    const card = paymentData.validCard;

    await this.checkPaymentPageIsVisible();
    await this.fill(this.nameOnCardInput, card.nameOnCard);
    await this.fill(this.cardNumberInput, card.cardNumber);
    await this.fill(this.cvcInput, card.cvc);
    await this.fill(this.expiryMonthInput, card.expiryMonth);
    await this.fill(this.expiryYearInput, card.expiryYear);
  }

  async payAndConfirmOrder() {
    // Clique sur Pay and Confirm Order
    await this.click(this.payButton);
  }
}
