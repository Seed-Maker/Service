var animeText = function (str, className, speed, color) {
  if (typeof str != 'string') return '';
  if (!speed) speed = 50;

  var result = document.createElement('div');
  if (className) {
    result.className = 'animation ' + className;
  }
  if (color) {
    result.style.color = color;
  }

  for (let i = 0, char = []; i < str.length; i++) {
    if (str[i] == '\n') {
      char[i] = document.createElement('br');
    } else {
      char[i] = document.createElement('span');
      char[i].innerHTML = str[i].replace(' ', '&nbsp;');
    }

    if (className) {
      setTimeout(() => {
        char[i].className = className;
      }, i * speed);
    }
    result.appendChild(char[i]);
  }

  return result;
}

animeText.scaleIn = function (str, speed, color) {
  return animeText(str, 'scaleIn', speed, color);
}

animeText.warn = function (str, speed, color) {
  return animeText(str, 'warn', speed, color);
}

animeText.slideIn = function (str, speed, color) {
  return animeText(str, 'slideIn', speed, color);
}
