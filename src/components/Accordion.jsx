import { useId, useState } from 'react';
import styles from './Accordion.module.css';

export default function Accordion({ title, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  return (
    <div className={styles.item}>
      <h3><button type="button" className={styles.btn} aria-expanded={open} aria-controls={id} onClick={() => setOpen((o) => !o)}>
        <span>{title}</span><span className={`${styles.icon} ${open ? styles.minus : ''}`} aria-hidden="true" />
      </button></h3>
      <div id={id} role="region" aria-label={title} className={`${styles.panel} ${open ? styles.open : ''}`}><div className={styles.inner}>{children}</div></div>
    </div>
  );
}
