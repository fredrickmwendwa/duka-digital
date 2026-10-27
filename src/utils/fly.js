/** Flies a small thumbnail from `from` to the header cart button. No-op under reduced motion. */
export function flyToCart(from, src, tone = '#e4dfd0') {
  if (!from || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const target = document.querySelector('[data-cart-target]');
  if (!target) return;
  const a = from.getBoundingClientRect(), b = target.getBoundingClientRect();
  const el = document.createElement('div');
  el.setAttribute('aria-hidden', 'true');
  el.style.cssText = `position:fixed;z-index:400;left:${a.left + a.width / 2 - 30}px;top:${a.top + a.height / 2 - 38}px;width:60px;height:76px;background:${tone} url(${src}) center/cover;border:2px solid #14130f;pointer-events:none;will-change:transform`;
  document.body.appendChild(el);
  const dx = b.left + b.width / 2 - (a.left + a.width / 2), dy = b.top + b.height / 2 - (a.top + a.height / 2);
  el.animate(
    [{ transform: 'translate(0,0) scale(1) rotate(0)', opacity: 1 },
     { transform: `translate(${dx * 0.55}px, ${dy * 0.25 - 60}px) scale(.85) rotate(-6deg)`, opacity: 1, offset: 0.45 },
     { transform: `translate(${dx}px, ${dy}px) scale(.18) rotate(8deg)`, opacity: 0.4 }],
    { duration: 780, easing: 'cubic-bezier(.5,0,.2,1)' },
  ).onfinish = () => el.remove();
}
