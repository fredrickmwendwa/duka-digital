import { forwardRef, useId } from 'react';
import styles from './Field.module.css';

/** Labelled input/textarea with hint and error wired up through aria-describedby. */
const Field = forwardRef(function Field({ label, optional, hint, error, multiline, className = '', ...rest }, ref) {
  const id = useId();
  const describedBy = [hint && `${id}-hint`, error && `${id}-err`].filter(Boolean).join(' ') || undefined;
  const Tag = multiline ? 'textarea' : 'input';
  return (
    <div className={`${styles.field} ${className}`}>
      <label htmlFor={id} className={styles.label}>
        {label}{optional && <span className={styles.optional}> (optional)</span>}
      </label>
      <Tag ref={ref} id={id} className={`${styles.control} ${error ? styles.invalid : ''}`} aria-invalid={error ? 'true' : undefined} aria-describedby={describedBy} rows={multiline ? 2 : undefined} {...rest} />
      {hint && !error && <p id={`${id}-hint`} className={styles.hint}>{hint}</p>}
      {error && <p id={`${id}-err`} className={styles.error}><span aria-hidden="true">&#9888; </span>{error}</p>}
    </div>
  );
});
export default Field;
