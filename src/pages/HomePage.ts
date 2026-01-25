import { Page, expect } from "@playwright/test";

export class HomePage {
  constructor(private readonly page: Page) {}

  // Selecteurs robustes (roles / textes stables)
  private readonly signupLoginLink = () =>
    this.page.getByRole("link", { name: /signup\s*\/\s*login/i });

  async assertLoaded() {
    // Sur AutomationExercise, ce lien est un bon indicateur que la Home est chargée
    await expect(this.signupLoginLink()).toBeVisible();
  }
}
