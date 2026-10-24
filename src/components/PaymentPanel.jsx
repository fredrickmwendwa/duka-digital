import { useId } from 'react';
import CopyField from './CopyField';
import { config } from '../config';
import { formatKSh } from '../utils/format';
import styles from './PaymentPanel.module.css';

/** Simulated Lipa na M-Pesa instructions. Presentation only: nothing here can verify a payment. */
export default function PaymentPanel({ total, reference, reported, onReportedChange }) {
  const id = useId();
  const paybill = config.payment.mode === 'paybill';
  const steps = paybill
    ? ['Open M-Pesa on your phone and choose Lipa na M-Pesa, then Paybill.', 'Enter the business number, then the account number shown above.', 'Enter the exact amount.', 'Enter your M-Pesa PIN on your phone only. Never on this website.', 'Wait for the M-Pesa confirmation message, then come back here.']
    : ['Open M-Pesa on your phone and choose Lipa na M-Pesa, then Buy Goods and Services.', 'Enter the Till number and the exact amount above.', 'Enter your M-Pesa PIN on your phone only. Never on this website.', 'Wait for the M-Pesa confirmation message, then come back here.'];
  return (
    <section className={styles.panel} aria-labelledby={`${id}-t`}>
      <p className={`${styles.status} ${reported ? styles.reported : ''}`} role="status">
        {reported ? 'Reported by you, shop will confirm' : 'Payment pending, not verified'}
      </p>
      <h1 id={`${id}-t`} className={styles.title}>Pay with M-Pesa {paybill ? 'Paybill' : 'Till'}</h1>
      <p className={styles.lead}>Demo {paybill ? 'Paybill' : 'Till'}. Pay the exact amount, then confirm on WhatsApp.</p>
      {paybill ? (
        <>
          <CopyField label="Business number (demo)" value={config.payment.paybill} />
          <CopyField label="Account number" value={reference} />
        </>
      ) : (
        <>
          <CopyField label="Till number (demo)" value={config.payment.till} />
          <CopyField label="Reference" value={reference} />
        </>
      )}
      <CopyField label="Amount" value={total} display={formatKSh(total)} />
      <ol className={styles.steps}>{steps.map((s) => <li key={s}>{s}</li>)}</ol>
      <label className={styles.check}>
        <input type="checkbox" checked={reported} onChange={(e) => onReportedChange(e.target.checked)} />
        <span>I have sent the payment</span>
      </label>
      <p className={styles.fine}>This website cannot see your payment. The shop checks it and confirms on WhatsApp.</p>
    </section>
  );
}
