(function(){
var LS="geserd_last_method",email="",cool=null,mfa=false;
function $(i){return document.getElementById(i)}
function t(k,d){return(window.GESERD&&GESERD.t)?GESERD.t(k,d):d}
function api(){return(window.GESERD&&GESERD.api)||"/api"}
function getLast(){try{return localStorage.getItem(LS)}catch(e){return null}}
function setLast(m){try{localStorage.setItem(LS,m)}catch(e){}}
function show(el,on){if(el)el.hidden=!on}
function err(id,msg){var e=$(id);if(!e)return;e.textContent=msg||"";e.hidden=!msg}

function paint(providers){
  var order=providers&&providers.length?providers:[];
  ["google","github","yandex"].forEach(function(p){var b=$("o-"+p);if(b){show(b,order.indexOf(p)>-1);var old=b.querySelector(".lu");if(old)old.remove()}});
  var last=getLast(),avail=order.concat(["email"]);
  if(avail.indexOf(last)<0)last=null;
  show($("luEmail"),last==="email");
  if(last&&last!=="email"){var b=$("o-"+last),s=document.createElement("span");s.className="lu";s.textContent=t("auth.last","Last used");b.appendChild(s)}
  $("oauthRow").setAttribute("data-ready","1");
  if(!order.length)$("oauthRow").style.display="none",document.querySelector(".auth-or").style.display="none";
}
function region(){
  fetch(api()+"/auth/geo",{credentials:"same-origin",cache:"no-store"}).then(function(r){if(!r.ok)throw 0;return r.json()})
   .then(function(j){paint(j.providers||[])}).catch(function(){paint([])});
}
function oauth(p,btn){
  btn.classList.add("loading");setLast(p);
  location.href=api()+"/auth/oauth/"+p+"?next="+encodeURIComponent(location.pathname);
}

function msg(code){
  var M={invalid_code:["auth.error.mfa","Wrong code. Check your authenticator app or use a recovery code."],invalid_email:["auth.error.email","Enter a valid email address"],rate_limited:["auth.error.rate","Too many attempts — wait a minute and try again"],
   mail_failed:["auth.error.mail","We couldn't send the email right now — try again shortly"],expired_or_missing:["auth.error.expired","This code expired — request a new one"],
   too_many_attempts:["auth.error.attempts","Too many wrong attempts — request a new code"],wrong_code:["auth.error.code","Wrong code — check the email and try again"],
   network:["auth.error.network","Couldn't reach the server — check your connection and try again"]};
  var m=M[code]||M.network;return t(m[0],m[1]);
}
function post(path,body){
  return fetch(api()+path,{method:"POST",headers:{"Content-Type":"application/json"},credentials:"same-origin",body:JSON.stringify(body)})
   .then(function(r){return r.json().catch(function(){return{}}).then(function(j){if(!r.ok)throw{code:j.error||"network"};return j})},
         function(){throw{code:"network"}});
}
function busy(b,on){b.classList.toggle("loading",on);b.disabled=on}

function validEmail(v){return/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)}
function sendCode(btn,resend){
  var v=$("authEmail").value.trim().toLowerCase();
  err("authErr","");$("authEmail").removeAttribute("aria-invalid");
  if(!validEmail(v)){$("authEmail").setAttribute("aria-invalid","true");err("authErr",t("auth.error.email","Enter a valid email address"));return}
  email=v;busy(btn,true);
  (resend?Promise.resolve({}):fetch(api()+"/auth/sso/lookup?email="+encodeURIComponent(v),{credentials:"same-origin"}).then(function(r){return r.json()}).catch(function(){return{}})).then(function(j){
  if(j&&j.sso){location.href=api()+"/auth/sso/start?email="+encodeURIComponent(v);return new Promise(function(){})}
  return post("/auth/request-code",{email:email,mode:document.body.dataset.mode,lang:(window.GESERD&&GESERD.lang)||document.documentElement.lang||"en"})}).then(function(){
    busy(btn,false);
    $("authCodeSub").textContent=t("auth.code.sub","We sent a 6-digit code to")+" "+email;
    show($("authStep1"),false);show($("authStep2"),true);$("authCode").value="";$("verifyBtn").disabled=true;$("authCode").focus();
    startCool();
  }).catch(function(e){busy(btn,false);if(!resend)err("authErr",msg(e.code));else err("authErr2",msg(e.code))});
}
function startCool(){
  var rb=$("resendBtn"),s=60;clearInterval(cool);rb.disabled=true;
  function tick(){if(s<=0){clearInterval(cool);rb.disabled=false;rb.textContent=t("auth.code.resend","Resend code");return}
    rb.textContent=t("auth.code.wait","Resend in {s}s").replace("{s}",s);s--}
  tick();cool=setInterval(tick,1000);
}
function enterMfa(){
  mfa=true;clearInterval(cool);
  $("authCodeSub").textContent=t("auth.mfa.sub","Enter the 6-digit code from your authenticator app, or a recovery code.");
  show($("authStep1"),false);show($("authStep2"),true);
  var rb=$("resendBtn");rb.hidden=true;var sp=rb.nextElementSibling;if(sp)sp.hidden=true;var h1=document.querySelector("#authStep2 h1");h1.removeAttribute("data-i18n");h1.textContent=t("auth.mfa.h1","Two-factor authentication");var bb=$("backBtn");bb.removeAttribute("data-i18n");bb.textContent=t("auth.mfa.back","Sign out");var ci=$("authCode");ci.value="";ci.maxLength=14;ci.inputMode="text";ci.autocomplete="one-time-code";$("verifyBtn").disabled=true;ci.focus();
}
function verifyMfa(btn){
  var c=$("authCode").value.trim();err("authErr2","");
  busy(btn,true);
  post("/auth/2fa",{code:c}).then(function(){location.href="/app/"}).catch(function(e){busy(btn,false);err("authErr2",msg(e.code))});
}
function verify(btn){
  if(mfa)return verifyMfa(btn);
  var c=$("authCode").value.trim();err("authErr2","");
  if(!/^\d{6}$/.test(c)){err("authErr2",t("auth.error.code","Enter the code from your email"));return}
  busy(btn,true);
  post("/auth/verify-code",{email:email,code:c}).then(function(){setLast("email");return fetch(api()+"/auth/me",{credentials:"same-origin",cache:"no-store"}).then(function(r){return r.status===401?r.json().catch(function(){return{}}):null}).then(function(j){if(j&&j.error==="mfa_required"){busy(btn,false);enterMfa();return}location.href="/app/"})})
   .catch(function(e){busy(btn,false);err("authErr2",msg(e.code));if(e.code==="expired_or_missing"||e.code==="too_many_attempts")$("resendBtn").disabled=false});
}

function init(){
  fetch(api()+"/auth/me",{credentials:"same-origin",cache:"no-store"}).then(function(r){if(r.ok){location.replace("/app/");return}if(r.status===401)return r.json().then(function(j){if(j&&j.error==="mfa_required")enterMfa()})}).catch(function(){});
  region();
  var al=$("authLang");if(al&&window.GESERD&&GESERD.langMenu){al.innerHTML=GESERD.langMenu();GESERD.bindLang(al)}
  ["google","github","yandex"].forEach(function(p){var b=$("o-"+p);if(b)b.addEventListener("click",function(){oauth(p,b)})});
  var em=$("authEmail"),sb=$("submitBtn");
  em.addEventListener("input",function(){sb.disabled=!validEmail(em.value.trim());em.removeAttribute("aria-invalid");err("authErr","")});
  $("emailForm").addEventListener("submit",function(e){e.preventDefault();if(!sb.disabled)sendCode(sb,false)});
  var ci=$("authCode"),vb=$("verifyBtn");
  ci.addEventListener("input",function(){if(mfa){ci.value=ci.value.replace(/[^0-9a-fA-F\- ]/g,"").slice(0,14);var d=ci.value.replace(/\s/g,"");vb.disabled=d.length<6;err("authErr2","");if(/^\d{6}$/.test(d))verify(vb);return}ci.value=ci.value.replace(/\D/g,"").slice(0,6);vb.disabled=ci.value.length!==6;err("authErr2","");if(ci.value.length===6)verify(vb)});
  $("codeForm").addEventListener("submit",function(e){e.preventDefault();if(!vb.disabled)verify(vb)});
  $("resendBtn").addEventListener("click",function(){var b=$("resendBtn");if(b.disabled)return;sendCode(sb,true)});
  $("backBtn").addEventListener("click",function(){if(mfa){fetch(api()+"/auth/logout",{method:"POST",credentials:"same-origin"}).catch(function(){}).then(function(){location.reload()});return}clearInterval(cool);show($("authStep2"),false);show($("authStep1"),true);err("authErr2","");em.focus()});
  var p=new URLSearchParams(location.search).get("email");if(p){em.value=p;sb.disabled=!validEmail(p)}
}
function whenReady(n){if(window.GESERD&&GESERD.ready&&GESERD.langMenu)return GESERD.ready.then(start);if(n>200)return start();setTimeout(function(){whenReady(n+1)},25)}
function start(){document.readyState==="loading"?document.addEventListener("DOMContentLoaded",init):init()}
whenReady(0);
})();
