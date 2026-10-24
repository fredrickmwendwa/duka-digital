import styles from './OptionChips.module.css';

/** Single-select chips. Selected = heavy border + bold, sold out = struck through. Never colour alone. */
export default function OptionChips({ label, options, value, onChange }) {
  return (
    <div role="radiogroup" aria-label={label} className={styles.group}>
      {options.map((o) => {
        const selected = value === o.value;
        return (
          <button key={o.value} type="button" role="radio" aria-checked={selected} aria-disabled={o.disabled || undefined}
            className={`${styles.chip} ${selected ? styles.on : ''} ${o.disabled ? styles.off : ''}`}
            onClick={() => !o.disabled && onChange(o.value)}>
            {o.label}{o.disabled && <span className="srOnly">, sold out</span>}
          </button>
        );
      })}
    </div>
  );
}
