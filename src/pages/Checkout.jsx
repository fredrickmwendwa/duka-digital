import { useEffect, useRef, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Field from '../components/Field';
import OptionChips from '../components/OptionChips';
import OrderSummary, { SummaryDisclosure } from '../components/OrderSummary';
import StickyBar from '../components/StickyBar';
import { useOrder } from '../hooks/useOrder';
import { validateCheckout } from '../utils/validate';
import { nextOrderRef } from '../utils/order';
import { formatKSh } from '../utils/format';
import { config } from '../config';
import styles from './Checkout.module.css';

export default function Checkout() {
  const { lines, checkout, dispatch, totals } = useOrder();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState({});
  const refs = { name: useRef(), phone: useRef(), area: useRef(), note: useRef() };
  const summary = useRef();
  const errors = validateCheckout(checkout);
  const show = (k) => (submitted || touched[k]) && errors[k];
  const patch = (p) => dispatch({ type: 'patch', patch: p });

  useEffect(() => { patch({ step: 'details' }); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (lines.length === 0) return <Navigate to="/cart" replace />;
  const blocked = lines.some((l) => !l.available);
  const deliver = checkout.fulfilment === 'deliver';
  const order = ['name', 'phone', 'area', 'note'];
  const errorKeys = order.filter((k) => errors[k] && (k !== 'area' || deliver));

  const submit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (blocked) return;
    if (errorKeys.length) { requestAnimationFrame(() => summary.current?.focus()); return; }
    patch({ ref: checkout.ref || nextOrderRef(), step: 'payment' });
    navigate('/checkout/payment');
  };
  const bind = (k) => ({ ref: refs[k], value: checkout[k], error: show(k), onBlur: () => setTouched((t) => ({ ...t, [k]: true })), onChange: (e) => patch({ [k]: e.target.value }) });

  return (
    <form onSubmit={submit} noValidate className={styles.layout}>
      <div className={styles.form}>
        <h1 className="srOnly">Checkout details</h1>
        <p className={styles.demo}><b>Demo checkout.</b> No real payment is taken and no order is placed on this site.</p>
        <div className="mobileOnly"><SummaryDisclosure lines={lines} totals={totals} fulfilment={checkout.fulfilment} /></div>

        {submitted && (errorKeys.length > 0 || blocked) && (
          <div ref={summary} tabIndex={-1} role="alert" className={styles.errBox}>
            <b>{blocked ? 'Remove unavailable items to continue' : `Fix ${errorKeys.length} ${errorKeys.length === 1 ? 'thing' : 'things'} to continue`}</b>
            <ul>{errorKeys.map((k) => <li key={k}><button type="button" className="link" onClick={() => refs[k].current?.focus()}>{errors[k]}</button></li>)}</ul>
            <p>Your cart and answers are saved.</p>
          </div>
        )}

        <h2 className={styles.sec}>Your details</h2>
        <Field label="Full name" autoComplete="name" {...bind('name')} />
        <Field label="Phone number" type="tel" inputMode="tel" autoComplete="tel" hint="We use this for delivery calls. Formats 07xx, 01xx and +254 work." {...bind('phone')} />

        <h2 className={styles.sec}>Delivery</h2>
        <div className={styles.fulfil}>
          <OptionChips label="Delivery or collection" value={checkout.fulfilment} onChange={(v) => patch({ fulfilment: v })}
            options={[{ value: 'deliver', label: `Deliver, ${formatKSh(config.deliveryFee)}` }, { value: 'collect', label: 'Collect, free' }]} />
        </div>
        {deliver
          ? <Field label="Area and landmark" autoComplete="street-address" placeholder="Kilimani, near Yaya Centre, gate 3" hint="Nairobi only. Other areas are quoted by the shop on WhatsApp." {...bind('area')} />
          : <p className={styles.collect}>Collect from {config.merchant.collectionPoint}. Ready in 24 hours.</p>}
        <Field label="Note for the shop" optional multiline maxLength={220} placeholder="Gate colour, preferred time" {...bind('note')} />

        <StickyBar inline><Button type="submit" size="lg" block>Continue to payment</Button></StickyBar>
      </div>
      <div className={styles.side}><OrderSummary title={checkout.ref ? `Order ${checkout.ref}` : 'Order summary'} lines={lines} totals={totals} fulfilment={checkout.fulfilment} /></div>
    </form>
  );
}
