import { test } from "@playwright/test";
import { openHome, assertPageTitle } from "../src/utils/navigation";
import { HomePage } from "../src/pages/HomePage";

test("SMK01 - Home page is visible", async ({ page }) => {
  // 1️⃣ Ouvrir la page d'accueil
  await openHome(page);

  const home = new HomePage(page);

  // 2️⃣ Accepter les cookies si la pop-up est présente
  await home.acceptCookiesIfPresent();

  // 3️⃣ Vérifier le titre de la page
  await assertPageTitle(page, /Automation Exercise/i);

  // 4️⃣ Vérifier que la Home est visible
  await home.checkHomeIsVisible();
});
