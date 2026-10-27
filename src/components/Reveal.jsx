import { useEffect, useRef, useState } from 'react';
import styles from './Reveal.module.css';

/** Scroll-triggered entrance. variant: up | fade | clip | scale. Visible immediately for reduced motion. */
export default function Reveal({ as: Tag = 'div', variant = 'up', delay = 0, className = '', children, ...rest }) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setOn(true); return undefined; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { rootMargin: '0px 0px -6% 0px', threshold: 0.06 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <Tag ref={ref} className={`${styles.r} ${styles[variant]} ${on ? styles.in : ''} ${className}`} style={{ '--d': `${delay}ms` }} {...rest}>{children}</Tag>;
}
