import { config } from '../config';

const DAY = 86_400_000;

/** localStorage wrapper that never throws and expires entries after config.storageDays. */
export function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const { v, t } = JSON.parse(raw);
    if (Date.now() - t > config.storageDays * DAY) { localStorage.removeItem(key); return fallback; }
    return v;
  } catch { return fallback; }
}

export function save(key, value) {
  try { localStorage.setItem(key, JSON.stringify({ v: value, t: Date.now() })); } catch { /* storage unavailable */ }
}

export function remove(key) {
  try { localStorage.removeItem(key); } catch { /* ignore */ }
}
