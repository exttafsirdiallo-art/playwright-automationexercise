import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CheckoutPage extends BasePage {
  // =========================
  // Checkout actions
  // =========================
  proceedToCheckoutButton: Locator;
  registerLoginLink: Locator;
  placeOrderButton: Locator;

  // =========================
  // Checkout content
  // =========================
  addressDetailsTitle: Locator;
  reviewYourOrderTitle: Locator;
  commentTextArea: Locator;

  constructor(page: Page) {
    super(page);

    // Checkout actions
    this.proceedToCheckoutButton = this.page.locator(
      'a:has-text("Proceed To Checkout")',
    );
    this.registerLoginLink = this.page.getByRole("link", {
      name: "Register / Login",
    });
    this.placeOrderButton = this.page.locator('a:has-text("Place Order")');

    // Checkout content
    this.addressDetailsTitle = this.page.getByText(/address details/i);
    this.reviewYourOrderTitle = this.page.getByText(/review your order/i);
    this.commentTextArea = this.page.locator("textarea");
  }

  // ============================================================
  // Actions
  // ============================================================

  async clickProceedToCheckout() {
    // Clique sur Proceed To Checkout depuis le panier
    await this.click(this.proceedToCheckoutButton);
  }

  async clickRegisterLoginFromModal() {
    // Clique sur Register / Login dans la popin du checkout
    await this.click(this.registerLoginLink);
  }

  async enterComment(comment: string) {
    // Saisit un commentaire
    await this.fill(this.commentTextArea, comment);
  }

  async clickPlaceOrder() {
    // Clique sur Place Order
    await this.click(this.placeOrderButton);
  }

  // ============================================================
  // Vérifications
  // ============================================================

  async checkAddressDetailsVisible() {
    // Vérifie le bloc adresse
    await this.checkVisible(this.addressDetailsTitle);
  }

  async checkReviewYourOrderVisible() {
    // Vérifie le bloc review order
    await this.checkVisible(this.reviewYourOrderTitle);
  }
}
