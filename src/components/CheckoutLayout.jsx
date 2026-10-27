import { useRef } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Toasts from './Toasts';
import RouteProgress from './RouteProgress';
import { Monogram } from './Logo';
import { config } from '../config';
import { useRouteFocus } from '../hooks/useRouteFocus';
import styles from './CheckoutLayout.module.css';

const steps = [{ path: '/checkout', name: 'Details' }, { path: '/checkout/payment', name: 'Pay' }, { path: '/checkout/whatsapp', name: 'WhatsApp' }];
const back = { '/checkout': ['/cart', 'Cart'], '/checkout/payment': ['/checkout', 'Edit order'], '/checkout/whatsapp': ['/checkout/payment', 'Back to payment'] };

/** Reduced chrome for the three checkout steps: fewer exits, one clear path. */
export default function CheckoutLayout() {
  const main = useRef(null);
  const { pathname } = useLocation();
  useRouteFocus(main);
  const current = Math.max(0, steps.findIndex((s) => s.path === pathname));
  const [backTo, backLabel] = back[pathname] || ['/cart', 'Cart'];
  return (
    <>
      <RouteProgress />
      <a href="#main" className="srOnly">Skip to content</a>
      <header className={styles.header}>
        <div className={`container ${styles.row}`}>
          <Link to={backTo} className={`link ${styles.back}`}>&larr; {backLabel}</Link>
          <Link to="/" className={styles.brand}>{config.merchant.name}</Link>
          <nav aria-label="Checkout steps" className={styles.steps}>
            {steps.map((s, i) => (
              <span key={s.name} aria-current={i === current ? 'step' : undefined} className={`${styles.step} ${i === current ? styles.on : ''} ${i < current ? styles.done : ''}`}>{i + 1} {s.name}</span>
            ))}
          </nav>
        </div>
      <div className={styles.progress} aria-hidden="true"><i style={{ transform: `scaleX(${(current + 1) / 3})` }} /></div>
      </header>
      <main id="main" ref={main} tabIndex={-1} className={styles.main}>
        <div key={pathname} className="page container"><Outlet /></div>
      </main>
      <footer className={`container ${styles.foot}`}>
        <Monogram size={22} /><span>Demo store. Storefront by duka.digital. All details are demonstration data.</span>
      </footer>
      <Toasts />
    </>
  );
}
