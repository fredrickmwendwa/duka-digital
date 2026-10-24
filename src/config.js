// Demo configuration. Every value here is demonstration data, not a real merchant.
const env = import.meta.env;

export const config = {
  demo: true,
  merchant: {
    name: 'Nyota Atelier',
    whatsapp: env.VITE_WHATSAPP_NUMBER || '254700000000',
    collectionPoint: 'Westlands, Nairobi (demo)',
  },
  payment: {
    mode: env.VITE_PAYMENT_MODE === 'paybill' ? 'paybill' : 'till',
    till: env.VITE_TILL_NUMBER || '123456',
    paybill: env.VITE_PAYBILL_NUMBER || '400200',
  },
  deliveryFee: 300,
  maxQtyPerLine: 10,
  storageDays: 7,
};
