import { test, expect } from "@playwright/test";
import { openHome } from "../src/utils/navigation";
import { HomePage } from "../src/pages/HomePage";

test("TC06 - Contact Us Form", async ({ page }) => {
  // 1) Ouvrir la Home
  await openHome(page);

  const home = new HomePage(page);

  // 2) Accepter cookies si présent
  await home.acceptCookiesIfPresent();

  // 3) Cliquer sur le lien "Contact Us"
  await page.getByRole("link", { name: /contact us/i }).click();

  // 4) Vérifier le titre "GET IN TOUCH"
  await expect(
    page.getByRole("heading", { name: /get in touch/i }),
  ).toBeVisible();

  // 5) Remplir le formulaire Contact Us
  await page.locator('input[data-qa="name"]').fill("Test User");
  await page.locator('input[data-qa="email"]').fill("test@example.com");
  await page.locator('input[data-qa="subject"]').fill("Contact subject");
  await page
    .locator('textarea[data-qa="message"]')
    .fill("Ceci est un message de test pour le formulaire Contact Us.");

  // 6) Upload d'un fichier (on utilise un fichier fictif)
  await page.locator('input[name="upload_file"]').setInputFiles({
    name: "test.txt",
    mimeType: "text/plain",
    buffer: Buffer.from("Test file content"),
  });

  // 7) Préparer l'acceptation de l'alerte
  page.once("dialog", async (dialog) => {
    await dialog.accept();
  });

  // 8) Cliquer sur Submit
  await page.locator('input[data-qa="submit-button"]').click();

  // 9) Vérifier le message de succès
  await expect(page.locator("#contact-page .alert-success")).toContainText(
    "Success! Your details have been submitted successfully.",
  );

  // 10) Cliquer sur Home
  await page.locator("#contact-page a.btn-success").click();

  // 11) Vérifier que la Home est visible
  await expect(
    page.getByRole("link", { name: /signup\s*\/\s*login/i }),
  ).toBeVisible();
});
