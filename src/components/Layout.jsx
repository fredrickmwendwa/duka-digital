import { useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import MobileMenu from './MobileMenu';
import SearchOverlay from './SearchOverlay';
import CartDrawer from './CartDrawer';
import ResumeBanner from './ResumeBanner';
import Toasts from './Toasts';
import { useRouteFocus } from '../hooks/useRouteFocus';
import styles from './Layout.module.css';

export default function Layout() {
  const main = useRef(null);
  const { pathname } = useLocation();
  useRouteFocus(main);
  return (
    <>
      <a href="#main" className={styles.skip}>Skip to content</a>
      <div className={styles.demo}>DEMO STORE / Nairobi delivery KSh 300 / Pay with M-Pesa / Order on WhatsApp</div>
      <Header />
      <ResumeBanner />
      <main id="main" ref={main} tabIndex={-1} className={styles.main}>
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
