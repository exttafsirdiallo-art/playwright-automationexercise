import { test } from "@playwright/test";
import { openHome } from "../src/utils/navigation";
import { HomePage } from "../src/pages/HomePage";

test.describe("TC10 - Verify Subscription in Home Page", () => {
  test("Vérifier l'abonnement via le bloc Subscription", async ({ page }) => {
    const email = `tc10_${Date.now()}@example.com`;

    // 1) Ouvrir le site + accepter cookies
    const home = new HomePage(page);
    await openHome(page);
    await home.acceptCookiesIfPresent();

    // 2) Scroller jusqu'au footer
    await home.scrollToFooter();

    // 3) Vérifier le bloc SUBSCRIPTION visible
    await home.checkSubscriptionIsVisible();

    // 4) Saisir l'email + Subscribe
    await home.subscribeWithEmail(email);

    // 5) Vérifier le message de succès
    await home.checkSubscriptionSuccess();
  });
});
