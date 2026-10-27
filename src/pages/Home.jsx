import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Marquee from '../components/Marquee';
import Picture from '../components/Picture';
import Price from '../components/Price';
import ProductCard from '../components/ProductCard';
import Reveal from '../components/Reveal';
import { GridSkeleton } from '../components/Skeletons';
import { useSimulatedLoad } from '../hooks/useSimulatedLoad';
import { categories, displayTitle, getProduct, heroImage, products, stockNote } from '../data/products';
import { config } from '../config';
import { whatsappUrl } from '../utils/whatsapp';
import styles from './Home.module.css';

const tiles = { dresses: 'linen-wrap-dress', tops: 'graphic-baby-tee', trousers: 'wide-leg-trousers', bags: 'woven-market-bag' };
const words = ['New in', 'Linen', 'Cotton', 'Knits', 'Pay with M-Pesa', 'Order on WhatsApp'];
const steps = [
  ['01', 'Choose', 'Pick a size and colour, add to your cart. No account needed.',
    <path key="a" d="M5 8h14l-1 12H6zM9 8V6a3 3 0 0 1 6 0v2" />],
  ['02', 'Pay with M-Pesa', 'Follow the Till steps on your phone. You never enter your PIN on this site.',
    <g key="b"><rect x="7" y="3" width="10" height="18" /><path d="M11 17h2" /></g>],
  ['03', 'Confirm on WhatsApp', 'Your order opens as a ready message. The shop confirms stock and payment there.',
    <path key="c" d="M4 5h16v11H9l-5 4z" />],
];

const Line = ({ i, children }) => <span className={styles.line}><span style={{ '--i': i }}>{children}</span></span>;

export default function Home() {
  const loading = useSimulatedLoad('home', 350);
  const fresh = products.filter((p) => p.isNew).slice(0, 4);
  const feat = getProduct('linen-wrap-dress');
  const edit = ['linen-shirt-dress', 'linen-wrap-dress'].map(getProduct);
  return (
    <>
      <section className={styles.hero}>
        <div className={`container ${styles.heroGrid}`}>
          <div className={styles.copy}>
            <p className={`eyebrow ${styles.eyebrow}`}><i /> Long rains edit</p>
            <h1 className={styles.h1} aria-label="New in, cut for Nairobi weather.">
              <Line i={0}>New in,</Line><Line i={1}>cut for</Line><Line i={2}>Nairobi</Line><Line i={3}>weather<b>.</b></Line>
            </h1>
            <p className={styles.lead}>Linen, cotton and light knits from {config.merchant.name}. Order here, pay with M-Pesa, confirm on WhatsApp.</p>
            <div className={styles.cta}>
              <Button to="/shop?new=1" size="lg" arrow>Shop new in</Button>
              <Button to="/shop" size="lg" variant="secondary">Browse all</Button>
            </div>
            <ul className={styles.facts}>
              <li><span className="mono">KSh 300</span>Nairobi delivery</li>
              <li><span className="mono">1 to 2</span>days to your door</li>
              <li><span className="mono">7 days</span>free size exchange</li>
            </ul>
          </div>
          <div className={styles.visual}>
            <div className={styles.curtain}>
              <Picture src={heroImage} alt="Smiling woman in a taupe cotton tee carrying a canvas tote" tone="#d8cdb6" ratio="4 / 5" position="50% 30%" eager parallax className={styles.heroPic} />
            </div>
            <Link to={`/product/${feat.slug}`} className={`ticket ${styles.floatTicket}`}>
              <span className="eyebrow">Featured</span>
              <b>{displayTitle(feat)}</b>
              <Price price={feat.price} salePrice={feat.salePrice} />
              <span className={styles.tstock}>{stockNote(feat).text}</span>
              <span className={styles.tcta}>View piece <i>&rarr;</i></span>
            </Link>
          </div>
        </div>
      </section>

      <Reveal variant="fade" className={styles.words} aria-hidden="true"><Marquee items={words} seconds={46} outline /></Reveal>

      <section className={`container ${styles.section}`} aria-labelledby="cat-h">
        <Reveal className={styles.head}><p className="eyebrow">Shop by category</p><h2 id="cat-h" className={styles.h2}>Find your piece</h2></Reveal>
        <div className={styles.tiles}>
          {categories.map((c, i) => {
            const p = getProduct(tiles[c.slug]);
            return (
              <Reveal key={c.slug} delay={i * 90} variant="up">
                <Link to={`/shop?category=${c.slug}`} className={styles.tile} aria-label={`${c.name}, ${products.filter((x) => x.category === c.slug).length} pieces`}>
                  <Picture src={p.images[0]} alt="" tone={p.colours[0].tone} className={styles.tilePic} />
                  <span className={styles.tileLabel}><b>{c.name}</b><span className="mono">{products.filter((x) => x.category === c.slug).length}<i>&nearr;</i></span></span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className={`container ${styles.section}`} aria-labelledby="new-h">
        <Reveal className={styles.headRow}>
          <div><p className="eyebrow">This week</p><h2 id="new-h" className={styles.h2}>New arrivals</h2></div>
          <Link to="/shop?new=1" className="link ulink">View all {products.filter((p) => p.isNew).length}</Link>
        </Reveal>
        {loading ? <GridSkeleton count={4} /> : (
          <div className={styles.rail}>
            {fresh.map((p, i) => <Reveal key={p.slug} delay={i * 80}><ProductCard product={p} index={i} eager={i < 2} /></Reveal>)}
          </div>
        )}
      </section>

      <section className={styles.edit} aria-labelledby="edit-h">
        <div className={`container ${styles.editGrid}`}>
          <Reveal variant="clip" className={styles.editImg}>
            <Picture src={edit[0].images[0]} alt={`${edit[0].name} in a greenhouse`} tone={edit[0].colours[0].tone} parallax />
          </Reveal>
          <div className={styles.editCopy}>
            <Reveal><p className="eyebrow">The linen edit</p></Reveal>
            <Reveal delay={80}><h2 id="edit-h" className={styles.h2big}>Made for warm days and long afternoons.</h2></Reveal>
            <Reveal delay={160}><p className={styles.p}>Washed linen that softens with every wear. Belted, wrapped and cut to move when the weather turns.</p></Reveal>
            <Reveal delay={220}>
              <ul className={styles.mini}>
                {edit.map((p) => (
                  <li key={p.slug}>
                    <Link to={`/product/${p.slug}`}>
                      <Picture src={p.images[0]} alt="" tone={p.colours[0].tone} ratio="1 / 1" />
                      <span><b>{displayTitle(p)}</b><Price price={p.price} salePrice={p.salePrice} /></span>
                      <i aria-hidden="true">&rarr;</i>
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={280}><Button to="/shop?q=linen" arrow>Shop the edit</Button></Reveal>
          </div>
        </div>
      </section>

      <section className={`container ${styles.section}`} aria-labelledby="how-h">
        <Reveal className={styles.head}><p className="eyebrow">How ordering works</p><h2 id="how-h" className={styles.h2}>Three steps. No account.</h2></Reveal>
        <ol className={styles.steps}>
          {steps.map(([n, t, d, icon], i) => (
            <Reveal as="li" key={n} delay={i * 120}>
              <div className={`ticket ${styles.step}`}>
                <span className={`mono ${styles.num}`}>{n}</span>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" aria-hidden="true">{icon}</svg>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            </Reveal>
          ))}
        </ol>
        <p className={styles.honest}>Payments in this demo are simulated. The site never verifies or takes a payment.</p>
      </section>

      <section className={styles.band}>
        <div className={`container ${styles.bandGrid}`}>
          <Reveal><h2>Not sure about a size? Ask the shop.</h2></Reveal>
          <Reveal delay={100} className={styles.bandCta}>
            <Button href={whatsappUrl(`Hi ${config.merchant.name}, I have a question about sizing.`)} target="_blank" rel="noopener noreferrer" variant="accent" size="lg" arrow>Message on WhatsApp</Button>
            <Button to="/help" variant="secondary" size="lg" className={styles.ghost}>Delivery and payment</Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
