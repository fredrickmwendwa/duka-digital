import styles from './Marquee.module.css';

/** Endless ticker. The duplicate list is hidden from assistive tech; static under reduced motion. */
export default function Marquee({ items, seconds = 40, outline, className = '' }) {
  return (
    <div className={`${styles.marquee} ${outline ? styles.outline : ''} ${className}`}>
      <div className={styles.track} style={{ '--dur': `${seconds}s` }}>
        {[0, 1].map((k) => (
          <ul key={k} aria-hidden={k === 1 || undefined}>{items.map((t, i) => <li key={i}>{t}</li>)}</ul>
        ))}
      </div>
    </div>
  );
}
