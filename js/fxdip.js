(function(){var qs=document.querySelectorAll(".dx-q"),vs=document.querySelectorAll(".dx-vs");if(!qs.length)return;
function upd(){var n=0;qs.forEach(function(q){if(q.getAttribute("aria-pressed")==="true")n++});var k=n>=2?1:0;vs.forEach(function(v){v.classList.toggle("on",+v.dataset.k===k)})}
qs.forEach(function(q){q.addEventListener("click",function(){q.setAttribute("aria-pressed",q.getAttribute("aria-pressed")!=="true");upd()})});upd()})();
