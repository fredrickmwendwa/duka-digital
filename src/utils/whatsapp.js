import { config } from '../config';
import { formatKSh } from './format';
import { displayPhone } from './phone';
import { displayTitle } from '../data/products';

export function paymentLabel() {
  const { mode, till, paybill } = config.payment;
  return mode === 'paybill' ? `M-Pesa Paybill ${paybill}` : `M-Pesa Till ${till}`;
}

/** Plain-text order message. Payment is never described as verified. */
export function buildMessage({ ref, checkout, lines, totals }) {
  const items = lines
    .filter((l) => l.available)
    .map((l) => `${l.qty}x ${l.product.name}, ${l.colour}, ${l.size}   ${formatKSh(l.lineTotal)}`);
  const deliver = checkout.fulfilment === 'deliver';
  const status = checkout.paymentReported ? 'REPORTED BY CUSTOMER, NOT VERIFIED' : 'PENDING, NOT VERIFIED';
  return [
    `Hi ${config.merchant.name}, I would like to place an order from your website.`,
    '',
    `Order: ${ref}`,
    `Name: ${checkout.name.trim()}`,
    `Phone: ${displayPhone(checkout.phoneNormalized)}`,
    '',
    ...items,
    '',
    `Subtotal   ${formatKSh(totals.subtotal)}`,
    deliver ? `Delivery (Nairobi)   ${formatKSh(totals.deliveryFee)}` : 'Collection   Free',
    `TOTAL   ${formatKSh(totals.total)}`,
    '',
    deliver ? `Deliver to: ${checkout.area.trim()}` : `Collect from: ${config.merchant.collectionPoint}`,
    `Payment: ${paymentLabel()} (demo)`,
    `Payment status: ${status}`,
    ...(checkout.note.trim() ? [`Note: ${checkout.note.trim()}`] : []),
  ].join('\n');
}

export const whatsappUrl = (text, number = config.merchant.whatsapp) =>
  `https://wa.me/${number}?text=${encodeURIComponent(text)}`;

export const askAboutUrl = (product, sizes) =>
  whatsappUrl(`Hi ${config.merchant.name}, is the ${displayTitle(product)} coming back in size ${sizes.join(', ')}?`);
