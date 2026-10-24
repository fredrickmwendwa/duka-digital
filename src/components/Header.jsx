import { Link, NavLink, useSearchParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useUI } from '../context/UIContext';
import { categories } from '../data/products';
import { config } from '../config';
import styles from './Header.module.css';

const Icon = ({ d, children }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" aria-hidden="true">{children || <path d={d} />}</svg>
);

export default function Header() {
  const { count } = useCart();
  const { open } = useUI();
  const [sp] = useSearchParams();
  const cat = sp.get('category');
  const isNew = sp.get('new') === '1';
  return (
    <header className={styles.header}>
      <div className={`container ${styles.row}`}>
        <button type="button" className={`${styles.icon} ${styles.menuBtn}`} onClick={() => open('menu')} aria-label="Open menu"><Icon d="M4 7h16M4 12h16M4 17h16" /></button>
        <Link to="/" className={styles.brand}>{config.merchant.name}</Link>
        <nav aria-label="Main" className={styles.nav}>
          <NavLink to="/shop?new=1" className={isNew ? styles.active : ''}>New in</NavLink>
          {categories.map((c) => <NavLink key={c.slug} to={`/shop?category=${c.slug}`} className={cat === c.slug ? styles.active : ''}>{c.name}</NavLink>)}
        </nav>
        <span className={styles.spacer} />
        <button type="button" className={styles.icon} onClick={() => open('search')} aria-label="Search products"><Icon><circle cx="11" cy="11" r="6" /><path d="M16 16l5 5" /></Icon></button>
        <button type="button" className={styles.icon} onClick={() => open('cart')} aria-label={`Open cart, ${count} ${count === 1 ? 'item' : 'items'}`}>
          <Icon><path d="M5 8h14l-1 12H6z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></Icon>
          {count > 0 && <span key={count} className={styles.count}>{count}</span>}
        </button>
      </div>
    </header>
  );
}
