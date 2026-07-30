import type { Locator, Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly checkoutButton: Locator;
  readonly emptyCartMessage: Locator;
  readonly cartItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = page.getByRole('button', { name: 'Proceed to checkout' });
    this.emptyCartMessage = page.getByText('No coffee, go add some.');
    this.cartItems = page.getByRole('listitem').filter({
      has: page.getByRole('button', { name: /Remove all/i }),
    });
  }

  async goto(): Promise<void> {
    await this.page.goto('/cart');
  }

  async increaseQuantity(name: string): Promise<void> {
    const item = this.itemByName(name);
    await item.getByRole('button', { name: /Add one/ }).click();
  }

  async decreaseQuantity(name: string): Promise<void> {
    const item = this.itemByName(name);
    await item.getByRole('button', { name: /Remove one/ }).click();
  }

  async removeAll(name: string): Promise<void> {
    const item = this.itemByName(name);
    await item.getByRole('button', { name: /Remove all/ }).click();
  }

  itemByName(name: string): Locator {
    return this.page.locator('.list-item').filter({ hasText: name });
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
