import type { Page } from '@playwright/test';
import type { AddToCartStrategy } from './AddToCartStrategy';
import { MenuPage } from '../../pages/MenuPage';

export class PromoMochaStrategy implements AddToCartStrategy {
  private count = 0;

  async add(page: Page, productName?: string): Promise<void> {
    if (!productName) {
      throw new Error('productName is required for PromoMochaStrategy');
    }

    const menuPage = new MenuPage(page);
    await menuPage.addDrink(productName);

    this.count++;

    if (this.count % 3 === 0) {
      await menuPage.acceptPromo();
    }
  }
}
