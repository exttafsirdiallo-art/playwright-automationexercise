import { expect, Page } from "@playwright/test";

export async function openHome(page: Page) {
  await page.goto("/");
}

export async function assertPageTitle(page: Page, titleRegex: RegExp) {
  await expect(page).toHaveTitle(titleRegex);
}
