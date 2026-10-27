import { useEffect, useRef, useState } from 'react';
import { useParallax } from '../hooks/useParallax';
import styles from './Picture.module.css';

const FALLBACK = '/placeholder.svg';

/** Plain <img> in a fixed-ratio frame: shimmer while loading, soft zoom-settle when ready, optional parallax. */
export default function Picture({ src, alt, tone = 'var(--sunk)', ratio = '4 / 5', eager, caption, position, parallax, className = '' }) {
  const [ready, setReady] = useState(false);
  const img = useRef(null);
  const inner = useRef(null);
  useParallax(inner, 0.06, !!parallax);
  useEffect(() => { if (img.current?.complete && img.current.naturalWidth) setReady(true); }, []);
  return (
    <div className={`${styles.frame} ${ready ? styles.ready : ''} ${className}`} style={{ aspectRatio: ratio, background: tone }}>
      <div ref={inner} className={styles.inner}>
        <img ref={img} src={src} alt={alt} width="800" height="1000" loading={eager ? 'eager' : 'lazy'} decoding="async"
          className={styles.img} style={position ? { objectPosition: position } : undefined}
          onLoad={() => setReady(true)}
          onError={(e) => { if (!e.currentTarget.src.endsWith(FALLBACK)) e.currentTarget.src = FALLBACK; setReady(true); }} />
      </div>
      {caption && <span className={styles.caption}>{caption}</span>}
    </div>
  );
}
