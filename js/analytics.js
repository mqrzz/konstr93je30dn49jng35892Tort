(function(){
var K="geserd_consent",on=false;
function sid(){try{var s=sessionStorage.getItem("gs_sid");if(!s){s=Math.random().toString(36).slice(2,12)+Date.now().toString(36);sessionStorage.setItem("gs_sid",s)}return s}catch(e){return"x"+Math.random().toString(36).slice(2,12)}}
function allowed(){try{return localStorage.getItem(K)==="all"}catch(e){return false}}
function skip(){return location.pathname.indexOf("/app/")===0}
function send(o){
 if(!allowed()||skip())return;
 o.sid=sid();o.path=location.pathname;o.lang=document.documentElement.lang||"";o.w=window.innerWidth;
 var b=JSON.stringify(o);
 try{if(navigator.sendBeacon&&navigator.sendBeacon("/api/track",new Blob([b],{type:"application/json"})))return}catch(e){}
 try{fetch("/api/track",{method:"POST",headers:{"Content-Type":"application/json"},body:b,keepalive:true}).catch(function(){})}catch(e){}
}
function label(el){
 var t=(el.getAttribute("data-track")||el.getAttribute("aria-label")||el.textContent||"").replace(/\s+/g," ").trim().slice(0,60);
 if(!t)return"";
 var h=el.getAttribute("href");
 return h&&h.charAt(0)==="/"?t+" ["+h.split("#")[0].slice(0,50)+"]":t
}
function start(){
 if(on)return;on=true;
 send({kind:"view",ref:document.referrer?document.referrer.replace(/^https?:\/\//,"").split("/")[0].slice(0,100):""});
 document.addEventListener("click",function(e){var el=e.target.closest&&e.target.closest("a,button,[data-track]");if(!el)return;var l=label(el);if(l)send({kind:"click",label:l})},true)
}
if(allowed())start();
window.addEventListener("geserd-consent",function(){if(allowed())start()})
})();
