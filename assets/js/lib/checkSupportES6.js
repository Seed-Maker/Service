function isSupportScript(str) {
  try {
    eval(str);
    return true;
  } catch (e) {
    return false;
  }
}

if (!isSupportScript('let a = 0')) {
  location.href = '/notSupport.html';
}
