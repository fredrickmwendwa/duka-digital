import styles from './Skeletons.module.css';

const Block = ({ w = '100%', h = 16, ratio, style }) => (
  <div className={styles.sk} style={{ width: w, height: ratio ? 'auto' : h, aspectRatio: ratio, ...style }} />
);

export const CardSkeleton = () => (
  <div aria-hidden="true"><Block ratio="4 / 5" /><Block w="85%" style={{ marginTop: 10 }} /><Block w="40%" h={18} style={{ marginTop: 6 }} /></div>
);

export const GridSkeleton = ({ count = 6 }) => (
  <div role="status" aria-label="Loading products" className={styles.grid}>
    {Array.from({ length: count }, (_, i) => <CardSkeleton key={i} />)}
  </div>
);

export const ProductSkeleton = () => (
  <div role="status" aria-label="Loading product" className={styles.product}>
    <Block ratio="4 / 5" />
    <div className={styles.col}><Block w="90%" h={32} /><Block w="50%" h={28} /><Block h={44} /><Block h={44} style={{ marginTop: 12 }} /><Block h={56} style={{ marginTop: 12 }} /></div>
  </div>
);

export const LineSkeleton = () => (
  <div aria-hidden="true" className={styles.line}><Block w="72px" h={72} /><div><Block w="80%" /><Block w="40%" h={12} style={{ marginTop: 8 }} /><Block w="110px" h={44} style={{ marginTop: 10 }} /></div></div>
);
