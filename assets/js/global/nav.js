function openNav() {
  document.querySelector('nav').style.display = 'block';
}

function closeNav() {
  document.querySelector('nav').style.display = 'none';
}

function addEventOnMenuButton() {
  var menuBtn = document.getElementById('menu-btn');

  if (!menuBtn) return setTimeout(addEventOnMenuButton, 500);

  menuBtn.addEventListener('click', function () {
    var nav = document.getElementsByTagName('nav')[0],
        css = nav.style;

    if (!css.display || css.display == 'none') return openNav();
    if (css.display == 'block') return closeNav();
  }, false);
}

window.addEventListener('DOMContentLoaded', function () {
  addEventOnMenuButton();
  if (innerWidth > 1020) openNav();
}, false);
