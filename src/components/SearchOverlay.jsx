import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Overlay from './Overlay';
import Picture from './Picture';
import { useUI } from '../context/UIContext';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { products, displayTitle, stockNote } from '../data/products';
import { matchesQuery } from '../utils/catalog';
import { formatKSh } from '../utils/format';
import styles from './SearchOverlay.module.css';

const popular = ['Linen dress', 'Tote', 'Trousers'];

export default function SearchOverlay() {
  const { panel, close } = useUI();
  const [q, setQ] = useState('');
  const navigate = useNavigate();
  const desktop = useMediaQuery('(min-width: 900px)');
  const query = q.trim();
  const results = useMemo(() => (query ? products.filter((p) => matchesQuery(p, query)) : []), [query]);
  const go = (term) => { close(); navigate(`/shop?q=${encodeURIComponent(term)}`); };
  const submit = (e) => { e.preventDefault(); if (query) go(query); };

  return (
    <Overlay open={panel === 'search'} onClose={close} label="Search products" placement={desktop ? 'top' : 'full'}>
      <form role="search" onSubmit={submit} className={styles.bar}>
        <label className="srOnly" htmlFor="site-search">Search products</label>
        <input id="site-search" data-autofocus className={styles.input} type="search" placeholder="Search dresses, tops, bags" value={q} onChange={(e) => setQ(e.target.value)} autoComplete="off" enterKeyHint="search" />
        <button type="button" className="link" onClick={close}>Cancel</button>
      </form>
      <div className={styles.body} aria-live="polite">
        {query ? (
          <>
            <p className="eyebrow">{results.length} {results.length === 1 ? 'match' : 'matches'}</p>
            {results.length === 0 && <p className={styles.none}>No pieces match "{query}". Check the spelling or browse a category.</p>}
            <ul>
              {results.slice(0, 4).map((p) => (
                <li key={p.slug}>
                  <Link to={`/product/${p.slug}`} onClick={close} className={styles.row}>
                    <Picture src={p.images[0]} alt="" tone={p.colours[0].tone} />
                    <span><b>{displayTitle(p)}</b><small>{stockNote(p).text}</small></span>
                    <span className="price">{formatKSh(p.salePrice ?? p.price)}</span>
                  </Link>
                </li>
              ))}
            </ul>
            {results.length > 0 && <button type="button" className="link" onClick={() => go(query)}>See all results for "{query}"</button>}
          </>
        ) : (
          <>
            <p className="eyebrow">Popular</p>
            <div className={styles.chips}>{popular.map((t) => <button key={t} type="button" onClick={() => go(t)}>{t}</button>)}</div>
          </>
        )}
      </div>
    </Overlay>
  );
}
