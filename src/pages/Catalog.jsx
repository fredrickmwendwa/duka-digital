import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import Button from '../components/Button';
import EmptyState from '../components/EmptyState';
import FilterPanel from '../components/FilterPanel';
import FilterSheet from '../components/FilterSheet';
import ProductCard from '../components/ProductCard';
import { GridSkeleton } from '../components/Skeletons';
import { useSimulatedLoad } from '../hooks/useSimulatedLoad';
import Reveal from '../components/Reveal';
import { categories, categoryName } from '../data/products';
import { activeCount, applyFilters, readFilters, sortOptions } from '../utils/catalog';
import { plural } from '../utils/format';
import styles from './Catalog.module.css';

const PAGE = 9;

export default function Catalog() {
  const [sp, setSp] = useSearchParams();
  const f = readFilters(sp);
  const key = sp.toString();
  const first = useSimulatedLoad('catalog-first', 450);
  const busy = useSimulatedLoad(key, 220);
  const [visible, setVisible] = useState(PAGE);
  const [sheet, setSheet] = useState(false);
  useEffect(() => setVisible(PAGE), [key]);

  const results = useMemo(() => applyFilters(f), [key]); // eslint-disable-line react-hooks/exhaustive-deps
  const n = activeCount(f);
  const update = (patch) => {
    const next = new URLSearchParams(sp);
    Object.entries({ ...patch, ...(patch.isNew !== undefined ? { new: patch.isNew ? '1' : '' } : {}) }).forEach(([k, v]) => {
      if (k === 'isNew') return;
      const val = v === true ? '1' : v === false ? '' : v;
      if (val && !(k === 'sort' && val === 'newest')) next.set(k, val); else next.delete(k);
    });
    setSp(next, { replace: true });
  };
  const clearFilters = () => { const next = new URLSearchParams(); if (f.q) next.set('q', f.q); if (f.sort !== 'newest') next.set('sort', f.sort); setSp(next, { replace: true }); };
  const clearAll = () => setSp(new URLSearchParams(), { replace: true });

  const title = f.q ? `Results for "${f.q}"` : f.isNew ? 'New in' : f.category ? categoryName(f.category) : 'All pieces';
  const shown = results.slice(0, visible);

  return (
    <div className="container">
      <Breadcrumbs trail={[{ label: 'Home', to: '/' }, { label: 'Shop', to: '/shop' }, ...(title !== 'All pieces' ? [{ label: title }] : [])]} />
      <Reveal variant="fade" className={styles.titleRow}>
        <div>
          <p className="eyebrow">Nyota Atelier / Shop</p>
          <h1 className={styles.h1}>{title}<sup className="mono">{first ? '' : results.length}</sup></h1>
        </div>
        <form role="search" className={styles.search} onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="cat-q" className="srOnly">Search products</label>
          <input id="cat-q" type="search" placeholder="Search dresses, tops, bags" value={f.q} onChange={(e) => update({ q: e.target.value })} autoComplete="off" />
          {f.q && <button type="button" className={styles.clearQ} aria-label="Clear search" onClick={() => update({ q: '' })}>&times;</button>}
        </form>
      </Reveal>
      <nav aria-label="Categories" className={styles.chips}>
        {[{ label: 'All', to: '/shop', on: !f.category && !f.isNew }, { label: 'New in', to: '/shop?new=1', on: f.isNew }, ...categories.map((c) => ({ label: c.name, to: `/shop?category=${c.slug}`, on: f.category === c.slug }))].map((c) => (
          <Link key={c.label} to={c.to} aria-current={c.on ? 'true' : undefined} className={c.on ? styles.chipOn : ''}>{c.label}</Link>
        ))}
      </nav>

      <div className={styles.layout}>
        <aside className={styles.side} aria-label="Filters"><FilterPanel filters={f} onChange={update} idp="side" /></aside>
        <div className={styles.main}>
          <div className={styles.toolbar}>
            <button type="button" className={`${styles.filterBtn}`} onClick={() => setSheet(true)}>Filter{n ? ` (${n})` : ''}</button>
            <div className={styles.sort}>
              <label htmlFor="sort" className="srOnly">Sort by</label>
              <select id="sort" value={f.sort} onChange={(e) => update({ sort: e.target.value })}>
                {sortOptions.map((o) => <option key={o.value} value={o.value}>Sort: {o.label}</option>)}
              </select>
            </div>
          </div>
          <div className={styles.count} aria-live="polite">
            <span className="mono">{first ? 'Loading...' : busy ? 'Searching...' : plural(results.length, 'piece')}</span>
            {(n > 0 || f.q) && <button type="button" className="link" onClick={n > 0 ? clearFilters : clearAll}>{n > 0 ? 'Clear filters' : 'Clear search'}</button>}
          </div>

          {first ? <GridSkeleton count={6} /> : results.length === 0 ? (
            <EmptyState title={f.q ? `No pieces match "${f.q}"` : 'No pieces match these filters'} action={<Button variant="secondary" onClick={clearAll}>Clear search and filters</Button>}>
              Check the spelling, remove a filter, or browse a category.
            </EmptyState>
          ) : (
            <>
              <div className={`${styles.grid} ${busy ? styles.dim : ''}`} aria-busy={busy}>{shown.map((p, i) => <ProductCard key={p.slug} product={p} index={i} eager={i < 4} enter />)}</div>
              <div className={styles.more}>
                <p className="mono">Showing {shown.length} of {results.length}</p>
                {visible < results.length && <Button variant="secondary" onClick={() => setVisible((v) => v + PAGE)}>Load more</Button>}
              </div>
            </>
          )}
        </div>
      </div>
      <FilterSheet open={sheet} onClose={() => setSheet(false)} filters={f} onChange={update} onReset={clearFilters} resultCount={results.length} />
    </div>
  );
}
