import { createContext, useContext, useEffect, useReducer } from 'react';
import { load, save, remove } from '../utils/storage';

const CheckoutContext = createContext(null);
const KEY = 'dd:checkout';

export const emptyCheckout = {
  name: '', phone: '', fulfilment: 'deliver', area: '', note: '',
  ref: null, paymentReported: false, step: 'details',
};

function reducer(state, action) {
  switch (action.type) {
    case 'patch': return { ...state, ...action.patch };
    case 'reset': return { ...emptyCheckout };
    default: return state;
  }
}

export function CheckoutProvider({ children }) {
  const [checkout, dispatch] = useReducer(reducer, undefined, () => ({ ...emptyCheckout, ...load(KEY, {}) }));
  useEffect(() => {
    const untouched = JSON.stringify(checkout) === JSON.stringify(emptyCheckout);
    if (untouched) remove(KEY); else save(KEY, checkout);
  }, [checkout]);
  return <CheckoutContext.Provider value={{ checkout, dispatch }}>{children}</CheckoutContext.Provider>;
}

export const useCheckout = () => useContext(CheckoutContext);
