(function(){
var O;
function t(k,d){return O&&O.t?O.t(k,d):d}
function loc(){var l=O&&O.lang;return typeof l==="string"&&l?l:"en"}
function esc(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}
function dt(s){if(!s)return t("wh.none","no data");var d=new Date(s);return isNaN(d)?esc(s):d.toLocaleDateString(loc(),{year:"numeric",month:"long",day:"numeric"})}
function row(k,v){return'<div class="wh-r"><span>'+esc(t(k,k))+"</span><span>"+v+"</span></div>"}
function init(){
 var f=document.getElementById("whF"),i=document.getElementById("whI"),o=document.getElementById("whO");
 i.placeholder=t("wh.ph","example.com");
 var q=new URLSearchParams(location.search).get("d");if(q){i.value=q}
 function go(){
  var v=i.value.trim();
  if(!v){o.innerHTML='<p class="wh-e">'+esc(t("wh.bad",""))+"</p>";return}
  o.innerHTML="";
  fetch("/api/whois?domain="+encodeURIComponent(v)).then(function(r){return r.json().then(function(d){return{s:r.status,d:d}})}).then(function(x){
   if(x.s===400){o.innerHTML='<p class="wh-e">'+esc(t("wh.bad",""))+"</p>";return}
   if(x.s===429){o.innerHTML='<p class="wh-e">'+esc(t("wh.rate",""))+"</p>";return}
   if(x.s!==200){o.innerHTML='<p class="wh-e">'+esc(t("wh.err",""))+"</p>";return}
   var d=x.d;
   if(!d.registered){o.innerHTML='<div class="wh-c"><h2>'+esc(d.domain)+"</h2>"+row("wh.free","")+"</div>";return}
   o.innerHTML='<div class="wh-c"><h2>'+esc(d.domain)+"</h2>"+row("wh.taken","")+row("wh.reg",esc(d.registrar||t("wh.none","")))+row("wh.cr",dt(d.created))+row("wh.up",dt(d.updated))+row("wh.ex",dt(d.expires))+row("wh.ns",d.nameservers.length?d.nameservers.map(esc).join("<br>"):esc(t("wh.none","")))+row("wh.st",d.status.length?d.status.map(esc).join("<br>"):esc(t("wh.none","")))+row("wh.sec",esc(t(d.dnssec?"wh.on":"wh.off","")))+"</div>"
  }).catch(function(){o.innerHTML='<p class="wh-e">'+esc(t("wh.err",""))+"</p>"})
 }
 f.addEventListener("submit",function(e){e.preventDefault();go()});
 if(q)go()
}
function wait(n){O=window.GESERD;if(O&&O.ready)return O.ready.then(init);if(n>200)return;setTimeout(function(){wait(n+1)},25)}
wait(0)
})();
