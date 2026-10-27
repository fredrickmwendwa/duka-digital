import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './RouteProgress.module.css';

/** Thin cobalt bar that sweeps across the top on every page change. */
export default function RouteProgress() {
  const { pathname } = useLocation();
  const [n, setN] = useState(0);
  useEffect(() => { setN((v) => v + 1); }, [pathname]);
  return n === 0 ? null : <div key={n} className={styles.bar} aria-hidden="true" />;
}
