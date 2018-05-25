window.addEventListener('load', function () {
  var src = 'https://seed-maker.github.io/notice/list.json?r='
          + Math.floor(Math.random()*100000);

  fetchHTTP(src, viewerInit);
});

function viewerInit(str) {
  if (!str) return;

  str = str.resetForJSON();
  var list = JSON.parse(str);
  var listElem = document.querySelector('#notice-list');

  document.querySelector('#notice-list-length span').innerHTML = list.length;

  for (let i = 0, li = [], a = []; i < list.length; i++) {
    li[i] = document.createElement('li');
    a[i] = document.createElement('a');
    a[i].setAttribute('href', 'view.html?key=' + list[i].key);
    a[i].innerHTML = list[i].title;
    li[i].appendChild(a[i]);
    listElem.appendChild(li[i]);
  }
}
