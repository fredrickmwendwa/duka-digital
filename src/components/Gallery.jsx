import { useRef, useState } from 'react';
import Picture from './Picture';
import styles from './Gallery.module.css';

/** Phones and tablets: swipeable scroll-snap strip with dots. Desktop: thumbnails plus one large image. */
export default function Gallery({ product, colour }) {
  const [index, setIndex] = useState(0);
  const strip = useRef(null);
  const tone = product.colours.find((c) => c.name === colour)?.tone ?? product.colours[0].tone;
  const onScroll = () => {
    const el = strip.current;
    setIndex(Math.round(el.scrollLeft / el.clientWidth));
  };
  const goTo = (i) => strip.current?.scrollTo({ left: i * strip.current.clientWidth, behavior: 'smooth' });
  const alt = (i) => `${product.name}, ${colour}, photo ${i + 1} of ${product.images.length}`;
  return (
    <div className={`${styles.gallery} ${product.images.length < 2 ? styles.single : ''}`}>
      {product.images.length > 1 && <div className={styles.thumbs} role="tablist" aria-label="Product photos">
        {product.images.map((src, i) => (
          <button key={i} type="button" role="tab" aria-selected={index === i} aria-label={`Photo ${i + 1}`} className={`${styles.thumb} ${index === i ? styles.on : ''}`} onClick={() => { setIndex(i); goTo(i); }}>
            <Picture src={src} alt="" tone={tone} />
          </button>
        ))}
      </div>}
      <div className={styles.stage}>
        <div ref={strip} className={styles.strip} onScroll={onScroll} tabIndex={0} role="group" aria-roledescription="carousel" aria-label="Product photos, swipe or use arrow keys">
          {product.images.map((src, i) => (
            <div key={i} className={styles.slide}><Picture src={src} alt={alt(i)} tone={tone} eager={i === 0} caption={i === 0 ? '' : ''} /></div>
          ))}
        </div>
        {product.images.length > 1 && <div className={styles.dots} aria-hidden="true">{product.images.map((_, i) => <i key={i} className={index === i ? styles.dotOn : ''} />)}</div>}
      </div>
    </div>
  );
}
