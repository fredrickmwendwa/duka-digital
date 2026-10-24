import { categories, products } from '../data/products';
import OptionChips from './OptionChips';
import styles from './FilterPanel.module.css';

const SIZES = ['XS', 'S', 'M', 'L', 'XL'];

/** Shared by the desktop sidebar and the mobile bottom sheet so behaviour never drifts. */
export default function FilterPanel({ filters, onChange, idp = 'f' }) {
  const count = (slug) => products.filter((p) => p.category === slug).length;
  return (
    <div className={styles.panel}>
      <fieldset className={styles.group}>
        <legend className="eyebrow">Category</legend>
        {[{ slug: '', name: 'All', n: products.length }, ...categories.map((c) => ({ ...c, n: count(c.slug) }))].map((c) => (
          <label key={c.slug || 'all'} className={styles.radio}>
            <input type="radio" name={`${idp}-cat`} checked={filters.category === c.slug} onChange={() => onChange({ category: c.slug })} />
            <span>{c.name}</span><span className="mono">{c.n}</span>
          </label>
        ))}
      </fieldset>
      <fieldset className={styles.group}>
        <legend className="eyebrow">Price (KSh)</legend>
        <div className={styles.price}>
          <label><span>Min</span><input inputMode="numeric" pattern="[0-9]*" placeholder="1,200" value={filters.min} onChange={(e) => onChange({ min: e.target.value.replace(/\D/g, '') })} /></label>
          <label><span>Max</span><input inputMode="numeric" pattern="[0-9]*" placeholder="9,500" value={filters.max} onChange={(e) => onChange({ max: e.target.value.replace(/\D/g, '') })} /></label>
        </div>
      </fieldset>
      <fieldset className={styles.group}>
        <legend className="eyebrow">Size</legend>
        <OptionChips label="Size" options={SIZES.map((s) => ({ value: s, label: s }))} value={filters.size} onChange={(v) => onChange({ size: filters.size === v ? '' : v })} />
      </fieldset>
      <label className={styles.toggle}>
        <span>In stock only</span>
        <input type="checkbox" role="switch" checked={filters.stock} onChange={(e) => onChange({ stock: e.target.checked })} />
      </label>
    </div>
  );
}
