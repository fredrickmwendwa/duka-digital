import { useCart } from '../context/CartContext';
import { useCheckout } from '../context/CheckoutContext';
import { calcTotals } from '../utils/order';

/** Cart lines + checkout choices + computed totals: the single source for cart, checkout, payment and message. */
export function useOrder() {
  const { lines } = useCart();
  const { checkout, dispatch } = useCheckout();
  return { lines, checkout, dispatch, totals: calcTotals(lines, checkout.fulfilment) };
}
