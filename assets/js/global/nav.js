function setNav() {
  let nav = document.querySelector('nav'),
      link = location.pathname.slice(1).split('/');

  //배열의 마지막 요소가 무조건 빈 문자열이 되므로 이를 지워야한다.
  link.pop();
  if (!link.length) return;

  //일부 네트워크가 느린 브라우저에서 컨텐츠를 로드하기 전에 함수를 호출하는 문제가 있다.
  //때문에 엘리먼트가 존재하지 않는다면 1초후에 다시 함수를 호출한다.
  if (!nav) return setTimeout(setNav, 1000);

  for (var i = 0, a = [], href = location.origin; i < link.length; i++) {
    href += '/' + link[i];

    a[i] = document.createElement('a');
    a[i].innerHTML = link[i];
    a[i].setAttribute('href', href);

    nav.appendChild(a[i]);
    nav.innerHTML += "/";
  }
}

window.addEventListener('load', setNav, false);
