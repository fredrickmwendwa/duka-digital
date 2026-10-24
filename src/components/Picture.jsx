import styles from './Picture.module.css';

/** Plain <img> with a placeholder src. The tone fills the box so the 4:5 crop stays visible. */
export default function Picture({ src, alt, tone = 'var(--sunk)', ratio = '4 / 5', eager, caption, className = '' }) {
  return (
    <div className={`${styles.frame} ${className}`} style={{ aspectRatio: ratio, background: tone }}>
      <img src={src} alt={alt} width="800" height="1000" loading={eager ? 'eager' : 'lazy'} decoding="async" className={styles.img} />
      {caption && <span className={styles.caption}>{caption}</span>}
    </div>
  );
}
