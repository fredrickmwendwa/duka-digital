import { useEffect, useState } from 'react';

/** True while the on-screen keyboard likely covers the bottom of the viewport. */
export function useKeyboardOpen() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return undefined;
    const on = () => setOpen(window.innerHeight - vv.height > 150);
    vv.addEventListener('resize', on);
    return () => vv.removeEventListener('resize', on);
  }, []);
  return open;
}
