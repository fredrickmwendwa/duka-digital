import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { load, save } from '../utils/storage';
import { getLines, calcTotals, lineId, maxQty } from '../utils/order';
import { getProduct } from '../data/products';

const CartContext = createContext(null);
const KEY = 'dd:cart';

function init() {
  const stored = load(KEY, []);
  const items = stored.filter((i) => getProduct(i.slug)).map((i) => ({ ...i, qty: Math.max(1, Math.min(i.qty, 10)) }));
  return { items, lastRemoved: null };
}

function reducer(state, action) {
  switch (action.type) {
    case 'add': {
      const { slug, colour, size, qty = 1 } = action;
      const id = lineId(slug, colour, size);
      const cap = maxQty(slug, size);
      const existing = state.items.find((i) => i.id === id);
      if (existing) {
        return { ...state, items: state.items.map((i) => (i.id === id ? { ...i, qty: Math.min(i.qty + qty, cap) } : i)) };
      }
      return { ...state, items: [...state.items, { id, slug, colour, size, qty: Math.min(qty, cap) }] };
    }
    case 'setQty': {
      const item = state.items.find((i) => i.id === action.id);
      if (!item) return state;
      const qty = Math.max(1, Math.min(action.qty, maxQty(item.slug, item.size) || 1));
      return { ...state, items: state.items.map((i) => (i.id === action.id ? { ...i, qty } : i)) };
    }
    case 'remove': {
      const index = state.items.findIndex((i) => i.id === action.id);
      if (index < 0) return state;
      return { items: state.items.filter((i) => i.id !== action.id), lastRemoved: { item: state.items[index], index } };
    }
    case 'undo': {
      if (!state.lastRemoved) return state;
      const { item, index } = state.lastRemoved;
      const items = [...state.items];
      items.splice(Math.min(index, items.length), 0, item);
      return { items, lastRemoved: null };
    }
    case 'clear':
      return { items: [], lastRemoved: null };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, init);
  useEffect(() => save(KEY, state.items), [state.items]);

  const value = useMemo(() => {
    const lines = getLines(state.items);
    return { items: state.items, lines, count: lines.reduce((n, l) => n + l.qty, 0), dispatch };
  }, [state.items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);

// Totals depend on the fulfilment choice, which lives in CheckoutContext.
export { calcTotals };
