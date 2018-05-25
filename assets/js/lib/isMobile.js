//모바일이면 true 예외는 false리턴.
function isMobile(){var b=navigator.userAgent;return!!(b.match(/Android/i)||b.match(/webOS/i)||b.match(/iPhone/i)||b.match(/iPad/i)||b.match(/iPod/i)||b.match(/BlackBerry/i)||b.match(/Windows Phone/i))}
