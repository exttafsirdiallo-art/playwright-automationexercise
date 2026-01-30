import { Page, expect } from "@playwright/test";

export class ProductsPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async openFromHeader() {
    // Clique sur "Products" dans le menu (header)
    await this.page.locator("header").locator('a[href="/products"]').click();
  }

  async checkAllProductsPageIsVisible() {
    // Vérifie l'URL + le titre "All Products"
    await expect(this.page).toHaveURL(/\/products/i);
    await expect(
      this.page.getByRole("heading", { name: "All Products", level: 2 }),
    ).toBeVisible();
  }

  async checkProductsListIsVisible() {
    // Vérifie que la grille produits est visible
    await expect(this.page.locator(".features_items")).toBeVisible();
  }

  async openFirstProductDetails() {
    // Clique sur le premier lien "View Product" (détails produit)
    await this.page.locator('a[href^="/product_details/"]').first().click();
  }
}
