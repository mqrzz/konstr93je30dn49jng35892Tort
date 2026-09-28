/* app/js/app-menu.js — dashboard chrome: sidebar (workspace menu, nav, Appearance), top bar (Docs, Need help? H),
   mobile top bar + slide-out drawer with overlay. Mounts into <div id="app-nav"></div> and wraps <main class="app-main">. */
(function(){
var t=function(k,d){return window.GESERD&&GESERD.t?GESERD.t(k,d):d};
var s=function(d,n){n=n||18;return '<svg viewBox="0 0 24 24" width="'+n+'" height="'+n+'" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">'+d+'</svg>'};
var CH=s('<path d="m7 9 5-5 5 5M7 15l5 5 5-5"/>',14);
function N(){return [
[t("app.nav.emails","Emails"),"/app/emails/",'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>'],
[t("app.nav.metrics","Metrics"),"/app/metrics/",'<path d="M3 3v18h18M7 15l4-4 3 3 5-6"/>'],
[t("app.nav.domains","Domains"),"/app/domains/",'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>'],
[t("app.nav.logs","Logs"),"/app/logs/",'<path d="M4 6h16M4 12h16M4 18h10"/>'],
[t("app.nav.apikeys","API keys"),"/app/api-keys/",'<circle cx="8" cy="15" r="4"/><path d="m11 12 9-9M16 7l3 3"/>'],
[t("app.nav.webhooks","Webhooks"),"/app/webhooks/",'<path d="M9 17a4 4 0 1 1 3-6.5M15 7a4 4 0 1 1 3 6.5M8 19h8"/>'],
[t("app.nav.settings","Settings"),"/app/settings/usage/",'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>']]}
var p=location.pathname;
function on(u){return u.indexOf("/app/settings/")===0?p.indexOf("/app/settings/")===0:p.indexOf(u)===0}
function link(a){return '<a href="'+a[1]+'"'+(on(a[1])?' class="on"':'')+'>'+s(a[2])+a[0]+'</a>'}
var IC_HELP='<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .8-1 1.5M12 17h.01"/>';
var IC_HOME='<path d="m3 11 9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>';
var IC_OUT='<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>';
var IC_SUN='<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>';
function build(){
 var nav=N().map(link).join('');
 var side='<aside class="snav" id="snav">'+
  '<div class="wsb"><button type="button" id="wsBtn" aria-haspopup="menu"><span class="who"><span class="av">P</span><span class="nm">'+t("app.workspace","Personal")+'</span></span>'+CH+'</button>'+
  '<div class="apop" id="wsPop" role="menu"><a href="/app/settings/usage/">'+s('<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>',16)+t("app.nav.settings","Settings")+'</a><a href="/">'+s(IC_HOME,16)+t("app.nav.home","Homepage")+'</a><hr><a href="/login/">'+s(IC_OUT,16)+t("app.logout","Log out")+'</a></div></div>'+
  '<nav class="nv">'+nav+'<span style="flex:1"></span><a href="/app/help/"'+(p.indexOf("/app/help/")===0?' class="on"':'')+'>'+s(IC_HELP)+t("app.nav.help","Help")+'</a></nav>'+
  '<div class="bt"><button type="button" class="app-ico" id="apBtn" aria-label="'+t("app.appearance","Appearance")+'" aria-haspopup="menu">'+s(IC_SUN)+'</button>'+
  '<div class="apop" id="apPop"><div class="lbl">'+t("app.appearance","Appearance")+'</div><div class="seg" id="apSeg"><button type="button" data-m="system">'+t("app.theme.system","System")+'</button><button type="button" data-m="light">'+t("app.theme.light","Light")+'</button><button type="button" data-m="dark">'+t("app.theme.dark","Dark")+'</button></div></div></div>'+
 '</aside>';
 var bar='<div class="mbar"><button type="button" id="sb" aria-label="'+t("app.menu","Menu")+'" aria-expanded="false">'+s('<path d="M3 6h18M3 12h18M3 18h18"/>',20)+'</button><a href="/app/settings/usage/"><img src="/assets/logo.svg" alt="Geserd"></a><span style="width:36px"></span></div>';
 return bar+side+'<div class="snav-ov" id="snavOv"></div>';
}
function pop(btn,pp){btn.addEventListener("click",function(e){e.stopPropagation();var o=pp.classList.contains("on");document.querySelectorAll(".apop.on").forEach(function(x){x.classList.remove("on")});if(!o)pp.classList.add("on")})}
function mount(){
 var r=document.getElementById("app-nav");if(!r)return;
 r.innerHTML=build();
 var nav=document.getElementById("snav"),ov=document.getElementById("snavOv"),sb=document.getElementById("sb");
 function open(v){nav.classList.toggle("open",v);ov.classList.toggle("on",v);sb.setAttribute("aria-expanded",v)}
 sb.onclick=function(){open(!nav.classList.contains("open"))};ov.onclick=function(){open(false)};
 nav.addEventListener("click",function(e){if(e.target.closest(".nv a"))open(false)});
 pop(document.getElementById("wsBtn"),document.getElementById("wsPop"));
 pop(document.getElementById("apBtn"),document.getElementById("apPop"));
 document.addEventListener("click",function(e){if(!e.target.closest(".apop"))document.querySelectorAll(".apop.on").forEach(function(x){x.classList.remove("on")})});
 var seg=document.getElementById("apSeg");
 function mark(){var m=window.GSTheme?GSTheme.get():"dark";seg.querySelectorAll("button").forEach(function(b){b.classList.toggle("on",b.dataset.m===m)})}
 seg.addEventListener("click",function(e){var b=e.target.closest("button");if(!b||!window.GSTheme)return;GSTheme.set(b.dataset.m);mark()});mark();
 var main=document.querySelector("main.app-main");
 if(main&&!main.querySelector(".app-top")){
  var c=document.createElement("div");c.className="app-content";while(main.firstChild)c.appendChild(main.firstChild);
  var top=document.createElement("div");top.className="app-top";
  top.innerHTML='<a href="/docs/">'+t("app.docs","Docs")+'</a><a class="nh" href="/app/help/">'+t("app.needhelp","Need help?")+'<kbd>H</kbd></a>';
  main.appendChild(top);main.appendChild(c);
 }
 document.addEventListener("keydown",function(e){
  if(e.key==="Escape"){open(false);document.querySelectorAll(".apop.on").forEach(function(x){x.classList.remove("on")})}
  else if((e.key==="h"||e.key==="H")&&!e.metaKey&&!e.ctrlKey&&!e.altKey&&!/INPUT|TEXTAREA|SELECT/.test((document.activeElement||{}).tagName||"")){location.href="/app/help/"}
 });
}
var go=function(){document.readyState==="loading"?document.addEventListener("DOMContentLoaded",mount):mount()};
(window.GESERD&&GESERD.ready?GESERD.ready:Promise.resolve()).then(go);
})();
