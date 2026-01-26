import { test } from "@playwright/test";
import { openHome } from "../src/utils/navigation";
import { HomePage } from "../src/pages/HomePage";
import { SignupLoginPage } from "../src/pages/SignupLoginPage";
import { createUser } from "../src/data/userFactory";

test("TC03 - Register User (start signup)", async ({ page }) => {
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
  await signupLogin.checkEnterAccountInformationIsVisible();
});
