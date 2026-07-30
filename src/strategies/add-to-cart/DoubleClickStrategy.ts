import type { Page } from '@playwright/test';
import type { AddToCartStrategy } from './AddToCartStrategy';
import { MenuPage } from '../../pages/MenuPage';

/**
 * Strategy: add the same drink twice via two clicks.
 *
 * This is a separate strategy because it represents a distinct business
 * behavior (double-add) rather than a single page action. The Page Object
 * exposes how to interact with the menu; the strategy composes those
 * interactions into a higher-level algorithm.
 */
export class DoubleClickStrategy implements AddToCartStrategy {
  async add(page: Page, productName?: string): Promise<void> {
    if (!productName) {
      throw new Error('productName is required for DoubleClickStrategy');
    }

    const menuPage = new MenuPage(page);
    await menuPage.addDrink(productName);
    await menuPage.addDrink(productName);
  }
}
