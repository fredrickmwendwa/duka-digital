import { useEffect, useState } from 'react';

/** Tracks scroll direction and offset (rAF throttled) for the auto-hiding header. */
export function useScrollDirection(threshold = 10) {
  const [s, setS] = useState({ dir: 'up', y: 0 });
  useEffect(() => {
    let last = window.scrollY, ticking = false;
    const on = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY, d = y - last;
        if (y < 10) setS({ dir: 'up', y });
        else if (Math.abs(d) > threshold) { setS({ dir: d > 0 ? 'down' : 'up', y }); last = y; }
        ticking = false;
      });
    };
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, [threshold]);
  return s;
}
