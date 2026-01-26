import { test, expect } from "@playwright/test";
import { openHome } from "../src/utils/navigation";
import { HomePage } from "../src/pages/HomePage";

test("TC07 - Verify Test Cases Page", async ({ page }) => {
  // 1) Ouvrir la Home
  await openHome(page);

  const home = new HomePage(page);

  // 2) Accepter les cookies si présents
  await home.acceptCookiesIfPresent();

  // 3) Cliquer sur le lien "Test Cases"
  await page.locator("header").locator('a[href="/test_cases"]').click();

  // 4) Vérifier qu'on est bien sur la page Test Cases
  await expect(
    page.getByRole("heading", { name: "Test Cases", level: 2 }),
  ).toBeVisible();

  // (Optionnel) Vérifier l'URL
  await expect(page).toHaveURL(/\/test_cases/i);
});
