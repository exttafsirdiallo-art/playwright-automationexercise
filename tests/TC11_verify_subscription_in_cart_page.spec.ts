import { test } from "@playwright/test";
import { openHome } from "../src/utils/navigation";
import { HomePage } from "../src/pages/HomePage";
import { CartPage } from "../src/pages/CartPage";

test.describe("TC11 - Verify Subscription in Cart Page", () => {
  test("S'abonner depuis la page Cart et vérifier le message de succès", async ({
    page,
  }) => {
    const email = `tc11_${Date.now()}@example.com`;

    // 1) Ouvrir le site + accepter cookies
    const home = new HomePage(page);
    await openHome(page);
    await home.acceptCookiesIfPresent();

    // 2) Aller sur Cart
    const cart = new CartPage(page);
    await cart.openFromHeader();

    // 3) Scroller jusqu'au footer
    await cart.scrollToFooter();

    // 4) Vérifier SUBSCRIPTION visible
    await cart.checkSubscriptionIsVisible();

    // 5) Email + Subscribe
    await cart.subscribeWithEmail(email);

    // 6) Message succès
    await cart.checkSubscriptionSuccess();
  });
});
