function loadImage() {
  eachElement('i.image', function (i,elem) {
    let src = elem.innerHTML,
        img = new Image(),
        canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');

    canvas.width = elem.getAttribute('width') || 600;
    canvas.height = elem.getAttribute('height') || 600;

    ctx.clear = function () {
      for (var i = 0; i < 100; i++) {
        for (var j = 0; j < 100; j++) {
          ctx.fillStyle = ((i+j)%2)? '#EAEAEA' : '#8C8C8C';
          ctx.fillRect(i * 50, j * 50, (i + 1) * 50, (j + 1) * 50);
        }
      }
    }

    ctx.clear();

    ctx.font = canvas.width / 8 + "px Arial";
    ctx.textAlign = "center";
    ctx.fillStyle = '#6799FF';
    ctx.fillText("Loading...", canvas.width/2, canvas.height/2);

    elem.style.display = 'block';
    elem.style.width = '100%';
    elem.className = '';
    elem.innerHTML = '';
    elem.removeAttribute('width');
    elem.removeAttribute('height');
    elem.appendChild(canvas);

    img.src = src;
    img.onload = function () {
      ctx.clearRect(0,0,99*999,99*999);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.ImgLoaded = true;
    }

    img.onerror = function () {
      ctx.clear();
      ctx.fillStyle = '#6799FF';
      ctx.fillText("Error!", canvas.width/2, canvas.height/2);
    }
  });
}

window.addEventListener('load', loadImage);
