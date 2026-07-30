import type { CheckoutFormData } from '../../pages/CheckoutPage';
import type { CheckoutDataStrategy } from './CheckoutDataStrategy';

export class ValidCheckoutStrategy implements CheckoutDataStrategy {
  getData(): CheckoutFormData {
    return {
      name: 'Walter White',
      email: 'walter.white@example.com',
      acceptPromotion: true,
    };
  }
}
