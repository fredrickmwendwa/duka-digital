export function Monogram({ size = 28, dark = false }) {
  const bg = dark ? '#14130f' : '#f3f1ea';
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" role="img" aria-label="Duka Digital">
      <path d="M4 4h18a18 18 0 0 1 0 36H4z" fill={dark ? '#f3f1ea' : '#14130f'} />
      <circle cx="4" cy="22" r="5" fill={bg} />
      <rect x="16" y="18" width="12" height="8" fill={dark ? '#7f96ff' : '#1f3fd1'} />
    </svg>
  );
}
