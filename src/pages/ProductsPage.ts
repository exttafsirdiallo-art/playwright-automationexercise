import { Page, Locator, expect } from "@playwright/test";

export class ProductsPage {
  page: Page;

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
    this.page = page;

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
    // Clique sur "Products" dans le header
    await this.productsLink.click();
  }

  async openFirstProductDetails() {
    // Clique sur le premier lien "View Product"
    await this.page.locator('a[href^="/product_details/"]').first().click();
  }

  // ============================================================
  // Vérifications page produits
  // ============================================================

  async checkAllProductsPageIsVisible() {
    // Vérifie l'URL + le titre "All Products"
    await expect(this.page).toHaveURL(/\/products/i);
    await expect(this.allProductsTitle).toBeVisible();
  }

  async checkProductsListIsVisible() {
    // Vérifie que la grille produits est visible
    await expect(this.productsGrid).toBeVisible();
  }

  // ============================================================
  // Recherche (TC09)
  // ============================================================

  async searchProduct(keyword: string) {
    // Saisit le mot-clé + clique sur Search
    await expect(this.searchInput).toBeVisible();
    await this.searchInput.fill(keyword);

    await expect(this.searchButton).toBeEnabled();
    await this.searchButton.click();
  }

  async checkSearchedProductsIsVisible() {
    // Vérifie que "SEARCHED PRODUCTS" est visible
    await expect(this.searchedProductsTitle).toBeVisible();
  }

  async checkSearchResultsContain(keyword: string) {
    // Vérifie qu'il y a au moins 1 résultat
    await expect(this.productCards.first()).toBeVisible();

    const count = await this.productCards.count();
    expect(count, "Aucun résultat après la recherche").toBeGreaterThan(0);

    // AutomationExercise n'est pas toujours strict :
    // on vérifie qu'au moins 1 produit contient le mot-clé
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
  // Panier (TC12 / TC14)
  // ============================================================

  async addProductToCartByIndex(index: number) {
    // Ajoute un produit au panier depuis la liste produits
    const card = this.productCards.nth(index);

    // Le bouton "Add to cart" apparaît au hover
    await card.hover();

    const addToCartButton = card.locator('a:has-text("Add to cart")').first();
    await expect(addToCartButton).toBeVisible();
    await addToCartButton.click();
  }

  async continueShoppingFromModal() {
    // Clique sur "Continue Shopping" dans la popin
    await expect(this.continueShoppingButton).toBeVisible();
    await this.continueShoppingButton.click();
  }

  async viewCartFromModal() {
    // Clique sur "View Cart" dans la popin
    await expect(this.viewCartLink).toBeVisible();
    await this.viewCartLink.click();
  }
}
