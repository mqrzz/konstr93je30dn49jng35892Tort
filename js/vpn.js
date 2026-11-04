(function(){
var P=location.pathname;
var KEY="gs_vpn_v2";
function toVpn(){
 try{sessionStorage.setItem("gs_vpn_from",location.pathname+location.search);sessionStorage.setItem(KEY,JSON.stringify({v:true,t:Date.now()}))}catch(e){}
 location.replace("/vpn/")}
if(/^\/(vpn|contact|unsubscribe|maintenance|assets|css|js|i18n)(\/|$)/.test(P))return;
var api=(window.GESERD&&window.GESERD.api)||"/api";
var of=window.fetch;
if(of)window.fetch=function(){return of.apply(this,arguments).then(function(r){
 if(r&&r.status===403&&/\/api\//.test(r.url||"")){r.clone().json().then(function(j){if(j&&j.error==="vpn_blocked")toVpn()}).catch(function(){})}
 return r})};
var c=null;try{c=JSON.parse(sessionStorage.getItem(KEY)||"null")}catch(e){}
if(c&&c.v){toVpn();return}
if(c&&Date.now()-c.t<5*60*1000)return;
(of||fetch).call(window,api+"/vpn",{cache:"no-store",credentials:"same-origin"}).then(function(r){return r.ok?r.json():null}).then(function(j){
 if(!j)return;
 if(j.vpn){toVpn();return}
 try{sessionStorage.setItem(KEY,JSON.stringify({v:false,t:Date.now()}))}catch(e){}
}).catch(function(){})
})();
