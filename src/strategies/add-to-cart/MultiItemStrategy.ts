import type { Page } from '@playwright/test';
import type { AddToCartStrategy } from './AddToCartStrategy';
import { MenuPage } from '../../pages/MenuPage';

export class MultiItemStrategy implements AddToCartStrategy {
  private items: string[];

  constructor(items: string[]) {
    this.items = items;
  }

  async add(page: Page): Promise<void> {
    const menuPage = new MenuPage(page);

    for (const item of this.items) {
      await menuPage.addDrink(item);
    }
  }
}
