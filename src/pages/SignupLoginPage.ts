import { Page, expect } from "@playwright/test";

export class SignupLoginPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async checkNewUserSignupIsVisible() {
    // Vérifie qu'on voit bien le bloc "New User Signup!"
    await expect(
      this.page.getByRole("heading", { name: /new user signup!/i }),
    ).toBeVisible();
  }

  async signup(name: string, email: string) {
    // Remplit Name + Email dans la section "New User Signup!"
    await this.page.locator('input[data-qa="signup-name"]').fill(name);
    await this.page.locator('input[data-qa="signup-email"]').fill(email);

    // Clique sur le bouton Signup
    await this.page.locator('button[data-qa="signup-button"]').click();
  }

  async checkEnterAccountInformationIsVisible() {
    // Vérifie qu'on arrive sur la page du formulaire de création de compte
    await expect(
      this.page.getByRole("heading", { name: /enter account information/i }),
    ).toBeVisible();
  }

  async fillAccountInformation(name: string, email: string, password: string) {
    // Sélectionne un titre
    await this.page.locator("#id_gender1").check();

    // Vérifie nom + email préremplis
    await expect(this.page.locator("#name")).toHaveValue(name);
    await expect(this.page.locator("#email")).toHaveValue(email);

    // Mot de passe
    await this.page.locator("#password").fill(password);

    // Date de naissance
    await this.page.locator("#days").selectOption("1");
    await this.page.locator("#months").selectOption("1");
    await this.page.locator("#years").selectOption("2000");

    // Newsletter / offers
    await this.page.locator("#newsletter").check();
    await this.page.locator("#optin").check();

    // Adresse
    await this.page.locator("#first_name").fill(name);
    await this.page.locator("#last_name").fill("Diallo");
    await this.page.locator("#company").fill("QA Company");
    await this.page.locator("#address1").fill("10 rue de Paris");
    await this.page.locator("#address2").fill("Batiment A");
    await this.page.locator("#country").selectOption("Canada");
    await this.page.locator("#state").fill("Quebec");
    await this.page.locator("#city").fill("Montreal");
    await this.page.locator("#zipcode").fill("75000");
    await this.page.locator("#mobile_number").fill("0601020304");
  }

  async createAccount() {
    // Clique sur Create Account
    await this.page.locator('button[data-qa="create-account"]').click();
  }
}
