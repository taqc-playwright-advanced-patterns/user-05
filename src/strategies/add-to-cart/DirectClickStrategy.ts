import type { Page } from '@playwright/test';
import type { AddToCartStrategy } from './AddToCartStrategy';
import { MenuPage } from '../../pages/MenuPage';

export class DirectClickStrategy implements AddToCartStrategy {
  async add(page: Page, productName?: string): Promise<void> {
    if (!productName) {
      throw new Error('productName is required for DirectClickStrategy');
    }

    const menuPage = new MenuPage(page);
    await menuPage.addDrink(productName);
  }
}
