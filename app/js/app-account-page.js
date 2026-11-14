(function(){
var A=window.GSApp;if(!A)return;
A.ready(function(){
 var hd=document.getElementById("acc-hd"),pr=document.getElementById("app-root"),r=document.getElementById("acc-root");
 if(!hd||!pr||!r||!window.GSAccount)return;
 var tab=location.hash==="#settings"?"s":"p",mounted=false;
 function show(){
  hd.innerHTML='<div class="ph"><h1>'+A.esc(A.t("app.nav.account","Account"))+'</h1></div><nav class="stabs"><a href="#" data-t="p"'+(tab==="p"?' class="on"':"")+'>'+A.esc(A.t("acc.tab.profile","Profile"))+'</a><a href="#settings" data-t="s"'+(tab==="s"?' class="on"':"")+'>'+A.esc(A.t("acc.tab.settings","Settings"))+"</a></nav>";
  pr.hidden=tab!=="p";r.hidden=tab!=="s";
  if(tab==="s"&&!mounted){mounted=true;GSAccount.mount(r,"")}
  hd.querySelectorAll("[data-t]").forEach(function(a){a.onclick=function(ev){ev.preventDefault();tab=a.dataset.t;history.replaceState(null,"",tab==="s"?"#settings":location.pathname);show()}})
 }
 window.addEventListener("hashchange",function(){var n=location.hash==="#settings"?"s":"p";if(n!==tab){tab=n;show()}});
 show()
})
})();
