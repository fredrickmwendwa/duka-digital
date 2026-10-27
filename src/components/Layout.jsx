import { useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Marquee from './Marquee';
import MobileMenu from './MobileMenu';
import SearchOverlay from './SearchOverlay';
import CartDrawer from './CartDrawer';
import ResumeBanner from './ResumeBanner';
import RouteProgress from './RouteProgress';
import Toasts from './Toasts';
import { useRouteFocus } from '../hooks/useRouteFocus';
import styles from './Layout.module.css';

const ticker = ['DEMO STORE', 'Nairobi delivery KSh 300', 'Pay with M-Pesa', 'Order on WhatsApp', 'Free size exchange in 7 days'];

export default function Layout() {
  const main = useRef(null);
  const { pathname } = useLocation();
  useRouteFocus(main);
  return (
    <>
      <RouteProgress />
      <a href="#main" className={styles.skip}>Skip to content</a>
      <Marquee items={ticker} seconds={36} className={styles.demo} />
      <Header />
      <ResumeBanner />
      <main id="main" ref={main} tabIndex={-1} className={`${styles.main} ${pathname === '/' ? '' : styles.pad}`}>
        <div key={pathname} className="page"><Outlet /></div>
      </main>
      <Footer />
      <MobileMenu />
      <SearchOverlay />
      <CartDrawer />
      <Toasts />
    </>
  );
}
