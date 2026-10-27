import Breadcrumbs from '../components/Breadcrumbs';
import Button from '../components/Button';
import CartLine from '../components/CartLine';
import EmptyState from '../components/EmptyState';
import OptionChips from '../components/OptionChips';
import { SummaryBody } from '../components/OrderSummary';
import StickyBar from '../components/StickyBar';
import { LineSkeleton } from '../components/Skeletons';
import { useOrder } from '../hooks/useOrder';
import { useSimulatedLoad } from '../hooks/useSimulatedLoad';
import Money from '../components/Money';
import { formatKSh, plural } from '../utils/format';
import { config } from '../config';
import styles from './Cart.module.css';

export default function Cart() {
  const { lines, checkout, dispatch, totals } = useOrder();
  const loading = useSimulatedLoad('cart', 250);
  const blocked = lines.length === 0 || lines.some((l) => !l.available);
  const checkoutBtn = (props) => <Button to={blocked ? undefined : '/checkout'} aria-disabled={blocked || undefined} onClick={blocked ? (e) => e.preventDefault() : undefined} size="lg" block {...props}>Checkout</Button>;

  return (
    <div className="container">
      <Breadcrumbs trail={[{ label: 'Home', to: '/' }, { label: 'Cart' }]} />
      <h1 className="pageTitle">Your cart <span className={styles.count}>{plural(totals.itemCount, 'item')}</span></h1>
      {loading ? <div className={styles.layout}><div><LineSkeleton /><LineSkeleton /></div></div> : lines.length === 0 ? (
        <div className={styles.empty}><EmptyState title="Your cart is empty" action={<Button to="/shop?new=1">Shop new in</Button>}>Pieces you add will wait here. Your cart is saved on this device.</EmptyState></div>
      ) : (
        <div className={styles.layout}>
          <div>
            <ul className={styles.lines}>{lines.map((l) => <CartLine key={l.id} line={l} />)}</ul>
            <Button to="/shop" variant="secondary" className={styles.cont}>Continue shopping</Button>
          </div>
          <aside className={styles.summary} aria-label="Order summary">
            <p className="eyebrow">Order summary</p>
            <div className={styles.fulfil}>
              <OptionChips label="Delivery or collection" value={checkout.fulfilment} onChange={(v) => dispatch({ type: 'patch', patch: { fulfilment: v } })}
                options={[{ value: 'deliver', label: `Deliver, ${formatKSh(config.deliveryFee)}` }, { value: 'collect', label: 'Collect, free' }]} />
            </div>
            <SummaryBody totals={totals} fulfilment={checkout.fulfilment} />
            <div className={styles.desktopCta}>{checkoutBtn()}</div>
            <p className={styles.fine}>You pay with M-Pesa next. Nothing is charged on this site. Demo store.</p>
          </aside>
          <StickyBar>
            <div className={styles.bar}><b>Total</b><Money value={totals.total} className="price" /></div>
            {checkoutBtn()}
          </StickyBar>
        </div>
      )}
    </div>
  );
}
