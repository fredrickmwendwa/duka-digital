import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import { useCart } from '../context/CartContext';
import { useCheckout } from '../context/CheckoutContext';
import styles from './ResumeBanner.module.css';

const routes = { details: '/checkout', payment: '/checkout/payment', whatsapp: '/checkout/whatsapp' };
const names = { details: 'details', payment: 'M-Pesa payment', whatsapp: 'WhatsApp review' };

/** Shown once per session when a saved checkout exists, e.g. after switching to the M-Pesa app and back. */
export default function ResumeBanner() {
  const { count } = useCart();
  const { checkout, dispatch } = useCheckout();
  const navigate = useNavigate();
  const [hidden, setHidden] = useState(() => sessionStorage.getItem('dd:resume') === '1');
  const progressed = checkout.step !== 'details' || checkout.name || checkout.phone;
  if (hidden || !count || !progressed) return null;
  const dismiss = () => { sessionStorage.setItem('dd:resume', '1'); setHidden(true); };
  return (
    <div className={styles.banner} role="region" aria-label="Saved checkout">
      <div className="container">
        <p><b>Welcome back.</b> Your cart and details are saved. You were on the {names[checkout.step]} step.</p>
        <div className={styles.actions}>
          <Button size="sm" onClick={() => { dismiss(); navigate(routes[checkout.step]); }}>Resume checkout</Button>
          <Button size="sm" variant="secondary" onClick={() => { dispatch({ type: 'reset' }); dismiss(); }}>Start over</Button>
        </div>
      </div>
    </div>
  );
}
