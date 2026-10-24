import { useEffect, useRef, useState } from 'react';
import { useUI } from '../context/UIContext';
import styles from './CopyField.module.css';

/** Value with a Copy button. If the clipboard fails the value is selected so it can be copied by hand. */
export default function CopyField({ label, value, display = value }) {
  const [state, setState] = useState('idle'); // idle | copied | failed
  const valueRef = useRef(null);
  const timer = useRef();
  const { toast } = useUI();
  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(String(value));
      setState('copied');
      timer.current = setTimeout(() => setState('idle'), 2000);
    } catch {
      setState('failed');
      const range = document.createRange();
      range.selectNodeContents(valueRef.current);
      const sel = window.getSelection();
      sel.removeAllRanges(); sel.addRange(range);
      toast('Could not copy. Select the value and copy it by hand.', { tone: 'error' });
    }
  };

  return (
    <div className={styles.field}>
      <span className={styles.label}>{label}</span>
      <span className={styles.right}>
        <b ref={valueRef} className={styles.value}>{display}</b>
        <button type="button" onClick={copy} className={`${styles.btn} ${state === 'copied' ? styles.ok : ''}`} aria-label={`Copy ${label}`}>
          {state === 'copied' ? '\u2713 Copied' : 'Copy'}
        </button>
      </span>
      <span className="srOnly" role="status">{state === 'copied' ? `${label} copied` : ''}</span>
    </div>
  );
}
