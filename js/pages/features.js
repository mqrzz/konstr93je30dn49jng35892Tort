(function(){
var reduce=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
var NS="http://www.w3.org/2000/svg";
function $(s,r){return(r||document).querySelector(s)}
function $$(s,r){return[].slice.call((r||document).querySelectorAll(s))}
function hub(){
 var map=$("#fxMap");if(!map)return;
 var sats=$$(".fx-sat",map),panes=$$(".fx-pane"),svg=$("#fxWires"),core=$("#fxCore"),paths={},auto=true,cur=0,tm=0;
 function show(k){
  sats.forEach(function(s){var on=s.dataset.k===k;s.classList.toggle("on",on);s.setAttribute("aria-pressed",on)});
  panes.forEach(function(p){p.classList.toggle("on",p.dataset.k===k)});
  Object.keys(paths).forEach(function(n){paths[n].classList.toggle("on",n===k)})
 }
 function draw(){
  var mb=map.getBoundingClientRect(),cb=core.getBoundingClientRect();
  if(window.innerWidth<=900){svg.innerHTML="";paths={};return}
  svg.setAttribute("viewBox","0 0 "+mb.width+" "+mb.height);
  svg.innerHTML="";paths={};
  var cx=cb.left-mb.left+cb.width/2,cy=cb.top-mb.top+cb.height/2,r=cb.width/2;
  sats.forEach(function(s,i){
   var b=s.getBoundingClientRect(),left=b.left<cb.left,sx=left?b.right-mb.left:b.left-mb.left,sy=b.top-mb.top+b.height/2,ex=cx+(left?-r:r),ey=cy+(sy<cy?-r*.45:r*.45),mx=(sx+ex)/2;
   var p=document.createElementNS(NS,"path");p.setAttribute("d","M"+sx+" "+sy+" C"+mx+" "+sy+","+mx+" "+ey+","+ex+" "+ey);p.id="fxw"+i;svg.appendChild(p);paths[s.dataset.k]=p;
   var c=document.createElementNS(NS,"circle");c.setAttribute("r","3.5");
   if(!reduce){var a=document.createElementNS(NS,"animateMotion");a.setAttribute("dur",(3.2+i*.4)+"s");a.setAttribute("repeatCount","indefinite");a.setAttribute("begin",(-i*.8)+"s");a.setAttribute("keyPoints",left?"1;0":"0;1");a.setAttribute("keyTimes","0;1");a.setAttribute("calcMode","linear");var m=document.createElementNS(NS,"mpath");m.setAttributeNS("http://www.w3.org/1999/xlink","href","#fxw"+i);a.appendChild(m);c.appendChild(a)}
   else{var l=p.getPointAtLength(p.getTotalLength()/2);c.setAttribute("cx",l.x);c.setAttribute("cy",l.y)}
   svg.appendChild(c)
  });
  show(sats[cur].dataset.k)
 }
 sats.forEach(function(s,i){
  function pick(){auto=false;clearTimeout(tm);cur=i;show(s.dataset.k)}
  s.addEventListener("mouseenter",pick);s.addEventListener("focus",pick);s.addEventListener("click",pick)
 });
 draw();window.addEventListener("resize",draw);
 if(document.fonts&&document.fonts.ready)document.fonts.ready.then(draw);
 if(!reduce&&"IntersectionObserver"in window){
  var vis=false;new IntersectionObserver(function(es){vis=es[0].isIntersecting},{threshold:.3}).observe(map);
  (function loop(){tm=setTimeout(function(){if(auto&&vis){cur=(cur+1)%sats.length;show(sats[cur].dataset.k)}if(auto)loop()},4200)})()
 }
 var st=$("#fxStart");
 if(st){
  var opts=$$(".fx-opt",st),rows=$$(".fx-row",st),sums=$$(".fx-sum",st);
  function pickO(i){
   var on=opts[i].dataset.on.split(",");
   opts.forEach(function(o,k){o.classList.toggle("on",k===i)});
   rows.forEach(function(r,k){r.classList.toggle("on",on[k]==="1")});
   sums.forEach(function(s,k){s.classList.toggle("on",k===i)})
  }
  opts.forEach(function(o,i){o.addEventListener("click",function(){pickO(i)})});
  pickO(0)
 }
}
function official(){
 var t=$("#foTiles"),S=window.GESERD_SOCIAL;
 if(t&&S){
  var tt=window.GESERD&&GESERD.t?GESERD.t:function(k,d){return d};
  t.innerHTML=S.items.map(function(i){
   var inner='<i>'+S.svg(i.k,28)+'</i><b>'+i.n+'</b><span>'+(i.u?tt("fo.open","Open profile"):tt("fo.soon","Link coming soon"))+'</span>';
   return i.u?'<a class="fx-tile" target="_blank" rel="noopener me" href="'+i.u+'">'+inner+'</a>':'<div class="fx-tile">'+inner+'</div>'}).join("");
  $$(".fx-tile",t).forEach(function(el){el.addEventListener("pointermove",function(e){var r=el.getBoundingClientRect();el.style.setProperty("--mx",(e.clientX-r.left)+"px");el.style.setProperty("--my",(e.clientY-r.top)+"px")})})
 }
 var b=$("#foCopy");
 if(b)b.addEventListener("click",function(){
  var tx=$("#foDom").textContent,tt=window.GESERD&&GESERD.t?GESERD.t:function(k,d){return d},o=b.textContent;
  (navigator.clipboard?navigator.clipboard.writeText(tx):Promise.reject()).catch(function(){}).then(function(){b.textContent=tt("fo.done","Copied");setTimeout(function(){b.textContent=tt("fo.copy","Copy")},1600)})
 })
}
function tabs(){
 $$(".fx-tabs").forEach(function(bar){
  var box=bar.nextElementSibling;if(!box)return;
  var bs=$$(".fx-tab",bar);
  bs.forEach(function(b){b.addEventListener("click",function(){
   bs.forEach(function(x){x.classList.toggle("on",x===b)});
   [].slice.call(box.children).forEach(function(c){c.classList.toggle("on",c.dataset.t===b.dataset.t)})
  })})
 })
}
function sending(){
 var pre=$("#fsType"),res=$("#fsRes"),txt=pre?pre.getAttribute("data-text"):"";
 if(!pre)return;
 function fin(){pre.textContent=txt;pre.classList.add("done");res.classList.add("on")}
 if(reduce||!("IntersectionObserver"in window))return fin();
 var started=false;
 new IntersectionObserver(function(es,o){
  if(!es[0].isIntersecting||started)return;started=true;o.disconnect();
  var i=0;(function step(){i+=2;pre.textContent=txt.slice(0,i);if(i<txt.length)setTimeout(step,16);else{pre.classList.add("done");setTimeout(function(){res.classList.add("on")},350)}})()
 },{threshold:.4}).observe($("#fsTerm"))
}
function receiving(){
 var ul=$("#frInbox");
 if(ul&&!reduce){setInterval(function(){var l=ul.lastElementChild;ul.insertBefore(l,ul.firstElementChild);l.classList.remove("enter");void l.offsetWidth;l.classList.add("enter")},3200)}
 var an=$("#frAnat");
 if(an){
  var fs=["from","to","subject","text","att","reply","spam"],k=0,hov=false,tm;
  function hl(f){$$("[data-f]",an).forEach(function(e){e.classList.toggle("hl",!!f&&e.dataset.f===f)})}
  $$("[data-f]",an).forEach(function(e){e.addEventListener("mouseenter",function(){hov=true;hl(e.dataset.f)});e.addEventListener("mouseleave",function(){hov=false;hl(null)})});
  if(!reduce)setInterval(function(){if(hov)return;hl(fs[k%fs.length]);k++},1800);else hl("subject")
 }
}
function init(){var f=document.body.dataset.fx;tabs();if(f==="hub")hub();if(f==="official")official();if(f==="sending")sending();if(f==="receiving")receiving()}
function go(){document.readyState==="loading"?document.addEventListener("DOMContentLoaded",init):init()}
(function wait(n){if(window.GESERD&&GESERD.ready)return GESERD.ready.then(go,go);if(n>400)return go();setTimeout(function(){wait(n+1)},25)})(0)
})();
(function(){document.addEventListener("click",function(e){var b=e.target.closest&&e.target.closest("[data-copy]");if(!b)return;var t=b.querySelector("span").textContent;var d=function(){b.classList.add("ok");setTimeout(function(){b.classList.remove("ok")},1400)};try{navigator.clipboard.writeText(t).then(d,d)}catch(x){var a=document.createElement("textarea");a.value=t;document.body.appendChild(a);a.select();try{document.execCommand("copy")}catch(y){}document.body.removeChild(a);d()}})})();
