/* js/auth.js — login/signup page logic. Only loaded on /login/ and /signup/.
   Tabs switch between the two modes (with URL history so /login/ and /signup/ both work
   directly). OAuth buttons are shown per region: RU gets Yandex + email only, everyone
   else gets GitHub + Google + email. The email flow is a real two-step request-code /
   verify-code call against the live API (backend/src/routes/auth.js) — errors are read
   from the JSON body the backend sends ({error:"..."}) and mapped to a message per code,
   instead of one blanket "not available yet" text. */
(function(){
function t(k,d){return (window.GESERD&&GESERD.t)?GESERD.t(k,d):d}
var email="";

function setMode(mode,skipPush){
  var tabs=document.getElementById("authTabs");
  if(!tabs)return;
  var isSignup=mode==="signup";
  tabs.classList.toggle("mode-signup",isSignup);
  document.getElementById("tab-login").classList.toggle("active",!isSignup);
  document.getElementById("tab-signup").classList.toggle("active",isSignup);

  var title=document.getElementById("auth-title"),sub=document.getElementById("auth-sub");
  title.style.opacity=0;sub.style.opacity=0;
  setTimeout(function(){
    title.textContent=isSignup?t("auth.signup.title","Create your account"):t("auth.login.title","Welcome back");
    sub.textContent=isSignup?t("auth.signup.sub","Set up sending and receiving in a few minutes"):t("auth.login.sub","Log in to keep managing your domains and sending");
    title.style.opacity=1;sub.style.opacity=1;
  },150);

  document.getElementById("field-name").classList.toggle("collapsed",!isSignup);
  document.getElementById("submit-label").textContent=isSignup?t("auth.submit.signup","Create account"):t("auth.submit.login","Get a code by email");
  var foot=document.getElementById("auth-foot");
  foot.innerHTML=isSignup
    ? t("auth.foot.tologin","Already have an account?")+' <a href="#" data-switch="login">'+t("auth.foot.loginlink","Log in")+"</a>"
    : t("auth.foot.tosignup","Don't have an account?")+' <a href="#" data-switch="signup">'+t("auth.foot.signuplink","Sign up")+"</a>";
  foot.querySelector("a").addEventListener("click",function(e){e.preventDefault();setMode(this.dataset.switch)});

  if(!skipPush){
    var path=isSignup?"/signup/":"/login/";
    if(location.pathname!==path) history.pushState({mode:mode},"",path+location.search);
  }
}

function applyRegion(){
  (window.GESERD&&GESERD.geo?GESERD.geo:Promise.resolve(null)).then(function(cc){
    var ru=cc==="RU";
    var gh=document.getElementById("oauthGithub"),go=document.getElementById("oauthGoogle"),ya=document.getElementById("oauthYandex");
    if(gh)gh.hidden=ru;
    if(go)go.hidden=ru;
    if(ya)ya.hidden=!ru;
  });
}

function oauth(provider){
  var api=(window.GESERD&&GESERD.api)||"/api";
  location.href=api+"/auth/oauth/"+provider+"?next="+encodeURIComponent(location.pathname);
}

function showErr(id,msg){
  var el=document.getElementById(id);
  if(!el)return;
  el.textContent=msg;
  el.style.display=msg?"block":"none";
}

/* Reads {error:"code"} from a failed API response (falling back to a network-level message
   when the response has no body/JSON, e.g. the request never reached the server) and returns
   the right localized string for it. */
function apiErrMsg(err){
  var code=err&&err.code;
  var MAP={
    invalid_email:["auth.error.email","Enter a valid email address"],
    rate_limited:["auth.error.rate","Too many attempts — wait a minute and try again"],
    mail_failed:["auth.error.mail","We couldn't send the email right now — try again shortly"],
    expired_or_missing:["auth.error.expired","This code expired — request a new one"],
    too_many_attempts:["auth.error.attempts","Too many wrong attempts — request a new code"],
    wrong_code:["auth.error.code","Enter the code from your email"],
    network:["auth.error.network","Couldn't reach the server — check your connection and try again"]
  };
  var m=MAP[code]||MAP.network;
  return t(m[0],m[1]);
}

function requestCode(btn){
  if(btn.classList.contains("loading"))return;
  var isSignup=document.getElementById("authTabs").classList.contains("mode-signup");
  var emailInput=document.getElementById("authEmail").value.trim();
  var nameInput=document.getElementById("authName").value.trim();
  showErr("authErr","");
  if(!emailInput||emailInput.indexOf("@")<1){showErr("authErr",t("auth.error.email","Enter a valid email address"));return}
  if(isSignup&&!nameInput){showErr("authErr",t("auth.error.name","Enter your name"));return}
  email=emailInput;
  btn.classList.add("loading");
  btn.disabled=true;
  var api=(window.GESERD&&GESERD.api)||"/api";
  fetch(api+"/auth/request-code",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(isSignup?{email:email,name:nameInput,mode:"signup"}:{email:email,mode:"login"})
  }).then(function(r){
    return r.json().catch(function(){return{}}).then(function(body){
      if(!r.ok)throw{code:body.error||"network"};
      return body;
    });
  }).then(function(){
    btn.classList.remove("loading");btn.disabled=false;
    document.getElementById("authCodeSub").textContent=t("auth.code.sub","We sent a 6-digit code to")+" "+email;
    document.getElementById("authStep1").style.display="none";
    document.getElementById("authStep2").style.display="block";
    document.getElementById("authCode").focus();
  }).catch(function(err){
    btn.classList.remove("loading");btn.disabled=false;
    showErr("authErr",apiErrMsg(err));
  });
}

function verifyCode(btn){
  if(btn.classList.contains("loading"))return;
  var code=document.getElementById("authCode").value.trim();
  showErr("authErr2","");
  if(!/^\d{4,8}$/.test(code)){showErr("authErr2",t("auth.error.code","Enter the code from your email"));return}
  btn.classList.add("loading");
  btn.disabled=true;
  var api=(window.GESERD&&GESERD.api)||"/api";
  fetch(api+"/auth/verify-code",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({email:email,code:code})
  }).then(function(r){
    return r.json().catch(function(){return{}}).then(function(body){
      if(!r.ok)throw{code:body.error||"network"};
      return body;
    });
  }).then(function(){
    location.href="/app/";
  }).catch(function(err){
    btn.classList.remove("loading");btn.disabled=false;
    showErr("authErr2",apiErrMsg(err));
  });
}

function backToStep1(){
  document.getElementById("authStep2").style.display="none";
  document.getElementById("authStep1").style.display="block";
  showErr("authErr2","");
}

window.AUTH={setMode:setMode,oauth:oauth,requestCode:requestCode,verifyCode:verifyCode,backToStep1:backToStep1};

function init(){
  var initial=location.pathname.indexOf("/signup")===0?"signup":"login";
  var q=new URLSearchParams(location.search).get("mode");
  if(q==="signup"||q==="login")initial=q;
  setMode(initial,true);
  applyRegion();
  window.addEventListener("popstate",function(e){setMode((e.state&&e.state.mode)||(location.pathname.indexOf("/signup")===0?"signup":"login"),true)});
}
var go=function(){document.readyState==="loading"?document.addEventListener("DOMContentLoaded",init):init()};
(window.GESERD&&GESERD.ready?GESERD.ready:Promise.resolve()).then(go);
})();
