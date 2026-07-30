import type { CheckoutFormData } from '../../pages/CheckoutPage';
import type { CheckoutDataStrategy } from './CheckoutDataStrategy';

export class InvalidCheckoutStrategy implements CheckoutDataStrategy {
  getData(): CheckoutFormData {
    return {
      name: '',
      email: 'invalid-email-format',
      acceptPromotion: false,
    };
  }
}
