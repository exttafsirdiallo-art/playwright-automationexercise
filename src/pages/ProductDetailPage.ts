import { Page, Locator, expect } from "@playwright/test";

export class ProductDetailPage {
  page: Page;

  // Locators
  productInfo: Locator;
  quantityInput: Locator;
  addToCartButton: Locator;
  viewCartLink: Locator;

  constructor(page: Page) {
    this.page = page;

    this.productInfo = this.page.locator(".product-information");
    this.quantityInput = this.page.locator("#quantity");
    this.addToCartButton = this.page.locator('button:has-text("Add to cart")');
    this.viewCartLink = this.page.locator('a:has-text("View Cart")');
  }

  async checkProductDetailPageIsVisible() {
    await expect(this.page).toHaveURL(/\/product_details\/\d+/);
    await expect(this.productInfo).toBeVisible();
  }

  async checkProductInfoFieldsAreVisible() {
    await expect(this.productInfo.getByText(/category/i)).toBeVisible();
    await expect(this.productInfo.getByText(/availability/i)).toBeVisible();
    await expect(this.productInfo.getByText(/condition/i)).toBeVisible();
    await expect(this.productInfo.getByText(/brand/i)).toBeVisible();
  }

  async setQuantity(quantity: number) {
    await expect(this.quantityInput).toBeVisible();
    await this.quantityInput.fill("");
    await this.quantityInput.fill(String(quantity));
  }

  async addToCart() {
    await expect(this.addToCartButton).toBeVisible();
    await this.addToCartButton.click();
  }

  async goToCartFromModal() {
    await expect(this.viewCartLink).toBeVisible();
    await this.viewCartLink.click();
  }
}
