import { useEffect, useRef, useState } from 'react';
import { formatKSh } from '../utils/format';

/** KSh amount that counts to its new value (450ms ease-out). Instant for reduced motion. */
export default function Money({ value, className = '' }) {
  const [shown, setShown] = useState(value);
  const latest = useRef(value);
  useEffect(() => {
    const from = latest.current;
    if (from === value || window.matchMedia('(prefers-reduced-motion: reduce)').matches) { latest.current = value; setShown(value); return undefined; }
    const t0 = performance.now();
    let raf;
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / 450);
      const v = Math.round(from + (value - from) * (1 - (1 - p) ** 3));
      latest.current = v; setShown(v);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return <span className={className}>{formatKSh(shown)}</span>;
}
