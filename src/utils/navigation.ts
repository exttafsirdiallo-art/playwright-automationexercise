import { expect, Page } from "@playwright/test";

export async function openUrl(page: Page, url: string) {
  await page.goto(url);
}

export async function assertPageTitle(page: Page, titleRegex: RegExp) {
  await expect(page).toHaveTitle(titleRegex);
}
