/**
* 인자로 받은 selector가 String에 포함되어 있는지
* 검사하고 결과를 Boolean으로 리턴합니다.
*
* @param <String> selector
* @return <Boolean> ture || false
*/
String.prototype.has = function (selector) {
  return this.replace(selector,'') != this;
}

/**
* 인자로 받은 selector가 문자열에 존재하지 않을때까지
* 해당 문자열을 replace 합니다.
*
* @param <String> selector
* @return <String>
*/
String.prototype.remove = function (selector) {
  var _this = this;
  do {
    _this = _this.replace(selector, '');
  } while (_this.has(selector));
  return _this;
};

/**
* 인자로 받은 selector가 문자열에 존재하지 않을때까지
* 해당 문자열을 replace 합니다.
*
* @param none.
* @return <String>
*/
String.prototype.resetForJSON = function () {
  return this.remove('\t').remove('\n');
};

/**
* HTTP 요청을 시도하고 응답 결과를 callback의 인자로 하고 callback을 호출합니다.
*
* @param <String> src
* @param <Function> callback
* @return none.
*/
function fetchHTTP(src, callback) {
  if (typeof callback != 'function') callback = ()=>{};
  let xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.status == 404) return callback('Error');
    if (this.readyState == 4 && this.status == 200) {
      callback(this.responseText);
    } else {
      callback(null);
    }
  }
  xmlhttp.open('GET', src, true);
  xmlhttp.send();
};
