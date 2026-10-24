import { useUI } from '../context/UIContext';
import styles from './Toasts.module.css';

export default function Toasts() {
  const { toasts, dismiss } = useUI();
  return (
    <div className={styles.region} aria-live="polite" aria-atomic="false">
      {toasts.map((t) => (
        <div key={t.id} className={`${styles.toast} ${t.tone === 'error' ? styles.error : ''}`} role={t.tone === 'error' ? 'alert' : 'status'}>
          <span>{t.message}</span>
          <span className={styles.actions}>
            {t.action && <button type="button" className={styles.act} onClick={() => { t.action.onClick(); dismiss(t.id); }}>{t.action.label}</button>}
            {t.tone === 'error' && <button type="button" className={styles.act} onClick={() => dismiss(t.id)} aria-label="Dismiss">&times;</button>}
          </span>
        </div>
      ))}
    </div>
  );
}
