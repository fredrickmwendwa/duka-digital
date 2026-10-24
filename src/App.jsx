import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import CheckoutLayout from './components/CheckoutLayout';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Payment from './pages/Payment';
import Review from './pages/Review';
import Help from './pages/Help';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Catalog />} />
        <Route path="product/:slug" element={<Product />} />
        <Route path="cart" element={<Cart />} />
        <Route path="help" element={<Help />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route element={<CheckoutLayout />}>
        <Route path="checkout" element={<Checkout />} />
        <Route path="checkout/payment" element={<Payment />} />
        <Route path="checkout/whatsapp" element={<Review />} />
      </Route>
    </Routes>
  );
}
