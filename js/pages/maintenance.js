(function(){
var $=function(i){return document.getElementById(i)},T=function(k,d){return(window.GESERD&&GESERD.t)?GESERD.t(k,d):d};
var api=(window.GESERD&&GESERD.api)||"/api",done=false;
function eta(x){var e=$("mtE");if(!x){e.hidden=true;return}var d=new Date(x);if(isNaN(d)){e.hidden=true;return}e.hidden=false;e.textContent=T("mt.until","Expected back around {x}").replace("{x}",d.toLocaleString(document.documentElement.lang||undefined,{dateStyle:"medium",timeStyle:"short"}))}
function check(){if(done||document.hidden)return;fetch(api+"/maintenance",{cache:"no-store"}).then(function(r){return r.ok?r.json():null}).then(function(j){if(!j)return;
 if(!j.active){done=true;location.replace("/");return}
 if(j.title)$("mtH").textContent=j.title;if(j.message)$("mtP").textContent=j.message;eta(j.eta)}).catch(function(){})}
check();setInterval(check,15000);document.addEventListener("visibilitychange",check)
})();
