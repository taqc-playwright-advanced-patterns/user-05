import type { Locator, Page } from '@playwright/test';

export class MenuPage {
  readonly page: Page;
  readonly cartLink: Locator;
  readonly totalButton: Locator;
  readonly promoBanner: Locator;
  readonly acceptPromoButton: Locator;
  readonly declinePromoButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartLink = page.getByRole('link', { name: 'Cart page' });
    this.totalButton = page.getByRole('button', { name: 'Proceed to checkout' });
    this.promoBanner = page.locator('.promo');
    this.acceptPromoButton = page.getByRole('button', { name: 'Yes, of course!' });
    this.declinePromoButton = page.getByRole('button', { name: "Nah, I'll skip." });
  }

  async goto(): Promise<void> {
    await this.page.goto('.');
  }

  productByName(name: string): Locator {
    return this.page.getByLabel(name, { exact: true });
  }

  getCoffeeCard(coffeeName: string): Locator {
    return this.page.getByRole('listitem').filter({
      hasText: new RegExp(`^${coffeeName}\\s+\\$`),
    });
  }

  async getCoffeePrice(coffeeName: string): Promise<number> {
    const text = await this.getCoffeeCard(coffeeName)
      .getByText(/^\$\d+\.\d{2}$/)
      .textContent();

    if (!text) throw new Error(`Price not found for: ${coffeeName}`);

    return Number(text.replace('$', ''));
  }

  async addDrink(name: string): Promise<void> {
    await this.productByName(name).click();
  }

  async getCartCount(): Promise<number> {
    const text = (await this.cartLink.textContent()) ?? '';
    const match = text.match(/\((\d+)\)/);

    return match ? Number(match[1]) : 0;
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }

  async openCheckout(): Promise<void> {
    await this.totalButton.click();
  }

  async dismissPromo(): Promise<void> {
    await this.declinePromoButton.click();
  }

  async acceptPromo(): Promise<void> {
    await this.acceptPromoButton.click();
  }
}
