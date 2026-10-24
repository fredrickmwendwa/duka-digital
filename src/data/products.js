import { config } from '../config';

// Demonstration catalog. Prices are whole KSh. `tone` tints the placeholder image box.
// Replace `images` with real photography (4:5 portrait) when available.
const IMG = '/placeholder.svg';
// With VITE_USE_PHOTOS=true: /images/products/<slug>-1.jpg, -2.jpg ... Otherwise the placeholder.
const images = (slug) => (config.photos
  ? Array.from({ length: config.photosPerProduct }, (_, i) => `/images/products/${slug}-${i + 1}.jpg`)
  : Array.from({ length: 4 }, () => IMG));
const sizes = (...stocks) => ['XS', 'S', 'M', 'L', 'XL'].slice(0, stocks.length).map((label, i) => ({ label, stock: stocks[i] }));
const OS = [{ label: 'One size', stock: 14 }];

export const heroImage = config.photos ? '/images/hero.jpg' : IMG;

export const categories = [
  { slug: 'dresses', name: 'Dresses' },
  { slug: 'tops', name: 'Tops' },
  { slug: 'trousers', name: 'Trousers' },
  { slug: 'bags', name: 'Bags' },
];

export const products = [
  { slug: 'linen-wrap-dress', name: 'Linen Wrap Dress', category: 'dresses', price: 5600, salePrice: 4800, isNew: true,
    colours: [{ name: 'Sand', swatch: '#d8cdb6', tone: '#d8cdb6' }, { name: 'Olive', swatch: '#bfc3a0', tone: '#bfc3a0' }],
    sizes: sizes(0, 5, 3, 4, 0), description: 'Light linen blend dress with a plunging tie front, bell sleeves and a flared skirt that stops above the knee.',
    details: '70% linen, 30% cotton. Machine wash cold. Made in Nairobi.' },
  { slug: 'cotton-tee', name: 'Cotton Tee', category: 'tops', price: 1200, isNew: true,
    colours: [{ name: 'White', swatch: '#f3f1ea', tone: '#e8e4da' }, { name: 'Black', swatch: '#2a2925', tone: '#b9b6ae' }],
    sizes: sizes(0, 12, 20, 15, 6), description: 'Heavyweight cotton tee with a relaxed fit and a clean neckline. Washes soft and keeps its shape.',
    details: '100% combed cotton, 200 gsm. Machine wash cold.' },
  { slug: 'wide-leg-trousers', name: 'Wide Leg Trousers', category: 'trousers', price: 3900, isNew: true,
    colours: [{ name: 'Slate', swatch: '#6f7a8a', tone: '#aab1bd' }],
    sizes: sizes(0, 4, 8, 6, 2), description: 'High-waisted wide leg trousers with side pockets and a hook-and-bar closure. Falls straight to the ankle.',
    details: '65% polyester, 35% viscose. Dry clean or hand wash.' },
  { slug: 'canvas-tote', name: 'Canvas Tote', category: 'bags', price: 2500, isNew: true,
    colours: [{ name: 'Black', swatch: '#2a2925', tone: '#c9c3b3' }], sizes: OS,
    description: 'Roomy cotton canvas tote with long shoulder straps and a small hand-embroidered line drawing.',
    details: 'Cotton canvas. 38 x 42 cm. Spot clean.' },
  { slug: 'ribbed-knit-top', name: 'Ribbed Knit Top', category: 'tops', price: 2200,
    colours: [{ name: 'Olive', swatch: '#8f9468', tone: '#c3c7a6' }],
    sizes: sizes(0, 2, 2, 0, 0), description: 'Cropped chunky rib knit with a relaxed drop shoulder and a worn-in hem. Warm, soft and easy to layer.',
    details: '100% cotton. Hand wash cold.' },
  { slug: 'midi-slip-skirt', name: 'Midi Slip Skirt', category: 'dresses', price: 3400,
    colours: [{ name: 'Espresso', swatch: '#3b2a22', tone: '#8a7467' }],
    sizes: sizes(0, 5, 7, 4, 0), description: 'Bias-cut satin midi skirt with an elastic waist. Moves well and pairs with a tee or a knit.',
    details: '100% recycled polyester satin. Hand wash cold.' },
  { slug: 'oversized-shirt', name: 'Oversized Shirt', category: 'tops', price: 3200,
    colours: [{ name: 'Mist', swatch: '#dfe8e8', tone: '#c9d3d1' }],
    sizes: sizes(0, 0, 0, 0, 0), description: 'Textured cotton shirt cut oversized, with a drop shoulder and a curved hem.',
    details: '100% cotton. Machine wash cold.' },
  { slug: 'structured-blazer', name: 'Structured Blazer', category: 'trousers', price: 9500,
    colours: [{ name: 'Black', swatch: '#2a2925', tone: '#a9a59b' }],
    sizes: sizes(0, 2, 4, 3, 1), description: 'Single-breasted blazer with padded shoulders, a nipped waist and two flap pockets. Fully lined.',
    details: '60% wool blend, 40% polyester. Dry clean only.' },
  { slug: 'linen-shirt-dress', name: 'Linen Shirt Dress', category: 'dresses', price: 5400,
    colours: [{ name: 'Olive', swatch: '#bfc3a0', tone: '#bfc3a0' }],
    sizes: sizes(0, 3, 5, 5, 2), description: 'Belted shirt dress in washed linen with a button front and roll-up sleeves.',
    details: '100% linen. Machine wash cold, line dry.' },
  { slug: 'pleated-midi-dress', name: 'Puff Sleeve Linen Dress', category: 'dresses', price: 6200,
    colours: [{ name: 'Rust', swatch: '#b25a3a', tone: '#d3a58f' }],
    sizes: sizes(0, 3, 4, 3, 0), description: 'Long linen dress in rust with soft puffed sleeves, laced cuffs and a gathered skirt.',
    details: '100% linen. Machine wash cold, line dry.' },
  { slug: 'graphic-baby-tee', name: 'Graphic Baby Tee', category: 'tops', price: 1800,
    colours: [{ name: 'Pink trim', swatch: '#f2a7c3', tone: '#f0d3dc' }],
    sizes: sizes(0, 6, 8, 6, 3), description: 'Ribbed cotton baby tee with contrast raglan sleeves and a fruit graphic on the chest.',
    details: '95% cotton, 5% elastane. Machine wash cold.' },
  { slug: 'woven-market-bag', name: 'Woven Market Bag', category: 'bags', price: 2900,
    colours: [{ name: 'Gold', swatch: '#c9a24a', tone: '#8a6d2b' }], sizes: [{ label: 'One size', stock: 2 }],
    description: 'Woven tote in glossy gold strips with stitched leather handles and brass rivets. Each bag varies slightly.',
    details: 'Woven strips and leather. 34 x 30 x 14 cm. Wipe clean.' },
].map((p) => ({ ...p, images: images(p.slug) }));

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
