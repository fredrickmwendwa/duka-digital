// Demonstration catalog. Prices are whole KSh. `tone` tints the placeholder image box.
// Replace `images` with real photography (4:5 portrait) when available.
const IMG = '/placeholder.svg';
const images = (n = 4) => Array.from({ length: n }, () => IMG);
const sizes = (...stocks) => ['XS', 'S', 'M', 'L', 'XL'].slice(0, stocks.length).map((label, i) => ({ label, stock: stocks[i] }));
const OS = [{ label: 'One size', stock: 14 }];

export const categories = [
  { slug: 'dresses', name: 'Dresses' },
  { slug: 'tops', name: 'Tops' },
  { slug: 'trousers', name: 'Trousers' },
  { slug: 'bags', name: 'Bags' },
];

export const products = [
  { slug: 'linen-wrap-dress', name: 'Linen Wrap Dress', category: 'dresses', price: 5600, salePrice: 4800, isNew: true,
    colours: [{ name: 'Sand', swatch: '#d8cdb6', tone: '#d8cdb6' }, { name: 'Olive', swatch: '#bfc3a0', tone: '#bfc3a0' }],
    sizes: sizes(0, 5, 3, 4, 0), description: 'Light linen blend wrap dress with a tie waist and midi length. The model is 172 cm and wears M.',
    details: '70% linen, 30% cotton. Machine wash cold. Made in Nairobi.' },
  { slug: 'cotton-tee', name: 'Cotton Tee', category: 'tops', price: 1200, isNew: true,
    colours: [{ name: 'White', swatch: '#f3f1ea', tone: '#e8e4da' }, { name: 'Black', swatch: '#2a2925', tone: '#b9b6ae' }],
    sizes: sizes(0, 12, 20, 15, 6), description: 'Heavyweight cotton tee with a relaxed fit and a clean neckline. Washes soft and keeps its shape.',
    details: '100% combed cotton, 200 gsm. Machine wash cold.' },
  { slug: 'wide-leg-trousers', name: 'Wide Leg Trousers', category: 'trousers', price: 3900, isNew: true,
    colours: [{ name: 'Charcoal', swatch: '#5c5b57', tone: '#b9b6ae' }],
    sizes: sizes(0, 4, 8, 6, 2), description: 'High-waisted wide leg trousers with side pockets and a hook-and-bar closure. Falls straight to the ankle.',
    details: '65% polyester, 35% viscose. Dry clean or hand wash.' },
  { slug: 'canvas-tote', name: 'Canvas Tote', category: 'bags', price: 2500, isNew: true,
    colours: [{ name: 'Black', swatch: '#2a2925', tone: '#c9c3b3' }], sizes: OS,
    description: 'Roomy tote in thick cotton canvas with an inner zip pocket and reinforced handles. Fits a 14 inch laptop.',
    details: '12 oz cotton canvas. 38 x 40 x 12 cm. Spot clean.' },
  { slug: 'ribbed-knit-top', name: 'Ribbed Knit Top', category: 'tops', price: 2200,
    colours: [{ name: 'Olive', swatch: '#8f9468', tone: '#c3c7a6' }],
    sizes: sizes(0, 2, 2, 0, 0), description: 'Fitted ribbed knit top with a square neck. Stretches comfortably and layers well.',
    details: '95% cotton, 5% elastane. Hand wash cold.' },
  { slug: 'midi-slip-skirt', name: 'Midi Slip Skirt', category: 'dresses', price: 3400,
    colours: [{ name: 'Clay', swatch: '#c98f6b', tone: '#d9b9a0' }],
    sizes: sizes(0, 5, 7, 4, 0), description: 'Bias-cut satin midi skirt with an elastic waist. Moves well and pairs with a tee or a knit.',
    details: '100% recycled polyester satin. Hand wash cold.' },
  { slug: 'oversized-shirt', name: 'Oversized Shirt', category: 'tops', price: 3200,
    colours: [{ name: 'Stone', swatch: '#cfcabc', tone: '#d2cec4' }],
    sizes: sizes(0, 0, 0, 0, 0), description: 'Crisp cotton poplin shirt cut oversized, with a drop shoulder and curved hem.',
    details: '100% cotton poplin. Machine wash warm.' },
  { slug: 'structured-blazer', name: 'Structured Blazer', category: 'trousers', price: 9500,
    colours: [{ name: 'Black', swatch: '#2a2925', tone: '#a9a59b' }],
    sizes: sizes(0, 2, 4, 3, 1), description: 'Single-breasted blazer with padded shoulders, a nipped waist and two flap pockets. Fully lined.',
    details: '60% wool blend, 40% polyester. Dry clean only.' },
  { slug: 'linen-shirt-dress', name: 'Linen Shirt Dress', category: 'dresses', price: 5400,
    colours: [{ name: 'Olive', swatch: '#bfc3a0', tone: '#bfc3a0' }],
    sizes: sizes(0, 3, 5, 5, 2), description: 'Belted shirt dress in washed linen with a button front and roll-up sleeves.',
    details: '100% linen. Machine wash cold, line dry.' },
  { slug: 'pleated-midi-dress', name: 'Pleated Midi Dress', category: 'dresses', price: 6200,
    colours: [{ name: 'Rust', swatch: '#b25a3a', tone: '#d3a58f' }],
    sizes: sizes(0, 3, 4, 3, 0), description: 'Sunray pleated midi dress with a fitted bodice and short sleeves. Holds its pleats after washing.',
    details: '100% polyester, permanent pleat. Hand wash cold.' },
  { slug: 'cropped-cotton-shirt', name: 'Cropped Cotton Shirt', category: 'tops', price: 2600,
    colours: [{ name: 'White', swatch: '#f3f1ea', tone: '#e8e4da' }],
    sizes: sizes(0, 6, 8, 6, 3), description: 'Boxy cropped shirt in lightweight cotton with a hidden placket.',
    details: '100% cotton. Machine wash cold.' },
  { slug: 'woven-market-bag', name: 'Woven Market Bag', category: 'bags', price: 2900,
    colours: [{ name: 'Natural', swatch: '#d9c9a3', tone: '#d6cbb0' }], sizes: [{ label: 'One size', stock: 2 }],
    description: 'Hand-woven sisal market bag with leather handles. Each bag varies slightly.',
    details: 'Sisal and leather. 34 x 30 x 14 cm. Wipe clean.' },
].map((p) => ({ ...p, images: images() }));

export const getProduct = (slug) => products.find((p) => p.slug === slug);
export const unitPrice = (p) => p.salePrice ?? p.price;
export const categoryName = (slug) => categories.find((c) => c.slug === slug)?.name ?? '';
export const totalStock = (p) => p.sizes.reduce((n, s) => n + s.stock, 0);
export const sizeStock = (p, label) => p.sizes.find((s) => s.label === label)?.stock ?? 0;
export const displayTitle = (p, colour) => `${p.name}, ${colour ?? p.colours[0].name}`;

/** Short stock message for cards and detail pages. */
export function stockNote(p, size) {
  if (size) {
    const n = sizeStock(p, size);
    if (n === 0) return { text: `Size ${size} is sold out`, tone: 'out' };
    return n <= 3 ? { text: `Only ${n} left in size ${size}`, tone: 'low' } : { text: 'In stock', tone: 'ok' };
  }
  if (totalStock(p) === 0) return { text: 'Sold out', tone: 'out' };
  const low = p.sizes.filter((s) => s.stock > 0).sort((a, b) => a.stock - b.stock)[0];
  return low.stock <= 3 ? { text: `Only ${low.stock} left in size ${low.label}`, tone: 'low' } : { text: 'In stock', tone: 'ok' };
}
