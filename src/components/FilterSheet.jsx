import Overlay from './Overlay';
import FilterPanel from './FilterPanel';
import Button from './Button';
import { plural } from '../utils/format';
import styles from './FilterSheet.module.css';

export default function FilterSheet({ open, onClose, filters, onChange, onReset, resultCount }) {
  return (
    <Overlay open={open} onClose={onClose} label="Filters" placement="bottom">
      <div className={styles.head}>
        <span className={styles.grab} aria-hidden="true" />
        <div className={styles.row}><h2>Filters</h2><button type="button" className="link" onClick={onReset}>Reset</button></div>
      </div>
      <div className={styles.body}><FilterPanel filters={filters} onChange={onChange} idp="sheet" /></div>
      <div className={styles.foot}><Button block size="lg" onClick={onClose} data-autofocus>Show {plural(resultCount, 'piece')}</Button></div>
    </Overlay>
  );
}
