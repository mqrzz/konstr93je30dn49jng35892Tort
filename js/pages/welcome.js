(function(){
var O,D=null,me=null,sel=null,all=[],act=-1;
function $(i){return document.getElementById(i)}
function t(k,d){return O&&O.t?O.t(k,d):d}
function api(p,o){o=o||{};return fetch((O.api||"/api")+p,{method:o.method||"GET",credentials:"same-origin",cache:"no-store",headers:o.body?{"Content-Type":"application/json"}:{},body:o.body?JSON.stringify(o.body):undefined}).then(function(r){return r.json().catch(function(){return{}}).then(function(j){if(r.status===401){location.replace("/login/");return new Promise(function(){})}if(!r.ok){var e=new Error(j.error||"server_error");e.code=j.error;throw e}return j})},function(){var e=new Error("network");e.code="network";throw e})}
function dn(c){try{return new Intl.DisplayNames([O.lang||"en"],{type:"region"}).of(c)||c}catch(e){return c}}
function methodName(m){return t("wl.m."+m,m)}
function build(){
 var blocked=D.blocked||[],coll;try{coll=new Intl.Collator(O.lang||"en")}catch(e){coll={compare:function(a,b){return a<b?-1:1}}}
 var seen={};all=[];Object.keys(D.groups).forEach(function(g){D.groups[g].forEach(function(c){if(seen[c]||blocked.indexOf(c)>-1)return;seen[c]=1;all.push({c:c,n:dn(c)})})});
 all.sort(function(a,b){return coll.compare(a.n,b.n)})
}
function draw(){
 var f=$("wlQ").value.trim().toLowerCase(),list=$("wlList"),items=f?all.filter(function(x){return x.n.toLowerCase().indexOf(f)>-1||x.c.toLowerCase()===f}):all;
 list.innerHTML=items.map(function(x,i){return'<li role="option" data-c="'+x.c+'" id="wlo'+i+'" aria-selected="'+(sel===x.c)+'">'+x.n.replace(/[&<>]/g,"")+'</li>'}).join("");
 $("wlNone").hidden=items.length>0;act=-1
}
function open(v){
 $("wlPop").hidden=!v;$("wlCbb").setAttribute("aria-expanded",v);
 if(v){$("wlQ").value="";draw();$("wlQ").focus();var s=$("wlList").querySelector('[aria-selected="true"]');if(s)s.scrollIntoView({block:"center"})}
}
function pick(c){
 sel=c;$("wlCbv").textContent=dn(c)+" ("+c+")";$("wlCbv").removeAttribute("data-i18n");$("wlCb").classList.add("has");
 open(false);$("wlCbb").focus();card();check()
}
function card(){
 if(!sel){$("wlCard").hidden=true;return}
 var p=D.profiles&&D.profiles[sel];if(!p){$("wlCard").hidden=true;return}
 $("wlLogin").textContent=p.login.map(methodName).join(", ");
 $("wlCur").textContent=p.display+(p.display!==p.currency?" ("+t("wl.billed","billed in")+" "+p.currency+")":"");
 $("wlPay").textContent=t("wl.pay."+p.payment,p.payment)+", "+p.currency;
 $("wlData").textContent=t("wl.dr."+p.data_region,p.data_region);
 $("wlCard").hidden=false
}
function check(){$("wlGo").disabled=!($("wlName").value.trim()&&sel)}
function err(c){var e=$("wlErr");if(!c){e.hidden=true;return}e.textContent=t("wl.err."+c,t("wl.err.generic","Something went wrong. Please try again."));e.hidden=false}
function submit(e){
 e.preventDefault();if($("wlGo").disabled)return;err(null);
 var b=$("wlGo");b.classList.add("loading");b.disabled=true;
 api("/account/onboarding",{method:"POST",body:{name:$("wlName").value.trim(),country:sel}}).then(function(){location.href="/app/"}).catch(function(x){b.classList.remove("loading");check();if(x.code==="region_locked"){location.replace("/app/");return}err(x.code||"generic")})
}
function init(){
 var al=$("authLang");if(al&&O.langMenu){al.innerHTML=O.langMenu();O.bindLang(al)}
 Promise.all([api("/auth/me"),api("/auth/regions")]).then(function(r){
  me=r[0];D=r[1];
  if(me.onboarded){location.replace("/app/");return}
  D.profiles={};
  build();
  all.forEach(function(x){D.profiles[x.c]=profileOf(x.c)});
  $("wlName").value=me.name||"";
  var guess=(me.account_country||me.country||D.detected||"").toUpperCase();
  if(guess&&D.profiles[guess])pick(guess);
  check();
  $("wlName").addEventListener("input",check);
  $("wlCbb").addEventListener("click",function(){open($("wlPop").hidden)});
  $("wlQ").addEventListener("input",draw);
  $("wlList").addEventListener("click",function(e){var li=e.target.closest("li");if(li)pick(li.getAttribute("data-c"))});
  $("wlQ").addEventListener("keydown",function(e){
   var li=$("wlList").querySelectorAll("li");
   if(e.key==="ArrowDown"||e.key==="ArrowUp"){e.preventDefault();if(!li.length)return;act=e.key==="ArrowDown"?Math.min(li.length-1,act+1):Math.max(0,act-1);li.forEach(function(x,i){x.classList.toggle("act",i===act)});li[act].scrollIntoView({block:"nearest"})}
   else if(e.key==="Enter"){e.preventDefault();var a=li[act>-1?act:0];if(a)pick(a.getAttribute("data-c"))}
   else if(e.key==="Escape"){open(false);$("wlCbb").focus()}
  });
  document.addEventListener("click",function(e){if(!$("wlPop").hidden&&!$("wlCb").contains(e.target))open(false)});
  $("wlForm").addEventListener("submit",submit);
  document.documentElement.classList.add("wl-ready")
 }).catch(function(x){err(x.code||"generic")})
}
function profileOf(c){var k=D.country_region[c]||"intl",p=D.regions[k];return{login:p.login,display:p.display,currency:p.currency,payment:p.payment,data_region:p.data_region,region:k}}
function w(n){O=window.GESERD;if(O&&O.ready&&O.langMenu)return O.ready.then(init);if(n>200)return;setTimeout(function(){w(n+1)},25)}
w(0)
})();
