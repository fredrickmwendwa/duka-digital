import { Link } from 'react-router-dom';
import Overlay from './Overlay';
import Button from './Button';
import { categories, products } from '../data/products';
import { config } from '../config';
import { whatsappUrl } from '../utils/whatsapp';
import { useUI } from '../context/UIContext';
import styles from './MobileMenu.module.css';

export default function MobileMenu() {
  const { panel, close } = useUI();
  const count = (slug) => products.filter((p) => p.category === slug).length;
  const rows = [{ to: '/shop?new=1', name: 'New in', n: products.filter((p) => p.isNew).length }, ...categories.map((c) => ({ to: `/shop?category=${c.slug}`, name: c.name, n: count(c.slug) }))];
  return (
    <Overlay open={panel === 'menu'} onClose={close} label="Menu" placement="left" width="420px">
      <div className={styles.head}>
        <b>{config.merchant.name}</b>
        <button type="button" className={styles.close} onClick={close} aria-label="Close menu">&times;</button>
      </div>
      <nav aria-label="Shop" className={styles.list}>
        {rows.map((r) => <Link key={r.name} to={r.to} onClick={close} className={styles.row}><span>{r.name}</span><span className="mono">{r.n}</span></Link>)}
      </nav>
      <nav aria-label="Help" className={styles.help}>
        <p className="eyebrow">Help</p>
        <Link to="/help" onClick={close} className="link">Delivery and payment</Link>
        <Link to="/help#exchanges" onClick={close} className="link">Exchanges</Link>
      </nav>
      <div className={styles.foot}>
        <Button variant="primary" size="lg" block href={whatsappUrl(`Hi ${config.merchant.name}, I have a question.`)} target="_blank" rel="noopener noreferrer">Message the shop on WhatsApp</Button>
      </div>
    </Overlay>
  );
}
