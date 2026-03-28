import { Page, expect } from "@playwright/test";

export class CheckoutPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async clickProceedToCheckout() {
    // Clique sur Proceed To Checkout depuis le panier
    await this.page.locator('a:has-text("Proceed To Checkout")').click();
  }

  async clickRegisterLoginFromModal() {
    // Clique sur "Register / Login" dans la popin du checkout
    await this.page.getByRole("link", { name: "Register / Login" }).click();
  }

  async checkAddressDetailsVisible() {
    // Vérifie le bloc adresse
    await expect(this.page.getByText(/address details/i)).toBeVisible();
  }

  async checkReviewYourOrderVisible() {
    // Vérifie le bloc review order
    await expect(this.page.getByText(/review your order/i)).toBeVisible();
  }

  async enterComment(comment: string) {
    // Saisit un commentaire
    await this.page.locator("textarea").fill(comment);
  }

  async clickPlaceOrder() {
    // Clique sur Place Order
    await this.page.locator('a:has-text("Place Order")').click();
  }
}
