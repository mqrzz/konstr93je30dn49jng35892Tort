(function(){var P=location.pathname;if(/^\/(maintenance|assets|css|js|i18n|app\/admin|login|signup)/.test(P))return;
var api=(window.GESERD&&GESERD.api)||"/api";
fetch(api+"/maintenance",{cache:"no-store"}).then(function(r){return r.ok?r.json():null}).then(function(j){
 if(!j||!j.active)return;
 if(j.scope==="sending"&&P.indexOf("/app/")!==0)return;
 fetch(api+"/auth/me",{credentials:"same-origin",cache:"no-store"}).then(function(r){return r.ok?r.json():null}).then(function(u){
  if(u&&u.is_admin){if(P.indexOf("/app/")===0&&!document.getElementById("mtBn")){var b=document.createElement("a");b.id="mtBn";b.href="/app/admin/maintenance/";b.className="app-frz";b.innerHTML="<b>"+(window.GESERD&&GESERD.t?GESERD.t("ad.mt.on","Maintenance is on"):"Maintenance is on")+"</b>";var m=document.querySelector("main");if(m)m.insertBefore(b,m.firstChild)}return}
  if(j.scope==="sending")return;
  location.replace("/maintenance/")}).catch(function(){if(j.scope!=="sending")location.replace("/maintenance/")})
}).catch(function(){})})();
