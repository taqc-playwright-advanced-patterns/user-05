import { expect, test } from '@playwright/test';
import { MenuPage } from '../src/pages/MenuPage';
import { CartContext } from '../src/strategies/add-to-cart/CartContext';
import { DirectClickStrategy } from '../src/strategies/add-to-cart/DirectClickStrategy';
import { DoubleClickStrategy } from '../src/strategies/add-to-cart/DoubleClickStrategy';
import { MultiItemStrategy } from '../src/strategies/add-to-cart/MultiItemStrategy';
import { PromoMochaStrategy } from '../src/strategies/add-to-cart/PromoMochaStrategy';

test.describe('Add to cart — Strategy', () => {
  let menuPage: MenuPage;

  test.beforeEach(async ({ page }) => {
    menuPage = new MenuPage(page);
    await menuPage.goto();
  });

  test('adds Espresso via DirectClickStrategy', async ({ page }) => {
    const context = new CartContext(new DirectClickStrategy());
    await context.addToCart(page, 'Espresso');
    await expect(menuPage.cartLink).toContainText('(1)');
  });

  test('adds the same drink twice via DoubleClickStrategy', async ({ page }) => {
    const context = new CartContext(new DoubleClickStrategy());
    await context.addToCart(page, 'Espresso');
    await expect(menuPage.cartLink).toContainText('(2)');
  });

  test('adds Mocha via PromoMochaStrategy', async ({ page }) => {
    const context = new CartContext(new PromoMochaStrategy());
    await context.addToCart(page, 'Espresso');
    await context.addToCart(page, 'Espresso');
    await context.addToCart(page, 'Espresso');
    await expect(menuPage.cartLink).toContainText('(4)');
  });

  test('adds several drinks via MultiItemStrategy', async ({ page }) => {
    const context = new CartContext(new MultiItemStrategy(['Americano', 'Espresso']));
    await context.addToCart(page);
    await expect(menuPage.cartLink).toContainText('(2)');
  });

  test('can switch strategy mid-scenario (setStrategy)', async ({ page }) => {
    const context = new CartContext(new DirectClickStrategy());
    await context.addToCart(page, 'Espresso');
    context.setStrategy(new DoubleClickStrategy());
    await context.addToCart(page, 'Espresso');
    await expect(menuPage.cartLink).toContainText('(3)');
    await expect(menuPage.promoBanner).toBeVisible();
  });
});
