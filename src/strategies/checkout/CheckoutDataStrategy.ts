import type { CheckoutFormData } from '../../pages/CheckoutPage';

export interface CheckoutDataStrategy {
  getData(): CheckoutFormData;
}
