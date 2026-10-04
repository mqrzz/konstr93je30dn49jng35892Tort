(function(){
var A=window.GSApp;if(!A)return;
var T=A.t,E=A.esc;
var TOPICS=[["general","General"],["billing","Billing"],["deliverability","Deliverability"],["domains","Domains"],["api","API"],["abuse","Abuse"],["other","Other"]];
var root;
function topic(k){return T("hp.topic."+k,(TOPICS.filter(function(x){return x[0]===k})[0]||[0,k])[1])}
function stat(t){var re=t.status!=="closed"&&t.last_author==="staff";return '<span class="stt'+(re?' re':'')+'">'+E(t.status==="closed"?T("hp.st.closed","Closed"):re?T("hp.st.reply","Answered"):T("hp.st.open","Open"))+'</span>'}
function head(){return '<div class="ph"><h1>'+E(T("ap.h.t","Help"))+'</h1></div>'}
function list(){
 root.innerHTML=head()+A.loading();
 A.api("/tickets").then(function(rows){
  var top='<div class="ucard"><div class="uh"><div><h3>'+E(T("ap.h.s1","Need help with something?"))+'</h3><p>'+E(T("hp.lead","Describe the problem and our team will reply here and by email."))+'</p></div><button type="button" class="abtn pri lg" id="hpNew">'+E(T("hp.new","Create a ticket"))+'</button></div><div class="prow"><a class="abtn" href="/docs/" target="_blank" rel="noopener">'+E(T("app.docs","Docs"))+'</a><a class="abtn" href="/status/" target="_blank" rel="noopener">'+E(T("hp.status","System status"))+'</a></div></div>';
  var body=rows.length?'<h2 class="sh1" style="margin-top:32px">'+E(T("hp.mine","Your tickets"))+'</h2><div class="tkl">'+rows.map(function(t){return '<button type="button" class="tk" data-id="'+t.id+'"><div><b>'+E(t.subject)+'</b><span>'+E(topic(t.topic))+' · '+E(A.ago(t.updated_at))+'</span></div>'+stat(t)+'</button>'}).join("")+'</div>':'';
  root.innerHTML=head()+top+body;
  document.getElementById("hpNew").onclick=create;
  root.querySelectorAll(".tk").forEach(function(b){b.onclick=function(){open(b.dataset.id)}})
 },function(x){root.innerHTML=head()+A.failed(x,"hpRetry");var b=document.getElementById("hpRetry");if(b)b.onclick=list})}
function create(){
 var sel="general";
 var body='<div class="pfld"><label>'+E(T("hp.f.topic","Topic"))+'</label><div class="chips2" id="hpT">'+TOPICS.map(function(x){return '<button type="button" data-t="'+x[0]+'" class="'+(x[0]===sel?"on":"")+'">'+E(topic(x[0]))+'</button>'}).join("")+'</div></div><div class="pfld"><label for="hps">'+E(T("hp.f.subject","Subject"))+'</label><input id="hps" maxlength="160"></div><div class="pfld"><label for="hpm">'+E(T("hp.f.msg","Message"))+'</label><textarea id="hpm" rows="6" maxlength="5000"></textarea></div>';
 var m=A.modal({title:T("hp.new","Create a ticket"),wide:true,body:body,actions:[{label:T("app.close","Close")},{label:T("hp.send","Send"),cls:"pri",onClick:function(api,btn){
  var s=api.el.querySelector("#hps").value.trim(),t=api.el.querySelector("#hpm").value.trim();
  if(s.length<3||t.length<5){A.toast(T("hp.err.fill","Add a subject and a message."),"err");return}
  btn.disabled=true;A.api("/tickets",{method:"POST",body:{subject:s,topic:sel,message:t}}).then(function(r){api.close();A.toast(T("hp.sent","Ticket created"),"ok");open(r.id)},function(e){btn.disabled=false;A.toast(e.code==="too_many_tickets"?T("hp.err.many","You have too many open tickets. Close one first."):A.err(e),"err")})}}]});
 m.el.querySelector("#hpT").onclick=function(e){var b=e.target.closest("button[data-t]");if(!b)return;sel=b.dataset.t;m.el.querySelectorAll("#hpT button").forEach(function(x){x.classList.toggle("on",x===b)})}}
function open(id){
 history.replaceState(null,"","?t="+id);
 root.innerHTML=head()+A.loading();
 A.api("/tickets/"+id).then(function(t){
  var closed=t.status==="closed";
  root.innerHTML=head()+'<div class="tops"><button type="button" class="abtn" id="hpBack">'+A.icon(A.IC.back,14)+'<span>'+E(T("hp.back","All tickets"))+'</span></button><div class="prow">'+(closed?'<button type="button" class="abtn" id="hpRe">'+E(T("hp.reopen","Reopen"))+'</button>':'<button type="button" class="abtn" id="hpCl">'+E(T("hp.close","Close ticket"))+'</button>')+'</div></div><div class="ucard"><div class="uh"><div><h3>'+E(t.subject)+'</h3><p>'+E(topic(t.topic))+' · '+E(A.date(t.created_at))+'</p></div>'+stat({status:t.status,last_author:(t.messages[t.messages.length-1]||{}).author})+'</div><div class="thr">'+t.messages.map(function(m){return '<div class="msg '+(m.author==="staff"?"sf":"us")+'"><small>'+E(m.author==="staff"?T("hp.staff","Geserd support"):T("hp.you","You"))+' · '+E(A.ago(m.created_at))+'</small>'+E(m.body)+'</div>'}).join("")+'</div>'+(closed?'':'<div class="pfld"><label for="hpr">'+E(T("hp.reply","Your reply"))+'</label><textarea id="hpr" rows="4" maxlength="5000"></textarea></div><div class="prow"><button type="button" class="abtn pri lg" id="hpSend">'+E(T("hp.send","Send"))+'</button></div>')+'</div>';
  document.getElementById("hpBack").onclick=function(){history.replaceState(null,"",location.pathname);list()};
  var s=document.getElementById("hpSend");if(s)s.onclick=function(){var v=document.getElementById("hpr").value.trim();if(!v)return;s.disabled=true;A.api("/tickets/"+id+"/messages",{method:"POST",body:{message:v}}).then(function(){open(id)},function(e){s.disabled=false;A.toast(A.err(e),"err")})};
  var c=document.getElementById("hpCl");if(c)c.onclick=function(){A.api("/tickets/"+id+"/close",{method:"POST"}).then(function(){open(id)},function(e){A.toast(A.err(e),"err")})};
  var r=document.getElementById("hpRe");if(r)r.onclick=function(){A.api("/tickets/"+id+"/reopen",{method:"POST"}).then(function(){open(id)},function(e){A.toast(A.err(e),"err")})}
 },function(x){if(x&&x.status===404){history.replaceState(null,"",location.pathname);return list()}root.innerHTML=head()+A.failed(x,"hpRetry");var b=document.getElementById("hpRetry");if(b)b.onclick=function(){open(id)}})}
A.ready(function(){root=document.getElementById("hp-root");if(!root)return;var q=new URLSearchParams(location.search).get("t");if(q&&/^[0-9a-f-]{36}$/i.test(q))open(q);else list()});
})();
