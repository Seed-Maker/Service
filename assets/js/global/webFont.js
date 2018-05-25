var webFontSrc = 'http://fonts.googleapis.com/earlyaccess/nanumgothic.css';

if (!window.WebFont) {
  alert("에러가 발생하여 웹 폰트를 다운로드하지 못했습니다.");
  window.WebFont = {
    load: function () {}
  }
}

WebFont.load({
  google: {
    families: ['Droid Sans', 'Droid Serif']
  },
  custom: {
      families: ['Nanum Gothic'],
      urls: [webFontSrc]
  }
});
