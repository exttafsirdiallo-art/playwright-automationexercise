import { Page, expect } from "@playwright/test";

export class ProductDetailPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async checkProductDetailPageIsVisible() {
    // Vérifie qu'on est bien sur une URL de type /product_details/<id>
    await expect(this.page).toHaveURL(/\/product_details\/\d+/);

    // Vérifie que le bloc d'informations produit est visible
    await expect(this.page.locator(".product-information")).toBeVisible();
  }

  async checkProductInfoFieldsAreVisible() {
    // Vérifie quelques champs importants dans la fiche produit
    const productInfo = this.page.locator(".product-information");

    await expect(productInfo.getByText(/category/i)).toBeVisible();
    await expect(productInfo.getByText(/availability/i)).toBeVisible();
    await expect(productInfo.getByText(/condition/i)).toBeVisible();
    await expect(productInfo.getByText(/brand/i)).toBeVisible();
  }
}
