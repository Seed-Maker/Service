function loadNoticeList() {
  let noticeListElem = document.getElementById('notice-list'),
      src = '/notice/list.json?r='
          + Math.floor(Math.random()*100000);

  if (!noticeListElem) return setTimeout(loadNoticeList, 500);

  fetchHTTP(src, function (str) {
    if (!str) return;

    let list = JSON.parse(str),
        p = [];

    document.getElementById('notice-length').innerHTML = list.length;
    noticeListElem.innerHTML = null;

    for (let i = 0; i < list.length; i++) {
      p[i] = document.createElement('p');
      p[i].innerHTML = list[i].title;
      p[i].addEventListener('click', function () {
        location.href = 'view.html?key=' + list[i].key;
      }, false);
      noticeListElem.append(p[i]);
    }
  });
}

window.addEventListener('DOMContentLoaded', loadNoticeList, false);
