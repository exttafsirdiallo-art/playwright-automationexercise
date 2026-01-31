import { test } from "@playwright/test";
import { ProductsPage } from "../src/pages/ProductsPage";
import { openHome } from "../src/utils/navigation";
import { HomePage } from "../src/pages/HomePage";

test.describe("TC09 - Search Product", () => {
  test("Rechercher un produit et vérifier les résultats", async ({ page }) => {
    const keyword = "dress";

    // 1) Ouvrir le site et accepter les cookies
    const home = new HomePage(page);
    await openHome(page);
    await home.acceptCookiesIfPresent();

    // 2) Aller sur Products
    const productsPage = new ProductsPage(page);
    await productsPage.openFromHeader();

    // 3) Vérifier la page All Products
    await productsPage.checkAllProductsPageIsVisible();
    await productsPage.checkProductsListIsVisible();

    // 4) Rechercher un produit
    await productsPage.searchProduct(keyword);

    // 5) Vérifier SEARCHED PRODUCTS + résultats
    await productsPage.checkSearchedProductsIsVisible();
    await productsPage.checkSearchResultsContain(keyword);
  });
});
