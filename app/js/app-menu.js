/* app/js/app-menu.js — dashboard sidebar. Mounts into <div id="app-nav"></div>. */
(function(){var s=function(d){return '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">'+d+'</svg>'};
var N=[["Emails","/app/emails/",'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>'],["Metrics","/app/metrics/",'<path d="M3 3v18h18M7 15l4-4 3 3 5-6"/>'],
["Domains","/app/domains/",'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>'],["Logs","/app/logs/",'<path d="M4 6h16M4 12h16M4 18h10"/>'],
["API keys","/app/api-keys/",'<circle cx="8" cy="15" r="4"/><path d="m11 12 9-9M16 7l3 3"/>'],["Webhooks","/app/webhooks/",'<path d="M9 17a4 4 0 1 1 3-6.5M15 7a4 4 0 1 1 3 6.5M8 19h8"/>'],
["Settings","/app/settings/usage/",'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>']];
var B=[["Help","/app/help/",'<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .8-1 1.5M12 17h.01"/>'],["Homepage","/",'<path d="m3 11 9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>']];
var p=location.pathname,on=function(u){return u==="/"?false:(p.indexOf(u.replace(/usage\/$/,""))===0)};
var l=function(a){return '<a href="'+a[1]+'"'+(on(a[1])?' class="on"':'')+'>'+s(a[2])+a[0]+'</a>'};
var h='<div class="mbar"><button aria-label="menu" id="sb">'+s('<path d="M3 6h18M3 12h18M3 18h18"/>')+'</button><img src="/assets/logo.svg" alt="geserd" height="18"></div><aside class="snav" id="snav"><a class="ws" href="/app/settings/usage/"><i>o</i><span>Personal</span></a>'+N.map(l).join('')+'<span class="sp"></span>'+B.map(l).join('')+'</aside>';
function m(){var r=document.getElementById("app-nav");if(!r)return;r.innerHTML=h;var n=document.getElementById("snav");document.getElementById("sb").onclick=function(){n.classList.toggle("open")};document.addEventListener("keydown",function(e){if(e.key==="Escape")n.classList.remove("open")})}
document.readyState==="loading"?document.addEventListener("DOMContentLoaded",m):m()})();
