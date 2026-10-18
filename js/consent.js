(function(){
var K="geserd_consent",O;
function get(){try{return localStorage.getItem(K)}catch(e){return null}}
function set(v){try{localStorage.setItem(K,v)}catch(e){}window.dispatchEvent(new Event("geserd-consent"))}
function css(){
 if(document.getElementById("ckCss"))return;
 var s=document.createElement("style");s.id="ckCss";
 s.textContent=".ck{position:fixed;right:20px;bottom:20px;z-index:9000;width:380px;max-width:calc(100vw - 40px);padding:22px;border-radius:26px;background:rgba(14,14,16,.82);color:#f4f4f5;box-shadow:inset 0 0 0 1px rgba(255,255,255,.1),0 24px 60px rgba(0,0,0,.5);backdrop-filter:blur(28px);-webkit-backdrop-filter:blur(28px);font:400 14px/1.55 Inter,system-ui,sans-serif;transform:translateY(16px);opacity:0;transition:opacity .35s,transform .35s}.ck.in{opacity:1;transform:none}.ck b{display:block;font:600 16px Inter,system-ui,sans-serif;margin-bottom:6px}.ck p{margin:0 0 16px;color:#b5b6bb}.ck a{color:#fff;text-decoration:underline;text-underline-offset:3px}.ck-r{display:flex;gap:8px;flex-wrap:wrap}.ck-r button{flex:1 1 auto;height:42px;padding:0 16px;border-radius:15px;border:0;cursor:pointer;font:600 14px Inter,system-ui,sans-serif;white-space:nowrap}.ck-y{background:#fff;color:#000}.ck-n{background:rgba(255,255,255,.1);color:#fff}@media(max-width:640px){.ck{left:0;right:0;bottom:0;width:auto;max-width:none;border-radius:24px 24px 0 0;padding:20px 20px calc(20px + env(safe-area-inset-bottom,0px))}}@media(prefers-reduced-motion:reduce){.ck{transition:none}}";
 document.head.appendChild(s)
}
function show(){
 if(get()||document.getElementById("ck"))return;
 css();
 function tt(k,d){return O&&O.t?O.t(k,d):d}
 var d=document.createElement("div");d.className="ck";d.id="ck";d.setAttribute("role","dialog");d.setAttribute("aria-label",tt("ck.t","Cookies"));
 d.innerHTML='<b></b><p></p><div class="ck-r"><button type="button" class="ck-n"></button><button type="button" class="ck-y"></button></div>';
 d.querySelector("b").textContent=tt("ck.t","Cookies");
 var p=d.querySelector("p");p.textContent=tt("ck.p","")+" ";
 var a=document.createElement("a");a.href="/legal/cookies/";a.textContent=tt("ck.more","Learn more");p.appendChild(a);
 d.querySelector(".ck-n").textContent=tt("ck.nec","Necessary only");
 d.querySelector(".ck-y").textContent=tt("ck.all","Accept all");
 function close(v){set(v);d.classList.remove("in");setTimeout(function(){if(d.parentNode)d.parentNode.removeChild(d)},400)}
 d.querySelector(".ck-n").onclick=function(){close("necessary")};
 d.querySelector(".ck-y").onclick=function(){close("all")};
 document.body.appendChild(d);
 requestAnimationFrame(function(){requestAnimationFrame(function(){d.classList.add("in")})})
}
function wait(n){O=window.GESERD;if(O&&O.ready)return O.ready.then(function(){setTimeout(show,500)});if(n>200)return;setTimeout(function(){wait(n+1)},25)}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",function(){wait(0)});else wait(0)
})();
