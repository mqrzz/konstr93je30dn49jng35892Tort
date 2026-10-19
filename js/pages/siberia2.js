(function(){
var O,reduce=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
function wait(n){O=window.GESERD;if(O&&O.ready)return O.ready.then(init);if(n>200)return;setTimeout(function(){wait(n+1)},25)}
function loc(){var l=O&&O.lang;return typeof l==="string"&&l?l:"en"}
function grid(){
 var g=document.getElementById("sxGrid");if(!g)return;
 var cs=g.querySelectorAll(".sx-c");
 g.addEventListener("pointermove",function(e){cs.forEach(function(c){var r=c.getBoundingClientRect();c.style.setProperty("--mx",(e.clientX-r.left)+"px");c.style.setProperty("--my",(e.clientY-r.top)+"px")})});
 function run(){cs.forEach(function(c){var n=c.querySelector(".sx-num"),to=+n.dataset.to;if(reduce){n.textContent=to.toLocaleString(loc());return}var s=performance.now(),d=1100;n.textContent="0";(function st(now){var p=Math.min(1,(now-s)/d),e=1-Math.pow(1-p,3);n.textContent=Math.round(to*e).toLocaleString(loc());if(p<1)requestAnimationFrame(st)})(s)})}
 if(!("IntersectionObserver"in window)){return}
 var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){run();io.disconnect()}})},{threshold:.3});io.observe(g)
}
function fit(){
 var t=document.getElementById("sxFt");if(!t)return;
 t.addEventListener("click",function(e){var b=e.target.closest("button");if(!b)return;t.querySelectorAll("button").forEach(function(x){x.classList.toggle("on",x===b)});document.querySelectorAll(".sx-pn2").forEach(function(p){p.hidden=p.dataset.k!==b.dataset.k})})
}
function route(){
 var w=document.getElementById("sxRw");if(!w)return;
 function f(){var r=w.getBoundingClientRect(),h=window.innerHeight,p=(h*.7-r.top)/(r.height||1);w.style.setProperty("--p",Math.max(0,Math.min(1,p)))}
 window.addEventListener("scroll",f,{passive:true});window.addEventListener("resize",f);f()
}
function init(){grid();fit();route()}
wait(0)
})();
