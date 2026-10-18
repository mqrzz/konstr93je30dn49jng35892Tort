(function(){
var O,reduce=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
function wait(n){O=window.GESERD;if(O&&O.ready)return O.ready.then(init);if(n>200)return;setTimeout(function(){wait(n+1)},25)}
function loc(){var l=O&&O.lang;return typeof l==="string"&&l?l:"en"}
function fmt(n){return Math.round(n).toLocaleString(loc()).replace(/\u202f/g," ")+"\u00a0₽"}
function tween(el,from,to,ms){if(reduce){el.textContent=fmt(to);return}var s=performance.now();function st(now){var p=Math.min(1,(now-s)/ms),e=1-Math.pow(1-p,3);el.textContent=fmt(from+(to-from)*e);if(p<1)requestAnimationFrame(st)}requestAnimationFrame(st)}
function bars(){
 var m=document.querySelector(".sx-lm");if(!m)return;
 if(!("IntersectionObserver"in window)){m.classList.add("in");return}
 var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}})},{threshold:.25});io.observe(m)
}
function price(){
 var S=document.getElementById("sxS");if(!S)return;
 var PR={pro:790,business:2490},st={p:"pro",m:1},o={s:0,o:0,p:0},O1=document.getElementById("sxO"),P=document.getElementById("sxP"),N=document.getElementById("sxN");
 function upd(first){
  var s=PR[st.p]*st.m,pay=s/2,off=s-pay;
  if(first){S.textContent=fmt(s);O1.textContent="−"+fmt(off);P.textContent=fmt(pay)}
  else{tween(S,o.s,s,450);tween(P,o.p,pay,450);O1.textContent="−"+fmt(off)}
  o.s=s;o.p=pay;
  N.textContent=O.t(st.m===1?"sx.r.n1":"sx.r.n12","")
 }
 function wire(id,key,attr){document.getElementById(id).addEventListener("click",function(e){var x=e.target.closest("button");if(!x)return;this.querySelectorAll("button").forEach(function(y){y.classList.toggle("on",y===x)});st[key]=attr==="m"?+x.dataset.m:x.dataset.p;upd(false)})}
 wire("sxPl","p","p");wire("sxPe","m","m");upd(true)
}
function fit(){
 var t=document.getElementById("sxFt");if(!t)return;
 t.addEventListener("click",function(e){var b=e.target.closest("button");if(!b)return;t.querySelectorAll("button").forEach(function(x){x.classList.toggle("on",x===b)});document.querySelectorAll(".sx-pn2").forEach(function(p){p.hidden=p.dataset.k!==b.dataset.k})})
}
function route(){
 var w=document.getElementById("sxRw");if(!w)return;
 function f(){var r=w.getBoundingClientRect(),h=window.innerHeight,p=(h*.75-r.top)/(r.height||1);w.style.setProperty("--p",Math.max(0,Math.min(1,p)))}
 window.addEventListener("scroll",f,{passive:true});window.addEventListener("resize",f);f()
}
function init(){bars();price();fit();route()}
wait(0)
})();
