import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Accordion from '../components/Accordion';
import Breadcrumbs from '../components/Breadcrumbs';
import Button from '../components/Button';
import Gallery from '../components/Gallery';
import OptionChips from '../components/OptionChips';
import Price from '../components/Price';
import ProductCard from '../components/ProductCard';
import QuantityStepper from '../components/QuantityStepper';
import Reveal from '../components/Reveal';
import SizeGuide from '../components/SizeGuide';
import StickyBar from '../components/StickyBar';
import { ProductSkeleton } from '../components/Skeletons';
import NotFound from './NotFound';
import { useCart } from '../context/CartContext';
import { useUI } from '../context/UIContext';
import { useSimulatedLoad } from '../hooks/useSimulatedLoad';
import { categoryName, displayTitle, getProduct, products, stockNote, totalStock, unitPrice } from '../data/products';
import { askAboutUrl } from '../utils/whatsapp';
import { flyToCart } from '../utils/fly';
import { formatKSh } from '../utils/format';
import { maxQty } from '../utils/order';
import { config } from '../config';
import styles from './Product.module.css';

export default function Product() {
  const { slug } = useParams();
  const product = getProduct(slug);
  const loading = useSimulatedLoad(slug, 350);
  if (!product) return <NotFound />;
  return (
    <div className="container">
      <Breadcrumbs trail={[{ label: 'Home', to: '/' }, { label: categoryName(product.category), to: `/shop?category=${product.category}` }, { label: product.name }]} />
      {loading ? <ProductSkeleton /> : <Detail key={slug} product={product} />}
    </div>
  );
}

const Trust = ({ d, children }) => (
  <li><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" aria-hidden="true"><path d={d} /></svg><span>{children}</span></li>
);

function Detail({ product }) {
  const { dispatch } = useCart();
  const { toast, open } = useUI();
  const oneSize = product.sizes.length === 1;
  const [colour, setColour] = useState(product.colours[0].name);
  const [size, setSize] = useState(oneSize && product.sizes[0].stock > 0 ? product.sizes[0].label : '');
  const [qty, setQty] = useState(1);
  const [error, setError] = useState('');
  const [inView, setInView] = useState(true);
  const [added, setAdded] = useState(false);
  const [guide, setGuide] = useState(false);
  const cta = useRef(null);
  const sizeGroup = useRef(null);
  const timer = useRef();
  const soldOut = totalStock(product) === 0;
  const soldSizes = product.sizes.filter((s) => s.stock === 0).map((s) => s.label);
  const cap = size ? maxQty(product.slug, size) : config.maxQtyPerLine;
  const note = size ? stockNote(product, size) : stockNote(product);
  const tone = product.colours.find((c) => c.name === colour)?.tone;

  useEffect(() => () => clearTimeout(timer.current), []);
  useEffect(() => {
    const el = cta.current;
    if (!el || !('IntersectionObserver' in window)) return undefined;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: '0px 0px -72px 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const add = (e) => {
    if (!size) { setError('Choose a size to add this to your cart.'); sizeGroup.current?.querySelector('button')?.focus(); return; }
    setError('');
    dispatch({ type: 'add', slug: product.slug, colour, size, qty });
    flyToCart(e.currentTarget, product.images[0], tone);
    setAdded(true); clearTimeout(timer.current); timer.current = setTimeout(() => setAdded(false), 1800);
    toast('Added to cart.', { action: { label: 'View cart', onClick: () => open('cart') } });
  };
  const label = soldOut ? 'Sold out' : added ? '\u2713 Added to cart' : `Add to cart, ${formatKSh(unitPrice(product) * qty)}`;
  const related = products.filter((p) => p.slug !== product.slug && p.category === product.category).concat(products.filter((p) => p.slug !== product.slug && p.category !== product.category)).slice(0, 4);

  return (
    <>
      <div className={styles.layout}>
        <Reveal variant="fade" className={styles.gal}><Gallery product={product} colour={colour} /></Reveal>
        <div className={styles.info}>
          <p className="eyebrow">{product.isNew ? 'New in' : categoryName(product.category)}</p>
          <h1 className={styles.title}>{displayTitle(product, colour)}</h1>
          <div className={styles.priceRow}>
            <Price price={product.price} salePrice={product.salePrice} size="lg" />
            {product.salePrice != null && <span className={styles.save}>SAVE {formatKSh(product.price - product.salePrice)}</span>}
          </div>
          <p className={`${styles.stock} ${styles[note.tone]}`} aria-live="polite">{note.text}</p>

          {product.colours.length > 1 && (
            <div className={styles.opt}>
              <p className="eyebrow">Colour: {colour}</p>
              <OptionChips label="Colour" value={colour} onChange={setColour} options={product.colours.map((c) => ({ value: c.name, label: c.name }))} />
            </div>
          )}
          {!oneSize && (
            <div className={styles.opt} ref={sizeGroup}>
              <div className={styles.optHead}><p className="eyebrow">Size{size ? `: ${size}` : ''}</p><button type="button" className="link" onClick={() => setGuide(true)}>Size guide</button></div>
              <OptionChips label="Size" value={size} onChange={(v) => { setSize(v); setError(''); setQty(1); }} options={product.sizes.map((s) => ({ value: s.label, label: s.label, disabled: s.stock === 0 }))} />
              {error && <p className={styles.error} role="alert"><span aria-hidden="true">&#9888; </span>{error}</p>}
            </div>
          )}

          <div className={styles.buy} ref={cta}>
            <QuantityStepper value={qty} onChange={setQty} max={Math.max(1, cap)} />
            <Button size="lg" className={`${styles.add} ${added ? styles.done : ''}`} onClick={add} disabled={soldOut}>{label}</Button>
          </div>
          {soldSizes.length > 0 && (
            <a className="link ulink" href={askAboutUrl(product, soldSizes)} target="_blank" rel="noopener noreferrer">Ask the shop about {soldSizes.join(', ')} on WhatsApp</a>
          )}

          <ul className={styles.trust}>
            <Trust d="M7 3h10v18H7zM11 17h2">Pay with M-Pesa</Trust>
            <Trust d="M4 5h16v11H9l-5 4z">Order on WhatsApp</Trust>
            <Trust d="M4 12a8 8 0 0 1 14-5l2-2v6h-6l2-2a5 5 0 1 0 1 5">7-day size exchange</Trust>
          </ul>

          <div className={styles.acc}>
            <Accordion title="Details" defaultOpen>
              <p>{product.description}</p>
              <p className={styles.fine}>{product.details}</p>
            </Accordion>
            <Accordion title="Delivery and collection">
              <div className={styles.rowx}><span><b>Deliver in Nairobi</b><br />Arrives in 1 to 2 days</span><span className="mono">{formatKSh(config.deliveryFee)}</span></div>
              <div className={styles.rowx}><span><b>Collect in Westlands</b><br />Ready in 24 hours</span><span className="mono">Free</span></div>
              <p className={styles.fine}>Other areas are quoted by the shop on WhatsApp.</p>
            </Accordion>
            <Accordion title="Paying with M-Pesa">
              <p>Pay on your phone with Lipa na M-Pesa, then confirm the order on WhatsApp. No card needed. This demo never takes or verifies a payment.</p>
            </Accordion>
            <Accordion title="Exchanges">
              <p>Free size exchange within 7 days if tags are on. Message the shop with your order reference.</p>
            </Accordion>
          </div>
        </div>
      </div>

      <section className={styles.related} aria-labelledby="rel-h">
        <Reveal><h2 id="rel-h" className={styles.relTitle}>Goes well with</h2></Reveal>
        <div className={styles.relGrid}>{related.map((p, i) => <Reveal key={p.slug} delay={i * 80}><ProductCard product={p} /></Reveal>)}</div>
      </section>

      {!soldOut && (
        <StickyBar hidden={inView}>
          <div className={styles.sticky}>
            <QuantityStepper value={qty} onChange={setQty} max={Math.max(1, cap)} label="Quantity in sticky bar" />
            <Button size="lg" onClick={add} className={`${styles.add} ${added ? styles.done : ''}`}>{label}</Button>
          </div>
        </StickyBar>
      )}
      <SizeGuide open={guide} onClose={() => setGuide(false)} highlight={size} />
    </>
  );
}
