function loadNoticeList(){let a=document.getElementById('notice-list'),b='https://seed-maker.github.io/notice/list.json?r='+Math.floor(1e5*Math.random());return a?void fetchHTTP(b,function(c){if(c){let d=JSON.parse(c),e=[];document.getElementById('notice-length').innerHTML=d.length,a.innerHTML=null;for(let f=0;f<d.length;f++)e[f]=document.createElement('p'),e[f].innerHTML=d[f].title,e[f].addEventListener('click',function(){location.href='view.html?key='+d[f].key},!1),a.append(e[f])}}):setTimeout(loadNoticeList,500)}window.addEventListener('DOMContentLoaded',loadNoticeList,!1);
