import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';

const UIContext = createContext(null);

export function UIProvider({ children }) {
  const [panel, setPanel] = useState(null); // 'cart' | 'menu' | 'search' | null
  const [toasts, setToasts] = useState([]);
  const nextId = useRef(1);

  const dismiss = useCallback((id) => setToasts((t) => t.filter((x) => x.id !== id)), []);

  const toast = useCallback((message, { tone = 'info', action, duration } = {}) => {
    const id = nextId.current++;
    setToasts((t) => [...t.slice(-2), { id, message, tone, action }]);
    const ms = duration ?? (tone === 'error' ? 0 : 4000);
    if (ms) setTimeout(() => dismiss(id), ms);
    return id;
  }, [dismiss]);

  const value = useMemo(() => ({
    panel, open: setPanel, close: () => setPanel(null), toasts, toast, dismiss,
  }), [panel, toasts, toast, dismiss]);

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export const useUI = () => useContext(UIContext);
