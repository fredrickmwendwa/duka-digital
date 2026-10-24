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
  // Real photography: set VITE_USE_PHOTOS=true and add files under public/images (see README).
  photos: env.VITE_USE_PHOTOS === 'true',
  photosPerProduct: Math.max(1, Number(env.VITE_PHOTOS_PER_PRODUCT) || 1),
  deliveryFee: 300,
  maxQtyPerLine: 10,
  storageDays: 7,
};
