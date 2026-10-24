import { Link } from 'react-router-dom';
import Picture from './Picture';
import Price from './Price';
import { displayTitle, stockNote, totalStock } from '../data/products';
import styles from './ProductCard.module.css';

export default function ProductCard({ product, eager }) {
  const out = totalStock(product) === 0;
  const note = stockNote(product);
  const colour = product.colours[0];
  return (
    <Link to={`/product/${product.slug}`} className={styles.card} aria-label={`${displayTitle(product)}, ${note.text}`}>
      <div className={styles.media}>
        <Picture src={product.images[0]} alt="" tone={colour.tone} eager={eager} className={styles.pic} />
        {product.salePrice != null && !out && <span className={styles.tag}>SALE</span>}
        {out && <span className={styles.out}>SOLD OUT</span>}
      </div>
      <h3 className={`${styles.name} ${out ? styles.muted : ''}`}>{displayTitle(product)}</h3>
      <Price price={product.price} salePrice={product.salePrice} />
      <p className={`${styles.stock} ${styles[note.tone]}`}>{note.text}</p>
    </Link>
  );
}
