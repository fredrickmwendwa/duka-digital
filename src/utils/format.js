const nf = new Intl.NumberFormat('en-KE', { maximumFractionDigits: 0 });

/** Whole-shilling amounts, always through this one function so every screen matches. */
export const formatKSh = (n) => `KSh ${nf.format(Math.round(n))}`;

export const plural = (n, one, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;
