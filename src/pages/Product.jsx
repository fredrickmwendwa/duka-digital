import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import Button from '../components/Button';
import Gallery from '../components/Gallery';
import OptionChips from '../components/OptionChips';
import Price from '../components/Price';
import ProductCard from '../components/ProductCard';
import QuantityStepper from '../components/QuantityStepper';
import StickyBar from '../components/StickyBar';
import { ProductSkeleton } from '../components/Skeletons';
import NotFound from './NotFound';
import { useCart } from '../context/CartContext';
import { useUI } from '../context/UIContext';
import { useSimulatedLoad } from '../hooks/useSimulatedLoad';
import { categoryName, displayTitle, getProduct, products, sizeStock, stockNote, totalStock, unitPrice } from '../data/products';
import { askAboutUrl } from '../utils/whatsapp';
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

function Detail({ product }) {
  const { dispatch } = useCart();
  const { toast, open } = useUI();
  const oneSize = product.sizes.length === 1;
  const [colour, setColour] = useState(product.colours[0].name);
  const [size, setSize] = useState(oneSize && product.sizes[0].stock > 0 ? product.sizes[0].label : '');
  const [qty, setQty] = useState(1);
  const [error, setError] = useState('');
  const [inView, setInView] = useState(true);
  const cta = useRef(null);
  const sizeGroup = useRef(null);
  const soldOut = totalStock(product) === 0;
  const soldSizes = product.sizes.filter((s) => s.stock === 0).map((s) => s.label);
  const cap = size ? maxQty(product.slug, size) : config.maxQtyPerLine;
  const note = size ? stockNote(product, size) : stockNote(product);

  useEffect(() => {
    const el = cta.current;
    if (!el || !('IntersectionObserver' in window)) return undefined;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: '0px 0px -72px 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const add = () => {
    if (!size) { setError('Choose a size to add this to your cart.'); sizeGroup.current?.querySelector('button')?.focus(); return; }
    setError('');
    dispatch({ type: 'add', slug: product.slug, colour, size, qty });
    toast('Added to cart.', { action: { label: 'View cart', onClick: () => open('cart') } });
  };
  const label = soldOut ? 'Sold out' : `Add to cart, ${formatKSh(unitPrice(product) * qty)}`;
  const related = products.filter((p) => p.slug !== product.slug && p.category === product.category).concat(products.filter((p) => p.slug !== product.slug && p.category !== product.category)).slice(0, 4);

  return (
    <>
      <div className={styles.layout}>
        <Gallery product={product} colour={colour} />
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
              <div className={styles.optHead}><p className="eyebrow">Size{size ? `: ${size}` : ''}</p><a href="#details" className="link">Size guide</a></div>
              <OptionChips label="Size" value={size} onChange={(v) => { setSize(v); setError(''); setQty(1); }} options={product.sizes.map((s) => ({ value: s.label, label: s.label, disabled: s.stock === 0 }))} />
              {error && <p className={styles.error} role="alert"><span aria-hidden="true">&#9888; </span>{error}</p>}
            </div>
          )}

          <div className={styles.buy} ref={cta}>
            <QuantityStepper value={qty} onChange={setQty} max={Math.max(1, cap)} />
            <Button size="lg" className={styles.add} onClick={add} disabled={soldOut}>{label}</Button>
          </div>
          {soldSizes.length > 0 && (
            <a className="link" href={askAboutUrl(product, soldSizes)} target="_blank" rel="noopener noreferrer">Ask the shop about {soldSizes.join(', ')} on WhatsApp</a>
          )}

          <dl className={styles.rows}>
            <div><dt><b>Deliver in Nairobi</b><span>Arrives in 1 to 2 days</span></dt><dd className="mono">{formatKSh(config.deliveryFee)}</dd></div>
            <div><dt><b>Collect in Westlands</b><span>Ready in 24 hours</span></dt><dd className="mono">Free</dd></div>
            <div><dt><b>Pay with M-Pesa</b><span>Pay on your phone, then confirm the order on WhatsApp. No card needed.</span></dt></div>
          </dl>
          <section id="details" className={styles.details}>
            <p className="eyebrow">Details</p>
            <p>{product.description}</p>
            <p className={styles.fine}>{product.details}</p>
          </section>
        </div>
      </div>

      <section className={styles.related} aria-labelledby="rel-h">
        <h2 id="rel-h" className="sectionTitle">Goes well with</h2>
        <div className={styles.relGrid}>{related.map((p) => <ProductCard key={p.slug} product={p} />)}</div>
      </section>

      {!soldOut && (
        <StickyBar hidden={inView}>
          <div className={styles.sticky}>
            <QuantityStepper value={qty} onChange={setQty} max={Math.max(1, cap)} label="Quantity in sticky bar" />
            <Button size="lg" onClick={add} className={styles.add}>{label}</Button>
          </div>
        </StickyBar>
      )}
    </>
  );
}
