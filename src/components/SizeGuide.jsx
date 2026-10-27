import Overlay from './Overlay';
import styles from './SizeGuide.module.css';

const rows = [['XS', 80, 62, 86], ['S', 84, 66, 90], ['M', 88, 70, 94], ['L', 92, 74, 98], ['XL', 96, 78, 102]];

export default function SizeGuide({ open, onClose, highlight }) {
  return (
    <Overlay open={open} onClose={onClose} label="Size guide" placement="right" width="420px">
      <div className={styles.head}><h2>Size guide</h2><button type="button" onClick={onClose} aria-label="Close size guide" className={styles.close} data-autofocus>&times;</button></div>
      <div className={styles.body}>
        <p>Measurements are body sizes in centimetres. Between sizes? Choose the larger one for a relaxed fit.</p>
        <table>
          <thead><tr><th>Size</th><th>Bust</th><th>Waist</th><th>Hips</th></tr></thead>
          <tbody>{rows.map(([s, ...m]) => <tr key={s} className={s === highlight ? styles.on : ''}><th scope="row">{s}</th>{m.map((v, i) => <td key={i}>{v}</td>)}</tr>)}</tbody>
        </table>
        <p className={styles.fine}>Demo measurements. Free size exchange within 7 days, tags on.</p>
      </div>
    </Overlay>
  );
}
