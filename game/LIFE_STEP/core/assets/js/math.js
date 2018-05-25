function percent(p) {
  p = parseFloat(p);

  if (!p || p < 0) return false;
  if (p >= 100) return true;

  return (Math.random() * 100 < p);
}
