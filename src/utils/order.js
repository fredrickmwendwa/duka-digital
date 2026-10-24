import { config } from '../config';
import { getProduct, unitPrice, sizeStock } from '../data/products';
import { load, save } from './storage';

export const lineId = (slug, colour, size) => `${slug}|${colour}|${size}`;
export const maxQty = (slug, size) => {
  const p = getProduct(slug);
  return p ? Math.min(sizeStock(p, size), config.maxQtyPerLine) : 0;
};

/** Join cart items with catalog data. Prices always come from the catalog, never from storage. */
export function getLines(items) {
  return items
    .map((it) => {
      const product = getProduct(it.slug);
      if (!product) return null;
      const stock = sizeStock(product, it.size);
      const price = unitPrice(product);
      return { ...it, product, stock, available: stock > 0, unitPrice: price, lineTotal: price * it.qty };
    })
    .filter(Boolean);
}

export function calcTotals(lines, fulfilment) {
  const buyable = lines.filter((l) => l.available);
  const subtotal = buyable.reduce((n, l) => n + l.lineTotal, 0);
  const itemCount = buyable.reduce((n, l) => n + l.qty, 0);
  const deliveryFee = fulfilment === 'deliver' && buyable.length ? config.deliveryFee : 0;
  return { subtotal, itemCount, deliveryFee, total: subtotal + deliveryFee };
}

/** Demo-only reference. A real backend must issue unique references. */
export function nextOrderRef() {
  const n = (load('dd:seq', 2040) || 2040) + 1;
  save('dd:seq', n);
  return `DD-${n}`;
}
