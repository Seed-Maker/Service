window.addEventListener('DOMContentLoaded', updateWord, false);

var words = [
  "창의적인",
  "도전적인",
  "희망의",
  "새로운"
];

function updateWord() {
  let elem = document.querySelector('#words');
  let p = document.createElement('p');

  if (!elem.innerHTML) {
    p.innerHTML = words[0];
    elem.appendChild(p);
    words.index = 1;
    return setTimeout(updateWord, 3000);
  }

  elem.querySelector('p').className = 'animation slideOut';
  return setTimeout(function () {
    elem.innerHTML = '';
    p.innerHTML = words[words.index];
    p.className = 'animation slideIn';
    elem.appendChild(p);
    words.index++;
    if (words.index >= words.length) words.index = 0;
    return setTimeout(updateWord, 3000);
  }, 600);
}
