function updateArrow(){var a=document.getElementById('arrow');return'none'==a.style.display?void 0:scrollY>2*a.offsetHeight?a.style.display='none':void Object.assign(a.style,{left:Math.floor((innerWidth-a.offsetWidth)/2)+'px',bottom:-scrollY+45+'px'})}window.addEventListener('DOMContentLoaded',updateArrow,!1),window.addEventListener('scroll',updateArrow,!1),window.addEventListener('resize',updateArrow,!1);
