import { Page, Locator, expect } from "@playwright/test";

export class ProductDetailPage {
  page: Page;

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
    this.page = page;

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
    // Vérifie l'URL + le bloc d'informations produit
    await expect(this.page).toHaveURL(/\/product_details\/\d+/);
    await expect(this.productInfo).toBeVisible();
  }

  async checkProductInfoFieldsAreVisible() {
    // Vérifie les champs principaux du produit
    await expect(this.productInfo.getByText(/category/i)).toBeVisible();
    await expect(this.productInfo.getByText(/availability/i)).toBeVisible();
    await expect(this.productInfo.getByText(/condition/i)).toBeVisible();
    await expect(this.productInfo.getByText(/brand/i)).toBeVisible();
  }

  // ============================================================
  // Quantité / Panier
  // ============================================================

  async setQuantity(quantity: number) {
    // Modifie la quantité du produit
    await expect(this.quantityInput).toBeVisible();
    await this.quantityInput.fill("");
    await this.quantityInput.fill(String(quantity));
  }

  async addToCart() {
    // Clique sur Add to cart
    await expect(this.addToCartButton).toBeVisible();
    await this.addToCartButton.click();
  }

  async goToCartFromModal() {
    // Clique sur View Cart dans la popin
    await expect(this.viewCartLink).toBeVisible();
    await this.viewCartLink.click();
  }
}
