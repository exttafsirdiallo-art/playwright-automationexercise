import { test } from "@playwright/test";
import { openHome } from "../src/utils/navigation";
import { HomePage } from "../src/pages/HomePage";
import { ProductsPage } from "../src/pages/ProductsPage";
import { CartPage } from "../src/pages/CartPage";
import { SignupLoginPage } from "../src/pages/SignupLoginPage";
import { AccountCreatedPage } from "../src/pages/AccountCreatedPage";
import { CheckoutPage } from "../src/pages/CheckoutPage";
import { PaymentPage } from "../src/pages/PaymentPage";
import { createUser } from "../src/data/userFactory";

test.describe("TC14 - Place Order: Register while Checkout", () => {
  test("Créer un compte pendant le checkout et finaliser la commande", async ({
    page,
  }) => {
    const user = createUser();
    const password = "Blancheporte1";
    const comment = "Commande de test Playwright";

    // 1) Ouvrir le site + accepter les cookies
    const homePage = new HomePage(page);
    await openHome(page);
    await homePage.acceptCookiesIfPresent();

    // 2) Aller sur Products
    const productsPage = new ProductsPage(page);
    await productsPage.openFromHeader();

    // 3) Ajouter le premier produit au panier
    await productsPage.addProductToCartByIndex(0);
    await productsPage.viewCartFromModal();

    // 4) Depuis le panier, aller au checkout
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.clickProceedToCheckout();

    // 5) Cliquer sur Register / Login
    await checkoutPage.clickRegisterLoginFromModal();

    // 6) Créer le compte
    const signupLoginPage = new SignupLoginPage(page);
    await signupLoginPage.checkNewUserSignupIsVisible();
    await signupLoginPage.signup(user.name, user.email);
    await signupLoginPage.checkEnterAccountInformationIsVisible();
    await signupLoginPage.fillAccountInformation(
      user.name,
      user.email,
      password,
    );
    await signupLoginPage.createAccount();

    // 7) Vérifier account created + continue
    const accountCreatedPage = new AccountCreatedPage(page);
    await accountCreatedPage.checkAccountCreatedIsVisible();
    await accountCreatedPage.continue();
    await accountCreatedPage.checkLoggedInAs(user.name);

    // 8) Retourner au panier
    const cartPage = new CartPage(page);
    await cartPage.openFromHeader();

    // 9) Refaire checkout
    await checkoutPage.clickProceedToCheckout();

    // 10) Vérifier checkout + commentaire
    await checkoutPage.checkAddressDetailsVisible();
    await checkoutPage.checkReviewYourOrderVisible();
    await checkoutPage.enterComment(comment);
    await checkoutPage.clickPlaceOrder();

    // 11) Paiement
    const paymentPage = new PaymentPage(page);
    await paymentPage.fillPaymentInformation();
    await paymentPage.payAndConfirmOrder();

    // 12) Vérifier commande placée
    await paymentPage.checkOrderPlacedIsVisible();
  });
});
