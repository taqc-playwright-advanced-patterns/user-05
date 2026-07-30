import type { Locator, Page } from '@playwright/test';

export type CheckoutFormData = {
  name: string;
  email: string;
  acceptPromotion?: boolean;
};

export class CheckoutPage {
  readonly page: Page;
  readonly paymentForm: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly promotionCheckbox: Locator;
  readonly submitButton: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.paymentForm = page.getByRole('form', { name: 'Payment form' });
    this.nameInput = page.locator('#name');
    this.emailInput = page.locator('#email');
    this.promotionCheckbox = page.getByRole('checkbox', { name: 'Promotion checkbox' });
    this.submitButton = page.locator('#submit-payment');
    this.successMessage = page.locator('.snackbar.success');
  }

  async fillForm(data: CheckoutFormData): Promise<void> {
    await this.nameInput.fill(data.name);
    await this.emailInput.fill(data.email);

    if (data.acceptPromotion) {
      await this.promotionCheckbox.check();
    }
  }

  async submit(): Promise<void> {
    await this.submitButton.click();
  }

  async completeCheckout(data: CheckoutFormData): Promise<void> {
    await this.fillForm(data);
    await this.submit();
  }
}
