window.addEventListener('DOMContentLoaded', function () {
  (document.head || document.body).innerHTML += '<style id="animation-js-style"></style>';
}, false);

function animation(set) {
  var style = document.getElementById('animation-js-style'),
      animationName = 'animationJS-set' + Math.floor(Number.MAX_SAFE_INTEGER * Math.random()),
      query = '';

  if (!style) {
    (document.head || document.body).innerHTML += '<style id="animation-js-style"></style>';
    style = document.getElementById('animation-js-style');
  }

  if (typeof set != 'object') return '';

  query += '@keyframes ' + animationName + '{';

  for (var key in set) {
    if (!set.hasOwnProperty(key) || typeof set[key] != 'object') continue;

    if (!isNaN(+key)) key += '%';
    query += key + '{';
    for (var key2 in set[key]) {
      query += key2 + ':' + set[key][key2] + ';';
    }
    query += '}';
  }

  query += '}';

  style.innerHTML += query;

  return animationName + ' ' + (set.duration / 1000) + 's';
}

function translate(x, y) {
  if (typeof x == 'number') x += 'px';
  if (typeof y == 'number') y += 'px';
  return 'translate(' + x + ',' + y + ')';
}

function translateX(x) {
  if (typeof x == 'number') x += 'px';
  return 'translateX(' + x + ')';
}

function translateY(y) {
  if (typeof y == 'number') y += 'px';
  return 'translateY(' + y + ')';
}
