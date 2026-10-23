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
(function(){
var f=document.querySelector("form[data-ent]");
if(f){f.addEventListener("submit",function(e){e.preventDefault();var d=new FormData(f),b=f.querySelector("button");
 var email=String(d.get("email")||"").trim(),msg=String(d.get("message")||"").trim();
 if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)||msg.length<10){f.classList.add("bad");var i=f.querySelector(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)?"[name=email]":"[name=message]");if(i)i.focus();return}
 b.disabled=true;
 fetch("/api/contact",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:d.get("name"),email:email,topic:"sales",website:d.get("website"),message:(d.get("company")?"Company: "+d.get("company")+"\n\n":"")+msg})}).then(function(r){if(!r.ok)throw 0;f.classList.add("sent")}).catch(function(){b.disabled=false})})}
var links=document.querySelectorAll("[data-ai]");
if(links.length){var q=encodeURIComponent("I am reading the Geserd page \u201c"+document.title.replace(/\s+[\u2014-]\s+Geserd.*$/,"")+"\u201d at "+location.href.split("#")[0]+". Read it and help me understand it: answer my questions and point out what matters.");
 var U={claude:"https://claude.ai/new?q=",chatgpt:"https://chatgpt.com/?q=",cursor:"https://cursor.com/link/prompt?text=",perplexity:"https://www.perplexity.ai/search?q="};
 links.forEach(function(a){a.href=U[a.dataset.ai]+q})}
})();

(function(){var L={"claude": "<path d=\"m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z\"/>", "chatgpt": "<path d=\"M9.205 8.658v-2.26c0-.19.072-.333.238-.428l4.543-2.616c.619-.357 1.356-.523 2.117-.523 2.854 0 4.662 2.212 4.662 4.566 0 .167 0 .357-.024.547l-4.71-2.759a.797.797 0 00-.856 0l-5.97 3.473zm10.609 8.8V12.06c0-.333-.143-.57-.429-.737l-5.97-3.473 1.95-1.118a.433.433 0 01.476 0l4.543 2.617c1.309.76 2.189 2.378 2.189 3.948 0 1.808-1.07 3.473-2.76 4.163zM7.802 12.703l-1.95-1.142c-.167-.095-.239-.238-.239-.428V5.899c0-2.545 1.95-4.472 4.591-4.472 1 0 1.927.333 2.712.928L8.23 5.067c-.285.166-.428.404-.428.737v6.898zM12 15.128l-2.795-1.57v-3.33L12 8.658l2.795 1.57v3.33L12 15.128zm1.796 7.23c-1 0-1.927-.332-2.712-.927l4.686-2.712c.285-.166.428-.404.428-.737v-6.898l1.974 1.142c.167.095.238.238.238.428v5.233c0 2.545-1.974 4.472-4.614 4.472zm-5.637-5.303l-4.544-2.617c-1.308-.761-2.188-2.378-2.188-3.948A4.482 4.482 0 014.21 6.327v5.423c0 .333.143.571.428.738l5.947 3.449-1.95 1.118a.432.432 0 01-.476 0zm-.262 3.9c-2.688 0-4.662-2.021-4.662-4.519 0-.19.024-.38.047-.57l4.686 2.71c.286.167.571.167.856 0l5.97-3.448v2.26c0 .19-.07.333-.237.428l-4.543 2.616c-.619.357-1.356.523-2.117.523zm5.899 2.83a5.947 5.947 0 005.827-4.756C22.287 18.339 24 15.84 24 13.296c0-1.665-.713-3.282-1.998-4.448.119-.5.19-.999.19-1.498 0-3.401-2.759-5.947-5.946-5.947-.642 0-1.26.095-1.88.31A5.962 5.962 0 0010.205 0a5.947 5.947 0 00-5.827 4.757C1.713 5.447 0 7.945 0 10.49c0 1.666.713 3.283 1.998 4.448-.119.5-.19 1-.19 1.499 0 3.401 2.759 5.946 5.946 5.946.642 0 1.26-.095 1.88-.309a5.96 5.96 0 004.162 1.713z\">", "cursor": "<path d=\"M11.503.131 1.891 5.678a.84.84 0 0 0-.42.726v11.188c0 .3.162.575.42.724l9.609 5.55a1 1 0 0 0 .998 0l9.61-5.55a.84.84 0 0 0 .42-.724V6.404a.84.84 0 0 0-.42-.726L12.497.131a1.01 1.01 0 0 0-.996 0M2.657 6.338h18.55c.263 0 .43.287.297.515L12.23 22.918c-.062.107-.229.064-.229-.06V12.335a.59.59 0 0 0-.295-.51l-9.11-5.257c-.109-.063-.064-.23.061-.23\"/>", "perplexity": "<path d=\"M22.3977 7.0896h-2.3106V.0676l-7.5094 6.3542V.1577h-1.1554v6.1966L4.4904 0v7.0896H1.6023v10.3976h2.8882V24l6.932-6.3591v6.2005h1.1554v-6.0469l6.9318 6.1807v-6.4879h2.8882V7.0896zm-3.4657-4.531v4.531h-5.355l5.355-4.531zm-13.2862.0676 4.8691 4.4634H5.6458V2.6262zM2.7576 16.332V8.245h7.8476l-6.1149 6.1147v1.9723H2.7576zm2.8882 5.0404v-3.8852h.0001v-2.6488l5.7763-5.7764v7.0111l-5.7764 5.2993zm12.7086.0248-5.7766-5.1509V9.0618l5.7766 5.7766v6.5588zm2.8882-5.0652h-1.733v-1.9723L13.3948 8.245h7.8478v8.087z\"/>"};document.querySelectorAll("[data-ai] svg").forEach(function(v){var k=v.parentNode.dataset.ai;if(L[k])v.innerHTML=L[k]})})();
