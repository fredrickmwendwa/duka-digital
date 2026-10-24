import { Link } from 'react-router-dom';
import styles from './Breadcrumbs.module.css';

export default function Breadcrumbs({ trail }) {
  return (
    <nav aria-label="Breadcrumb" className={styles.nav}>
      <ol>
        {trail.map((t, i) => (
          <li key={t.label}>
            {t.to && i < trail.length - 1 ? <Link to={t.to}>{t.label}</Link> : <span aria-current="page">{t.label}</span>}
            {i < trail.length - 1 && <span aria-hidden="true" className={styles.sep}>/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
