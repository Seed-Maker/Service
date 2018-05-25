function updateCatchphrase() {
  var y = window.scrollY;
  var catchphrase = "새로움에서 변화를 찾다.";
  var elem = document.getElementById('catchphrase');

  if (y < 100) {
    elem.innerHTML = '';
    if (!elem.className) elem.style.opacity = 0;
    return;
  }

  elem.removeAttribute('style');
  elem.className = 'animation slideIn';

  y = y - 100;

  y = y/10
  if (y > catchphrase.length) y = catchphrase.length;
  elem.innerHTML = catchphrase.slice(0, y);
}

window.addEventListener('DOMContentLoaded', updateCatchphrase);
window.addEventListener('scroll', updateCatchphrase);
