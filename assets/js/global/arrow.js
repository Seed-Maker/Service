function updateArrow() {
  var arrow = document.getElementById('arrow');

  if (arrow.style.display == 'none') return;
  if (scrollY > arrow.offsetHeight * 2) return arrow.style.display = 'none';

  Object.assign(arrow.style, {
    left: Math.floor((innerWidth - arrow.offsetWidth)/2) + 'px',
    bottom: -scrollY + 45 + 'px'
  });
}

window.addEventListener('DOMContentLoaded', updateArrow, false);
window.addEventListener('scroll', updateArrow, false);
window.addEventListener('resize', updateArrow, false);
