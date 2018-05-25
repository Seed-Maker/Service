function loadFoot() {
  let footer = document.querySelector('footer'),
      xhttp = new XMLHttpRequest();

  //일부 네트워크가 느린 브라우저에서 컨텐츠를 로드하기 전에 함수를 호출하는 문제가 있다.
  //때문에 엘리먼트가 존재하지 않는다면 1초후에 다시 함수를 호출한다.
  if (!footer) return setTimeout(loadFoot, 1000);
  footer.innerHTML = "로딩중...";

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200)
      footer.innerHTML = xhttp.responseText;
  }

  xhttp.open('GET', '/assets/html/global/footer.html', true);
  xhttp.send();
}

var xhttp = new XMLHttpRequest();
window.addEventListener('load', loadFoot, false);
xhttp.open('GET', '/assets/html/global/footer.html', true);
xhttp.send();
