import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Picture from '../components/Picture';
import ProductCard from '../components/ProductCard';
import { GridSkeleton } from '../components/Skeletons';
import { useSimulatedLoad } from '../hooks/useSimulatedLoad';
import { categories, heroImage, products } from '../data/products';
import { config } from '../config';
import styles from './Home.module.css';

const info = [
  ['Delivery', 'Nairobi KSh 300, 1 to 2 days. Other areas quoted on WhatsApp. Collect free in Westlands.'],
  ['Pay', 'Lipa na M-Pesa. You pay on your phone, the shop confirms on WhatsApp.'],
  ['Exchange', 'Free size exchange within 7 days, tags on.'],
];

export default function Home() {
  const loading = useSimulatedLoad('home', 350);
  const fresh = products.filter((p) => p.isNew).slice(0, 4);
  return (
    <>
      <section className={`container ${styles.hero}`}>
        <div className={styles.copy}>
          <p className="eyebrow">Long rains edit</p>
          <h1>New in, cut for Nairobi weather.</h1>
          <p className={styles.lead}>Linen, cotton and light knits from {config.merchant.name}. Order here, pay with M-Pesa, confirm on WhatsApp.</p>
          <div className={styles.cta}>
            <Button to="/shop?new=1">Shop new in</Button>
            <Button to="/shop" variant="secondary">Browse all</Button>
          </div>
        </div>
        <Picture src={heroImage} alt="Model wearing a sand linen wrap dress" tone="#d8cdb6" ratio="5 / 4" eager caption="Photo 5:4 hero" />
      </section>

      <nav aria-label="Categories" className={styles.cats}>
        <div className={`container ${styles.catRow}`}>
          {[{ slug: '', name: 'All' }, ...categories].map((c) => (
            <Link key={c.name} to={c.slug ? `/shop?category=${c.slug}` : '/shop'}>
              {c.name} <span className="mono">{c.slug ? products.filter((p) => p.category === c.slug).length : products.length}</span>
            </Link>
          ))}
        </div>
      </nav>

      <section className={`container ${styles.section}`} aria-labelledby="new-h">
        <div className={styles.sectionHead}>
          <h2 id="new-h" className="sectionTitle">New this week</h2>
          <Link to="/shop?new=1" className="link">View all {products.filter((p) => p.isNew).length}</Link>
        </div>
        {loading ? <GridSkeleton count={4} /> : <div className={styles.grid}>{fresh.map((p, i) => <ProductCard key={p.slug} product={p} eager={i < 2} />)}</div>}
      </section>

      <section className={styles.info} aria-label="Delivery, payment and exchanges">
        <div className={`container ${styles.infoGrid}`}>
          {info.map(([h, t]) => <div key={h}><p className="eyebrow">{h}</p><p>{t}</p></div>)}
        </div>
      </section>
    </>
  );
}
