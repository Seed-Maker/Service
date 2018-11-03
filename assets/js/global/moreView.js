var moreView = {};

moreView.init = function () {
  var beforeViews = document.querySelectorAll('.before.more-view'),
      afterViews = document.querySelectorAll('.after.more-view'),
      buttons,
      i = 0;

  for (; i < afterViews.length; i++) {
    afterViews[i].style.display = 'none';
  }

  for (i = 0; i < beforeViews.length; i++) {
    beforeViews[i].outerHTML += '<a class="center button for-more-view">더보기</a>';
  }

  buttons = document.querySelectorAll('.for-more-view');
  for (i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', moreView.open, false);
  }
};

moreView.open = function () {
  var target = this.parentNode.querySelectorAll('.after.more-view');
  for (var i = 0; i < target.length; i++) {
    target[i].style.display = 'block';
    if (window.animation) target[i].style.animation = animation({
      duration: 500,
      '0%': {
        transform: translateY(30),
        opacity: 0
      },
      '100%': {
        transform: translateY(0),
        opacity: 1
      }
    });
  }
  this.style.display = 'none';
};

window.addEventListener('DOMContentLoaded', moreView.init, false);
