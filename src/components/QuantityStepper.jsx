import styles from './QuantityStepper.module.css';

export default function QuantityStepper({ value, onChange, min = 1, max = 10, label = 'Quantity' }) {
  return (
    <div className={styles.stepper} role="group" aria-label={label}>
      <button type="button" aria-label="Decrease quantity" disabled={value <= min} onClick={() => onChange(value - 1)}>&minus;</button>
      <output aria-live="polite">{value}</output>
      <button type="button" aria-label="Increase quantity" disabled={value >= max} onClick={() => onChange(value + 1)}>+</button>
    </div>
  );
}
