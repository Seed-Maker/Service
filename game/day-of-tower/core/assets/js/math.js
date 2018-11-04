/**
  *  n%확률로 true를 반환하고, 예외의 경우는 false를 반환하는 함수.
  *  n이 0보다 작거나 같으면 무조건 false를 반환.
  *  n이 100보다 크거나 같으면 무조건 true를 반환.
  *
  * @param {Float} n
  * @return {Boolean}
  */
function percent(n) {
  n = parseFloat(n);

  if (!n || n < 0) return false;
  if (n >= 100) return true;

  return (Math.random() * 100 < n);
}

/**
  *  min 부터 max 사이의 임의의 정수를 반환.
  *
  *  @param {Integer} min
  *  @param {Integer} max
  *  @return {Integer}
  */
function randomInt(min, max) {
  if (min == null && max == null) {
    //아무런 인자도 주어지지 않을 경우, -9007199254740991 ~ 9007199254740991 사이의 임의의 정수를 반환.
    return (-1)**(percent(50)) * Math.floor(Math.random()*Number.MAX_SAFE_INTEGER);
  }

  var range = [],
      key;

  min = parseInt(min);
  max = parseInt(max);

  if (min > max || isNaN(min + max)) return NaN;
  if (min == max) return min;

  for (var i = min; i <= max; i++) range.push(i);
  key = Math.floor(Math.random()*(range.length - 1));

  return range[key];
}
