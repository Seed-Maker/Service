function loadNotice() {
  let title = document.getElementById('title'),
      description = document.getElementById('description')
      src = '/notice/docs/'
          + getParameterByName('key')
          + '.json?r=' + Math.floor(Math.random()*100000);

  if (!title || !description) return setTimeout(loadNotice, 500);

  fetchHTTP(src, function (str) {
    if (!str) return;

    if (str == 'Error') {
      title.innerHTML = "글을 찾을 수 없습니다.";
      description.innerHTML = "글을 찾을 수 없습니다. 15초후에 공지사항 리스트로 돌아갑니다.";
      return setTimeout(function () {
        location.href = 'index.html';
      }, 150000);
    }

    let notice = JSON.parse(str);

    document.querySelector('title').innerHTML = "Seed Maker: " + notice.title;
    title.innerHTML = notice.title;
    description.innerHTML = notice.description;
  });
}

window.addEventListener('DOMContentLoaded', loadNotice, false);
