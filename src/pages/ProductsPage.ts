import { Page, Locator, expect } from "@playwright/test";

export class ProductsPage {
  page: Page;

  // Locators (simples, robustes, scopés)
  productsGrid: Locator;
  productCards: Locator;

  searchInput: Locator;
  searchButton: Locator;

  searchedProductsTitle: Locator;

  constructor(page: Page) {
    this.page = page;

    // Grille produits (scopée)
    this.productsGrid = this.page.locator(".features_items");
    this.productCards = this.productsGrid.locator(".product-image-wrapper");

    // Recherche (IDs stables)
    this.searchInput = this.page.locator("#search_product");
    this.searchButton = this.page.locator("#submit_search");

    // Titre "SEARCHED PRODUCTS"
    this.searchedProductsTitle = this.page.getByRole("heading", {
      name: /searched products/i,
    });
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
    await expect(this.productsGrid).toBeVisible();
  }

  async openFirstProductDetails() {
    // Clique sur le premier lien "View Product" (détails produit)
    await this.page.locator('a[href^="/product_details/"]').first().click();
  }

  // -----------------------------
  // TC09 - Search Product
  // -----------------------------

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

    // AutomationExercise n'est pas toujours strict : au moins 1 produit doit matcher
    const kw = keyword.toLowerCase();
    let matchCount = 0;

    for (let i = 0; i < count; i++) {
      const card = this.productCards.nth(i);
      const name = (await card.locator(".productinfo p").innerText())
        .trim()
        .toLowerCase();

      if (name.includes(kw)) matchCount++;
    }

    expect(
      matchCount,
      `Aucun produit ne contient "${keyword}" dans les résultats`,
    ).toBeGreaterThan(0);
  }
}
