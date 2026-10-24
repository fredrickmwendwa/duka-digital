import { formatKSh } from '../utils/format';
import styles from './OrderSummary.module.css';

const Row = ({ a, b, strong }) => (
  <div className={`${styles.row} ${strong ? styles.total : ''}`}><span>{a}</span><span className={strong ? 'price' : styles.num}>{b}</span></div>
);

/** Totals block. `lines` adds the item list (checkout steps); without it only the sums show (cart). */
export function SummaryBody({ lines, totals, fulfilment }) {
  return (
    <div>
      {lines?.filter((l) => l.available).map((l) => <Row key={l.id} a={`${l.qty}x ${l.product.name}, ${l.colour}, ${l.size}`} b={formatKSh(l.lineTotal)} />)}
      {!lines && <Row a={`Subtotal (${totals.itemCount} ${totals.itemCount === 1 ? 'item' : 'items'})`} b={formatKSh(totals.subtotal)} />}
      <Row a={fulfilment === 'deliver' ? 'Delivery, Nairobi' : 'Collection'} b={fulfilment === 'deliver' ? formatKSh(totals.deliveryFee) : 'Free'} />
      <Row a="Total" b={formatKSh(totals.total)} strong />
    </div>
  );
}

export default function OrderSummary({ title, lines, totals, fulfilment }) {
  return (
    <aside className={styles.box} aria-label="Order summary">
      {title && <p className="eyebrow">{title}</p>}
      <SummaryBody lines={lines} totals={totals} fulfilment={fulfilment} />
    </aside>
  );
}

/** Collapsed on phones: shows only the total until opened. */
export function SummaryDisclosure({ lines, totals, fulfilment }) {
  return (
    <details className={styles.disclosure}>
      <summary><b>Order summary</b><span className="price">{formatKSh(totals.total)}</span></summary>
      <SummaryBody lines={lines} totals={totals} fulfilment={fulfilment} />
    </details>
  );
}
