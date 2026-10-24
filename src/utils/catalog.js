import { products, unitPrice, totalStock, categoryName } from '../data/products';

export const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price, low to high' },
  { value: 'price-desc', label: 'Price, high to low' },
  { value: 'name', label: 'Name, A to Z' },
];

export const matchesQuery = (p, q) => {
  const hay = `${p.name} ${categoryName(p.category)} ${p.colours.map((c) => c.name).join(' ')}`.toLowerCase();
  return q.toLowerCase().split(/\s+/).filter(Boolean).every((t) => hay.includes(t));
};

export function readFilters(sp) {
  return {
    q: sp.get('q') || '', category: sp.get('category') || '', sort: sp.get('sort') || 'newest',
    min: sp.get('min') || '', max: sp.get('max') || '', size: sp.get('size') || '',
    stock: sp.get('stock') === '1', isNew: sp.get('new') === '1',
  };
}

export function activeCount(f) {
  return [f.category, f.min, f.max, f.size, f.stock, f.isNew].filter(Boolean).length;
}

export function applyFilters(f) {
  const min = Number(f.min) || 0;
  const max = Number(f.max) || Infinity;
  const list = products.filter((p) =>
    (!f.q || matchesQuery(p, f.q)) &&
    (!f.category || p.category === f.category) &&
    (!f.isNew || p.isNew) &&
    unitPrice(p) >= min && unitPrice(p) <= max &&
    (!f.size || p.sizes.some((s) => s.label === f.size && s.stock > 0)) &&
    (!f.stock || totalStock(p) > 0));
  const by = {
    newest: (a, b) => Number(!!b.isNew) - Number(!!a.isNew),
    'price-asc': (a, b) => unitPrice(a) - unitPrice(b),
    'price-desc': (a, b) => unitPrice(b) - unitPrice(a),
    name: (a, b) => a.name.localeCompare(b.name),
  }[f.sort] || (() => 0);
  return [...list].sort(by);
}
