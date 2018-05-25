function wait(ms) {
  return new Promise(re => {
    setTimeout(re, ms);
  });
}

var frame = [];

frame.add = function (frameSet) {
  if (frameSet == null) {
    //null & undefined 핸들링.
    return;
  }

  let duration = 0, callback, set, id;

  if (Array.isArray(frameSet)) {
    var i = 0, code = ['',''];
    for (; i < frameSet.length; i++) {
      code[0] += `frame.add(frameSet[${i}]).then(() => {`;
      code[1] += '});';
      duration += (isNaN(frameSet[i].duration))? 1000 : frameSet[i].duration;
    }

    id = eval(code[0] + code[1]).ID + i - 1;
  } else {
    if (isFinite(frameSet.wait)) {
      frameSet = {
        callback:()=>{},
        duration:frameSet.wait
      }
    }

    duration = frameSet.duration || 1000,
    callback = (typeof frameSet.callback == 'function')? frameSet.callback : ()=>{};

    frame.push({
      duration: duration,
      callback: callback,
      i: 0,
      finallyCallbackList: []
    });

    id = frame.length - 1;
  }

  return {
    ID: id,
    duration: duration,
    then: function (thenCallback) {
      thenCallback = (typeof thenCallback == 'function')? thenCallback:()=>{};

      if (!frame[this.ID]) {
        let id = this.ID,
            setDuration = frameSet[frameSet.length-1].duration,
            duration = this.duration - ((isNaN(setDuration)? 1000 : setDuration)/ 3);

        setTimeout(function () {
          frame[id].finallyCallbackList.push(thenCallback);
        }, duration);
      } else {
        frame[this.ID].finallyCallbackList.push(thenCallback);
      }

      return this;
    }
  };
}

frame.reset = function (id) {
  if (isNaN(+id)) return;
  frame[+id] = 0;
}

frame.resetAll = function () {
  frame.length = 0;
}

function RAF(callback) {
  (window.requestAnimationFrame
  || window.mozRequestAnimationFrame
  || window.webkitRequestAnimationFrame
  || window.msRequestAnimationFrame
  || (()=>{}))(callback);
}

function requestFrame() {
  var f = frame,
      isEmpty = true;

  for (var i = 0; i < f.length; i++) {
    if (!f[i]) continue;

    isEmpty = false;
    f[i].callback(f[i].i);
    f[i].i += 50/(3*f[i].duration);
    if (f[i].i >= 1 || f.skipFrame) {
      f[i].i = 1;
      f[i].callback(1);
      for (var j = 0; j < f[i].finallyCallbackList.length; j++) {
        f[i].finallyCallbackList[j]();
      }
      f[i] = null;
    }
  }

  if (isEmpty) f.length = 0;

  RAF(requestFrame);
}

requestFrame();
