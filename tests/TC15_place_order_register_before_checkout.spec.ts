import { test } from "@playwright/test";
import { openHome } from "../src/utils/navigation";
import { HomePage } from "../src/pages/HomePage";
import { SignupLoginPage } from "../src/pages/SignupLoginPage";
import { AccountCreatedPage } from "../src/pages/AccountCreatedPage";
import { ProductsPage } from "../src/pages/ProductsPage";
import { CartPage } from "../src/pages/CartPage";
import { CheckoutPage } from "../src/pages/CheckoutPage";
import { PaymentPage } from "../src/pages/PaymentPage";
import { AccountDeletedPage } from "../src/pages/AccountDeletedPage";
import { createUser } from "../src/data/userFactory";
import { orderData } from "../src/data/orderData";

test.describe("TC15 - Place Order: Register before Checkout", () => {
  test("Créer un compte avant checkout puis finaliser la commande", async ({
    page,
  }) => {
    const user = createUser();
    const password = "Blancheporte1";
    const comment = orderData.defaultComment;

    // 1) Ouvrir le site + accepter les cookies
    const homePage = new HomePage(page);
    await openHome(page);
    await homePage.acceptCookiesIfPresent();
    await homePage.checkHomeIsVisible();

    // 2) Aller sur Signup / Login
    await homePage.goToLogin();

    // 3) Créer un nouveau compte
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

    // 4) Vérifier account created + continue
    const accountCreatedPage = new AccountCreatedPage(page);
    await accountCreatedPage.checkAccountCreatedIsVisible();
    await accountCreatedPage.continue();

    // 5) Vérifier logged in as
    await homePage.checkLoggedInAs(user.name);

    // 6) Aller sur Products
    const productsPage = new ProductsPage(page);
    await productsPage.openFromHeader();
    await productsPage.checkAllProductsPageIsVisible();

    // 7) Ajouter le premier produit au panier
    await productsPage.addProductToCartByIndex(0);
    await productsPage.viewCartFromModal();

    // 8) Ouvrir le panier
    const cartPage = new CartPage(page);
    await cartPage.openFromHeader();

    // 9) Aller au checkout
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.clickProceedToCheckout();

    // 10) Vérifier checkout + commentaire
    await checkoutPage.checkAddressDetailsVisible();
    await checkoutPage.checkReviewYourOrderVisible();
    await checkoutPage.enterComment(comment);
    await checkoutPage.clickPlaceOrder();

    // 11) Paiement
    const paymentPage = new PaymentPage(page);
    await paymentPage.checkPaymentPageIsVisible();
    await paymentPage.fillPaymentInformation();
    await paymentPage.payAndConfirmOrder();

    // 12) Vérifier commande placée
    await paymentPage.checkOrderPlacedIsVisible();

    // 13) Supprimer le compte
    await homePage.goToDeleteAccount();

    // 14) Vérifier account deleted
    const accountDeletedPage = new AccountDeletedPage(page);
    await accountDeletedPage.checkAccountDeletedIsVisible();
    await accountDeletedPage.continue();
  });
});
