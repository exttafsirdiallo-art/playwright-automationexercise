import { test, expect } from "@playwright/test";
import { openHome } from "../src/utils/navigation";
import { HomePage } from "../src/pages/HomePage";
import { LoginPage } from "../src/pages/LoginPage";
import { credentials } from "../src/data/credentials";

test("TC04 - Logout User", async ({ page }) => {
  // 1) Ouvrir la Home
  await openHome(page);

  const home = new HomePage(page);

  // 2) Accepter cookies si présent
  await home.acceptCookiesIfPresent();

  // 3) Aller sur la page Login
  await home.goToLogin();

  const loginPage = new LoginPage(page);

  // 4) Vérifier que le formulaire login est visible
  await loginPage.checkLoginFormIsVisible();

  // 5) Se connecter avec un compte valide
  await loginPage.login(
    credentials.validUser.email,
    credentials.validUser.password,
  );

  // 6) Vérifier que l'utilisateur est connecté (Logout visible)
  await expect(page.getByRole("link", { name: /logout/i })).toBeVisible();

  // 7) Cliquer sur Logout
  await page.getByRole("link", { name: /logout/i }).click();

  // 8) Vérifier qu'on revient sur la page Login
  await expect(
    page.getByRole("heading", { name: /login to your account/i }),
  ).toBeVisible();
});
