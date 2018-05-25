function updateSectionAnimation() {
	if (scrollY < innerHeight/10) return;


	eachElement('article section', function (i, elem) {
		if (
			!isMobile()
			|| elem.className.replace('animation') != elem.className
		) return;

		var y = scrollY;
		var vy = y + innerHeight/1.5;
		var top = elem.getBoundingClientRect().top;

		if (top - 150 < vy) {
			elem.className += ' animation slideInToBottom';
		}
	});
}

window.addEventListener('DOMContentLoaded', function () {
	var div;
	for (var i = 0; i < document.querySelectorAll('section').length; i++) {
		div = document.createElement('div');
		div.className = 'place-holder';
		document.querySelector('article').appendChild(div);
	}
}, false);
window.addEventListener('resize', updateSectionAnimation, false);
window.addEventListener('scroll', updateSectionAnimation, false);
setInterval(updateSectionAnimation, 500);
