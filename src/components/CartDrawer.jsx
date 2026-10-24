import { Link } from 'react-router-dom';
import Overlay from './Overlay';
import Button from './Button';
import CartLine from './CartLine';
import { SummaryBody } from './OrderSummary';
import EmptyState from './EmptyState';
import { useCart } from '../context/CartContext';
import { useCheckout } from '../context/CheckoutContext';
import { useUI } from '../context/UIContext';
import { calcTotals } from '../utils/order';
import { plural } from '../utils/format';
import styles from './CartDrawer.module.css';

export default function CartDrawer() {
  const { panel, close } = useUI();
  const { lines, count } = useCart();
  const { checkout } = useCheckout();
  const totals = calcTotals(lines, checkout.fulfilment);
  const blocked = lines.some((l) => !l.available);
  return (
    <Overlay open={panel === 'cart'} onClose={close} label="Your cart" placement="right" width="420px">
      <div className={styles.head}>
        <h2>Your cart <span className="mono">{plural(count, 'item')}</span></h2>
        <button type="button" className={styles.close} onClick={close} aria-label="Close cart">&times;</button>
      </div>
      {lines.length === 0 ? (
        <div className={styles.empty}>
          <EmptyState title="Your cart is empty" action={<Button to="/shop?new=1" onClick={close}>Shop new in</Button>}>Pieces you add will wait here. Your cart is saved on this device.</EmptyState>
        </div>
      ) : (
        <>
          <ul className={styles.list}>{lines.map((l) => <CartLine key={l.id} line={l} onNavigate={close} />)}</ul>
          <div className={styles.foot}>
            <SummaryBody totals={totals} fulfilment={checkout.fulfilment} />
            <Button to="/checkout" size="lg" block onClick={close} aria-disabled={blocked || undefined} className={styles.cta}>Checkout</Button>
            <Button variant="secondary" size="sm" block onClick={close}>Continue shopping</Button>
            <Link to="/cart" onClick={close} className={`link ${styles.full}`}>View full cart</Link>
          </div>
        </>
      )}
    </Overlay>
  );
}
