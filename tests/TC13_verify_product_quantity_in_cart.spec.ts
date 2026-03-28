import { test } from "@playwright/test";
import { openHome } from "../src/utils/navigation";
import { HomePage } from "../src/pages/HomePage";
import { ProductsPage } from "../src/pages/ProductsPage";
import { ProductDetailPage } from "../src/pages/ProductDetailPage";
import { CartPage } from "../src/pages/CartPage";
import { orderData } from "../src/data/orderData";

test.describe("TC13 - Verify Product Quantity in Cart", () => {
  test("Ajouter un produit avec quantité 4 et vérifier dans le panier", async ({
    page,
  }) => {
    const quantity = orderData.defaultQuantity;

    // 1) Ouvrir le site
    const home = new HomePage(page);
    await openHome(page);
    await home.acceptCookiesIfPresent();

    // 2) Aller sur Products
    const productsPage = new ProductsPage(page);
    await productsPage.openFromHeader();

    // 3) Ouvrir le premier produit
    await productsPage.openFirstProductDetails();

    // 4) Page détail produit
    const productDetailPage = new ProductDetailPage(page);
    await productDetailPage.checkProductDetailPageIsVisible();

    // 5) Modifier quantité + ajouter au panier
    await productDetailPage.setQuantity(quantity);
    await productDetailPage.addToCart();

    // 6) Aller au panier
    await productDetailPage.goToCartFromModal();

    // 7) Vérifier quantité
    const cartPage = new CartPage(page);
    await cartPage.checkProductQuantity(quantity);
  });
});
