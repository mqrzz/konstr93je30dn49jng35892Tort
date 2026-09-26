/* footer.js — site footer. Mounts into <div id="site-footer"></div> */
(function(){var t=function(k,d){return window.GESERD&&GESERD.t?GESERD.t(k,d):d};
var C=[["Features",[["Sending","/features/sending/"],["Receiving","/features/receiving/"],["Domains","/features/domains/"],["Webhooks","/features/webhooks/"]]],
["Resources",[["Documentation","/docs/"],["Pricing","/pricing/"],["Changelog","/changelog/"],["Security","/security/"],["Status","/status/"]]],
["Company",[["About","/about/"],["Blog","/blog/"],["Contact","/contact/"]]],
["Legal",[["Terms","/legal/terms/"],["Privacy","/legal/privacy/"],["Acceptable use","/legal/aup/"]]]];
var h='<footer class="ftr"><div class="wrap"><div class="brand"><img src="/assets/logo.svg" alt="geserd"><p>'+t("footer.tag","Send and receive email<br>from your own domain.")+'</p><a class="stat" href="/status/"><i></i><span>'+t("footer.check","Checking status…")+'</span></a></div><div class="cols">'+
C.map(function(c){return '<div><h4>'+t("footer."+c[0].toLowerCase(),c[0])+'</h4><ul>'+c[1].map(function(l){return '<li><a href="'+l[1]+'">'+l[0]+'</a></li>'}).join('')+'</ul></div>'}).join('')+'</div></div></footer>';
function mount(){var r=document.getElementById("site-footer");if(!r)return;r.innerHTML=h;var s=r.querySelector(".stat");
fetch("/api/health",{cache:"no-store"}).then(function(x){return x.ok?x.json():Promise.reject()}).then(function(){s.classList.add("ok");s.lastChild.textContent=t("footer.ok","All systems operational")}).catch(function(){s.classList.add("bad");s.lastChild.textContent=t("footer.bad","Status unavailable")})}
var go=function(){document.readyState==="loading"?document.addEventListener("DOMContentLoaded",mount):mount()};(window.GESERD&&GESERD.ready?GESERD.ready:Promise.resolve()).then(go)})();
