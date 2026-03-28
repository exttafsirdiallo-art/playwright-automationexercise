import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductsPage extends BasePage {
  // =========================
  // Header
  // =========================
  productsLink: Locator;

  // =========================
  // Products list
  // =========================
  productsGrid: Locator;
  productCards: Locator;
  allProductsTitle: Locator;

  // =========================
  // Search
  // =========================
  searchInput: Locator;
  searchButton: Locator;
  searchedProductsTitle: Locator;

  // =========================
  // Cart modal
  // =========================
  continueShoppingButton: Locator;
  viewCartLink: Locator;

  constructor(page: Page) {
    super(page);

    // Header
    this.productsLink = this.page
      .locator("header")
      .locator('a[href="/products"]');

    // Products list
    this.productsGrid = this.page.locator(".features_items");
    this.productCards = this.productsGrid.locator(".product-image-wrapper");
    this.allProductsTitle = this.page.getByRole("heading", {
      name: "All Products",
      level: 2,
    });

    // Search
    this.searchInput = this.page.locator("#search_product");
    this.searchButton = this.page.locator("#submit_search");
    this.searchedProductsTitle = this.page.getByRole("heading", {
      name: /searched products/i,
    });

    // Cart modal
    this.continueShoppingButton = this.page.locator(
      'button:has-text("Continue Shopping")',
    );
    this.viewCartLink = this.page.locator('a:has-text("View Cart")');
  }

  // ============================================================
  // Navigation
  // ============================================================

  async openFromHeader() {
    await this.click(this.productsLink);
  }

  async openFirstProductDetails() {
    await this.click(this.page.locator('a[href^="/product_details/"]').first());
  }

  // ============================================================
  // Vérifications page produits
  // ============================================================

  async checkAllProductsPageIsVisible() {
    await expect(this.page).toHaveURL(/\/products/i);
    await this.checkVisible(this.allProductsTitle);
  }

  async checkProductsListIsVisible() {
    await this.checkVisible(this.productsGrid);
  }

  // ============================================================
  // Recherche
  // ============================================================

  async searchProduct(keyword: string) {
    await this.fill(this.searchInput, keyword);
    await expect(this.searchButton).toBeEnabled();
    await this.click(this.searchButton);
  }

  async checkSearchedProductsIsVisible() {
    await this.checkVisible(this.searchedProductsTitle);
  }

  async checkSearchResultsContain(keyword: string) {
    await this.checkVisible(this.productCards.first());

    const count = await this.productCards.count();
    expect(count, "Aucun résultat après la recherche").toBeGreaterThan(0);

    const kw = keyword.toLowerCase();
    let matchCount = 0;

    for (let i = 0; i < count; i++) {
      const card = this.productCards.nth(i);
      const name = (await card.locator(".productinfo p").innerText())
        .trim()
        .toLowerCase();

      if (name.includes(kw)) {
        matchCount++;
      }
    }

    expect(
      matchCount,
      `Aucun produit ne contient "${keyword}" dans les résultats`,
    ).toBeGreaterThan(0);
  }

  // ============================================================
  // Panier
  // ============================================================

  async addProductToCartByIndex(index: number) {
    const card = this.productCards.nth(index);

    await card.hover();

    const addToCartButton = card.locator('a:has-text("Add to cart")').first();
    await this.click(addToCartButton);
  }

  async continueShoppingFromModal() {
    await this.click(this.continueShoppingButton);
  }

  async viewCartFromModal() {
    await this.click(this.viewCartLink);
  }
}
