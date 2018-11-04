function loadNotice() {
  let title = $('#title'),
      description = $('#description')
      src = '/notice/docs/'
          + getParameterByName('key')
          + '.json?r=' + Math.floor(Math.random()*100000);

  if (!title || !description) return setTimeout(loadNotice, 500);

  return ajax.fetchJSON({
    path: src
  }).then(function (notice) {
    $('title').innerHTML = "Seed Maker: " + notice.title;
    title.innerHTML = notice.title;
    description.innerHTML = notice.description;
  }).catch(function () {
    title.innerHTML = "글을 찾을 수 없습니다.";
    description.innerHTML = "글을 찾을 수 없습니다. 15초후에 공지사항 리스트로 돌아갑니다.";
    setTimeout(function () {
      location.href = 'index.html';
    }, 150000);
  });
}

window.addEventListener('DOMContentLoaded', loadNotice, false);
