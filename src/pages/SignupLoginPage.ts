import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import signupData from "../data/signupData.json";

export class SignupLoginPage extends BasePage {
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
    super(page);

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
    await this.checkVisible(this.newUserSignupTitle);
  }

  async checkEnterAccountInformationIsVisible() {
    await this.checkVisible(this.enterAccountInformationTitle);
  }

  // ============================================================
  // Signup
  // ============================================================

  async signup(name: string, email: string) {
    await this.fill(this.signupNameInput, name);
    await this.fill(this.signupEmailInput, email);
    await this.click(this.signupButton);
  }

  // ============================================================
  // Account creation
  // ============================================================

  async fillAccountInformation(name: string, email: string, password: string) {
    const data = signupData.user;

    await this.titleMrRadio.check();

    await expect(this.nameInput).toHaveValue(name);
    await expect(this.emailInput).toHaveValue(email);

    await this.fill(this.passwordInput, password);

    await this.daySelect.selectOption("1");
    await this.monthSelect.selectOption("1");
    await this.yearSelect.selectOption("2000");

    await this.newsletterCheckbox.check();
    await this.specialOffersCheckbox.check();

    await this.fill(this.firstNameInput, name);
    await this.fill(this.lastNameInput, data.lastName);
    await this.fill(this.companyInput, data.company);
    await this.fill(this.address1Input, data.address1);
    await this.fill(this.address2Input, data.address2);
    await this.countrySelect.selectOption(data.country);
    await this.fill(this.stateInput, data.state);
    await this.fill(this.cityInput, data.city);
    await this.fill(this.zipcodeInput, data.zipcode);
    await this.fill(this.mobileNumberInput, data.mobile);
  }

  async createAccount() {
    await this.click(this.createAccountButton);
  }
}
