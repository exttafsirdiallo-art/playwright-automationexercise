import { test } from "@playwright/test";
import { openHome } from "../src/utils/navigation";
import { HomePage } from "../src/pages/HomePage";
import { ProductsPage } from "../src/pages/ProductsPage";
import { CartPage } from "../src/pages/CartPage";

test.describe("TC12 - Add Products in Cart", () => {
  test("Ajouter 2 produits au panier et vérifier le panier", async ({
    page,
  }) => {
    // 1) Ouvrir le site + cookies
    const home = new HomePage(page);
    await openHome(page);
    await home.acceptCookiesIfPresent();

    // 2) Aller sur Products
    const products = new ProductsPage(page);
    await products.openFromHeader();
    await products.checkAllProductsPageIsVisible();
    await products.checkProductsListIsVisible();

    // 3) Ajouter le 1er produit
    await products.addProductToCartByIndex(0);
    await products.continueShoppingFromModal();

    // 4) Ajouter le 2e produit
    await products.addProductToCartByIndex(1);
    await products.viewCartFromModal();

    // 5) Vérifier panier
    const cart = new CartPage(page);
    await cart.checkTwoProductsInCart();
    await cart.checkEachProductQtyIsOne();
    await cart.checkTotalEqualsPriceTimesQty();
  });
});
