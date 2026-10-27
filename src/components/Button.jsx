import { Link } from 'react-router-dom';
import styles from './Button.module.css';

/** variant: primary | secondary | accent. `arrow` adds a sliding arrow. Renders Link / anchor / button. */
export default function Button({ variant = 'primary', size = 'md', block, loading, arrow, to, href, className = '', children, ...rest }) {
  const cls = [styles.btn, styles[variant], styles[size], block && styles.block, loading && styles.loading, className].filter(Boolean).join(' ');
  const inner = <><span className={styles.label}>{children}</span>{arrow && <span className={styles.arrow} aria-hidden="true">&rarr;</span>}</>;
  if (to) return <Link to={to} className={cls} {...rest}>{inner}</Link>;
  if (href) return <a href={href} className={cls} {...rest}>{inner}</a>;
  return <button type="button" className={cls} aria-busy={loading || undefined} {...rest}>{inner}</button>;
}
