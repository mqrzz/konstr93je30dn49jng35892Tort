(function(){
var rd=function(){return(window.GESERD&&GESERD.ready)?GESERD.ready:Promise.resolve()};
function T(k,d){return(window.GESERD&&GESERD.t)?GESERD.t(k,d):d}
var $=function(i){return document.getElementById(i)},busy=false,done=false;
function back(){var to="/";try{to=sessionStorage.getItem("gs_vpn_from")||"/";sessionStorage.removeItem("gs_vpn_from");sessionStorage.removeItem("gs_vpn_v2")}catch(e){}
 if(/^\/(vpn)(\/|$)/.test(to))to="/";location.replace(to)}
function say(k,d,c){var m=$("vpM");m.className="vpp-msg"+(c?" "+c:"");m.textContent=T(k,d)}
function check(manual){
 if(busy||done)return;busy=true;if(manual){$("vpB").disabled=true;say("vp.chkng","Checking","")}
 fetch("/api/vpn",{cache:"no-store"}).then(function(r){return r.ok?r.json():Promise.reject()}).then(function(j){
  rd().then(function(){
   if(!j.vpn){done=true;say("vp.clear","No VPN detected. Opening the site.","ok");setTimeout(back,900)}
   else if(manual)say("vp.still","Still detected. Turn the VPN off and try again.","bad")})
 }).catch(function(){if(manual)rd().then(function(){say("vp.err","Could not check right now. Try again in a moment.","bad")})}).then(function(){busy=false;if(!done)$("vpB").disabled=false})}
$("vpB").onclick=function(){check(true)};
document.addEventListener("visibilitychange",function(){if(!document.hidden)check(false)});
setInterval(function(){if(!document.hidden)check(false)},20000);
check(false)
})();
