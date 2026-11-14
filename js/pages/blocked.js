(function(){
function T(k,d){return(window.GESERD&&GESERD.t)?GESERD.t(k,d):d}
var $=function(i){return document.getElementById(i)},main=$("ug"),cur="blocked",mail="",anon=false;
function st(s){main.setAttribute("data-st",s)}
function home(){location.replace("/")}
function js(r){return r.ok?r.json():Promise.reject(r)}
function hdr(){return window.GD_HDR?window.GD_HDR():{}}
function mark(on){try{if(on)localStorage.setItem("gd_blk","1");else localStorage.removeItem("gd_blk")}catch(e){}}
var api=(window.GESERD&&window.GESERD.api)||"/api";
function start(){fetch(api+"/device/check",{headers:hdr(),cache:"no-store",credentials:"same-origin"}).then(js).then(function(d){
 var fr=d.session&&d.session.status==="frozen";
 if(!d.blocked&&!fr){mark(false);try{sessionStorage.removeItem("gd_chk")}catch(e){}home();return}
 mark(!!d.blocked);
 cur=d.blocked?"blocked":"frozen";anon=!d.session;
 var p=anon?Promise.resolve({}):fetch(api+"/auth/me",{cache:"no-store",credentials:"same-origin"}).then(js).catch(function(){return{}});
 return p.then(function(me){
  mail=me.email||"";
  if(anon){$("blDl").hidden=true;$("blOut").hidden=true;$("blEm").hidden=false}
  var w=window.GESERD&&GESERD.ready?GESERD.ready:Promise.resolve();
  w.then(function(){st(cur)})})
}).catch(function(){home()})}
if(document.readyState==="complete")start();else window.addEventListener("load",start);
main.addEventListener("click",function(ev){
 var b=ev.target.closest("[data-go]");if(!b)return;
 var g=b.getAttribute("data-go");
 if(g==="form"){$("blE").hidden=true;st("form");(anon?$("blEm"):$("blT")).focus()}
 else if(g==="back")st(cur);
 else if(g==="out")fetch(api+"/auth/logout",{method:"POST",credentials:"same-origin"}).then(home,home)
});
function fail(){$("blS").disabled=false;var er=$("blE");er.textContent=T("bl.err","Could not send. Try again.");er.hidden=false}
$("blS").onclick=function(){
 var b=this,v=$("blT").value.trim(),er=$("blE");er.hidden=true;
 if(v.length<5)return;
 if(anon){var em=$("blEm").value.trim();if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)){$("blEm").focus();return}mail=em}
 b.disabled=true;
 var req=anon?fetch(api+"/contact",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:"Blocked device",email:mail,topic:"abuse",message:v,lang:(document.documentElement.lang||"en").slice(0,2),page:"/blocked/"})}):fetch(api+"/standing/appeal",{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:v})});
 req.then(function(r){
  b.disabled=false;
  if(!r.ok){fail();return}
  $("blT").value="";$("blM").textContent=mail;st("sent")
 },fail)
};
})();
