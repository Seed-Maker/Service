window.addEventListener('load', function () {
  var key = getParameterByName('key'),
      src = 'https://seed-maker.github.io/notice/docs/'
          + key + '.json?r=' + Math.floor(Math.random()*100000);

  fetchHTTP(src, viewerInit);
});

function viewerInit(str) {
  var article = {},
      title = document.querySelector('title'),
      noticeTitle = document.querySelector('#notice-title'),
      noticeDescription = document.querySelector('#notice-description');

  if (!str) return;
  if (str == 'Error') {
    noticeTitle.innerHTML = "에러!";
    noticeDescription.innerHTML = "게시글을 찾을 수 없습니다... 15초후에 메인 페이지로 이동합니다.";
    return setTimeout(function () {
      location.href = '/';
    }, 15000);
  }

  str = str.resetForJSON();
  var article = JSON.parse(str);

  title.innerHTML = '시드메이커: ' + article.title;
  noticeTitle.innerHTML = article.title;
  noticeDescription.innerHTML = article.description;
}
