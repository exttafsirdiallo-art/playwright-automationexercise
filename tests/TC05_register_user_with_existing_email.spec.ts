import { test, expect } from "@playwright/test";
import { openHome } from "../src/utils/navigation";
import { HomePage } from "../src/pages/HomePage";
import { SignupLoginPage } from "../src/pages/SignupLoginPage";
import { credentials } from "../src/data/credentials";

test("TC05 - Register User with existing email", async ({ page }) => {
  // 1) Ouvrir la Home
  await openHome(page);

  const home = new HomePage(page);

  // 2) Accepter cookies si présent
  await home.acceptCookiesIfPresent();

  // 3) Aller sur la page Signup / Login
  await home.goToLogin();

  const signupLogin = new SignupLoginPage(page);

  // 4) Vérifier le bloc "New User Signup!"
  await signupLogin.checkNewUserSignupIsVisible();

  // 5) Essayer de s'inscrire avec un email déjà existant
  await signupLogin.signup("Test", credentials.validUser.email);

  // 6) Vérifier le message d'erreur
  await expect(page.getByText(/email address already exist!/i)).toBeVisible();
});
