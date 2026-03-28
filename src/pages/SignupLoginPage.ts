import { Page, Locator, expect } from "@playwright/test";
import signupData from "../data/signupData.json";

export class SignupLoginPage {
  page: Page;

  // =========================
  // Signup
  // =========================
  newUserSignupTitle: Locator;
  signupNameInput: Locator;
  signupEmailInput: Locator;
  signupButton: Locator;

  // =========================
  // Account information
  // =========================
  enterAccountInformationTitle: Locator;
  titleMrRadio: Locator;
  nameInput: Locator;
  emailInput: Locator;
  passwordInput: Locator;
  daySelect: Locator;
  monthSelect: Locator;
  yearSelect: Locator;
  newsletterCheckbox: Locator;
  specialOffersCheckbox: Locator;

  // =========================
  // Address information
  // =========================
  firstNameInput: Locator;
  lastNameInput: Locator;
  companyInput: Locator;
  address1Input: Locator;
  address2Input: Locator;
  countrySelect: Locator;
  stateInput: Locator;
  cityInput: Locator;
  zipcodeInput: Locator;
  mobileNumberInput: Locator;
  createAccountButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Signup
    this.newUserSignupTitle = this.page.getByRole("heading", {
      name: /new user signup!/i,
    });
    this.signupNameInput = this.page.locator('input[data-qa="signup-name"]');
    this.signupEmailInput = this.page.locator('input[data-qa="signup-email"]');
    this.signupButton = this.page.locator('button[data-qa="signup-button"]');

    // Account information
    this.enterAccountInformationTitle = this.page.getByRole("heading", {
      name: /enter account information/i,
    });
    this.titleMrRadio = this.page.locator("#id_gender1");
    this.nameInput = this.page.locator("#name");
    this.emailInput = this.page.locator("#email");
    this.passwordInput = this.page.locator("#password");
    this.daySelect = this.page.locator("#days");
    this.monthSelect = this.page.locator("#months");
    this.yearSelect = this.page.locator("#years");
    this.newsletterCheckbox = this.page.locator("#newsletter");
    this.specialOffersCheckbox = this.page.locator("#optin");

    // Address information
    this.firstNameInput = this.page.locator("#first_name");
    this.lastNameInput = this.page.locator("#last_name");
    this.companyInput = this.page.locator("#company");
    this.address1Input = this.page.locator("#address1");
    this.address2Input = this.page.locator("#address2");
    this.countrySelect = this.page.locator("#country");
    this.stateInput = this.page.locator("#state");
    this.cityInput = this.page.locator("#city");
    this.zipcodeInput = this.page.locator("#zipcode");
    this.mobileNumberInput = this.page.locator("#mobile_number");
    this.createAccountButton = this.page.locator(
      'button[data-qa="create-account"]',
    );
  }

  // ============================================================
  // Vérifications
  // ============================================================

  async checkNewUserSignupIsVisible() {
    // Vérifie qu'on voit bien le bloc "New User Signup!"
    await expect(this.newUserSignupTitle).toBeVisible();
  }

  async checkEnterAccountInformationIsVisible() {
    // Vérifie qu'on arrive sur la page du formulaire de création de compte
    await expect(this.enterAccountInformationTitle).toBeVisible();
  }

  // ============================================================
  // Signup
  // ============================================================

  async signup(name: string, email: string) {
    // Remplit Name + Email puis clique sur Signup
    await this.signupNameInput.fill(name);
    await this.signupEmailInput.fill(email);
    await this.signupButton.click();
  }

  // ============================================================
  // Account creation
  // ============================================================

  async fillAccountInformation(name: string, email: string, password: string) {
    const data = signupData.user;

    // Sélectionne un titre
    await this.titleMrRadio.check();

    // Vérifie nom + email préremplis
    await expect(this.nameInput).toHaveValue(name);
    await expect(this.emailInput).toHaveValue(email);

    // Mot de passe
    await this.passwordInput.fill(password);

    // Date de naissance
    await this.daySelect.selectOption("1");
    await this.monthSelect.selectOption("1");
    await this.yearSelect.selectOption("2000");

    // Newsletter / offers
    await this.newsletterCheckbox.check();
    await this.specialOffersCheckbox.check();

    // Adresse
    await this.firstNameInput.fill(name);
    await this.lastNameInput.fill(data.lastName);
    await this.companyInput.fill(data.company);
    await this.address1Input.fill(data.address1);
    await this.address2Input.fill(data.address2);
    await this.countrySelect.selectOption(data.country);
    await this.stateInput.fill(data.state);
    await this.cityInput.fill(data.city);
    await this.zipcodeInput.fill(data.zipcode);
    await this.mobileNumberInput.fill(data.mobile);
  }

  async createAccount() {
    // Clique sur Create Account
    await this.createAccountButton.click();
  }
}
