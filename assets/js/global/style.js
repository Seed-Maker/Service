function rgba(r,g,b,a) {
	return 'rgba(' + Math.floor(r) + ',' + Math.floor(g) + ',' + Math.floor(b) + ',' + a + ')';
}

function rgb(r,g,b) {
	return 'rgb(' + Math.floor(r) + ',' + Math.floor(g) + ',' + Math.floor(b) + ')';
}

function eachElement(selector, callback) {
	var target = document.querySelectorAll(selector);

	for (var i = 0; i < target.length; i++) {
		callback(i, target[i]);
	}

	return target;
}

//create new style element and parse argument.
function appendNewStyle(stylesheet, media) {
	if (!media) media = 'screen';

	var style = document.createElement('style');
	style.setAttribute('media', media);
	style.innerHTML = '\n';
	
	for (var selector in stylesheet) {
		style.innerHTML += selector.replace(', ', ',').replace(',', ',\n') + ' {\n';
		for (var property in stylesheet[selector]) {
			style.innerHTML += '\t' + appendNewStyle.removeDash(property) + ': ' + stylesheet[selector][property] + ';\n';
		}
		style.innerHTML += '}\n\n';
	}

	document.head.appendChild(style);

	return style;
}

//Function to remove dash in string for css.
//ex) f('fontSize') === 'font-size';
appendNewStyle.removeDash = function (str) {
	for (var i = 65, alphabet; i <= 90; i++) {
		alphabet = String.fromCharCode(i);
		do {
			str = str.replace(alphabet, '-' + alphabet.toLowerCase());
		} while (str.replace(alphabet) != str);
	}

	return str;
}
