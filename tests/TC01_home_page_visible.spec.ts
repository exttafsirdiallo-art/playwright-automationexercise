import { test } from "@playwright/test";
import { openUrl, assertPageTitle } from "../src/utils/navigation";
import { HomePage } from "../src/pages/HomePage";

test("TC01 - Verify home page is visible successfully", async ({ page }) => {
  await openUrl(page, "https://automationexercise.com");

  await assertPageTitle(page, /Automation Exercise/i);

  const home = new HomePage(page);
  await home.assertLoaded();
});
