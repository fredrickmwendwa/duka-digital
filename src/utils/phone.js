/** Accepts 07xx, 01xx, +254, 254 formats. Returns 2547XXXXXXXX / 2541XXXXXXXX or null. */
export function normalizePhone(input = '') {
  const clean = input.replace(/[\s\-().]/g, '');
  const m = clean.match(/^(?:\+?254|0)([17]\d{8})$/);
  return m ? `254${m[1]}` : null;
}

/** 254712345678 -> 0712 345 678 */
export function displayPhone(normalized) {
  if (!normalized) return '';
  const local = `0${normalized.slice(3)}`;
  return `${local.slice(0, 4)} ${local.slice(4, 7)} ${local.slice(7)}`;
}
