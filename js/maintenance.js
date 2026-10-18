(function(){var P=location.pathname;if(/^\/(maintenance|assets|css|js|i18n|app\/admin)/.test(P))return;
var api=(window.GESERD&&window.GESERD.api)||"/api";
var AUTH=/^\/(login|signup)/.test(P);
function T(k,d){return(window.GESERD&&GESERD.t)?GESERD.t(k,d):d}
function fmt(v){try{return new Date(v).toLocaleString(document.documentElement.lang||undefined,{dateStyle:"long",timeStyle:"short"})}catch(e){return""}}
function showNotice(n){
 if(!n||document.getElementById("mtNotice"))return;
 var lang=(window.GESERD&&GESERD.lang)||"en",x=n.texts[lang]||n.texts.en||n.texts[Object.keys(n.texts)[0]];if(!x)return;
 var w=document.createElement("div");w.id="mtNotice";w.className="mtn";w.setAttribute("role","status");
 var when=n.starts_at?fmt(n.starts_at)+(n.ends_at?" \u2013 "+fmt(n.ends_at):""):"";
 var b=document.createElement("div");b.className="mtn-b";
 var t=document.createElement("b");t.textContent=x.title||T("mtn.title","Planned maintenance");b.appendChild(t);
 if(x.message){var m=document.createElement("span");m.textContent=x.message;b.appendChild(m)}
 if(when){var d=document.createElement("small");d.textContent=when;b.appendChild(d)}
 w.appendChild(b);
 var host=document.querySelector(".app-content")||document.querySelector("main");if(!host)return;host.insertBefore(w,host.firstChild)}
fetch(api+"/maintenance",{cache:"no-store"}).then(function(r){return r.ok?r.json():null}).then(function(j){
 if(!j)return;
 if(j.notice&&!AUTH&&P.indexOf("/app/")===0){var go=function(){(window.GESERD&&GESERD.ready?GESERD.ready:Promise.resolve()).then(function(){showNotice(j.notice)})};if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",go);else go()}
 if(AUTH||!j.active)return;
 if(j.scope==="sending"&&P.indexOf("/app/")!==0)return;
 fetch(api+"/auth/me",{credentials:"same-origin",cache:"no-store"}).then(function(r){return r.ok?r.json():null}).then(function(u){
  if(u&&u.is_admin){if(P.indexOf("/app/")===0&&!document.getElementById("mtBn")){var b=document.createElement("a");b.id="mtBn";b.href="/app/admin/maintenance/";b.className="app-frz";b.innerHTML="<b>"+T("ad.mt.on","Maintenance is on")+"</b>";var m=document.querySelector(".app-content")||document.querySelector("main");if(m)m.insertBefore(b,m.firstChild)}return}
  if(j.scope==="sending")return;
  location.replace("/maintenance/")}).catch(function(){if(j.scope!=="sending")location.replace("/maintenance/")})
}).catch(function(){})})();
