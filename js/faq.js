(function(){
var reduce=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
function wrap(d){
 if(d.querySelector(":scope > .qa-b"))return;
 var s=d.querySelector(":scope > summary");if(!s)return;
 var b=document.createElement("div"),i=document.createElement("div");b.className="qa-b";i.className="qa-i";
 while(s.nextSibling)i.appendChild(s.nextSibling);
 b.appendChild(i);d.appendChild(b)
}
function init(root){(root||document).querySelectorAll(".qa details").forEach(wrap)}
function run(d,open){
 var b=d.querySelector(":scope > .qa-b");if(!b)return;
 if(d._a){d._a.cancel();d._a=null}
 if(reduce){if(open)d.setAttribute("open","");else d.removeAttribute("open");return}
 if(open){
  d.setAttribute("open","");
  var h=b.scrollHeight;
  d._a=b.animate([{height:"0px",opacity:0},{height:h+"px",opacity:1}],{duration:360,easing:"cubic-bezier(.22,1,.36,1)"});
  d._a.onfinish=d._a.oncancel=function(){d._a=null}
 }else{
  var h0=b.getBoundingClientRect().height;
  d._a=b.animate([{height:h0+"px",opacity:1},{height:"0px",opacity:0}],{duration:280,easing:"cubic-bezier(.4,0,.2,1)"});
  d._a.onfinish=function(){d._a=null;d.removeAttribute("open")};
  d._a.oncancel=function(){d._a=null}
 }
}
document.addEventListener("click",function(e){
 var s=e.target.closest(".qa summary");if(!s)return;
 e.preventDefault();
 var d=s.parentElement;wrap(d);
 var closing=d.hasAttribute("open")&&!(d._a&&d._closing===false);
 d._closing=closing;
 run(d,!closing);
});
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",function(){init()});else init();
window.GESERD_FAQ={init:init};
})();
