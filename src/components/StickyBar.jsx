import { useKeyboardOpen } from '../hooks/useKeyboardOpen';
import styles from './StickyBar.module.css';

/** Bottom action bar on phones (safe-area aware, hides while the keyboard is open). `inline` flows in the page from 900px. */
export default function StickyBar({ children, inline, hidden }) {
  const kb = useKeyboardOpen();
  return <div className={`${styles.bar} ${inline ? styles.inline : styles.mobileOnly} ${hidden || kb ? styles.hide : ''}`}>{children}</div>;
}
