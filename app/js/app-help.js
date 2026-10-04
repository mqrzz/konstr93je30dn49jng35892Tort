(function(){
var A=window.GSApp;if(!A)return;
var T=A.t,E=A.esc;
var TOPICS=["general","billing","deliverability","domains","api","abuse","other"];
var TD={general:"General",billing:"Billing",deliverability:"Deliverability",domains:"Domains",api:"API",abuse:"Abuse",other:"Other"};
var root,pg;
var URL_LIST="/app/help/tickets/",URL_NEW="/app/help/tickets/new/",URL_VIEW="/app/help/tickets/view/";
function topic(k){return T("hp.topic."+k,TD[k]||k)}
function stat(t){var re=t.status!=="closed"&&t.last_author==="staff";return '<span class="stt'+(re?' re':'')+'">'+E(t.status==="closed"?T("hp.st.closed","Closed"):re?T("hp.st.reply","Answered"):T("hp.st.open","Open"))+'</span>'}
function head(title,back){return '<div class="ph hph">'+(back?'<a class="backlnk" href="'+back+'">'+A.icon(A.IC.back,16)+'<span>'+E(T("hp.back","All tickets"))+'</span></a>':'<a class="backlnk" href="/app/help/">'+A.icon(A.IC.back,16)+'<span>'+E(T("ap.h.t","Help"))+'</span></a>')+'<h1>'+E(title)+'</h1></div>'}
function fail(x,retry){root.innerHTML=head(T("hp.mine","Your tickets"))+A.failed(x,"hpRetry");var b=document.getElementById("hpRetry");if(b)b.onclick=retry}
function list(){
 var filter="all";
 root.innerHTML=head(T("hp.mine","Your tickets"))+A.loading();
 A.api("/tickets").then(function(rows){
  function paint(){
   var shown=rows.filter(function(t){return filter==="all"||(filter==="closed")===(t.status==="closed")});
   var chips='<div class="chips2" id="hpF">'+[["all",T("hp.f.all","All")],["open",T("hp.st.open","Open")],["closed",T("hp.st.closed","Closed")]].map(function(x){return '<button type="button" data-f="'+x[0]+'" class="'+(x[0]===filter?"on":"")+'">'+E(x[1])+'</button>'}).join("")+'</div>';
   var body=shown.length?'<div class="tkl">'+shown.map(function(t){return '<a class="tk" href="'+URL_VIEW+'?t='+t.id+'"><div><b>'+E(t.subject)+'</b><span>'+E(topic(t.topic))+' · '+E(A.ago(t.updated_at))+' · '+E(A.plural(t.messages,"hp.msgs","{n} messages"))+'</span></div>'+stat(t)+A.icon(A.IC.chev,16)+'</a>'}).join("")+'</div>':A.empty('<path d="M4 5h16v11H9l-5 4z"/>',T("hp.none","No tickets yet"),T("hp.none.d","When you contact support, the conversation will be kept here."),'<a class="abtn pri lg" href="'+URL_NEW+'">'+E(T("hp.new","Create a ticket"))+'</a>');
   root.innerHTML=head(T("hp.mine","Your tickets"))+'<div class="tops">'+chips+'<a class="abtn pri lg" href="'+URL_NEW+'">'+A.icon(A.IC.plus,16)+'<span>'+E(T("hp.new","Create a ticket"))+'</span></a></div>'+body;
   document.getElementById("hpF").onclick=function(e){var b=e.target.closest("button[data-f]");if(!b)return;filter=b.dataset.f;paint()}}
  paint()},function(x){fail(x,list)})}
function create(){
 var sel="general";
 var tips=[T("hp.tip1","Name the domain or the email id you are asking about."),T("hp.tip2","Paste the exact error text or the SMTP response."),T("hp.tip3","Say what you expected and what happened instead.")];
 root.innerHTML=head(T("hp.new","Create a ticket"),URL_LIST)+'<div class="hnew"><div class="ucard hform"><div class="pfld"><label>'+E(T("hp.f.topic","Topic"))+'</label><div class="chips2" id="hpT">'+TOPICS.map(function(k){return '<button type="button" data-t="'+k+'" class="'+(k===sel?"on":"")+'">'+E(topic(k))+'</button>'}).join("")+'</div></div><div class="pfld"><label for="hps">'+E(T("hp.f.subject","Subject"))+'</label><input id="hps" maxlength="160" autocomplete="off"></div><div class="pfld"><label for="hpm">'+E(T("hp.f.msg","Message"))+'</label><textarea id="hpm" rows="9" maxlength="5000"></textarea></div><div class="prow"><button type="button" class="abtn pri lg" id="hpGo">'+E(T("hp.send","Send"))+'</button><a class="abtn lg" href="'+URL_LIST+'">'+E(T("hp.cancel","Cancel"))+'</a></div></div><aside class="ucard htips"><h3>'+E(T("hp.tips","Faster answers"))+'</h3>'+tips.map(function(x,i){return '<div class="tip"><i>'+(i+1)+'</i><p>'+E(x)+'</p></div>'}).join("")+'<a class="abtn" href="/docs/" target="_blank" rel="noopener">'+E(T("ap.h.d3","Read docs"))+'</a></aside></div>';
 document.getElementById("hpT").onclick=function(e){var b=e.target.closest("button[data-t]");if(!b)return;sel=b.dataset.t;root.querySelectorAll("#hpT button").forEach(function(x){x.classList.toggle("on",x===b)})};
 var go=document.getElementById("hpGo");
 go.onclick=function(){var s=document.getElementById("hps").value.trim(),t=document.getElementById("hpm").value.trim();
  if(s.length<3||t.length<5){A.toast(T("hp.err.fill","Add a subject and a message."),"err");return}
  go.disabled=true;A.api("/tickets",{method:"POST",body:{subject:s,topic:sel,message:t}}).then(function(r){location.href=URL_VIEW+"?t="+r.id},function(e){go.disabled=false;A.toast(e.code==="too_many_tickets"?T("hp.err.many","You have too many open tickets. Close one first."):A.err(e),"err")})}}
function view(id){
 root.innerHTML=head(T("hp.ticket","Ticket"),URL_LIST)+A.loading();
 A.api("/tickets/"+id).then(function(t){
  var closed=t.status==="closed",last=t.messages[t.messages.length-1]||{};
  root.innerHTML=head(t.subject,URL_LIST)+'<div class="ucard"><div class="uh"><div><h3>'+E(topic(t.topic))+'</h3><p>'+E(A.date(t.created_at))+'</p></div>'+stat({status:t.status,last_author:last.author})+'<div class="prow">'+(closed?'<button type="button" class="abtn" id="hpRe">'+E(T("hp.reopen","Reopen"))+'</button>':'<button type="button" class="abtn" id="hpCl">'+E(T("hp.close","Close ticket"))+'</button>')+'</div></div><div class="thr">'+t.messages.map(function(m){return '<div class="msg '+(m.author==="staff"?"sf":"us")+'"><small>'+E(m.author==="staff"?T("hp.staff","Geserd support"):T("hp.you","You"))+' · '+E(A.ago(m.created_at))+'</small>'+E(m.body)+'</div>'}).join("")+'</div>'+(closed?'<div class="emptyb">'+E(T("hp.closed.note","This ticket is closed. Reopen it to reply."))+'</div>':'<div class="pfld"><label for="hpr">'+E(T("hp.reply","Your reply"))+'</label><textarea id="hpr" rows="4" maxlength="5000"></textarea></div><div class="prow"><button type="button" class="abtn pri lg" id="hpSend">'+E(T("hp.send","Send"))+'</button></div>')+'</div>';
  var s=document.getElementById("hpSend");if(s)s.onclick=function(){var v=document.getElementById("hpr").value.trim();if(!v)return;s.disabled=true;A.api("/tickets/"+id+"/messages",{method:"POST",body:{message:v}}).then(function(){view(id)},function(e){s.disabled=false;A.toast(A.err(e),"err")})};
  var c=document.getElementById("hpCl");if(c)c.onclick=function(){A.api("/tickets/"+id+"/close",{method:"POST"}).then(function(){view(id)},function(e){A.toast(A.err(e),"err")})};
  var r=document.getElementById("hpRe");if(r)r.onclick=function(){A.api("/tickets/"+id+"/reopen",{method:"POST"}).then(function(){view(id)},function(e){A.toast(A.err(e),"err")})}
 },function(x){if(x&&x.status===404){location.replace(URL_LIST);return}fail(x,function(){view(id)})})}
A.ready(function(){root=document.getElementById("hp-root");if(!root)return;pg=root.dataset.page;
 if(pg==="new")return create();
 if(pg==="view"){var q=new URLSearchParams(location.search).get("t");if(q&&/^[0-9a-f-]{36}$/i.test(q))return view(q);location.replace(URL_LIST);return}
 list()});
})();
