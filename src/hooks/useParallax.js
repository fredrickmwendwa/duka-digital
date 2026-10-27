import { useEffect } from 'react';

/** Gentle vertical parallax for an element inside an overflow-hidden parent. Off for reduced motion. */
export function useParallax(ref, speed = 0.06, enabled = true) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    let raf;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.parentElement.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight) return;
        const offset = r.top + r.height / 2 - window.innerHeight / 2;
        el.style.transform = `translate3d(0, ${(-offset * speed).toFixed(1)}px, 0) scale(1.14)`;
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
  }, [ref, speed, enabled]);
}
