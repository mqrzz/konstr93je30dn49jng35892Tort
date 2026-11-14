(function(){
var P=location.pathname;
function hdr(){var h={};try{var d=localStorage.getItem("gd_did");if(!d){d=(window.crypto&&crypto.randomUUID)?crypto.randomUUID():String(Math.random()).slice(2)+Date.now();localStorage.setItem("gd_did",d)}
 var n=navigator,s=screen,tz="";try{tz=Intl.DateTimeFormat().resolvedOptions().timeZone||""}catch(e){}
 var fp=JSON.stringify({s:s.width+"x"+s.height+"@"+(window.devicePixelRatio||1),tz:tz,l:(n.languages||[n.language||""]).join(",").slice(0,40),p:n.platform||"",c:n.hardwareConcurrency||0,m:n.deviceMemory||0,t:n.maxTouchPoints||0});
 h["x-gd-did"]=d;h["x-gd-fp"]=btoa(unescape(encodeURIComponent(fp)))}catch(e){}return h}
window.GD_HDR=hdr;
if(/^\/(blocked|assets|css|js|i18n)(\/|$)/.test(P))return;
function go(){try{localStorage.setItem("gd_blk","1")}catch(e){}location.replace("/blocked/")}
var f=false;try{f=localStorage.getItem("gd_blk")==="1"}catch(e){}
if(!f&&/(?:^|; )gd_blk=1(?:;|$)/.test(document.cookie))f=true;
if(f){go();return}
var api=(window.GESERD&&window.GESERD.api)||"/api";
var of=window.fetch;
if(of)window.fetch=function(){return of.apply(this,arguments).then(function(r){
 if(r&&r.status===403&&/\/api\//.test(r.url||"")){r.clone().json().then(function(j){if(j&&(j.error==="device_blocked"||j.error==="account_blocked"))go()}).catch(function(){})}
 return r})};

var last=0;try{last=+sessionStorage.getItem("gd_chk")||0}catch(e){}
if(Date.now()-last<300000)return;
(of||fetch).call(window,api+"/device/check",{headers:hdr(),cache:"no-store",credentials:"same-origin"}).then(function(r){return r.ok?r.json():null}).then(function(j){
 if(!j)return;
 if(j.blocked){go();return}
 try{sessionStorage.setItem("gd_chk",String(Date.now()))}catch(e){}
}).catch(function(){})
})();
