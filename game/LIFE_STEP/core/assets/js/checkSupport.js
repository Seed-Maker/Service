function isSupportScript(str) {
  try {
    eval(str);
    return true;
  } catch (e) {
    return false;
  }
}

if (!isSupportScript('async function a(){}')) {
  window.onload = function () {
    var body = document.getElementsByTagName('body')[0];
    body.style.background = 'white';
    body.style.fontSize = '2rem';
    body.innerHTML = "이 브라우저에서는 이 게임을 실행할 수 없습니다. 최신 버전의 브라우저를 사용해주십시오.";
  }
}
