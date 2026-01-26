import { test, expect } from "@playwright/test";
import { openHome } from "../src/utils/navigation";
import { HomePage } from "../src/pages/HomePage";
import { LoginPage } from "../src/pages/LoginPage";

test("TC03 - Login User with incorrect email and password", async ({
  page,
}) => {
  // 1) Ouvrir la Home
  await openHome(page);

  const home = new HomePage(page);

  // 2) Accepter les cookies si la pop-up est présente
  await home.acceptCookiesIfPresent();

  // 3) Aller sur la page Signup / Login
  await home.goToLogin();

  const loginPage = new LoginPage(page);

  // 4) Vérifier que le formulaire de login est visible
  await loginPage.checkLoginFormIsVisible();

  // 5) Saisir un email + mot de passe invalides
  await loginPage.login("wrong-email@example.com", "WrongPassword123");

  // 6) Vérifier le message d'erreur
  // Sur AutomationExercise : "Your email or password is incorrect!"
  await expect(
    page.getByText(/your email or password is incorrect!/i),
  ).toBeVisible();
});
