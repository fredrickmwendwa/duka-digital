import Breadcrumbs from '../components/Breadcrumbs';
import { formatKSh } from '../utils/format';
import { config } from '../config';
import styles from './Help.module.css';

const Row = ({ a, b, c }) => <div className={styles.row}><span><b>{a}</b><br /><span className={styles.dim}>{b}</span></span><span className="mono">{c}</span></div>;

export default function Help() {
  return (
    <div className={`container ${styles.page}`}>
      <Breadcrumbs trail={[{ label: 'Home', to: '/' }, { label: 'Help' }]} />
      <h1 className="pageTitle">Delivery and payment</h1>
      <section className={styles.sec}>
        <h2 className="sectionTitle">Delivery</h2>
        <Row a="Nairobi" b="1 to 2 days" c={formatKSh(config.deliveryFee)} />
        <Row a="Outside Nairobi" b="The shop quotes the fee on WhatsApp" c="Quoted" />
        <Row a="Collect" b={`${config.merchant.collectionPoint}, ready in 24 hours`} c="Free" />
      </section>
      <section className={styles.sec}>
        <h2 className="sectionTitle">Paying with M-Pesa</h2>
        <ol className={styles.steps}>
          <li>Check out and note the {config.payment.mode === 'paybill' ? 'Paybill number and account' : 'Till number'}, amount and order reference.</li>
          <li>Pay in the M-Pesa menu on your phone. Never enter your PIN on this site.</li>
          <li>Return and open WhatsApp. The shop confirms your payment there.</li>
        </ol>
      </section>
      <section className={styles.sec}>
        <h2 className="sectionTitle">Ordering on WhatsApp</h2>
        <p>Your order opens in WhatsApp as a ready message. Nothing is sent until you press Send. The shop replies to confirm stock and delivery time.</p>
      </section>
      <section className={styles.sec} id="exchanges">
        <h2 className="sectionTitle">Exchanges</h2>
        <p>Free size exchange within 7 days if tags are on. Message the shop with your order reference.</p>
      </section>
      <p className={`mono ${styles.demo}`}>Demo store. Fees, times and policies are demonstration data.</p>
    </div>
  );
}
