import Money from './Money';
import styles from './OrderSummary.module.css';

const Row = ({ a, b, num, strong }) => (
  <div className={`${styles.row} ${strong ? styles.total : ''}`}><span>{a}</span>{num != null ? <Money value={num} className={strong ? 'price' : styles.num} /> : <span className={strong ? 'price' : styles.num}>{b}</span>}</div>
);

/** Totals block. `lines` adds the item list (checkout steps); without it only the sums show (cart). */
export function SummaryBody({ lines, totals, fulfilment }) {
  return (
    <div>
      {lines?.filter((l) => l.available).map((l) => <Row key={l.id} a={`${l.qty}x ${l.product.name}, ${l.colour}, ${l.size}`} num={l.lineTotal} />)}
      {!lines && <Row a={`Subtotal (${totals.itemCount} ${totals.itemCount === 1 ? 'item' : 'items'})`} num={totals.subtotal} />}
      <Row a={fulfilment === 'deliver' ? 'Delivery, Nairobi' : 'Collection'} num={fulfilment === 'deliver' ? totals.deliveryFee : null} b="Free" />
      <Row a="Total" num={totals.total} strong />
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
      <summary><b>Order summary</b><Money value={totals.total} className="price" /></summary>
      <SummaryBody lines={lines} totals={totals} fulfilment={fulfilment} />
    </details>
  );
}
