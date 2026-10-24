import Button from '../components/Button';
import styles from './NotFound.module.css';

export default function NotFound() {
  return (
    <div className={`container ${styles.page}`}>
      <p className={styles.code}>404</p>
      <h1 className="pageTitle">We could not find that page.</h1>
      <p className={styles.text}>The link may be old, or the piece may have sold out and been removed.</p>
      <form action="/shop" role="search" className={styles.search}>
        <label htmlFor="nf-q" className="srOnly">Search the shop</label>
        <input id="nf-q" name="q" type="search" placeholder="Search the shop" />
        <Button type="submit" variant="secondary">Search</Button>
      </form>
      <div className={styles.cta}><Button to="/shop?new=1">Shop new in</Button><Button to="/" variant="secondary">Back to home</Button></div>
    </div>
  );
}
