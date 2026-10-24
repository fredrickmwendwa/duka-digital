import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Button from '../components/Button';
import OrderSummary, { SummaryDisclosure } from '../components/OrderSummary';
import PaymentPanel from '../components/PaymentPanel';
import StickyBar from '../components/StickyBar';
import { useOrder } from '../hooks/useOrder';
import { nextOrderRef } from '../utils/order';
import { validateCheckout } from '../utils/validate';
import styles from './Payment.module.css';

export default function Payment() {
  const { lines, checkout, dispatch, totals } = useOrder();
  const valid = Object.keys(validateCheckout(checkout)).length === 0;
  const ok = lines.length > 0 && valid && lines.every((l) => l.available);
  useEffect(() => {
    if (ok) dispatch({ type: 'patch', patch: { step: 'payment', ref: checkout.ref || nextOrderRef() } });
  }, [ok]); // eslint-disable-line react-hooks/exhaustive-deps

  if (lines.length === 0) return <Navigate to="/cart" replace />;
  if (!ok) return <Navigate to="/checkout" replace />;
  if (!checkout.ref) return null;

  return (
    <div className={styles.layout}>
      <div className={styles.main}>
        <PaymentPanel total={totals.total} reference={checkout.ref} reported={checkout.paymentReported} onReportedChange={(v) => dispatch({ type: 'patch', patch: { paymentReported: v } })} />
        <div className="mobileOnly"><SummaryDisclosure lines={lines} totals={totals} fulfilment={checkout.fulfilment} /></div>
        <StickyBar inline>
          <Button to="/checkout/whatsapp" size="lg" block>Continue to WhatsApp</Button>
          <Button to="/checkout" variant="secondary" size="sm" block className={styles.back}>Back to edit order</Button>
        </StickyBar>
      </div>
      <div className={styles.side}><OrderSummary title={`Order ${checkout.ref}`} lines={lines} totals={totals} fulfilment={checkout.fulfilment} /></div>
    </div>
  );
}
