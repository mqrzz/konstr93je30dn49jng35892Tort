(function(){fetch("/api/maintenance",{cache:"no-store"}).then(function(r){return r.ok?r.json():null}).then(function(j){
 if(!j||!j.active)return;
 var h=document.getElementById("mtH"),p=document.getElementById("mtP"),e=document.getElementById("mtE");
 if(j.title){h.removeAttribute("data-i18n");h.textContent=j.title}
 if(j.message){p.removeAttribute("data-i18n");p.textContent=j.message}
 if(j.eta){var d=new Date(j.eta);if(!isNaN(d)){var s=d.toLocaleString(document.documentElement.lang||undefined,{dateStyle:"medium",timeStyle:"short"});e.hidden=false;e.textContent=(window.GESERD&&GESERD.t?GESERD.t("mt.until","Expected back around {x}"):"Expected back around {x}").replace("{x}",s)}}
}).catch(function(){})})();
