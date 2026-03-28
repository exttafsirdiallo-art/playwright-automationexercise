import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductDetailPage extends BasePage {
  // =========================
  // Product information
  // =========================
  productInfo: Locator;

  // =========================
  // Quantity / Cart
  // =========================
  quantityInput: Locator;
  addToCartButton: Locator;
  viewCartLink: Locator;

  constructor(page: Page) {
    super(page);

    // Product information
    this.productInfo = this.page.locator(".product-information");

    // Quantity / Cart
    this.quantityInput = this.page.locator("#quantity");
    this.addToCartButton = this.page.locator('button:has-text("Add to cart")');
    this.viewCartLink = this.page.locator('a:has-text("View Cart")');
  }

  // ============================================================
  // Vérifications page détail produit
  // ============================================================

  async checkProductDetailPageIsVisible() {
    await expect(this.page).toHaveURL(/\/product_details\/\d+/);
    await this.checkVisible(this.productInfo);
  }

  async checkProductInfoFieldsAreVisible() {
    await this.checkVisible(this.productInfo.getByText(/category/i));
    await this.checkVisible(this.productInfo.getByText(/availability/i));
    await this.checkVisible(this.productInfo.getByText(/condition/i));
    await this.checkVisible(this.productInfo.getByText(/brand/i));
  }

  // ============================================================
  // Quantité / Panier
  // ============================================================

  async setQuantity(quantity: number) {
    await this.fill(this.quantityInput, String(quantity));
  }

  async addToCart() {
    await this.click(this.addToCartButton);
  }

  async goToCartFromModal() {
    await this.click(this.viewCartLink);
  }
}
