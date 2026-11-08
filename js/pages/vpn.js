(function(){
var rd=function(){return(window.GESERD&&GESERD.ready)?GESERD.ready:Promise.resolve()};
function T(k,d){return(window.GESERD&&GESERD.t)?GESERD.t(k,d):d}
var $=function(i){return document.getElementById(i)},main=$("ug"),busy=false,done=false;
function st(s){main.setAttribute("data-st",s)}
function back(){var to="/";try{to=sessionStorage.getItem("gs_vpn_from")||"/";sessionStorage.removeItem("gs_vpn_from");sessionStorage.removeItem("gs_vpn_v2")}catch(e){}
 if(/^\/(vpn)(\/|$)/.test(to))to="/";location.replace(to)}
function say(k,d){var m=$("vpM");m.textContent=k?T(k,d):""}
function check(manual){
 if(busy||done)return;busy=true;if(manual){$("vpB").disabled=true;$("vpB2").disabled=true;say("vp.chkng","Checking")}
 fetch("/api/vpn",{cache:"no-store"}).then(function(r){return r.ok?r.json():Promise.reject()}).then(function(j){
  rd().then(function(){
   if(!j.vpn){done=true;st("ok");setTimeout(back,900)}
   else{st("blocked");say(manual?"vp.still":"","Still detected. Turn the VPN off and try again.")}})
 }).catch(function(){rd().then(function(){if(manual||main.getAttribute("data-st")==="load")st("err")})}).then(function(){busy=false;if(!done){$("vpB").disabled=false;$("vpB2").disabled=false}})}
$("vpB").onclick=function(){check(true)};$("vpB2").onclick=function(){st("load");check(true)};
document.addEventListener("visibilitychange",function(){if(!document.hidden)check(false)});
setInterval(function(){if(!document.hidden)check(false)},20000);
check(false)
})();
