import { Locator, Page, expect } from "@playwright/test";

export class BasePage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async click(locator: Locator) {
    await expect(locator).toBeVisible();
    await locator.click();
  }

  async fill(locator: Locator, value: string) {
    await expect(locator).toBeVisible();
    await locator.fill(value);
  }

  async checkVisible(locator: Locator) {
    await expect(locator).toBeVisible();
  }

  async checkContainsText(locator: Locator, text: string | RegExp) {
    await expect(locator).toContainText(text);
  }

  async scrollIntoView(locator: Locator) {
    await locator.scrollIntoViewIfNeeded();
  }
}
