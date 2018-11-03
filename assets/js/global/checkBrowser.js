function isSupportScript(code) {
  try {
    eval(code);
    return true;
  } catch (e) {
    return false;
  }
}

if (!isSupportScript('let a;')) {
  alert("이 브라우저는 구형 브라우저여서 일부 컨텐츠가 비정상적으로 표시될 수 있습니다. 최신 버전의 브라우저를 사용해주시기 바랍니다.");
}
