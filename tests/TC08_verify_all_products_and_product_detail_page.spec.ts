import { test, expect } from "@playwright/test";
import { openHome } from "../src/utils/navigation";
import { HomePage } from "../src/pages/HomePage";
import { ProductsPage } from "../src/pages/ProductsPage";
import { ProductDetailPage } from "../src/pages/ProductDetailPage";

test("TC08 - Verify All Products and product detail page", async ({ page }) => {
  // 1) Ouvrir la Home
  await openHome(page);

  const home = new HomePage(page);

  // 2) Accepter les cookies si présent
  await home.acceptCookiesIfPresent();

  // 3) Page Produit
  const products = new ProductsPage(page);
  await products.openFromHeader();
  await products.checkAllProductsPageIsVisible();
  await products.checkProductsListIsVisible();

  // 4) Page détail produit
  await products.openFirstProductDetails();

  const productDetail = new ProductDetailPage(page);
  await productDetail.checkProductDetailPageIsVisible();
  await productDetail.checkProductInfoFieldsAreVisible();
});
