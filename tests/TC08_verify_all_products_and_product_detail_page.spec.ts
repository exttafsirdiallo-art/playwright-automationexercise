import { test, expect } from "@playwright/test";
import { openHome } from "../src/utils/navigation";
import { HomePage } from "../src/pages/HomePage";

test("TC08 - Verify All Products and product detail page", async ({ page }) => {
  // 1) Ouvrir la Home
  await openHome(page);

  const home = new HomePage(page);

  // 2) Accepter les cookies si présent
  await home.acceptCookiesIfPresent();

  // 3) Cliquer sur "Products" (on scope au header pour éviter strict mode)
  await page.locator("header").locator('a[href="/products"]').click();

  // 4) Vérifier que l'utilisateur est sur la page ALL PRODUCTS
  await expect(page).toHaveURL(/\/products/i);
  await expect(
    page.getByRole("heading", { name: "All Products", level: 2 }),
  ).toBeVisible();

  // 5) Vérifier que la liste des produits est visible
  await expect(page.locator(".features_items")).toBeVisible();

  // 6) Cliquer sur le premier "View Product"
  // On cible les liens qui vont vers /product_details/<id>
  await page.locator('a[href^="/product_details/"]').first().click();

  // 7) Vérifier qu'on est sur la page détail produit
  await expect(page).toHaveURL(/\/product_details\/\d+/);

  // 8) Vérifier que les infos produit sont visibles
  const productInfo = page.locator(".product-information");
  await expect(productInfo).toBeVisible();

  // Nom du produit
  await expect(productInfo.locator("h2")).toBeVisible();

  // Vérifier quelques champs importants (présents sur AutomationExercise)
  await expect(productInfo.getByText(/category/i)).toBeVisible();
  await expect(productInfo.getByText(/availability/i)).toBeVisible();
  await expect(productInfo.getByText(/condition/i)).toBeVisible();
  await expect(productInfo.getByText(/brand/i)).toBeVisible();
});
