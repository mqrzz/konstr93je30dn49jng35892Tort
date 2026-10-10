(function(){
var A=window.GSApp;if(!A)return;
var T=A.t,E=A.esc;
var TOPICS=["general","billing","deliverability","domains","api","abuse","feedback","other"];
var TD={general:"General",billing:"Billing",deliverability:"Deliverability",domains:"Domains",api:"API",abuse:"Abuse",feedback:"Feedback",other:"Other"};
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
 var sel=new URLSearchParams(location.search).get("topic");if(TOPICS.indexOf(sel)<0)sel="general";
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
  var ini=(window.GESERD&&GESERD.user&&GESERD.user.name||"Y").trim().charAt(0).toUpperCase()||"Y";
  var TI={general:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 .9-1 1.7M12 17h.01"/>',billing:'<rect x="3" y="6" width="18" height="12" rx="3"/><path d="M3 10h18M7 15h3"/>',deliverability:'<path d="m4 12 16-8-6 16-3-7z"/>',domains:A.IC.globe,api:A.IC.key,abuse:'<path d="M12 3 4 6v6c0 4.5 3.2 7.5 8 9 4.8-1.5 8-4.5 8-9V6z"/><path d="M12 8v5M12 16h.01"/>',feedback:'<path d="M4 5h16v11H9l-5 4z"/><path d="M8.5 9.5h7M8.5 12.5h4"/>',other:'<circle cx="6" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="18" cy="12" r="1.5"/>'};
  var msgs=t.messages.map(function(m){var sf=m.author==="staff";return'<div class="tm '+(sf?"sf":"us")+'"><span class="tm-a">'+(sf?A.icon('<path d="M4 12c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8H4z"/><path d="M9 11h6M9 14h4"/>',16):E(ini))+'</span><div class="tm-b"><small>'+E(sf?T("hp.staff","Geserd support"):T("hp.you","You"))+' · '+E(A.ago(m.created_at))+"</small><p>"+E(m.body)+"</p></div></div>"}).join("");
  var foot=closed?'<div class="tk-closed">'+A.icon('<rect x="5" y="11" width="14" height="9" rx="3"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',20)+'<div><b>'+E(T("hp.st.closed","Closed"))+"</b><span>"+E(T("hp.closed.note2","This ticket is closed. For a new question, create a new ticket."))+'</span></div><a class="abtn pri" href="'+URL_NEW+'">'+A.icon(A.IC.plus,16)+"<span>"+E(T("hp.new","Create a ticket"))+"</span></a></div>":'<div class="tk-comp"><textarea id="hpr" rows="1" maxlength="5000" aria-label="'+E(T("hp.reply","Your reply"))+'" placeholder="'+E(T("hp.reply.ph","Write a message…"))+'"></textarea><button type="button" class="tk-send" id="hpSend" aria-label="'+E(T("hp.send","Send"))+'">'+A.icon('<path d="M5 12h14M13 6l6 6-6 6"/>',20)+"</button></div>";
  root.classList.add("tk-page");document.body.classList.add("tk-page");root.innerHTML=head(t.subject,URL_LIST)+'<div class="tk-wrap"><div class="tk-top"><a class="tk-back" href="'+URL_LIST+'" aria-label="'+E(T("hp.back","All tickets"))+'">'+A.icon(A.IC.back,16)+"<span>"+E(T("hp.back","All tickets"))+"</span></a>"+'<span class="tk-ic">'+A.icon(TI[t.topic]||TI.other,20)+'</span><div class="tk-meta"><b>'+E(topic(t.topic))+"</b><span>"+E(A.date(t.created_at))+"</span></div>"+stat({status:t.status,last_author:last.author})+(closed?"":'<button type="button" class="abtn" id="hpCl">'+A.icon('<circle cx="12" cy="12" r="9"/><path d="m9 9 6 6M15 9l-6 6"/>',16)+"<span>"+E(T("hp.close","Close ticket"))+"</span></button>")+'</div><div class="tk-thr">'+msgs+"</div>"+foot+"</div>";
  var ta=document.getElementById("hpr"),s=document.getElementById("hpSend");
  function grow(){ta.style.height="auto";ta.style.height=Math.min(160,ta.scrollHeight)+"px"}
  function send(){var v=ta.value.trim();if(!v||s.disabled)return;s.disabled=true;A.api("/tickets/"+id+"/messages",{method:"POST",body:{message:v}}).then(function(){view(id)},function(e){s.disabled=false;A.toast(A.err(e),"err")})}
  if(ta){ta.oninput=grow;ta.onkeydown=function(ev){if(ev.key==="Enter"&&(ev.ctrlKey||ev.metaKey)){ev.preventDefault();send()}};s.onclick=send}
  var c=document.getElementById("hpCl");
  if(c)c.onclick=function(){
   var m=A.modal({title:T("hp.close.q","Close this ticket?"),body:'<p class="dim">'+E(T("hp.close.p","You will not be able to reply after it is closed. For a new question, create a new ticket."))+'</p><div class="prow"><button type="button" class="abtn" id="hpNo">'+E(T("au.cancel","Cancel"))+'</button><button type="button" class="abtn pri" id="hpYes">'+E(T("hp.close","Close ticket"))+"</button></div>"});
   m.body.querySelector("#hpNo").onclick=m.close;
   m.body.querySelector("#hpYes").onclick=function(){this.disabled=true;A.api("/tickets/"+id+"/close",{method:"POST"}).then(function(){m.close();view(id)},function(e){m.close();A.toast(A.err(e),"err")})}
  };
  var th=root.querySelector(".tk-thr");if(th)th.scrollTop=th.scrollHeight
 },function(x){if(x&&x.status===404){location.replace(URL_LIST);return}fail(x,function(){view(id)})})}
A.ready(function(){root=document.getElementById("hp-root");if(!root)return;pg=root.dataset.page;
 if(pg==="new")return create();
 if(pg==="view"){var q=new URLSearchParams(location.search).get("t");if(q&&/^[0-9a-f-]{36}$/i.test(q))return view(q);location.replace(URL_LIST);return}
 list()});
})();
