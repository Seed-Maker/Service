var moreView = {}

moreView.init = function () {
  appendNewStyle({
    '.after-view': {
      'display': 'none'
    }
  });

  var moerViewElem = document.querySelectorAll('div.more-view');
  var a;
  for (var i = 0; i < moerViewElem.length; i++) {
    a = document.createElement('a');
    a.className = 'long button';
    a.innerHTML = '더보기...';
    a.addEventListener('click', function () {
      moreView.view(this);
    });

    try {
      moerViewElem[i].querySelector('.pre-view').appendChild(a);
    } catch (e) {
      continue;
    }
  }
}

moreView.view = function (elem) {
  var target = elem.parentElement.parentElement.querySelector('.after-view');
  elem.style.display = 'none';
  target.style.display = 'block';
  target.className = 'animation slideInToBottom';
}

window.addEventListener('load', moreView.init);
