import { Link } from 'react-router-dom';
import Picture from './Picture';
import QuantityStepper from './QuantityStepper';
import { useCart } from '../context/CartContext';
import { useUI } from '../context/UIContext';
import { formatKSh } from '../utils/format';
import { maxQty } from '../utils/order';
import styles from './CartLine.module.css';

export default function CartLine({ line, onNavigate }) {
  const { dispatch } = useCart();
  const { toast } = useUI();
  const { product } = line;
  const setQty = (qty) => { dispatch({ type: 'setQty', id: line.id, qty }); toast(`${product.name} quantity: ${qty}`, { duration: 2200 }); };
  const remove = () => {
    dispatch({ type: 'remove', id: line.id });
    toast(`${product.name} removed.`, { action: { label: 'Undo', onClick: () => dispatch({ type: 'undo' }) } });
  };
  const tone = product.colours.find((c) => c.name === line.colour)?.tone;
  return (
    <li className={styles.line}>
      <Link to={`/product/${product.slug}`} onClick={onNavigate} className={styles.thumb} tabIndex={-1} aria-hidden="true">
        <Picture src={product.images[0]} alt="" tone={tone} ratio="1 / 1" />
      </Link>
      <div className={styles.body}>
        <div className={styles.head}>
          <Link to={`/product/${product.slug}`} onClick={onNavigate} className={styles.name}>{product.name}</Link>
          <span className="price">{formatKSh(line.lineTotal)}</span>
        </div>
        <p className={styles.meta}>{line.colour} / {line.size}</p>
        <p className={styles.meta}>{formatKSh(line.unitPrice)} each</p>
        {line.available ? (
          <div className={styles.controls}>
            <QuantityStepper value={line.qty} onChange={setQty} max={maxQty(line.product.slug, line.size)} label={`Quantity of ${product.name}`} />
            <button type="button" className="link" onClick={remove} aria-label={`Remove ${product.name}`}>Remove</button>
          </div>
        ) : (
          <div className={styles.controls}>
            <p className={styles.gone} role="alert">No longer available. Remove it to continue.</p>
            <button type="button" className="link" onClick={remove} aria-label={`Remove ${product.name}`}>Remove</button>
          </div>
        )}
      </div>
    </li>
  );
}
