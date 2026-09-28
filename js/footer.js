/* footer.js — site footer. Mounts into <div id="site-footer"></div> */
(function(){var t=function(k,d){return window.GESERD&&GESERD.t?GESERD.t(k,d):d};
var C=[["Features",[["Sending|sending","/features/sending/"],["Receiving|receiving","/features/receiving/"],["Domains|domains","/features/domains/"],["Webhooks|webhooks","/features/webhooks/"]]],
["Resources",[["Documentation|docs","/docs/"],["Pricing|pricing","/pricing/"],["Changelog|changelog","/changelog/"],["Security|security","/security/"],["Status|status","/status/"]]],
["Company",[["About|about","/about/"],["Blog|blog","/blog/"],["Contact|contact","/contact/"]]],
["Legal",[["Terms|terms","/legal/terms/"],["Privacy|privacy","/legal/privacy/"],["Acceptable use|aup","/legal/aup/"]]]];
var h='<footer class="ftr"><div class="wrap"><div class="brand"><img src="/assets/logo.svg" alt="Geserd"><p>'+t("footer.tag","Send and receive email<br>from your own domain.")+'</p><a class="stat" href="/status/"><i></i><span>'+t("footer.check","Checking status…")+'</span></a></div><div class="cols">'+
C.map(function(c){return '<div><h4>'+t("footer."+c[0].toLowerCase(),c[0])+'</h4><ul>'+c[1].map(function(l){return '<li><a href="'+l[1]+'">'+t("footer.l."+l[0].split("|")[1],l[0].split("|")[0])+'</a></li>'}).join('')+'</ul></div>'}).join('')+'</div></div></footer>';
function mount(){var r=document.getElementById("site-footer");if(!r)return;r.innerHTML=h;var s=r.querySelector(".stat");
fetch("/api/health",{cache:"no-store"}).then(function(x){return x.ok?x.json():Promise.reject()}).then(function(){s.classList.add("ok");s.lastChild.textContent=t("footer.ok","All systems operational")}).catch(function(){s.classList.add("bad");s.lastChild.textContent=t("footer.bad","Status unavailable")})}
var go=function(){document.readyState==="loading"?document.addEventListener("DOMContentLoaded",mount):mount()};(window.GESERD&&GESERD.ready?GESERD.ready:Promise.resolve()).then(go)})();
