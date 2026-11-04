(function(){
var rd=function(){return(window.GESERD&&GESERD.ready)?GESERD.ready:Promise.resolve()};
function T(k,d){return(window.GESERD&&GESERD.t)?GESERD.t(k,d):d}
var $=function(i){return document.getElementById(i)},EVERY=15,left=EVERY,eta=null,busy=false,done=false,seenUp=false;
var NAMES={api:["API","API"],database:["Database","База данных"],sending:["Sending","Отправка"],inbound:["Inbound mail","Входящая почта"]};
function row(cls,name,txt){var d=document.createElement("div");d.className="mtp-row "+cls;var i=document.createElement("i"),b=document.createElement("b"),s=document.createElement("span");b.textContent=name;s.textContent=txt;d.appendChild(i);d.appendChild(b);d.appendChild(s);return d}
function fmtEta(){
 var e=$("mtE");if(!eta){e.hidden=true;return}
 var ms=eta-Date.now(),d=new Date(eta);if(isNaN(d)){e.hidden=true;return}
 var at=d.toLocaleString(document.documentElement.lang||undefined,{dateStyle:"medium",timeStyle:"short"});
 e.hidden=false;e.textContent=T("mt.until","Expected back around {x}").replace("{x}",at)}
function paint(j,st,reach){
 var R=$("mtR");R.textContent="";
 var active=!!(j&&j.active);
 R.appendChild(row(!reach?"bad":active?"wait":"ok",T("mt.c.mode","Maintenance"),!reach?T("mt.noresp","No response"):active?T("mt.inprog","In progress"):T("mt.finished","Finished")));
 var comps={};((st&&st.components)||[]).forEach(function(c){comps[c.id]=c});
 ["api","database","sending","inbound"].forEach(function(id){
  var c=comps[id],cls=!reach?"bad":!c?"wait":c.ok?"ok":"wait";
  var txt=!reach?T("mt.noresp","No response"):!c?T("mt.checking","Checking"):c.ok?T("stt.up","Operational"):T("mt.notyet","Not ready yet");
  R.appendChild(row(cls,T("stt.c."+id,NAMES[id][0]),txt))});
}
function finish(){
 if(done)return;done=true;
 var o=$("mtOrb");o.classList.add("ok");$("mtIc").innerHTML='<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>';
 $("mtH").removeAttribute("data-i18n");$("mtH").textContent=T("mt.back","We are back");
 $("mtP").removeAttribute("data-i18n");$("mtP").textContent=T("mt.redirect","Taking you to the site.");$("mtE").hidden=true;
 setTimeout(function(){location.replace("/")},1400)}
function check(){
 if(busy||done)return;busy=true;$("mtB").disabled=true;
 var f=function(u){return fetch(u,{cache:"no-store"}).then(function(r){return r.ok?r.json():Promise.reject()})};
 Promise.all([f("/api/maintenance"),f("/api/status").catch(function(){return null})]).then(function(a){
  var j=a[0],st=a[1];
  rd().then(function(){
   if(j.active){
    if(j.title){$("mtH").removeAttribute("data-i18n");$("mtH").textContent=j.title}
    if(j.message){$("mtP").removeAttribute("data-i18n");$("mtP").textContent=j.message}
    eta=j.eta?new Date(j.eta).getTime():null;fmtEta()}
   paint(j,st,true);
   if(!j.active)finish()})
 }).catch(function(){rd().then(function(){paint(null,null,false)})}).then(function(){
  busy=false;$("mtB").disabled=false;left=EVERY;tick(true)})}
var last=0;
function tick(reset){
 if(reset)last=Date.now();
 var ago=Math.max(0,Math.round((Date.now()-last)/1000));
 $("mtT").textContent=last?T("mt.ago","Checked {s} s ago").replace("{s}",ago):"";
 $("mtN").textContent=T("mt.next","Next check in {s} s").replace("{s}",Math.max(0,left))}
setInterval(function(){if(done)return;left--;tick();if(left<=0)check()},1000);
$("mtB").onclick=check;
check()
})();
