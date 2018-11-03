function fetchHTTP(src, callback) {
  let xmlhttp = new XMLHttpRequest();

  if (typeof callback != 'function') callback = function () {};

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
}
