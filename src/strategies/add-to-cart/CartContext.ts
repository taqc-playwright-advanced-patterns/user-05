import type { AddToCartStrategy } from './AddToCartStrategy';
import type { Page } from '@playwright/test';

export class CartContext {
  constructor(private strategy: AddToCartStrategy) {}

  setStrategy(strategy: AddToCartStrategy): void {
    this.strategy = strategy;
  }

  async addToCart(page: Page, productName?: string): Promise<void> {
    await this.strategy.add(page, productName);
  }
}
