function loadYoutube() {
  eachElement('u.youtube', function (index, elem) {
    var src = "https://www.youtube.com/embed/" + elem.innerHTML;
    var style = elem.getAttribute('style');
    var iframe = document.createElement('iframe');
    var noAnima = elem.getAttribute('no-anima');

    elem.innerHTML = elem.className = '';
    elem.setAttribute('style', '');
    elem.appendChild(iframe);

    iframe.width = 560;
    iframe.height = 315;
    iframe.src = src;
    iframe.setAttribute('no-anima', noAnima);
    iframe.setAttribute('style', style);
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allow', 'autoplay; encrypted-media');
    iframe.setAttribute('allowfullscreen', '1');

    iframe.style.width = '100%';
    iframe.style.height = iframe.offsetWidth * 9/16 + 'px';
  });
}

appendNewStyle({
  'u iframe': {
    'margin-top': '1rem',
    'border-radius': '.5rem',
    'box-shadow': '0 0.25rem 0.5rem 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
  }
});

window.addEventListener('load', loadYoutube);
window.addEventListener('resize', function () {
  eachElement('iframe', function (index, elem) {
    elem.style.height = elem.offsetWidth * 9/16 + 'px';
  });
});
