import { formatKSh } from '../utils/format';
import styles from './Price.module.css';

export default function Price({ price, salePrice, size = 'md' }) {
  return (
    <span className={`${styles.wrap} ${styles[size]}`}>
      <span className="price">{formatKSh(salePrice ?? price)}</span>
      {salePrice != null && (
        <>
          <s className={styles.was}><span className="srOnly">Was </span>{formatKSh(price)}</s>
        </>
      )}
    </span>
  );
}
