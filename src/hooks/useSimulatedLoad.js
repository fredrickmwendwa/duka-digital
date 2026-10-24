import { useEffect, useState } from 'react';

/** Simulates network latency so skeletons are real states. True for `ms` after `key` changes. */
export function useSimulatedLoad(key, ms = 450) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), ms);
    return () => clearTimeout(t);
  }, [key, ms]);
  return loading;
}
