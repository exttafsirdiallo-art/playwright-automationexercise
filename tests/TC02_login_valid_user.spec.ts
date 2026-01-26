import { test } from "@playwright/test";
import { HomePage } from "../src/pages/HomePage";
import { LoginPage } from "../src/pages/LoginPage";
import { credentials } from "../src/data/credentials";

test("TC02 - Login User with correct email and password", async ({ page }) => {
  // Ouvre la Home (baseURL + '/')
  await page.goto("/");

  const home = new HomePage(page);
  // Accepter les cookies si la pop-up est présente
  await home.acceptCookiesIfPresent();
  await home.checkHomeIsVisible();
  await home.goToLogin();

  const loginPage = new LoginPage(page);
  await loginPage.checkLoginFormIsVisible();
  await loginPage.login(
    credentials.validUser.email,
    credentials.validUser.password,
  );
  await loginPage.checkUserIsLoggedIn();
});
