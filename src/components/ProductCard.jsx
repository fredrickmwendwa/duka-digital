import { Link } from 'react-router-dom';
import Picture from './Picture';
import Price from './Price';
import { displayTitle, stockNote, totalStock } from '../data/products';
import styles from './ProductCard.module.css';

export default function ProductCard({ product, eager, index = 0, enter }) {
  const out = totalStock(product) === 0;
  const note = stockNote(product);
  const colour = product.colours[0];
  return (
    <Link to={`/product/${product.slug}`} className={`${styles.card} ${enter ? styles.enter : ''}`} style={{ '--i': index % 9 }} aria-label={`${displayTitle(product)}, ${note.text}`}>
      <div className={styles.media}>
        <Picture src={product.images[0]} alt="" tone={colour.tone} eager={eager} className={styles.pic} />
        {product.salePrice != null && !out && <span className={styles.tag}>SALE</span>}
        {product.isNew && !out && product.salePrice == null && <span className={`${styles.tag} ${styles.new}`}>NEW</span>}
        {out && <span className={styles.outBand}>SOLD OUT</span>}
        {!out && <span className={styles.view} aria-hidden="true">View <i>&rarr;</i></span>}
      </div>
      <h3 className={`${styles.name} ${out ? styles.muted : ''}`}>{displayTitle(product)}</h3>
      <div className={styles.row}>
        <Price price={product.price} salePrice={product.salePrice} />
        {product.colours.length > 1 && (
          <span className={styles.dots} aria-hidden="true">{product.colours.map((c) => <i key={c.name} style={{ background: c.swatch }} />)}</span>
        )}
      </div>
      <p className={`${styles.stock} ${styles[note.tone]}`}>{note.text}</p>
    </Link>
  );
}
