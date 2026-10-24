import styles from './EmptyState.module.css';

export default function EmptyState({ title, children, action }) {
  return (
    <div className={styles.box} role="status">
      <h2 className={styles.title}>{title}</h2>
      {children && <p className={styles.text}>{children}</p>}
      {action && <div className={styles.action}>{action}</div>}
    </div>
  );
}
