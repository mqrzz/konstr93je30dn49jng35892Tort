(function(){
var reduce=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
var D={"ab2.m": "One clear way beats five configurable ones. We say what works today and what does not. We keep our limits even when they are inconvenient, because deliverability is a promise to every sender.", "ab2.l1.t": "Your app calls the API", "ab2.l1.p": "One request with an API key. You get an id back straight away, so every message can be traced.", "ab2.l2.t": "We sign it", "ab2.l2.p": "The message is signed with DKIM for your own domain, so receivers can check it really came from you.", "ab2.l3.t": "It travels over TLS", "ab2.l3.p": "We hand it to the recipient’s server over an encrypted connection and wait for the answer.", "ab2.l4.t": "Every event is recorded", "ab2.l4.p": "Delivered, delayed, bounced, complained. Each one lands in your logs together with the server’s own reply.", "ab2.l5.t": "Your server hears about it", "ab2.l5.p": "Events are posted to your webhook, so your app can react the moment something changes."};
var T=function(k,d){var v=window.GESERD&&GESERD.t?GESERD.t(k,D[k]||d):(D[k]||d);return v}
function clamp(x){return Math.max(0,Math.min(1,x))}
function init(){
 var tl=document.getElementById("abxTl"),sts=tl?[].slice.call(tl.querySelectorAll(".abx-st")):[];
 var man=document.getElementById("abxMan");
 if(man){var words=T("ab2.m",man.textContent).split(/\s+/);man.innerHTML=words.map(function(w){return"<span>"+w.replace(/&/g,"&amp;").replace(/</g,"&lt;")+"</span>"}).join(" ")}
 var ws=man?[].slice.call(man.querySelectorAll("span")):[];
 function onScroll(){
  var vh=window.innerHeight;
  if(tl){var r=tl.getBoundingClientRect();tl.style.setProperty("--p",clamp((vh*.62-r.top)/r.height).toFixed(3));
   sts.forEach(function(s){var b=s.getBoundingClientRect();s.classList.toggle("on",b.top+b.height/2<vh*.62)})}
  if(man){var m=man.getBoundingClientRect(),p=clamp((vh*.85-m.top)/(m.height+vh*.35)),n=Math.round(p*ws.length*1.08);ws.forEach(function(w,i){w.classList.toggle("on",i<n)})}
 }
 if(reduce){ws.forEach(function(w){w.classList.add("on")});if(tl)tl.style.setProperty("--p",1);sts.forEach(function(s){s.classList.add("on")})}
 else{window.addEventListener("scroll",onScroll,{passive:true});window.addEventListener("resize",onScroll);onScroll()}

 var life=document.getElementById("abxLife");
 if(life){
  var tabs=[].slice.call(life.querySelectorAll(".abx-tabs button")),bar=life.querySelector(".abx-tabs"),H=document.getElementById("abxT"),P=document.getElementById("abxP"),C=document.getElementById("abxC");
  var code=[
   '<span class="k">POST</span> /api/emails\n{ "from": "hi@yourdomain.com",\n  "to": "ada@example.com",\n  "subject": "Welcome" }\n\n<span class="s">200</span> { "id": "9c2f7a10-5d3e…" }',
   'DKIM-Signature: v=1; a=rsa-sha256;\n  d=yourdomain.com; s=geserd;\n  h=from:to:subject:date;\n  bh=… ; b=…\n\n<span class="s">signature added</span>',
   '<span class="c">connect to the recipient server</span>\nSTARTTLS <span class="s">220 ready to start TLS</span>\nDATA …\n<span class="s">250 2.0.0 OK</span> queued',
   '<span class="s">delivered</span>  ada@example.com\n<span class="k">reply</span>      250 2.0.0 OK\n<span class="k">id</span>         9c2f7a10-5d3e…',
   '<span class="k">POST</span> https://yourapp.com/hooks\n{ "type": "email.delivered",\n  "id": "9c2f7a10-5d3e…" }\n\n<span class="s">200</span> your server answered'
  ];
  var cur=-1,tm=0,auto=true,vis=false,DUR=5000;
  function show(i){
   cur=i;clearTimeout(tm);
   tabs.forEach(function(b,k){b.classList.toggle("on",k===i);b.setAttribute("aria-selected",k===i)});
   H.textContent=T("ab2.l"+(i+1)+".t","");P.textContent=T("ab2.l"+(i+1)+".p","");
   C.innerHTML=code[i].split("\n").map(function(l,k){return'<div style="animation-delay:'+(reduce?0:k*90)+'ms">'+(l||"&nbsp;")+"</div>"}).join("");
   if(auto&&!reduce){bar.style.setProperty("--d",DUR+"ms");tm=setTimeout(function(){if(auto&&vis)show((cur+1)%tabs.length);else if(auto)show(cur)},DUR)}
  }
  tabs.forEach(function(b,k){b.onclick=function(){auto=false;bar.classList.add("stop");show(k)}});
  show(0);
  if("IntersectionObserver"in window)new IntersectionObserver(function(es){vis=es[0].isIntersecting;if(vis&&auto)show(cur)},{threshold:.35}).observe(life);else vis=true
 }
 [].slice.call(document.querySelectorAll(".abx-t")).forEach(function(t){t.addEventListener("pointermove",function(e){var r=t.getBoundingClientRect();t.style.setProperty("--mx",(e.clientX-r.left)+"px");t.style.setProperty("--my",(e.clientY-r.top)+"px")})})
}
(window.GESERD&&GESERD.ready?GESERD.ready:Promise.resolve()).then(function(){document.readyState==="loading"?document.addEventListener("DOMContentLoaded",init):init()})
})();
