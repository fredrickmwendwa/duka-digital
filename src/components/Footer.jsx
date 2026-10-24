import { Link } from 'react-router-dom';
import { Monogram } from './Logo';
import { config } from '../config';
import { categories } from '../data/products';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div>
          <p className={styles.brand}>{config.merchant.name}</p>
          <p className={styles.dim}>Demo boutique. All products, prices and contact details are demonstration data.</p>
        </div>
        <nav aria-label="Shop">
          <p className={styles.head}>Shop</p>
          <ul>
            <li><Link to="/shop?new=1">New in</Link></li>
            {categories.map((c) => <li key={c.slug}><Link to={`/shop?category=${c.slug}`}>{c.name}</Link></li>)}
          </ul>
        </nav>
        <nav aria-label="Help">
          <p className={styles.head}>Help</p>
          <ul>
            <li><Link to="/help">Delivery and payment</Link></li>
            <li><Link to="/help#exchanges">Exchanges</Link></li>
            <li><span className={styles.dim}>WhatsApp +{config.merchant.whatsapp} (demo)</span></li>
          </ul>
        </nav>
      </div>
      <div className={`container ${styles.base}`}>
        <Monogram size={24} dark />
        <span className={styles.word}>duka.digital</span>
        <span className={styles.dim}>Storefront by Duka Digital</span>
      </div>
    </footer>
  );
}
