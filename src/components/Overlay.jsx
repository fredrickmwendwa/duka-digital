import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './Overlay.module.css';

const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

/** Accessible dialog shell: focus trap, Escape, scroll lock, focus return, animated enter/exit.
 *  placement: right | left | bottom | top | full */
export default function Overlay({ open, onClose, label, placement = 'right', width, children }) {
  const [mounted, setMounted] = useState(open);
  const [shown, setShown] = useState(false);
  const panel = useRef(null);
  const returnTo = useRef(null);

  useEffect(() => {
    if (open) {
      returnTo.current = document.activeElement;
      setMounted(true);
      const raf = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(raf);
    }
    setShown(false);
    const t = setTimeout(() => setMounted(false), 220);
    return () => clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!mounted || !open) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const el = panel.current;
    (el.querySelector('[data-autofocus]') || el.querySelector(FOCUSABLE) || el).focus({ preventScroll: true });
    const onKey = (e) => {
      if (e.key === 'Escape') { e.stopPropagation(); onClose(); return; }
      if (e.key !== 'Tab') return;
      const items = [...el.querySelectorAll(FOCUSABLE)].filter((n) => n.offsetParent !== null);
      if (!items.length) { e.preventDefault(); return; }
      const first = items[0], last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
      returnTo.current?.focus?.({ preventScroll: true });
    };
  }, [mounted, open, onClose]);

  if (!mounted) return null;
  return createPortal(
    <div className={`${styles.root} ${shown ? styles.shown : ''}`}>
      <div className={styles.backdrop} onClick={onClose} aria-hidden="true" />
      <div ref={panel} role="dialog" aria-modal="true" aria-label={label} tabIndex={-1} className={`${styles.panel} ${styles[placement]}`} style={width ? { '--w': width } : undefined}>
        {children}
      </div>
    </div>,
    document.body,
  );
}
