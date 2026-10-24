import { Link } from 'react-router-dom';
import styles from './Button.module.css';

/** variant: primary | secondary | accent. Renders a Link when `to` is set, an anchor when `href` is set. */
export default function Button({ variant = 'primary', size = 'md', block, loading, to, href, className = '', children, ...rest }) {
  const cls = [styles.btn, styles[variant], styles[size], block && styles.block, loading && styles.loading, className].filter(Boolean).join(' ');
  if (to) return <Link to={to} className={cls} {...rest}>{children}</Link>;
  if (href) return <a href={href} className={cls} {...rest}>{children}</a>;
  return <button type="button" className={cls} aria-busy={loading || undefined} {...rest}>{children}</button>;
}
