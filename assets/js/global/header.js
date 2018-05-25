function headerUpdate() {
  var header = document.querySelector('header');
  var opacity = 0;
  var top = 0;

  if (!header) return;

  if (scrollY > 30) {
    opacity = scrollY / 250;
    if (opacity > 0.9) opacity = 0.9;
  }

  top = scrollY / 250;
  top = (1 - ((top > 1)?1:top)) * 2 + 'rem';

  Object.assign(header.style, {
    top: top,
    left: Math.floor((innerWidth - header.offsetWidth)/2) + 'px',
    background: rgba(206, 242, 121, opacity)
  });

  document.body.style.paddingTop = header.offsetHeight * 2 + 'px';
}

window.addEventListener('resize', headerUpdate, false);
window.addEventListener('DOMContentLoaded', headerUpdate, false);
window.addEventListener('scroll', headerUpdate, false);
setInterval(headerUpdate, 100);
