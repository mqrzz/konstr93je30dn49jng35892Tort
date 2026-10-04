(function(){
var t=function(k,d){return window.GESERD&&GESERD.t?GESERD.t(k,d):d};
var s=function(d,n,c){n=n||16;return '<svg'+(c?' class="'+c+'"':'')+' viewBox="0 0 24 24" width="'+n+'" height="'+n+'" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">'+d+'</svg>'};
var CH=s('<path d="m7 9 5-5 5 5M7 15l5 5 5-5"/>',14);
var NI={emails:'<rect x="3" y="5" width="18" height="14" rx="3"/><path class="i-flap" d="m3 8 9 6 9-6"/>',metrics:'<path class="i-b i-b1" d="M5 20v-9"/><path class="i-b i-b2" d="M11 20V4"/><path class="i-b i-b3" d="M17 20v-6"/><path d="M3 20h18"/>',domains:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path class="i-mer" d="M12 3c3 3 3 15 0 18-3-3-3-15 0-18"/>',logs:'<path class="i-l i-l1" d="M4 6h16"/><path class="i-l i-l2" d="M4 12h16"/><path class="i-l i-l3" d="M4 18h10"/>',keys:'<g class="i-key"><circle cx="8" cy="15" r="4"/><path d="m11 12 9-9M16 7l3 3"/></g>',hooks:'<path class="i-h1" d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path class="i-h2" d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',bell:'<path class="i-bell" d="M6 9a6 6 0 1 1 12 0c0 6 2 7 2 7H4s2-1 2-7"/><path class="i-clap" d="M10 20a2 2 0 0 0 4 0"/>',set:'<g class="i-gear"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/></g>'};
function N(){return [
[t("app.nav.emails","Emails"),"/app/emails/",NI.emails,null,"mail"],
[t("app.nav.metrics","Metrics"),"/app/metrics/",NI.metrics,null,"chart"],
[t("app.nav.domains","Domains"),"/app/domains/",NI.domains,null,"globe"],
[t("app.nav.logs","Logs"),"/app/logs/",NI.logs,null,"logs"],
[t("app.nav.apikeys","API keys"),"/app/api-keys/",NI.keys,null,"key"],
[t("app.nav.webhooks","Webhooks"),"/app/webhooks/",NI.hooks,null,"hook"],
[t("app.nav.notifications","Notifications"),"/app/notifications/",NI.bell,"nt","bell"],
[t("app.nav.settings","Settings"),"/app/settings/account/",NI.set,null,"gear"]]}
var p=location.pathname;
function on(u){return u.indexOf("/app/settings/")===0?p.indexOf("/app/settings/")===0:p.indexOf(u)===0}
var IC_DOC='<path d="M6 3h12v18H6z"/><path d="M9 8h6M9 12h6"/>';
var IC_HELP='<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .8-1 1.5M12 17h.01"/>';
var IC_HOME='<path d="m3 11 9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>';
var IC_OUT='<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>';
var IC_SET='<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>';
var IC_SUN='<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>';
function seg(){return '<div class="seg"><button type="button" data-m="system">'+t("app.theme.system","System")+'</button><button type="button" data-m="light">'+t("app.theme.light","Light")+'</button><button type="button" data-m="dark">'+t("app.theme.dark","Dark")+'</button></div>'}
function ws(id){return '<div class="wsb"><button type="button" data-pop="'+id+'" aria-haspopup="menu"><span class="who"><span class="av">P</span><span class="nm">'+t("app.workspace","Personal")+'</span></span>'+CH+'</button>'+
 '<div class="apop" id="'+id+'" role="menu"><a href="/app/settings/account/">'+s(IC_SET)+t("app.nav.settings","Settings")+'</a><a href="/">'+s(IC_HOME)+t("app.nav.home","Homepage")+'</a><hr><a href="#" data-logout>'+s(IC_OUT)+t("app.logout","Log out")+'</a></div></div>'}
function build(){
 var nav=N().map(function(a){return '<li><a href="'+a[1]+'"'+(on(a[1])?' class="on"':'')+'>'+s(a[2],18,'ic ic-'+a[4])+'<span>'+a[0]+'</span>'+(a[3]?'<em class="bdg" data-bdg="'+a[3]+'" hidden></em>':'')+'</a></li>'}).join('');
 var side='<aside class="snav" id="snav">'+ws('wsPop')+'<nav class="nv"><ul>'+nav+'</ul></nav>'+
  '<div class="bt"><button type="button" class="app-ico ic-sun" data-pop="apPop" data-tip="'+t("app.appearance","Appearance")+'" aria-label="'+t("app.appearance","Appearance")+'" aria-haspopup="menu">'+s(IC_SUN)+'</button>'+
  '<div class="apop" id="apPop"><div class="lbl">'+t("app.appearance","Appearance")+'</div>'+seg()+'</div>'+
  '<div class="ric"><a class="app-ico ic-docs" href="/docs/" target="_blank" rel="noopener" data-tip="'+t("app.docs","Docs")+'" aria-label="'+t("app.docs","Docs")+'">'+s(IC_DOC)+'</a><a class="app-ico ic-help'+(p.indexOf("/app/help/")===0?' on':'')+'" href="/app/help/" data-tip="'+t("app.nav.help","Help")+'" aria-label="'+t("app.nav.help","Help")+'">'+s(IC_HELP)+'</a></div></div></aside>';
 var mnav=N().map(function(a){return '<a class="ml" href="'+a[1]+'">'+s(a[2],20,'ic ic-'+a[4])+'<span>'+a[0]+'</span>'+(a[3]?'<em class="bdg" data-bdg="'+a[3]+'" hidden></em>':'')+'</a>'}).join('');
 var bar='<div class="mbar"><div class="mtop"><button type="button" id="sb" aria-label="'+t("app.menu","Menu")+'" aria-expanded="false" aria-controls="mpanel">'+s('<path d="M3 6h18M3 12h18M3 18h18"/>',22)+'</button><div class="mws"><span class="av">P</span><span class="nm">'+t("app.workspace","Personal")+'</span></div></div>'+
  '<div class="mov" id="mov" hidden></div>'+
  '<div class="mpanel" id="mpanel" hidden><div class="mph"><div class="mws"><span class="av">P</span><span class="nm">'+t("app.workspace","Personal")+'</span></div><button type="button" id="sbx" aria-label="'+t("app.close","Close")+'">'+s('<path d="m6 6 12 12M18 6 6 18"/>',20)+'</button></div>'+mnav+'<a class="ml top" href="/app/help/">'+t("app.nav.help","Help")+'</a>'+
  '<div class="ml row"><span>'+t("app.appearance","Appearance")+'</span>'+seg()+'</div><a class="ml" href="/">'+t("app.nav.home","Homepage")+'</a><a class="ml" href="#" data-logout>'+t("app.logout","Log out")+'</a></div></div>';
 return bar+side;
}
function badge(){fetch((window.GESERD&&GESERD.api||"/api")+"/notifications/unread",{credentials:"same-origin",cache:"no-store"}).then(function(r){return r.ok?r.json():null}).then(function(j){if(!j)return;document.querySelectorAll("[data-bdg=nt]").forEach(function(e){e.textContent=j.unread>99?"99+":j.unread;e.hidden=!j.unread})}).catch(function(){})}
function me(){fetch((window.GESERD&&GESERD.api||"/api")+"/auth/me",{credentials:"same-origin",cache:"no-store"}).then(function(r){if(r.status===401){location.href="/login/";return null}return r.ok?r.json():null}).then(function(u){
 if(!u)return;var nm=(u.name||"").trim()||u.email.split("@")[0];
 document.querySelectorAll(".wsb .nm,.mws .nm").forEach(function(e){e.textContent=nm});document.querySelectorAll(".wsb .av,.mws .av").forEach(function(e){e.textContent=nm.charAt(0).toUpperCase()});
 if(!(u.name||"").trim())askName()}).catch(function(){})}
function askName(){
 var m=document.createElement("div");m.className="nmodal";m.innerHTML='<form class="nbox"><h2>'+t("app.name.h","What should we call you?")+'</h2><p>'+t("app.name.p","")+'</p><input name="n" maxlength="60" autocomplete="name" placeholder="'+t("app.name.ph","Your name")+'" required><button class="abtn pri" type="submit">'+t("app.name.save","Continue")+'</button></form>';
 document.body.appendChild(m);var f=m.querySelector("form"),i=f.n;i.focus();
 f.onsubmit=function(e){e.preventDefault();var v=i.value.trim();if(!v)return;fetch((window.GESERD&&GESERD.api||"/api")+"/auth/me",{method:"PATCH",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:v})}).then(function(r){if(r.ok){m.remove();document.querySelectorAll(".wsb .nm,.mws .nm").forEach(function(e){e.textContent=v});document.querySelectorAll(".wsb .av,.mws .av").forEach(function(e){e.textContent=v.charAt(0).toUpperCase()})}})}}
function closePops(){document.querySelectorAll(".apop.on").forEach(function(x){x.classList.remove("on")})}
function mount(){
 var r=document.getElementById("app-nav");if(!r)return;
 r.innerHTML=build();
 var sb=document.getElementById("sb"),mp=document.getElementById("mpanel"),mov=document.getElementById("mov");
 function open(v){mp.hidden=!v;mov.hidden=!v;sb.setAttribute("aria-expanded",v);document.body.classList.toggle("mopen",v);document.documentElement.classList.toggle("lock",v)}
 sb.onclick=function(){open(mp.hidden)};mov.onclick=function(){open(false)};document.getElementById("sbx").onclick=function(){open(false)};
 me();badge();window.GSBadge=badge;
 r.addEventListener("click",function(e){
  var b=e.target.closest("[data-pop]");
  if(b){e.stopPropagation();var pp=document.getElementById(b.getAttribute("data-pop")),was=pp.classList.contains("on");closePops();if(!was)pp.classList.add("on");return}
  var lo=e.target.closest("[data-logout]");
  if(lo){e.preventDefault();fetch((window.GESERD&&GESERD.api||"/api")+"/auth/logout",{method:"POST",credentials:"same-origin"}).catch(function(){}).then(function(){location.href="/login/"});return}
  var m=e.target.closest("[data-m]");
  if(m&&window.GSTheme){GSTheme.set(m.dataset.m);mark()}
 });
 document.addEventListener("click",function(e){if(!e.target.closest(".apop"))closePops()});
 function mark(){var m=window.GSTheme?GSTheme.get():"dark";document.querySelectorAll(".seg button").forEach(function(b){b.classList.toggle("on",b.dataset.m===m)})}mark();
var main=document.querySelector("main.app-main");
 if(main&&!main.querySelector(".app-content")){var c=document.createElement("div");c.className="app-content";while(main.firstChild)c.appendChild(main.firstChild);main.appendChild(c)}
 window.matchMedia("(min-width:861px)").addEventListener("change",function(q){if(q.matches)open(false)});
 document.addEventListener("keydown",function(e){if(e.key==="Escape"){open(false);closePops()}});
}
function wait(n){if(window.GESERD&&GESERD.ready)return GESERD.ready.then(start);if(n>200)return start();setTimeout(function(){wait(n+1)},25)}
function start(){document.readyState==="loading"?document.addEventListener("DOMContentLoaded",mount):mount()}
wait(0);
})();
