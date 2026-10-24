import { useRef, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import StickyBar from '../components/StickyBar';
import { useCart } from '../context/CartContext';
import { useUI } from '../context/UIContext';
import { useOrder } from '../hooks/useOrder';
import { buildMessage, whatsappUrl } from '../utils/whatsapp';
import { normalizePhone } from '../utils/phone';
import { validateCheckout } from '../utils/validate';
import { config } from '../config';
import styles from './Review.module.css';

export default function Review() {
  const { lines, checkout, dispatch, totals } = useOrder();
  const { dispatch: cartDispatch } = useCart();
  const { toast } = useUI();
  const navigate = useNavigate();
  const [opened, setOpened] = useState(false);
  const pre = useRef(null);
  const valid = Object.keys(validateCheckout(checkout)).length === 0;

  if (lines.length === 0 && !opened) return <Navigate to="/cart" replace />;
  if (!opened && (!valid || !checkout.ref)) return <Navigate to="/checkout" replace />;

  const message = buildMessage({ ref: checkout.ref, checkout: { ...checkout, phoneNormalized: normalizePhone(checkout.phone) }, lines, totals });
  const url = whatsappUrl(message);

  const copy = async () => {
    try { await navigator.clipboard.writeText(message); toast('Message copied. Paste it into WhatsApp.'); }
    catch {
      const r = document.createRange(); r.selectNodeContents(pre.current);
      const s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
      toast('Could not copy. The message is selected, press and hold to copy.', { tone: 'error' });
    }
  };
  const startNew = () => { cartDispatch({ type: 'clear' }); dispatch({ type: 'reset' }); sessionStorage.removeItem('dd:resume'); navigate('/'); };
  const open = (
    <Button href={url} target="_blank" rel="noopener noreferrer" variant="accent" size="lg" block onClick={() => { setOpened(true); dispatch({ type: 'patch', patch: { step: 'whatsapp' } }); }}>Open WhatsApp to send</Button>
  );

  return (
    <div className={styles.layout}>
      <div className={styles.main}>
        <h1 className="pageTitle">Review your order</h1>
        <p className="eyebrow">Message preview</p>
        <pre ref={pre} className={styles.pre} tabIndex={0} aria-label="WhatsApp message preview">{message}</pre>
        <p className={styles.note}><b>Your order is not sent yet.</b> Press Send in WhatsApp to place it.</p>
      </div>
      <div className={styles.actions}>
        <StickyBar inline>
          {open}
          <Button variant="secondary" block onClick={copy}>Copy message</Button>
        </StickyBar>
        <Button to="/checkout" variant="secondary" size="sm" className={styles.edit}>Edit order</Button>
        <p className={styles.desk}>On a computer this opens WhatsApp Web or the desktop app.</p>
        {opened && (
          <div className={styles.prompt} role="status">
            <b>Did WhatsApp open?</b>
            <p>If not, copy the message and send it to +{config.merchant.whatsapp} (demo) yourself.</p>
            <div className={styles.row}><Button size="sm" variant="secondary" onClick={copy}>Copy message</Button><Button size="sm" variant="secondary" onClick={startNew}>Start a new order</Button></div>
          </div>
        )}
      </div>
    </div>
  );
}
