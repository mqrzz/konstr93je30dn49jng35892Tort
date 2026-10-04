(function(){
var T=function(k,d){return window.GESERD&&GESERD.t?GESERD.t(k,d):d};
var esc=function(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})};
var lang=function(){return(window.GESERD&&GESERD.lang)||"en"};
var fmt=function(iso){var d=new Date(iso);if(isNaN(d))return"";try{return d.toLocaleString(lang(),{day:"numeric",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"})}catch(e){return iso}};
var C={api:["API","Accepts requests and returns responses."],database:["Database","Stores accounts, emails and events."],sending:["Sending","Mail server delivering outgoing email."],inbound:["Receiving","Inbound mail for your domains and subdomains."],smtp:["SMTP","SMTP submission on ports 465 and 587."],webhooks:["Webhooks","Event delivery to your endpoints."]};
function cls(u){return u==null?"":u>=99.9?"g":u>=99?"a":"r"}
function bars(h){
 var map={};h.forEach(function(x){map[x.day]=x.uptime});
 var out=[],now=new Date();
 for(var i=89;i>=0;i--){var d=new Date(now.getTime()-i*864e5),k=d.toISOString().slice(0,10),u=map[k];out.push('<span class="'+cls(u)+'" title="'+esc(k)+(u==null?"":" · "+u+"%")+'"></span>')}
 return out.join("")}
function paint(j){
 var top=document.getElementById("stTop"),comp=document.getElementById("stComp"),inc=document.getElementById("stInc");
 var labels={ok:T("stt.ok","All systems operational"),degraded:T("stt.degraded","Some systems are degraded"),major:T("stt.major","Major outage")};
 top.className="st-top "+j.state;top.innerHTML="<i></i><span>"+esc(labels[j.state]||labels.ok)+"</span>";
 comp.innerHTML=j.components.map(function(c){
  var n=C[c.id]||[c.id,""];
  return '<div class="st-row"><div class="st-h"><div><b>'+esc(T("stt.c."+c.id,n[0]))+'</b><small>'+esc(T("stt.d."+c.id,n[1]))+'</small></div><div class="st-r"><em>'+(c.uptime==null?"":esc(c.uptime+"%"))+'</em><span class="st-pill'+(c.ok?"":" bad")+'">'+esc(c.ok?T("stt.up","Operational"):T("stt.down","Disruption"))+'</span></div></div><div class="st-bars" role="img" aria-label="'+esc(T("stt.hist90","Last 90 days"))+'">'+bars(c.history)+'</div><div class="st-ends"><span>'+esc(T("stt.d90","90 days ago"))+'</span><span>'+esc(T("stt.today","Today"))+'</span></div></div>'}).join("");
 inc.innerHTML=j.incidents.length?j.incidents.map(function(i){
  return '<div class="st-inc"><b>'+esc(i.title)+'</b>'+(i.body?'<p>'+esc(i.body)+'</p>':"")+'<time><span class="tg2">'+esc(T("stt.s."+i.status,i.status))+'</span>'+esc(fmt(i.started_at))+(i.resolved_at?" → "+esc(fmt(i.resolved_at)):"")+'</time></div>'}).join(""):'<div class="st-none">'+esc(T("stt.noinc","No incidents in the last 30 days."))+'</div>'}
function fail(){
 var top=document.getElementById("stTop");top.className="st-top bad";top.innerHTML="<i></i><span>"+esc(T("stt.unavail","Status is temporarily unavailable"))+"</span>"}
function load(){fetch("/api/status",{cache:"no-store"}).then(function(r){return r.ok?r.json():Promise.reject()}).then(paint).catch(fail)}
function go(){load();setInterval(load,30000)}
(function wait(n){if(window.GESERD&&GESERD.ready)return GESERD.ready.then(go,go);if(n>400)return go();setTimeout(function(){wait(n+1)},25)})(0)
})();
