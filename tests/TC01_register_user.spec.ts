import { test, expect } from "@playwright/test";
import { openHome } from "../src/utils/navigation";
import { HomePage } from "../src/pages/HomePage";
import { SignupLoginPage } from "../src/pages/SignupLoginPage";
import { AccountInformationPage } from "../src/pages/AccountInformationPage";
import { createUser } from "../src/data/userFactory";

test("TC01 - Register User (complete)", async ({ page }) => {
  // 1) Ouvrir la Home
  await openHome(page);

  const home = new HomePage(page);

  // 2) Accepter cookies si présent
  await home.acceptCookiesIfPresent();

  // 3) Aller sur la page Signup/Login
  await home.goToLogin();

  const signupLogin = new SignupLoginPage(page);

  // 4) Vérifier le bloc "New User Signup!"
  await signupLogin.checkNewUserSignupIsVisible();

  // 5) Générer un utilisateur unique
  const user = createUser();

  // 6) Remplir Name + Email puis cliquer Signup
  await signupLogin.signup(user.name, user.email);

  // 7) Vérifier la page "ENTER ACCOUNT INFORMATION"
  const accountInfo = new AccountInformationPage(page);
  await accountInfo.checkPageIsVisible();

  await accountInfo.fillAccountInformation("Password123!");
  await accountInfo.fillAddressInformation();

  // 8 Créer le compte
  await accountInfo.createAccount();

  // 9 Vérifier "ACCOUNT CREATED"
  await accountInfo.checkAccountCreated();

  // 10 Continue
  await accountInfo.continueAfterAccountCreated();

  //11 Vérifier que le user est bien connecté
  await expect(page.getByAltText(/logged in as/i)).toBeVisible();

  // 12 Se deconnecter
  await page.getByRole("link", { name: /logout/i }).click();

  // 13 Vérifier le retour sur la page login
  await expect(
    page.getByRole("heading", { name: /login to your account/i }),
  ).toBeVisible();
});
