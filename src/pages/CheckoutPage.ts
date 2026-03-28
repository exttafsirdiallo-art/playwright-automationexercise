import { Page, Locator, expect } from "@playwright/test";

export class CheckoutPage {
  page: Page;

  proceedToCheckoutButton: Locator;
  registerLoginLink: Locator;
  addressDetailsTitle: Locator;
  reviewYourOrderTitle: Locator;
  commentTextArea: Locator;
  placeOrderButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.proceedToCheckoutButton = this.page.locator(
      'a:has-text("Proceed To Checkout")',
    );

    this.registerLoginLink = this.page.getByRole("link", {
      name: "Register / Login",
    });

    this.addressDetailsTitle = this.page.getByText(/address details/i);
    this.reviewYourOrderTitle = this.page.getByText(/review your order/i);
    this.commentTextArea = this.page.locator("textarea");
    this.placeOrderButton = this.page.locator('a:has-text("Place Order")');
  }

  async clickProceedToCheckout() {
    // Clique sur Proceed To Checkout depuis le panier
    await expect(this.proceedToCheckoutButton).toBeVisible();
    await this.proceedToCheckoutButton.click();
  }

  async clickRegisterLoginFromModal() {
    // Clique sur Register / Login dans la popin du checkout
    await expect(this.registerLoginLink).toBeVisible();
    await this.registerLoginLink.click();
  }

  async checkAddressDetailsVisible() {
    // Vérifie le bloc adresse
    await expect(this.addressDetailsTitle).toBeVisible();
  }

  async checkReviewYourOrderVisible() {
    // Vérifie le bloc review order
    await expect(this.reviewYourOrderTitle).toBeVisible();
  }

  async enterComment(comment: string) {
    // Saisit un commentaire
    await expect(this.commentTextArea).toBeVisible();
    await this.commentTextArea.fill(comment);
  }

  async clickPlaceOrder() {
    // Clique sur Place Order
    await expect(this.placeOrderButton).toBeVisible();
    await this.placeOrderButton.click();
  }
}
