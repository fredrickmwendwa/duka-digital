import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/** On route change: reset scroll (or jump to #hash) and move focus to <main> for keyboard and screen reader users. */
export function useRouteFocus(mainRef) {
  const { pathname, hash } = useLocation();
  const first = useRef(true);
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) { el.scrollIntoView(); return; }
    }
    window.scrollTo(0, 0);
    if (first.current) { first.current = false; return; }
    mainRef.current?.focus({ preventScroll: true });
  }, [pathname, hash, mainRef]);
}
